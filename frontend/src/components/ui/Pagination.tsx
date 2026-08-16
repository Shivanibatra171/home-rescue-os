    import { ChevronLeft, ChevronRight } from 'lucide-react';
    import { cn } from '@/utils/cn';

    export function Pagination({
    page,
    totalPages,
    onPageChange,
    }: {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    }) {
    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex items-center justify-center gap-1.5">
        <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-300 disabled:opacity-40 hover:bg-surface-50 dark:hover:bg-surface-800 focus-ring"
        >
            <ChevronLeft size={16} />
        </button>
        {pages.map((p) => (
            <button
            key={p}
            onClick={() => onPageChange(p)}
            className={cn(
                'h-9 w-9 rounded-lg text-sm font-medium transition-colors focus-ring',
                p === page
                ? 'bg-brand-600 text-white'
                : 'border border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800'
            )}
            >
            {p}
            </button>
        ))}
        <button
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-300 disabled:opacity-40 hover:bg-surface-50 dark:hover:bg-surface-800 focus-ring"
        >
            <ChevronRight size={16} />
        </button>
        </div>
    );
    }