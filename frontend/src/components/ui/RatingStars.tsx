    import { Star } from 'lucide-react';
    import { cn } from '@/utils/cn';

    export function RatingStars({
    rating,
    size = 16,
    showValue = true,
    reviewCount,
    }: {
    rating: number;
    size?: number;
    showValue?: boolean;
    reviewCount?: number;
    }) {
    return (
        <div className="flex items-center gap-1">
        <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((i) => (
            <Star
                key={i}
                size={size}
                className={cn(
                i <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'fill-surface-200 text-surface-200 dark:fill-surface-700 dark:text-surface-700'
                )}
            />
            ))}
        </div>
        {showValue && <span className="text-sm font-semibold text-surface-800 dark:text-surface-100">{rating.toFixed(1)}</span>}
        {reviewCount !== undefined && <span className="text-sm text-surface-500 dark:text-surface-400">({reviewCount})</span>}
        </div>
    );
    }