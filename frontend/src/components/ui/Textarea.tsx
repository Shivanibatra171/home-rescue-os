    import { forwardRef, type TextareaHTMLAttributes } from 'react';
    import { cn } from '@/utils/cn';

    interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    }

    export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ label, error, className, id, ...props }, ref) => {
        const areaId = id || label?.toLowerCase().replace(/\s+/g, '-');
        return (
        <div className="w-full">
            {label && (
            <label htmlFor={areaId} className="mb-1.5 block text-sm font-medium text-surface-700 dark:text-surface-300">
                {label}
            </label>
            )}
            <textarea
            ref={ref}
            id={areaId}
            rows={4}
            className={cn(
                'w-full rounded-xl border bg-white dark:bg-surface-900 px-4 py-3 text-sm text-surface-900 dark:text-surface-50 placeholder:text-surface-400 transition-colors focus-ring resize-none',
                error ? 'border-red-400' : 'border-surface-200 dark:border-surface-700',
                className
            )}
            {...props}
            />
            {error && <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>}
        </div>
        );
    }
    );
    Textarea.displayName = 'Textarea';