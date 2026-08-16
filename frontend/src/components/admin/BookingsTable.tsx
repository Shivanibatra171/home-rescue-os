import { Badge } from '@/components/ui/Badge';
import { formatDate, formatTime } from '@/utils/formatDate';
import { formatCurrency } from '@/utils/formatCurrency';
import type { Booking } from '@/types';

const statusVariant: Record<Booking['status'], 'success' | 'warning' | 'danger' | 'info' | 'neutral'> = {
  pending: 'warning', accepted: 'info', in_progress: 'info', completed: 'success', cancelled: 'neutral', rejected: 'danger',
};

export function BookingsTable({ bookings }: { bookings: Booking[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-surface-100 dark:border-surface-800 bg-white dark:bg-surface-900">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-surface-100 dark:border-surface-800 text-xs text-surface-400">
            <th className="p-4 font-medium">Customer</th>
            <th className="p-4 font-medium">Worker</th>
            <th className="p-4 font-medium">Category</th>
            <th className="p-4 font-medium">Date</th>
            <th className="p-4 font-medium">Amount</th>
            <th className="p-4 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id} className="border-b border-surface-50 dark:border-surface-800/50 last:border-0">
              <td className="p-4 font-medium text-surface-800 dark:text-surface-100">{b.userName}</td>
              <td className="p-4 text-surface-500 dark:text-surface-400">{b.workerName}</td>
              <td className="p-4 text-surface-500 dark:text-surface-400">{b.category}</td>
              <td className="p-4 text-surface-500 dark:text-surface-400">{formatDate(b.scheduledDate)} · {formatTime(b.scheduledTime)}</td>
              <td className="p-4 font-semibold text-brand-600 dark:text-brand-400">{formatCurrency(b.price)}</td>
              <td className="p-4"><Badge variant={statusVariant[b.status]}>{b.status.replace('_', ' ')}</Badge></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}