    import { Badge } from './Badge';
    import { cn } from '@/utils/cn';

    export function AvailabilityBadge({ isAvailableNow }: { isAvailableNow: boolean }) {
    return (
        <Badge variant={isAvailableNow ? 'success' : 'neutral'} className="gap-1.5">
        <span
            className={cn(
            'h-1.5 w-1.5 rounded-full',
            isAvailableNow ? 'bg-emerald-500 animate-pulse' : 'bg-surface-400'
            )}
        />
        {isAvailableNow ? 'Available now' : 'Unavailable'}
        </Badge>
    );
    }