import API from './api';

export const reviewService = {
  createReview: async (reviewData: { bookingId: string; rating: number; comment: string }) => {
    const res = await API.post('/reviews', reviewData);
    return res.data;
  },
  getWorkerReviews: async (workerId: string) => {
    const res = await API.get(`/reviews/worker/${workerId}`);
    return res.data;
  },
};