export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export const dummyMessages: ContactMessage[] = [
  { id: 'msg-1', name: 'Zara Malik', email: 'zara.m@example.com', subject: 'Partnership inquiry', message: 'We run an apartment complex and are interested in a maintenance package for our residents.', createdAt: '2026-07-13T10:00:00', isRead: false },
  { id: 'msg-2', name: 'Omar Farooq', email: 'omar.f@example.com', subject: 'App feedback', message: 'Great experience booking a plumber, but the notification for booking confirmation took a while.', createdAt: '2026-07-11T14:30:00', isRead: true },
  { id: 'msg-3', name: 'Nida Rashid', email: 'nida.r@example.com', subject: 'Worker application issue', message: 'I tried registering as a worker but the category selection was not saving properly.', createdAt: '2026-07-09T09:15:00', isRead: false },
];