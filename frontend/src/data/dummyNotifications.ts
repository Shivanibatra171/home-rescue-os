import type { Notification } from '@/types';

export const dummyNotifications: Notification[] = [
  { id: 'ntf-1', type: 'booking', title: 'Booking Confirmed', message: 'Imran Baig accepted your plumbing booking for Jul 15, 2:00 PM.', isRead: false, createdAt: '2026-07-12T10:00:00', link: '/dashboard/bookings' },
  { id: 'ntf-2', type: 'review', title: 'Leave a Review', message: 'How was your AC repair with Bilal Sheikh? Share your feedback.', isRead: false, createdAt: '2026-07-08T18:00:00', link: '/dashboard/bookings' },
  { id: 'ntf-3', type: 'payment', title: 'Payment Successful', message: 'Rs. 1,800 was charged for your emergency service booking.', isRead: true, createdAt: '2026-07-02T09:00:00' },
  { id: 'ntf-4', type: 'promo', title: 'Weekend Offer', message: 'Get 15% off on all cleaning services this weekend.', isRead: true, createdAt: '2026-06-28T08:00:00' },
  { id: 'ntf-5', type: 'system', title: 'Welcome to Home Rescue OS', message: 'Your account has been created successfully.', isRead: true, createdAt: '2026-03-14T09:00:00' },
];