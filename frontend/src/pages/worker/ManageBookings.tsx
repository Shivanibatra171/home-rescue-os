import { useState, useMemo } from 'react';
import toast from 'react-hot-toast';
import { BookingCard } from '@/components/booking/BookingCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { cn } from '@/utils/cn';
import { dummyBookings } from '@/data/dummyBookings';
import type { BookingStatus } from '@/utils/constants';
import type { Booking } from '@/types';
import { Briefcase } from 'lucide-react';

const tabs: { label: string; value: BookingStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Accepted', value: 'accepted' },
  { label: 'Completed', value: 'completed' },
];

export default function ManageBookings() {
  const [bookings, setBookings] = useState<Booking[]>(dummyBookings);
  const [activeTab, setActiveTab] = useState<BookingStatus | 'all'>('all');

  const filtered = useMemo(() => {
    if (activeTab === 'all') return bookings;
    return bookings.filter((b) => b.status === activeTab);
  }, [bookings, activeTab]);

  const updateStatus = (id: string, status: BookingStatus, message: string) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    toast.success(message);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-surface-900 dark:text-surface-50">Manage bookings</h1>
        <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">Accept, reject, and track your jobs.</p>
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
        <EmptyState icon={<Briefcase size={26} />} title="No bookings found" message="Nothing in this category yet." />
      ) : (
        <div className="space-y-3">
          {filtered.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              viewerRole="worker"
              onAccept={(id) => updateStatus(id, 'accepted', 'Booking accepted')}
              onReject={(id) => updateStatus(id, 'rejected', 'Booking rejected')}
              onComplete={(id) => updateStatus(id, 'completed', 'Job marked as complete')}
            />
          ))}
        </div>
      )}
    </div>
  );
}