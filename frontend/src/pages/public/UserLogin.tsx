import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/utils/constants';

interface LoginForm {
  email: string;
  password: string;
}

export default function UserLogin() {
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
      const user = await login(data);
      toast.success('Welcome back!');
      
      const role = user?.role || (data.email.includes('admin') ? 'admin' : 'user');
      if (role === 'admin') {
        navigate(ROUTES.ADMIN_DASHBOARD);
      } else if (role === 'worker') {
        navigate(ROUTES.WORKER_DASHBOARD);
      } else {
        navigate(ROUTES.USER_DASHBOARD);
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-surface-900 dark:text-surface-50">Welcome back</h1>
      <p className="mt-2 text-sm text-surface-500 dark:text-surface-400">
        Log in to book services and manage your home repairs.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
        <Input
          label="Email address"
          type="email"
          placeholder="you@example.com"
          leftIcon={<Mail size={16} />}
          error={errors.email?.message}
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
          })}
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
          {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'At least 6 characters' } })}
        />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-surface-500 dark:text-surface-400">
            <input type="checkbox" className="rounded border-surface-300 text-brand-600 focus-ring" />
            Remember me
          </label>
          <Link to="#" className="font-medium text-brand-600 dark:text-brand-400 hover:underline">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
          Log In
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-surface-500 dark:text-surface-400">
        Don't have an account?{' '}
        <Link to={ROUTES.USER_REGISTER} className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">
          Sign up
        </Link>
      </p>
      <p className="mt-3 text-center text-sm text-surface-400">
        Are you a professional?{' '}
        <Link to={ROUTES.WORKER_LOGIN} className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">
          Worker login
        </Link>
      </p>
    </div>
  );
}