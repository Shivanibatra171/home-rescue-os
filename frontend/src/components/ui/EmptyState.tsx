    import type { ReactNode } from 'react';
    import { Inbox } from 'lucide-react';
    import { Button } from './Button';

    export function EmptyState({
    icon,
    title,
    message,
    actionLabel,
    onAction,
    }: {
    icon?: ReactNode;
    title: string;
    message: string;
    actionLabel?: string;
    onAction?: () => void;
    }) {
    return (
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-surface-200 dark:border-surface-700 py-16 px-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-100 dark:bg-surface-800 text-surface-400">
            {icon ?? <Inbox size={28} />}
        </div>
        <div>
            <h3 className="font-display font-semibold text-surface-900 dark:text-surface-50">{title}</h3>
            <p className="mt-1 max-w-sm text-sm text-surface-500 dark:text-surface-400">{message}</p>
        </div>
        {actionLabel && onAction && (
            <Button size="sm" onClick={onAction}>
            {actionLabel}
            </Button>
        )}
        </div>
    );
    }