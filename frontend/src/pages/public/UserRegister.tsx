import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Mail, Lock, User, Phone, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/utils/constants';

interface RegisterForm {
  name: string;
  email: string;
  phone: string;
  city: string;
  password: string;
}

export default function UserRegister() {
  const navigate = useNavigate();
  const { register: registerAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>();

  const onSubmit = async (data: RegisterForm) => {
    setIsLoading(true);
    try {
      await registerAuth(data);
      toast.success('Account created successfully!');
      navigate(ROUTES.USER_DASHBOARD);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-surface-900 dark:text-surface-50">Create your account</h1>
      <p className="mt-2 text-sm text-surface-500 dark:text-surface-400">
        Sign up to start booking trusted home service professionals.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
        <Input
          label="Full name"
          placeholder="Ali Hamza"
          leftIcon={<User size={16} />}
          error={errors.name?.message}
          {...register('name', { required: 'Name is required' })}
        />
        <Input
          label="Email address"
          type="email"
          placeholder="you@example.com"
          leftIcon={<Mail size={16} />}
          error={errors.email?.message}
          {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' } })}
        />
        <Input
          label="Phone number"
          placeholder="+92 300 1234567"
          leftIcon={<Phone size={16} />}
          error={errors.phone?.message}
          {...register('phone', { required: 'Phone number is required' })}
        />
        <Select
          label="City"
          leftIcon={undefined}
          placeholder="Select your city"
          options={[
            { label: 'Karachi', value: 'Karachi' },
            { label: 'Lahore', value: 'Lahore' },
            { label: 'Islamabad', value: 'Islamabad' },
          ]}
          error={errors.city?.message}
          {...register('city', { required: 'City is required' })}
        />
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          leftIcon={<Lock size={16} />}
          error={errors.password?.message}
          {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'At least 6 characters' } })}
        />

        <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
          Create Account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-surface-500 dark:text-surface-400">
        Already have an account?{' '}
        <Link to={ROUTES.USER_LOGIN} className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">
          Log in
        </Link>
      </p>
      <p className="mt-3 text-center text-sm text-surface-400">
        Want to work as a pro?{' '}
        <Link to={ROUTES.WORKER_REGISTER} className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">
          <MapPin size={12} className="inline" /> Register as worker
        </Link>
      </p>
    </div>
  );
}