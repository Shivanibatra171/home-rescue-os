import { Star } from 'lucide-react';
import { ReviewCard } from '@/components/review/ReviewCard';
import { RatingStars } from '@/components/ui/RatingStars';
import { EmptyState } from '@/components/ui/EmptyState';
import { dummyReviews } from '@/data/dummyReviews';
import { dummyWorkers } from '@/data/dummyWorkers';

export default function Reviews() {
  const worker = dummyWorkers[0];
  const reviews = dummyReviews.filter((r) => r.workerId === worker.id);

  const ratingBreakdown = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
    percentage: reviews.length ? (reviews.filter((r) => r.rating === star).length / reviews.length) * 100 : 0,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-surface-900 dark:text-surface-50">Your reviews</h1>
        <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">See what customers are saying about your work.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 rounded-2xl border border-surface-100 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 sm:grid-cols-2">
        <div className="flex flex-col items-center justify-center text-center">
          <span className="font-display text-5xl font-bold text-surface-900 dark:text-surface-50">{worker.rating.toFixed(1)}</span>
          <RatingStars rating={worker.rating} showValue={false} size={20} />
          <p className="mt-2 text-sm text-surface-400">Based on {worker.reviewCount} reviews</p>
        </div>
        <div className="space-y-2">
          {ratingBreakdown.map((r) => (
            <div key={r.star} className="flex items-center gap-3">
              <span className="flex w-10 items-center gap-1 text-xs text-surface-500">{r.star} <Star size={11} className="fill-amber-400 text-amber-400" /></span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-100 dark:bg-surface-800">
                <div className="h-full rounded-full bg-amber-400" style={{ width: `${r.percentage}%` }} />
              </div>
              <span className="w-6 text-right text-xs text-surface-400">{r.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-surface-100 dark:border-surface-800 bg-white dark:bg-surface-900 p-6">
        {reviews.length === 0 ? (
          <EmptyState title="No reviews yet" message="Complete jobs to start receiving reviews." />
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => <ReviewCard key={review.id} review={review} />)}
          </div>
        )}
      </div>
    </div>
  );
}