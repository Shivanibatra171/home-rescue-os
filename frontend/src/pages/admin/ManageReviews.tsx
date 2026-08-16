import { useState } from 'react';
import toast from 'react-hot-toast';
import { Trash2 } from 'lucide-react';
import { RatingStars } from '@/components/ui/RatingStars';
import { EmptyState } from '@/components/ui/EmptyState';
import { timeAgo } from '@/utils/formatDate';
import { dummyReviews } from '@/data/dummyReviews';
import { dummyWorkers } from '@/data/dummyWorkers';

export default function ManageReviews() {
  const [reviews, setReviews] = useState(dummyReviews);

  const workerName = (id: string) => dummyWorkers.find((w) => w.id === id)?.name ?? 'Unknown';

  const handleDelete = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    toast.success('Review removed');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-surface-900 dark:text-surface-50">Manage reviews</h1>
        <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">{reviews.length} reviews across the platform</p>
      </div>

      {reviews.length === 0 ? (
        <EmptyState title="No reviews yet" message="Reviews will appear here once customers rate their jobs." />
      ) : (
        <div className="space-y-3">
          {reviews.map((review) => (
            <div key={review.id} className="flex items-start gap-4 rounded-2xl border border-surface-100 dark:border-surface-800 bg-white dark:bg-surface-900 p-5">
              <img src={review.userAvatar} alt={review.userName} className="h-10 w-10 rounded-full object-cover" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-semibold text-surface-900 dark:text-surface-50">{review.userName}</span>
                    <span className="text-xs text-surface-400"> reviewed {workerName(review.workerId)}</span>
                  </div>
                  <button onClick={() => handleDelete(review.id)} className="rounded-lg p-1.5 text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30">
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="mt-1"><RatingStars rating={review.rating} size={13} showValue={false} /></div>
                <p className="mt-2 text-sm text-surface-600 dark:text-surface-300">{review.comment}</p>
                <p className="mt-1 text-xs text-surface-400">{timeAgo(review.createdAt)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}