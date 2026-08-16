import type { LucideIcon } from 'lucide-react';

export function StatsCard({
  icon: Icon,
  label,
  value,
  color = '#1fa76b',
  trend,
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
  color?: string;
  trend?: string;
}) {
  return (
    <div className="rounded-2xl border border-surface-100 dark:border-surface-800 bg-white dark:bg-surface-900 p-5">
      <div className="flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ backgroundColor: `${color}18`, color }}>
          <Icon size={20} />
        </div>
        {trend && <span className="text-xs font-semibold text-emerald-600">{trend}</span>}
      </div>
      <p className="mt-4 font-display text-2xl font-bold text-surface-900 dark:text-surface-50">{value}</p>
      <p className="mt-0.5 text-xs text-surface-400">{label}</p>
    </div>
  );
}