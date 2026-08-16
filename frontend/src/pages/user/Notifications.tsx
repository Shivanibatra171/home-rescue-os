import { useState } from 'react';
import { Bell } from 'lucide-react';
import { NotificationCard } from '@/components/notification/NotificationCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { dummyNotifications } from '@/data/dummyNotifications';

export default function Notifications() {
  const [notifications, setNotifications] = useState(dummyNotifications);

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-surface-900 dark:text-surface-50">Notifications</h1>
          <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">{unreadCount} unread</p>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="text-sm font-semibold text-brand-600 dark:text-brand-400 hover:underline">
            Mark all as read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <EmptyState icon={<Bell size={26} />} title="No notifications" message="You're all caught up!" />
      ) : (
        <div className="space-y-2.5">
          {notifications.map((n) => <NotificationCard key={n.id} notification={n} onMarkRead={markAsRead} />)}
        </div>
      )}
    </div>
  );
}