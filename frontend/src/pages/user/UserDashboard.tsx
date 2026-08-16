import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Calendar, Heart, Bell, ArrowRight, Clock } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { BookingCard } from '@/components/booking/BookingCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { useAuth } from '@/hooks/useAuth';
import { dummyBookings } from '@/data/dummyBookings';
import { ROUTES } from '@/utils/constants';

export default function UserDashboard() {
  const { user } = useAuth();
  const recentBookings = dummyBookings.slice(0, 3);
  const activeCount = dummyBookings.filter((b) => b.status === 'pending' || b.status === 'accepted').length;
  const completedCount = dummyBookings.filter((b) => b.status === 'completed').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-surface-900 dark:text-surface-50">
          Welcome back, {user?.name?.split(' ')[0] ?? 'there'} 👋
        </h1>
        <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
          Here's what's happening with your home services.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatsCard icon={Clock} label="Active bookings" value={activeCount} color="#f0b429" />
        <StatsCard icon={Calendar} label="Completed jobs" value={completedCount} color="#1fa76b" />
        <StatsCard icon={Heart} label="Favourite workers" value={2} color="#dc2626" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl gradient-hero p-6 sm:p-8"
      >
        <h2 className="font-display text-xl font-bold text-white">Something broken right now?</h2>
        <p className="mt-1 text-sm text-white/80">Describe the problem and get matched with a verified pro in minutes.</p>
        <Link to={ROUTES.SEARCH_WORKERS}>
          <button className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-surface-900 hover:bg-white/90">
            <Search size={16} /> Find a Pro Now
          </button>
        </Link>
      </motion.div>

      <div>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-surface-900 dark:text-surface-50">Recent bookings</h2>
          <Link to={ROUTES.BOOKING_HISTORY} className="flex items-center gap-1 text-sm font-medium text-brand-600 dark:text-brand-400 hover:gap-1.5 transition-all">
            View all <ArrowRight size={14} />
          </Link>
        </div>

        {recentBookings.length === 0 ? (
          <div className="mt-6">
            <EmptyState icon={<Bell size={26} />} title="No bookings yet" message="Book your first service to see it here." />
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {recentBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} viewerRole="user" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}