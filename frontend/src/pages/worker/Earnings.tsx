import { useMemo } from 'react';
import { Wallet, TrendingUp, Calendar, Download } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { dummyBookings } from '@/data/dummyBookings';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatDate } from '@/utils/formatDate';

export default function Earnings() {
  const completedJobs = useMemo(() => dummyBookings.filter((b) => b.status === 'completed'), []);
  const totalEarnings = completedJobs.reduce((sum, b) => sum + b.price, 0);
  const thisMonthEarnings = totalEarnings;
  const avgPerJob = completedJobs.length ? Math.round(totalEarnings / completedJobs.length) : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-surface-900 dark:text-surface-50">Earnings</h1>
          <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">Track your income from completed jobs.</p>
        </div>
        <Button variant="outline" leftIcon={<Download size={16} />}>Export Report</Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatsCard icon={Wallet} label="Total earnings" value={formatCurrency(totalEarnings)} color="#1fa76b" />
        <StatsCard icon={TrendingUp} label="This month" value={formatCurrency(thisMonthEarnings)} color="#38bdf8" />
        <StatsCard icon={Calendar} label="Average per job" value={formatCurrency(avgPerJob)} color="#f0b429" />
      </div>

      <div className="rounded-2xl border border-surface-100 dark:border-surface-800 bg-white dark:bg-surface-900 p-6">
        <h2 className="font-display font-semibold text-surface-900 dark:text-surface-50">Payment history</h2>

        {completedJobs.length === 0 ? (
          <div className="mt-4">
            <EmptyState title="No earnings yet" message="Completed jobs will show up here." />
          </div>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-surface-100 dark:border-surface-800 text-xs text-surface-400">
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Service</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 text-right font-medium">Amount</th>
                </tr>
              </thead>
              <tbody>
                {completedJobs.map((job) => (
                  <tr key={job.id} className="border-b border-surface-50 dark:border-surface-800/50 last:border-0">
                    <td className="py-3 font-medium text-surface-800 dark:text-surface-100">{job.userName}</td>
                    <td className="py-3 text-surface-500 dark:text-surface-400">{job.category}</td>
                    <td className="py-3 text-surface-500 dark:text-surface-400">{formatDate(job.scheduledDate)}</td>
                    <td className="py-3 text-right font-semibold text-brand-600 dark:text-brand-400">{formatCurrency(job.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}