import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Camera, User, Mail, Phone, MapPin, Briefcase, X, Plus, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useAuth } from '@/hooks/useAuth';
import { dummyCategories } from '@/data/dummyCategories';
import { uploadService } from '@/services/upload.service';
import { workerService } from '@/services/worker.service';

interface WorkerProfileForm {
  name: string;
  email: string;
  phone: string;
  city: string;
  area: string;
  hourlyRate: number;
  bio: string;
}

export default function ProfileEdit() {
  const { user, login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [skills, setSkills] = useState<string[]>((user as any)?.skills || ['Pipe Repair', 'Leak Detection', 'Tap Fitting']);
  const [skillInput, setSkillInput] = useState('');
  const [categories, setCategories] = useState<string[]>((user as any)?.categories || [(user as any)?.primaryCategory || 'plumber']);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WorkerProfileForm>({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      city: user?.city || 'Karachi',
      area: (user as any)?.area || 'Gulshan-e-Iqbal',
      hourlyRate: (user as any)?.hourlyRate || 800,
      bio: (user as any)?.bio || 'Experienced home service professional with verified track record.',
    },
  });

  const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    user?.name || 'Worker'
  )}&background=0284c7&color=fff&size=200&bold=true`;

  const currentAvatar = user?.avatar?.trim() ? user.avatar : defaultAvatar;

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    setIsUploadingAvatar(true);
    const loadingToast = toast.loading('Uploading worker picture...');

    try {
      const uploadRes = await uploadService.uploadImage(file);
      const payload = uploadRes.data || uploadRes;
      const imageUrl = payload.url || payload.secure_url;

      if (!imageUrl) throw new Error('Image URL not received');

      await workerService.updateProfile({ avatar: imageUrl });
      await login({ ...user, avatar: imageUrl });

      toast.success('Worker photo updated successfully!', { id: loadingToast });
    } catch (err: any) {
      console.error('Worker photo upload error:', err);
      toast.error(err.response?.data?.message || 'Failed to upload photo', { id: loadingToast });
    } finally {
      setIsUploadingAvatar(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills((prev) => [...prev, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
  };

  const toggleCategory = (slug: string) => {
    setCategories((prev) => (prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug]));
  };

  const onSubmit = async (data: WorkerProfileForm) => {
    setIsLoading(true);
    try {
      const payload = {
        ...data,
        skills,
        categories,
      };
      await workerService.updateProfile(payload);
      await login({ ...user, ...payload });
      toast.success('Profile updated successfully!');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-surface-900 dark:text-surface-50">Edit profile</h1>
        <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">Keep your details updated to get more job requests.</p>
      </div>

      <div className="rounded-2xl border border-surface-100 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 shadow-sm">
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
                  alt={user?.name || 'Worker Photo'}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = defaultAvatar;
                  }}
                />
              )}
            </div>
            <button
              type="button"
              onClick={handleAvatarClick}
              disabled={isUploadingAvatar}
              title="Upload worker photo"
              className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 hover:bg-brand-700 active:scale-95 text-white ring-2 ring-white dark:ring-surface-900 shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              {isUploadingAvatar ? <Loader2 size={14} className="animate-spin" /> : <Camera size={14} />}
            </button>
          </div>
          <div>
            <h3 className="font-display font-semibold text-lg text-surface-900 dark:text-surface-50">{user?.name || 'Worker Profile'}</h3>
            <p className="text-sm text-surface-400">{(user as any)?.primaryCategory || 'Professional Service Provider'}</p>
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input label="Full name" leftIcon={<User size={16} />} error={errors.name?.message} {...register('name', { required: 'Name is required' })} />
            <Input label="Email address" type="email" disabled leftIcon={<Mail size={16} />} error={errors.email?.message} {...register('email')} />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input label="Phone number" leftIcon={<Phone size={16} />} error={errors.phone?.message} {...register('phone', { required: 'Phone is required' })} />
            <Input label="Hourly rate (PKR)" type="number" leftIcon={<Briefcase size={16} />} error={errors.hourlyRate?.message} {...register('hourlyRate', { required: 'Rate is required', min: { value: 100, message: 'Minimum rate is Rs. 100' } })} />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Select label="City" placeholder="Select city" options={[{ label: 'Karachi', value: 'Karachi' }, { label: 'Lahore', value: 'Lahore' }, { label: 'Islamabad', value: 'Islamabad' }]} error={errors.city?.message} {...register('city', { required: 'City is required' })} />
            <Input label="Area" leftIcon={<MapPin size={16} />} error={errors.area?.message} {...register('area', { required: 'Area is required' })} />
          </div>
          <Textarea label="Bio" placeholder="Tell customers about your experience..." error={errors.bio?.message} {...register('bio', { required: 'Bio is required' })} />

          <div>
            <label className="mb-2 block text-sm font-medium text-surface-700 dark:text-surface-300">Skills</label>
            <div className="flex gap-2">
              <Input
                placeholder="Add a skill..."
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); } }}
              />
              <Button type="button" variant="outline" size="md" onClick={addSkill}><Plus size={16} /></Button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge key={skill} variant="brand">
                  {skill}
                  <button type="button" onClick={() => removeSkill(skill)}><X size={11} /></button>
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-surface-700 dark:text-surface-300">Service categories</label>
            <div className="flex flex-wrap gap-2">
              {dummyCategories.map((cat) => (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => toggleCategory(cat.slug)}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                    categories.includes(cat.slug)
                      ? 'border-brand-500 bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-400'
                      : 'border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-300'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <Button type="submit" isLoading={isLoading} className="w-full sm:w-auto">Save Changes</Button>
          </div>
        </form>
      </div>
    </div>
  );
}