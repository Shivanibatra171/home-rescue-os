import { useState, useMemo } from 'react';
import toast from 'react-hot-toast';
import { BookingCard } from '@/components/booking/BookingCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { Modal } from '@/components/ui/Modal';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { RatingStars } from '@/components/ui/RatingStars';
import { cn } from '@/utils/cn';
import { dummyBookings } from '@/data/dummyBookings';
import type { BookingStatus } from '@/utils/constants';
import { Calendar } from 'lucide-react';

const tabs: { label: string; value: BookingStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Accepted', value: 'accepted' },
  { label: 'Completed', value: 'completed' },
  { label: 'Cancelled', value: 'cancelled' },
];

export default function BookingHistory() {
  const [activeTab, setActiveTab] = useState<BookingStatus | 'all'>('all');
  const [reviewBookingId, setReviewBookingId] = useState<string | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const filtered = useMemo(() => {
    if (activeTab === 'all') return dummyBookings;
    return dummyBookings.filter((b) => b.status === activeTab);
  }, [activeTab]);

  const submitReview = () => {
    toast.success('Review submitted!');
    setReviewBookingId(null);
    setComment('');
    setRating(5);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-surface-900 dark:text-surface-50">Booking history</h1>
        <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">Track and manage all your service requests.</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={cn(
              'shrink-0 rounded-xl px-4 py-2 text-sm font-medium transition-colors',
              activeTab === tab.value
                ? 'bg-brand-600 text-white'
                : 'border border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={<Calendar size={26} />} title="No bookings found" message="You don't have any bookings in this category yet." />
      ) : (
        <div className="space-y-3">
          {filtered.map((booking) => (
            <div key={booking.id}>
              <BookingCard booking={booking} viewerRole="user" />
              {booking.status === 'completed' && !booking.hasReview && (
                <button
                  onClick={() => setReviewBookingId(booking.id)}
                  className="mt-2 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
                >
                  + Leave a review for this job
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={!!reviewBookingId} onClose={() => setReviewBookingId(null)} title="Leave a review">
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-surface-700 dark:text-surface-300">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((r) => (
                <button key={r} onClick={() => setRating(r)}>
                  <RatingStars rating={r <= rating ? 5 : 0} size={24} showValue={false} />
                </button>
              ))}
            </div>
          </div>
          <Textarea label="Your feedback" placeholder="How was your experience?" value={comment} onChange={(e) => setComment(e.target.value)} />
          <Button className="w-full" onClick={submitReview}>Submit Review</Button>
        </div>
      </Modal>
    </div>
  );
}