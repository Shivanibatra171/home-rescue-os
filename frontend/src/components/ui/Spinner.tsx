    import { Loader2 } from 'lucide-react';
    import { cn } from '@/utils/cn';

    export function Spinner({ size = 24, className }: { size?: number; className?: string }) {
    return <Loader2 style={{ width: size, height: size }} className={cn('animate-spin text-brand-500', className)} />;
    }

    export function FullPageSpinner() {
    return (
        <div className="flex h-[60vh] w-full items-center justify-center">
        <Spinner size={36} />
        </div>
    );
    }