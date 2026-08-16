    import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
    import { cn } from '@/utils/cn';

    interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    }

    export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, leftIcon, rightIcon, className, id, ...props }, ref) => {
        const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
        return (
        <div className="w-full">
            {label && (
            <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-surface-700 dark:text-surface-300">
                {label}
            </label>
            )}
            <div className="relative">
            {leftIcon && <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400">{leftIcon}</span>}
            <input
                ref={ref}
                id={inputId}
                className={cn(
                'h-11 w-full rounded-xl border bg-white dark:bg-surface-900 px-4 text-sm text-surface-900 dark:text-surface-50 placeholder:text-surface-400 transition-colors focus-ring',
                leftIcon && 'pl-10',
                rightIcon && 'pr-10',
                error ? 'border-red-400' : 'border-surface-200 dark:border-surface-700',
                className
                )}
                {...props}
            />
            {rightIcon && <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-surface-400">{rightIcon}</span>}
            </div>
            {error && <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>}
        </div>
        );
    }
    );
    Input.displayName = 'Input';