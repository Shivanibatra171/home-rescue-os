import type { BookingStatus } from '@/utils/constants';

export interface Booking {
  id: string;
  userId: string;
  userName: string;
  workerId: string;
  workerName: string;
  workerAvatar: string;
  category: string;
  problemDescription: string;
  problemImages: string[];
  scheduledDate: string;
  scheduledTime: string;
  address: string;
  status: BookingStatus;
  price: number;
  isEmergency: boolean;
  createdAt: string;
  hasReview: boolean;
}