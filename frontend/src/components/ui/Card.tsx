    import type { HTMLAttributes, ReactNode } from 'react';
    import { cn } from '@/utils/cn';

    interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    hover?: boolean;
    glass?: boolean;
    }

    export function Card({ children, className, hover = false, glass = false, ...props }: CardProps) {
    return (
        <div
        className={cn(
            'rounded-2xl border border-surface-100 dark:border-surface-800 bg-white dark:bg-surface-900 shadow-soft',
            glass && 'glass-card border-transparent',
            hover && 'card-hover cursor-pointer',
            className
        )}
        {...props}
        >
        {children}
        </div>
    );
    }

    export function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
    return <div className={cn('p-5 pb-0', className)}>{children}</div>;
    }

    export function CardBody({ children, className }: { children: ReactNode; className?: string }) {
    return <div className={cn('p-5', className)}>{children}</div>;
    }

    export function CardFooter({ children, className }: { children: ReactNode; className?: string }) {
    return <div className={cn('p-5 pt-0', className)}>{children}</div>;
    }