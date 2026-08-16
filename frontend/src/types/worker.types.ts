export interface WorkingHours {
  day: string;
  start: string;
  end: string;
  isAvailable: boolean;
}

export interface Worker {
  id: string;
  name: string;
  avatar: string;
  categories: string[];
  primaryCategory: string;
  city: string;
  area: string;
  rating: number;
  reviewCount: number;
  completedJobs: number;
  experience: number;
  hourlyRate: number;
  isAvailableNow: boolean;
  isVerified: boolean;
  hasWarranty: boolean;
  bio: string;
  skills: string[];
  gallery: string[];
  workingHours: WorkingHours[];
  responseTime: string;
  joinedDate: string;
}