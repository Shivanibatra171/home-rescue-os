import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Mail, Lock, User, Phone, HardHat } from 'lucide-react';
import toast from 'react-hot-toast';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { dummyCategories } from '@/data/dummyCategories';
import { ROUTES } from '@/utils/constants';

interface WorkerRegisterForm {
  name: string;
  email: string;
  phone: string;
  city: string;
  category: string;
  password: string;
}

export default function WorkerRegister() {
  const navigate = useNavigate();
  const { registerWorker } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WorkerRegisterForm>();

  const onSubmit = async (data: WorkerRegisterForm) => {
    setIsLoading(true);
    try {
      const payload = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        city: data.city,
        area: 'Central',
        hourlyRate: 800,
        primaryCategory: data.category,
        password: data.password,
        cnic: '42101-' + Math.floor(1000000 + Math.random() * 9000000) + '-1',
      };
      await registerWorker(payload);
      toast.success('Application submitted! Await verification.');
      navigate(ROUTES.WORKER_DASHBOARD);
    } catch (err: any) {
      console.error('Worker register error:', err);
      toast.error(err.response?.data?.message || 'Worker registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-brand-50 dark:bg-brand-950 px-3 py-1 text-xs font-semibold text-brand-700 dark:text-brand-400">
        <HardHat size={12} /> Worker Portal
      </div>
      <h1 className="font-display text-2xl font-bold text-surface-900 dark:text-surface-50">Join as a professional</h1>
      <p className="mt-2 text-sm text-surface-500 dark:text-surface-400">
        Get job requests near you and grow your business.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
        <Input
          label="Full name"
          placeholder="Imran Baig"
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
          placeholder="+92 301 2345678"
          leftIcon={<Phone size={16} />}
          error={errors.phone?.message}
          {...register('phone', { required: 'Phone number is required' })}
        />
        <Select
          label="City"
          placeholder="Select your city"
          options={[
            { label: 'Karachi', value: 'Karachi' },
            { label: 'Lahore', value: 'Lahore' },
            { label: 'Islamabad', value: 'Islamabad' },
          ]}
          error={errors.city?.message}
          {...register('city', { required: 'City is required' })}
        />
        <Select
          label="Primary skill category"
          placeholder="Select your main skill"
          options={dummyCategories.map((c) => ({ label: c.name, value: c.slug }))}
          error={errors.category?.message}
          {...register('category', { required: 'Please select a category' })}
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
          Submit Application
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-surface-500 dark:text-surface-400">
        Already registered?{' '}
        <Link to={ROUTES.WORKER_LOGIN} className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}