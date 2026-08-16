import { Users, HardHat, Briefcase, Wallet } from 'lucide-react';
import { AdminStatsCard } from '@/components/admin/StatsCard';
import { BookingCard } from '@/components/booking/BookingCard';
import { ReviewCard } from '@/components/review/ReviewCard';
import { dummyUsers } from '@/data/dummyUsers';
import { dummyWorkers } from '@/data/dummyWorkers';
import { dummyBookings } from '@/data/dummyBookings';
import { dummyReviews } from '@/data/dummyReviews';
import { formatCurrency } from '@/utils/formatCurrency';

export default function AdminDashboard() {
  const totalRevenue = dummyBookings.filter((b) => b.status === 'completed').reduce((sum, b) => sum + b.price, 0);
  const latestBookings = dummyBookings.slice(0, 3);
  const latestReviews = dummyReviews.slice(0, 2);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-surface-900 dark:text-surface-50">Admin overview</h1>
        <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">Platform activity at a glance.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatsCard icon={Users} label="Total users" value={dummyUsers.length} color="#38bdf8" change={{ value: '+12%', isPositive: true }} />
        <AdminStatsCard icon={HardHat} label="Total workers" value={dummyWorkers.length} color="#1fa76b" change={{ value: '+8%', isPositive: true }} />
        <AdminStatsCard icon={Briefcase} label="Total bookings" value={dummyBookings.length} color="#f0b429" change={{ value: '+23%', isPositive: true }} />
        <AdminStatsCard icon={Wallet} label="Monthly revenue" value={formatCurrency(totalRevenue)} color="#8b5cf6" change={{ value: '+15%', isPositive: true }} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-lg font-semibold text-surface-900 dark:text-surface-50">Latest bookings</h2>
          <div className="mt-4 space-y-3">
            {latestBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} viewerRole="user" />
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-display text-lg font-semibold text-surface-900 dark:text-surface-50">Latest reviews</h2>
          <div className="mt-4 rounded-2xl border border-surface-100 dark:border-surface-800 bg-white dark:bg-surface-900 p-5 space-y-4">
            {latestReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}