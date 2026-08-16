    import type { ReactNode } from 'react';
    import { cn } from '@/utils/cn';

    type BadgeVariant = 'brand' | 'success' | 'warning' | 'danger' | 'neutral' | 'info';

    const styles: Record<BadgeVariant, string> = {
    brand: 'bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300',
    success: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
    warning: 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
    danger: 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300',
    neutral: 'bg-surface-100 text-surface-700 dark:bg-surface-800 dark:text-surface-300',
    info: 'bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300',
    };

    export function Badge({
    children,
    variant = 'neutral',
    icon,
    className,
    }: {
    children: ReactNode;
    variant?: BadgeVariant;
    icon?: ReactNode;
    className?: string;
    }) {
    return (
        <span
        className={cn(
            'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold',
            styles[variant],
            className
        )}
        >
        {icon}
        {children}
        </span>
    );
    }