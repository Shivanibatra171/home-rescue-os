import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Camera, User, Mail, Phone, MapPin, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { uploadService } from '@/services/upload.service';
import { userService } from '@/services/user.service';

interface ProfileForm {
  name: string;
  email: string;
  phone: string;
  city: string;
}

export default function Profile() {
  const { user, login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      city: user?.city || 'Karachi',
    },
  });

  const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    user?.name || 'User'
  )}&background=0284c7&color=fff&size=200&bold=true`;

  const currentAvatar = user?.avatar?.trim() ? user.avatar : defaultAvatar;

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file (PNG, JPG, WEBP)');
      return;
    }

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    setIsUploadingAvatar(true);
    const loadingToast = toast.loading('Uploading picture...');

    try {
      // 1. Upload to Cloudinary / Backend
      const uploadRes = await uploadService.uploadImage(file);
      const payload = uploadRes.data || uploadRes;
      const imageUrl = payload.url || payload.secure_url;

      if (!imageUrl) {
        throw new Error('Image URL not received');
      }

      // 2. Save avatar to user profile in MongoDB
      const updateRes = await userService.updateProfile({ avatar: imageUrl });
      const updatedUser = updateRes.data?.user || updateRes.data?.account || { ...user, avatar: imageUrl };

      // 3. Update global AuthContext state
      await login({ ...user, ...updatedUser, avatar: imageUrl });

      toast.success('Profile picture updated successfully!', { id: loadingToast });
    } catch (err: any) {
      console.error('Avatar upload error:', err);
      toast.error(err.response?.data?.message || 'Failed to upload image. Please try again.', {
        id: loadingToast,
      });
    } finally {
      setIsUploadingAvatar(false);
      // Reset input value so same file can be re-selected if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const onSubmit = async (data: ProfileForm) => {
    if (!user) return;
    setIsLoading(true);

    try {
      const updateRes = await userService.updateProfile(data);
      const updatedUser = updateRes.data?.user || updateRes.data?.account || { ...user, ...data };
      
      await login({ ...user, ...updatedUser, ...data });
      toast.success('Profile updated successfully!');
    } catch (err: any) {
      console.error('Profile update error:', err);
      toast.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-surface-900 dark:text-surface-50">Your profile</h1>
        <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">Update your personal information.</p>
      </div>

      <div className="rounded-2xl border border-surface-100 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 shadow-sm">
        {/* Hidden File Input for Avatar Upload */}
        <input
          type="file"
          ref={fileInputRef}
          accept="image/png, image/jpeg, image/jpg, image/webp"
          className="hidden"
          onChange={handleAvatarChange}
        />

        <div className="flex items-center gap-5">
          <div className="relative group">
            <div className="h-20 w-20 rounded-full overflow-hidden ring-4 ring-brand-500/20 bg-surface-100 dark:bg-surface-800 flex items-center justify-center">
              {isUploadingAvatar ? (
                <div className="flex flex-col items-center justify-center h-full w-full bg-black/50 text-white">
                  <Loader2 size={24} className="animate-spin text-brand-400" />
                </div>
              ) : (
                <img
                  src={currentAvatar}
                  alt={user?.name || 'User Avatar'}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = defaultAvatar;
                  }}
                />
              )}
            </div>

            {/* Camera Upload Button */}
            <button
              type="button"
              onClick={handleAvatarClick}
              disabled={isUploadingAvatar}
              title="Click to upload profile picture"
              className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 hover:bg-brand-700 active:scale-95 text-white ring-2 ring-white dark:ring-surface-900 shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              {isUploadingAvatar ? <Loader2 size={14} className="animate-spin" /> : <Camera size={14} />}
            </button>
          </div>

          <div>
            <h3 className="font-display font-semibold text-lg text-surface-900 dark:text-surface-50">
              {user?.name || 'Home Rescue User'}
            </h3>
            <p className="text-sm text-surface-500 dark:text-surface-400">{user?.email}</p>
            <button
              type="button"
              onClick={handleAvatarClick}
              disabled={isUploadingAvatar}
              className="mt-1 text-xs font-medium text-brand-600 dark:text-brand-400 hover:underline cursor-pointer"
            >
              {isUploadingAvatar ? 'Uploading...' : 'Change Photo'}
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
          <Input
            label="Full name"
            leftIcon={<User size={16} />}
            error={errors.name?.message}
            {...register('name', { required: 'Name is required' })}
          />
          <Input
            label="Email address"
            type="email"
            disabled
            leftIcon={<Mail size={16} />}
            error={errors.email?.message}
            {...register('email')}
          />
          <Input
            label="Phone number"
            leftIcon={<Phone size={16} />}
            error={errors.phone?.message}
            {...register('phone', { required: 'Phone is required' })}
          />
          <Select
            label="City"
            leftIcon={<MapPin size={16} />}
            options={[
              { label: 'Karachi', value: 'Karachi' },
              { label: 'Lahore', value: 'Lahore' },
              { label: 'Islamabad', value: 'Islamabad' },
              { label: 'Sukkur', value: 'Sukkur' },
              { label: 'Rawalpindi', value: 'Rawalpindi' },
            ]}
            error={errors.city?.message}
            {...register('city', { required: 'City is required' })}
          />

          <div className="pt-2">
            <Button type="submit" isLoading={isLoading} className="w-full sm:w-auto">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}