import type { Review } from '@/types';

export const dummyReviews: Review[] = [
  {
    id: 'rev-1', bookingId: 'bkg-2', userId: 'usr-1', userName: 'Ali Hamza',
    userAvatar: 'https://i.pravatar.cc/150?img=5', workerId: 'wrk-3', rating: 5,
    comment: 'Very professional, fixed the AC quickly and explained the issue clearly.',
    category: 'AC Repair', createdAt: '2026-07-08T15:00:00',
    workerReply: 'Thank you for the kind words! Glad I could help.',
  },
  {
    id: 'rev-2', bookingId: 'bkg-3', userId: 'usr-1', userName: 'Ali Hamza',
    userAvatar: 'https://i.pravatar.cc/150?img=5', workerId: 'wrk-6', rating: 5,
    comment: 'Came within minutes during an emergency at night. Truly reliable.',
    category: 'Emergency Services', createdAt: '2026-07-02T08:00:00',
  },
  {
    id: 'rev-3', bookingId: 'bkg-old-1', userId: 'usr-2', userName: 'Sana Khan',
    userAvatar: 'https://i.pravatar.cc/150?img=9', workerId: 'wrk-1', rating: 4,
    comment: 'Good work overall, arrived a little late but fixed the leak properly.',
    category: 'Plumber', createdAt: '2026-06-25T12:00:00',
  },
];