import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Briefcase, Star, Wallet, Clock, ArrowRight, ToggleLeft, ToggleRight } from 'lucide-react';
import { useState } from 'react';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { BookingCard } from '@/components/booking/BookingCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { dummyBookings } from '@/data/dummyBookings';
import { dummyWorkers } from '@/data/dummyWorkers';
import { formatCurrency } from '@/utils/formatCurrency';
import { ROUTES } from '@/utils/constants';

export default function WorkerDashboard() {
  const worker = dummyWorkers[0];
  const [isAvailable, setIsAvailable] = useState(worker.isAvailableNow);
  const pendingBookings = dummyBookings.filter((b) => b.status === 'pending').slice(0, 3);
  const totalEarnings = dummyBookings.filter((b) => b.status === 'completed').reduce((sum, b) => sum + b.price, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-surface-900 dark:text-surface-50">
            Welcome back, {worker.name.split(' ')[0]} 👋
          </h1>
          <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">Here's your activity overview.</p>
        </div>
        <button
          onClick={() => setIsAvailable((p) => !p)}
          className="flex items-center gap-2 rounded-xl border border-surface-200 dark:border-surface-700 px-4 py-2.5 text-sm font-medium"
        >
          {isAvailable ? <ToggleRight size={20} className="text-brand-500" /> : <ToggleLeft size={20} className="text-surface-400" />}
          {isAvailable ? 'Available for jobs' : 'Not available'}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard icon={Briefcase} label="Completed jobs" value={worker.completedJobs} color="#1fa76b" />
        <StatsCard icon={Star} label="Average rating" value={worker.rating.toFixed(1)} color="#f0b429" />
        <StatsCard icon={Wallet} label="Total earnings" value={formatCurrency(totalEarnings)} color="#38bdf8" />
        <StatsCard icon={Clock} label="Response time" value={worker.responseTime} color="#8b5cf6" />
      </div>

      <div>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-surface-900 dark:text-surface-50">New job requests</h2>
          <Link to={ROUTES.WORKER_BOOKINGS} className="flex items-center gap-1 text-sm font-medium text-brand-600 dark:text-brand-400 hover:gap-1.5 transition-all">
            View all <ArrowRight size={14} />
          </Link>
        </div>

        {pendingBookings.length === 0 ? (
          <div className="mt-6">
            <EmptyState title="No pending requests" message="New job requests will appear here." />
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {pendingBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} viewerRole="worker" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}