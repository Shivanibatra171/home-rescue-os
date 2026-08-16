export type NotificationType = 'booking' | 'review' | 'system' | 'promo' | 'payment';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  link?: string;
}