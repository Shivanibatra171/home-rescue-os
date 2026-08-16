import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { formatDate, formatTime } from '@/utils/formatDate';
import { formatCurrency } from '@/utils/formatCurrency';
import type { Booking } from '@/types';
import { cn } from '@/utils/cn';

const statusConfig: Record<Booking['status'], { label: string; variant: 'success' | 'warning' | 'danger' | 'info' | 'neutral' }> = {
  pending: { label: 'Pending', variant: 'warning' },
  accepted: { label: 'Accepted', variant: 'info' },
  in_progress: { label: 'In Progress', variant: 'info' },
  completed: { label: 'Completed', variant: 'success' },
  cancelled: { label: 'Cancelled', variant: 'neutral' },
  rejected: { label: 'Rejected', variant: 'danger' },
};

export function BookingCard({
  booking,
  viewerRole,
  onAccept,
  onReject,
  onComplete,
}: {
  booking: Booking;
  viewerRole: 'user' | 'worker';
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
  onComplete?: (id: string) => void;
}) {
  const status = statusConfig[booking.status];
  const displayName = viewerRole === 'user' ? booking.workerName : booking.userName;
  const displayAvatar = viewerRole === 'user' ? booking.workerAvatar : `https://i.pravatar.cc/150?u=${booking.userId}`;

  return (
    <div className={cn('rounded-2xl border bg-white dark:bg-surface-900 p-5', booking.isEmergency ? 'border-red-200 dark:border-red-900/50' : 'border-surface-100 dark:border-surface-800')}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <img src={displayAvatar} alt={displayName} className="h-12 w-12 rounded-full object-cover" />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-semibold text-surface-900 dark:text-surface-50">{displayName}</h3>
              {booking.isEmergency && <Badge variant="danger">Emergency</Badge>}
            </div>
            <p className="text-xs text-surface-400">{booking.category}</p>
          </div>
        </div>
        <Badge variant={status.variant}>{status.label}</Badge>
      </div>

      <p className="mt-3 line-clamp-2 text-sm text-surface-600 dark:text-surface-300">{booking.problemDescription}</p>

      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-surface-500 dark:text-surface-400">
        <span className="flex items-center gap-1.5"><Calendar size={13} /> {formatDate(booking.scheduledDate)}</span>
        <span className="flex items-center gap-1.5"><Clock size={13} /> {formatTime(booking.scheduledTime)}</span>
        <span className="flex items-center gap-1.5 truncate max-w-[180px]"><MapPin size={13} /> {booking.address}</span>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-surface-100 dark:border-surface-800 pt-4">
        <span className="font-display font-bold text-surface-900 dark:text-surface-50">{formatCurrency(booking.price)}</span>

        {viewerRole === 'worker' && booking.status === 'pending' && (
          <div className="flex gap-2">
            <button onClick={() => onReject?.(booking.id)} className="rounded-lg border border-surface-200 dark:border-surface-700 px-3 py-1.5 text-xs font-semibold text-surface-600 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800">
              Reject
            </button>
            <button onClick={() => onAccept?.(booking.id)} className="rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-700">
              Accept
            </button>
          </div>
        )}

        {viewerRole === 'worker' && booking.status === 'accepted' && (
          <button onClick={() => onComplete?.(booking.id)} className="rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-700">
            Mark Complete
          </button>
        )}

        {viewerRole === 'user' && booking.status === 'completed' && !booking.hasReview && (
          <Link to={ROUTES_BOOKING_HISTORY} className="flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400">
            Leave a review <ChevronRight size={13} />
          </Link>
        )}
      </div>
    </div>
  );
}

const ROUTES_BOOKING_HISTORY = '/dashboard/bookings';