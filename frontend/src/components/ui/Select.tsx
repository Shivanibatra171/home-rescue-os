    import { forwardRef, type SelectHTMLAttributes } from 'react';
    import { ChevronDown } from 'lucide-react';
    import { cn } from '@/utils/cn';

    interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: { label: string; value: string }[];
    placeholder?: string;
    }

    export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, error, options, placeholder, className, id, ...props }, ref) => {
        const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');
        return (
        <div className="w-full">
            {label && (
            <label htmlFor={selectId} className="mb-1.5 block text-sm font-medium text-surface-700 dark:text-surface-300">
                {label}
            </label>
            )}
            <div className="relative">
            <select
                ref={ref}
                id={selectId}
                className={cn(
                'h-11 w-full appearance-none rounded-xl border bg-white dark:bg-surface-900 px-4 pr-10 text-sm text-surface-900 dark:text-surface-50 transition-colors focus-ring',
                error ? 'border-red-400' : 'border-surface-200 dark:border-surface-700',
                className
                )}
                {...props}
            >
                {placeholder && <option value="">{placeholder}</option>}
                {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
                ))}
            </select>
            <ChevronDown size={16} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-surface-400" />
            </div>
            {error && <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>}
        </div>
        );
    }
    );
    Select.displayName = 'Select';