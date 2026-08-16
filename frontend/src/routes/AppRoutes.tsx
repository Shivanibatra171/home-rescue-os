import { Routes, Route } from 'react-router-dom';
import {
  LayoutDashboard, Search, History, Heart, Bell, User,
  Briefcase, Calendar, Star, Wallet, UserCog,
  Users, HardHat, Tags, Package, ClipboardList, MessageSquare,
} from 'lucide-react';

import { PublicLayout } from '@/layouts/PublicLayout';
import { AuthLayout } from '@/layouts/AuthLayout';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { ProtectedRoute } from '@/layouts/ProtectedRoute';

import Landing from '@/pages/public/Landing';
import About from '@/pages/public/About';
import Contact from '@/pages/public/Contact';
import Services from '@/pages/public/Services';
import ServiceDetails from '@/pages/public/ServiceDetails';
import UserLogin from '@/pages/public/UserLogin';
import UserRegister from '@/pages/public/UserRegister';
import WorkerLogin from '@/pages/public/WorkerLogin';
import WorkerRegister from '@/pages/public/WorkerRegister';
import AdminLogin from '@/pages/public/AdminLogin'; 
import NotFound from '@/pages/public/NotFound';

import UserDashboard from '@/pages/user/UserDashboard';
import Profile from '@/pages/user/Profile';
import SearchWorkers from '@/pages/user/SearchWorkers';
import WorkerDetails from '@/pages/user/WorkerDetails';
import BookServicePage from '@/pages/user/BookServicePage';
import BookingHistory from '@/pages/user/BookingHistory';
import Favourites from '@/pages/user/Favourites';
import Notifications from '@/pages/user/Notifications';

import WorkerDashboard from '@/pages/worker/WorkerDashboard';
import ManageBookingsWorker from '@/pages/worker/ManageBookings';
import Schedule from '@/pages/worker/Schedule';
import ProfileEdit from '@/pages/worker/ProfileEdit';
import ReviewsWorker from '@/pages/worker/Reviews';
import Earnings from '@/pages/worker/Earnings';

import AdminDashboard from '@/pages/admin/AdminDashboard';
import ManageUsers from '@/pages/admin/ManageUsers';
import ManageWorkers from '@/pages/admin/ManageWorkers';
import ManageCategories from '@/pages/admin/ManageCategories';
import ManageServices from '@/pages/admin/ManageServices';
import ManageBookingsAdmin from '@/pages/admin/ManageBookings';
import ManageReviews from '@/pages/admin/ManageReviews';
import ContactMessages from '@/pages/admin/ContactMessages';

const userLinks = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Search Workers', to: '/dashboard/search', icon: Search },
  { label: 'Booking History', to: '/dashboard/bookings', icon: History },
  { label: 'Favourites', to: '/dashboard/favourites', icon: Heart },
  { label: 'Notifications', to: '/dashboard/notifications', icon: Bell },
  { label: 'Profile', to: '/dashboard/profile', icon: User },
];

const workerLinks = [
  { label: 'Dashboard', to: '/worker/dashboard', icon: LayoutDashboard },
  { label: 'Manage Bookings', to: '/worker/bookings', icon: Briefcase },
  { label: 'Schedule', to: '/worker/schedule', icon: Calendar },
  { label: 'Reviews', to: '/worker/reviews', icon: Star },
  { label: 'Earnings', to: '/worker/earnings', icon: Wallet },
  { label: 'Profile', to: '/worker/profile', icon: UserCog },
];

const adminLinks = [
  { label: 'Dashboard', to: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Users', to: '/admin/users', icon: Users },
  { label: 'Workers', to: '/admin/workers', icon: HardHat },
  { label: 'Categories', to: '/admin/categories', icon: Tags },
  { label: 'Services', to: '/admin/services', icon: Package },
  { label: 'Bookings', to: '/admin/bookings', icon: ClipboardList },
  { label: 'Reviews', to: '/admin/reviews', icon: Star },
  { label: 'Messages', to: '/admin/messages', icon: MessageSquare },
];

export function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetails />} />
      </Route>

      {/* Auth */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/worker/login" element={<WorkerLogin />} />
        <Route path="/worker/register" element={<WorkerRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Route>

      {/* User dashboard (protected) */}
      <Route element={<ProtectedRoute allowedRoles={['user']} />}>
        <Route element={<DashboardLayout links={userLinks} notificationsLink="/dashboard/notifications" unreadCount={2} panelTitle="My Account" />}>
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/search" element={<SearchWorkers />} />
          <Route path="/dashboard/workers/:id" element={<WorkerDetails />} />
          <Route path="/dashboard/book/:workerId" element={<BookServicePage />} />
          <Route path="/dashboard/bookings" element={<BookingHistory />} />
          <Route path="/dashboard/favourites" element={<Favourites />} />
          <Route path="/dashboard/notifications" element={<Notifications />} />
        </Route>
      </Route>

      {/* Worker dashboard (protected) */}
      <Route element={<ProtectedRoute allowedRoles={['worker']} />}>
        <Route element={<DashboardLayout links={workerLinks} notificationsLink="/worker/dashboard" unreadCount={3} panelTitle="Worker Panel" />}>
          <Route path="/worker/dashboard" element={<WorkerDashboard />} />
          <Route path="/worker/bookings" element={<ManageBookingsWorker />} />
          <Route path="/worker/schedule" element={<Schedule />} />
          <Route path="/worker/profile" element={<ProfileEdit />} />
          <Route path="/worker/reviews" element={<ReviewsWorker />} />
          <Route path="/worker/earnings" element={<Earnings />} />
        </Route>
      </Route>

      {/* Admin dashboard (protected) */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route element={<DashboardLayout links={adminLinks} notificationsLink="/admin/dashboard" unreadCount={0} panelTitle="Admin Panel" />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<ManageUsers />} />
          <Route path="/admin/workers" element={<ManageWorkers />} />
          <Route path="/admin/categories" element={<ManageCategories />} />
          <Route path="/admin/services" element={<ManageServices />} />
          <Route path="/admin/bookings" element={<ManageBookingsAdmin />} />
          <Route path="/admin/reviews" element={<ManageReviews />} />
          <Route path="/admin/messages" element={<ContactMessages />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
