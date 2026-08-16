    import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
    import { motion, type HTMLMotionProps } from 'framer-motion';
    import { Loader2 } from 'lucide-react';
    import { cn } from '@/utils/cn';

    type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'accent';
    type Size = 'sm' | 'md' | 'lg' | 'icon';

    interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart'> {
    variant?: Variant;
    size?: Size;
    isLoading?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    motionProps?: HTMLMotionProps<'button'>;
    }

    const variantStyles: Record<Variant, string> = {
    primary: 'bg-brand-600 text-white hover:bg-brand-700 shadow-soft',
    secondary: 'bg-surface-100 text-surface-900 hover:bg-surface-200 dark:bg-surface-800 dark:text-surface-50 dark:hover:bg-surface-700',
    outline: 'border border-surface-200 dark:border-surface-700 text-surface-900 dark:text-surface-50 hover:bg-surface-50 dark:hover:bg-surface-800',
    ghost: 'text-surface-700 dark:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-800',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    accent: 'bg-accent-500 text-white hover:bg-accent-600 shadow-soft',
    };

    const sizeStyles: Record<Size, string> = {
    sm: 'h-9 px-3.5 text-sm gap-1.5',
    md: 'h-11 px-5 text-sm gap-2',
    lg: 'h-13 px-7 text-base gap-2.5',
    icon: 'h-10 w-10',
    };

    export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
        return (
        <motion.button
            ref={ref}
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: disabled || isLoading ? 1 : 1.015 }}
            transition={{ duration: 0.15 }}
            disabled={disabled || isLoading}
            className={cn(
            'inline-flex items-center justify-center rounded-xl font-semibold transition-colors duration-200 focus-ring disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap',
            variantStyles[variant],
            sizeStyles[size],
            className
            )}
            {...(props as HTMLMotionProps<'button'>)}
        >
            {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
            leftIcon
            )}
            {children}
            {!isLoading && rightIcon}
        </motion.button>
        );
    }
    );
    Button.displayName = 'Button';