export type UserRole = 'user' | 'worker' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  city: string;
  role: UserRole;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  role: string;
  city: string;
  rating: number;
  comment: string;
}