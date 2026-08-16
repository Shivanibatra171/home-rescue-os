import { RatingStars } from '@/components/ui/RatingStars';
import { timeAgo } from '@/utils/formatDate';
import type { Review } from '@/types';

export function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="border-b border-surface-100 dark:border-surface-800 pb-4 last:border-0 last:pb-0">
      <div className="flex items-start gap-3">
        <img src={review.userAvatar} alt={review.userName} className="h-10 w-10 rounded-full object-cover" />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-surface-900 dark:text-surface-50">{review.userName}</h4>
            <span className="text-xs text-surface-400">{timeAgo(review.createdAt)}</span>
          </div>
          <div className="mt-1"><RatingStars rating={review.rating} size={13} showValue={false} /></div>
          <p className="mt-2 text-sm text-surface-600 dark:text-surface-300">{review.comment}</p>
          {review.workerReply && (
            <div className="mt-3 rounded-lg bg-surface-50 dark:bg-surface-800 p-3 text-xs text-surface-600 dark:text-surface-300">
              <span className="font-semibold text-surface-900 dark:text-surface-50">Worker reply: </span>
              {review.workerReply}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}