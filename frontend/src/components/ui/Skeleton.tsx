    import { cn } from '@/utils/cn';

    export function Skeleton({ className }: { className?: string }) {
    return <div className={cn('skeleton rounded-lg', className)} />;
    }

    export function WorkerCardSkeletonUI() {
    return (
        <div className="rounded-2xl border border-surface-100 dark:border-surface-800 p-5 space-y-4">
        <div className="flex items-center gap-3">
            <Skeleton className="h-14 w-14 rounded-full" />
            <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-3 w-1/3" />
            </div>
        </div>
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
        <div className="flex gap-2">
            <Skeleton className="h-8 w-20 rounded-lg" />
            <Skeleton className="h-8 w-20 rounded-lg" />
        </div>
        </div>
    );
    }