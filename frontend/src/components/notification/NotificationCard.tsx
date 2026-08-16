import { Bell, Calendar, Star, CreditCard, Gift } from 'lucide-react';
import { timeAgo } from '@/utils/formatDate';
import { cn } from '@/utils/cn';
import type { Notification } from '@/types';

const iconMap = {
  booking: { icon: Calendar, color: '#1fa76b' },
  review: { icon: Star, color: '#f0b429' },
  system: { icon: Bell, color: '#6366f1' },
  promo: { icon: Gift, color: '#dc2626' },
  payment: { icon: CreditCard, color: '#38bdf8' },
};

export function NotificationCard({ notification, onMarkRead }: { notification: Notification; onMarkRead: (id: string) => void }) {
  const { icon: Icon, color } = iconMap[notification.type];

  return (
    <button
      onClick={() => onMarkRead(notification.id)}
      className={cn(
        'flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-colors',
        notification.isRead
          ? 'border-surface-100 dark:border-surface-800 bg-white dark:bg-surface-900'
          : 'border-brand-100 dark:border-brand-900/40 bg-brand-50/40 dark:bg-brand-950/20'
      )}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: `${color}18`, color }}>
        <Icon size={17} />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-sm font-semibold text-surface-900 dark:text-surface-50">{notification.title}</h4>
          {!notification.isRead && <span className="h-2 w-2 shrink-0 rounded-full bg-brand-500" />}
        </div>
        <p className="mt-0.5 text-sm text-surface-500 dark:text-surface-400">{notification.message}</p>
        <p className="mt-1 text-xs text-surface-400">{timeAgo(notification.createdAt)}</p>
      </div>
    </button>
  );
}