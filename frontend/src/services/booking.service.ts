import API from './api';

export const bookingService = {
  createBooking: async (bookingData: Record<string, any>) => {
    const res = await API.post('/bookings', bookingData);
    return res.data;
  },
  getUserBookings: async () => {
    const res = await API.get('/bookings/my-bookings');
    return res.data;
  },
  getWorkerBookings: async () => {
    const res = await API.get('/bookings/worker-bookings');
    return res.data;
  },
  updateBookingStatus: async (id: string, status: string) => {
    const res = await API.patch(`/bookings/${id}/status`, { status });
    return res.data;
  },
};