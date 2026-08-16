export interface Review {
  id: string;
  bookingId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  workerId: string;
  rating: number;
  comment: string;
  category: string;
  createdAt: string;
  workerReply?: string;
}