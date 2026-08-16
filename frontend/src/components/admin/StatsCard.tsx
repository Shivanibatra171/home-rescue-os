import type { LucideIcon } from 'lucide-react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function AdminStatsCard({
  icon: Icon,
  label,
  value,
  change,
  color = '#1fa76b',
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
  change?: { value: string; isPositive: boolean };
  color?: string;
}) {
  return (
    <div className="rounded-2xl border border-surface-100 dark:border-surface-800 bg-white dark:bg-surface-900 p-5">
      <div className="flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ backgroundColor: `${color}18`, color }}>
          <Icon size={20} />
        </div>
        {change && (
          <span className={`flex items-center gap-0.5 text-xs font-semibold ${change.isPositive ? 'text-emerald-600' : 'text-red-500'}`}>
            {change.isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {change.value}
          </span>
        )}
      </div>
      <p className="mt-4 font-display text-2xl font-bold text-surface-900 dark:text-surface-50">{value}</p>
      <p className="mt-0.5 text-xs text-surface-400">{label}</p>
    </div>
  );
}