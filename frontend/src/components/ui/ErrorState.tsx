    import { AlertTriangle } from 'lucide-react';
    import { Button } from './Button';

    export function ErrorState({
    title = 'Something went wrong',
    message = 'We could not load this content. Please try again.',
    onRetry,
    }: {
    title?: string;
    message?: string;
    onRetry?: () => void;
    }) {
    return (
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-red-100 dark:border-red-900/40 bg-red-50/50 dark:bg-red-950/20 py-16 px-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/40 text-red-500">
            <AlertTriangle size={28} />
        </div>
        <div>
            <h3 className="font-display font-semibold text-surface-900 dark:text-surface-50">{title}</h3>
            <p className="mt-1 max-w-sm text-sm text-surface-500 dark:text-surface-400">{message}</p>
        </div>
        {onRetry && (
            <Button size="sm" variant="outline" onClick={onRetry}>
            Try again
            </Button>
        )}
        </div>
    );
    }