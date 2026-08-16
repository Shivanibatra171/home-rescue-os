import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Mail, Lock, Eye, EyeOff, HardHat } from 'lucide-react';
import toast from 'react-hot-toast';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/utils/constants';

interface LoginForm {
  email: string;
  password: string;
}

export default function WorkerLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    try {
      await login(data);
      toast.success('Welcome back!');
      navigate(ROUTES.WORKER_DASHBOARD);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-brand-50 dark:bg-brand-950 px-3 py-1 text-xs font-semibold text-brand-700 dark:text-brand-400">
        <HardHat size={12} /> Worker Portal
      </div>
      <h1 className="font-display text-2xl font-bold text-surface-900 dark:text-surface-50">Worker log in</h1>
      <p className="mt-2 text-sm text-surface-500 dark:text-surface-400">
        Access your job requests, schedule, and earnings.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
        <Input
          label="Email address"
          type="email"
          placeholder="you@example.com"
          leftIcon={<Mail size={16} />}
          error={errors.email?.message}
          {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' } })}
        />
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          leftIcon={<Lock size={16} />}
          rightIcon={
            <button type="button" onClick={() => setShowPassword((p) => !p)} className="pointer-events-auto">
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          }
          error={errors.password?.message}
          {...register('password', { required: 'Password is required' })}
        />
        <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
          Log In
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-surface-500 dark:text-surface-400">
        New to Home Rescue OS?{' '}
        <Link to={ROUTES.WORKER_REGISTER} className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">
          Register as a worker
        </Link>
      </p>
      <p className="mt-3 text-center text-sm text-surface-400">
        Looking to book a service?{' '}
        <Link to={ROUTES.USER_LOGIN} className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">
          User login
        </Link>
      </p>
    </div>
  );
}