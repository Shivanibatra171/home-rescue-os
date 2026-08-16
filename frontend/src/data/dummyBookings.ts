import type { Booking } from '@/types';

export const dummyBookings: Booking[] = [
  {
    id: 'bkg-1', userId: 'usr-1', userName: 'Ali Hamza', workerId: 'wrk-1', workerName: 'Imran Baig',
    workerAvatar: 'https://i.pravatar.cc/150?img=12', category: 'Plumber',
    problemDescription: 'Kitchen tap is leaking continuously and water pressure is low.',
    problemImages: ['https://picsum.photos/seed/p1/400/300'],
    scheduledDate: '2026-07-15', scheduledTime: '14:00', address: 'House 12, Street 4, Gulshan-e-Iqbal',
    status: 'accepted', price: 700, isEmergency: false, createdAt: '2026-07-12T09:30:00', hasReview: false,
  },
  {
    id: 'bkg-2', userId: 'usr-1', userName: 'Ali Hamza', workerId: 'wrk-3', workerName: 'Bilal Sheikh',
    workerAvatar: 'https://i.pravatar.cc/150?img=51', category: 'AC Repair',
    problemDescription: 'AC not cooling properly, might need gas refill.',
    problemImages: ['https://picsum.photos/seed/p2/400/300'],
    scheduledDate: '2026-07-08', scheduledTime: '11:00', address: 'House 12, Street 4, Gulshan-e-Iqbal',
    status: 'completed', price: 1200, isEmergency: false, createdAt: '2026-07-05T16:12:00', hasReview: true,
  },
  {
    id: 'bkg-3', userId: 'usr-1', userName: 'Ali Hamza', workerId: 'wrk-6', workerName: 'Kashif Noor',
    workerAvatar: 'https://i.pravatar.cc/150?img=22', category: 'Emergency Services',
    problemDescription: 'Sudden electrical short circuit, sparks from the main switchboard.',
    problemImages: ['https://picsum.photos/seed/p3/400/300'],
    scheduledDate: '2026-07-01', scheduledTime: '22:40', address: 'House 12, Street 4, Gulshan-e-Iqbal',
    status: 'completed', price: 1800, isEmergency: true, createdAt: '2026-07-01T22:35:00', hasReview: true,
  },
  {
    id: 'bkg-4', userId: 'usr-1', userName: 'Ali Hamza', workerId: 'wrk-2', workerName: 'Ahsan Raza',
    workerAvatar: 'https://i.pravatar.cc/150?img=33', category: 'Electrician',
    problemDescription: 'Need two new sockets installed in the bedroom.',
    problemImages: [],
    scheduledDate: '2026-06-20', scheduledTime: '16:00', address: 'House 12, Street 4, Gulshan-e-Iqbal',
    status: 'cancelled', price: 600, isEmergency: false, createdAt: '2026-06-18T10:00:00', hasReview: false,
  },
  {
    id: 'bkg-5', userId: 'usr-1', userName: 'Ali Hamza', workerId: 'wrk-4', workerName: 'Usman Tariq',
    workerAvatar: 'https://i.pravatar.cc/150?img=15', category: 'Carpenter',
    problemDescription: 'Wardrobe door hinge is broken and needs replacement.',
    problemImages: ['https://picsum.photos/seed/p5/400/300'],
    scheduledDate: '2026-07-18', scheduledTime: '10:00', address: 'House 12, Street 4, Gulshan-e-Iqbal',
    status: 'pending', price: 900, isEmergency: false, createdAt: '2026-07-12T08:00:00', hasReview: false,
  },
];