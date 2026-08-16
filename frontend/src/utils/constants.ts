export const APP_NAME = 'Home Rescue OS';

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  SERVICES: '/services',
  SERVICE_DETAILS: '/services/:slug',
  USER_LOGIN: '/login',
  USER_REGISTER: '/register',
  WORKER_LOGIN: '/worker/login',
  WORKER_REGISTER: '/worker/register',
  ADMIN_LOGIN: '/admin/login',

  USER_DASHBOARD: '/dashboard',
  USER_PROFILE: '/dashboard/profile',
  SEARCH_WORKERS: '/dashboard/search',
  WORKER_DETAILS: '/dashboard/workers/:id',
  BOOK_SERVICE: '/dashboard/book/:workerId',
  BOOKING_HISTORY: '/dashboard/bookings',
  NOTIFICATIONS: '/dashboard/notifications',
  FAVOURITES: '/dashboard/favourites',

  WORKER_DASHBOARD: '/worker/dashboard',
  WORKER_BOOKINGS: '/worker/bookings',
  WORKER_SCHEDULE: '/worker/schedule',
  WORKER_PROFILE_EDIT: '/worker/profile',
  WORKER_REVIEWS: '/worker/reviews',
  WORKER_EARNINGS: '/worker/earnings',

  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_USERS: '/admin/users',
  ADMIN_WORKERS: '/admin/workers',
  ADMIN_CATEGORIES: '/admin/categories',
  ADMIN_SERVICES: '/admin/services',
  ADMIN_BOOKINGS: '/admin/bookings',
  ADMIN_REVIEWS: '/admin/reviews',
  ADMIN_MESSAGES: '/admin/messages',
} as const;

export const BOOKING_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  REJECTED: 'rejected',
} as const;

export type BookingStatus = (typeof BOOKING_STATUS)[keyof typeof BOOKING_STATUS];

export const THEME_KEY = 'hro-theme';
export const AUTH_KEY = 'hro-auth';