const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const Review = require('../models/Review');
const Booking = require('../models/Booking');
const Worker = require('../models/Worker');
const Notification = require('../models/Notification');

// @route POST /api/reviews (user only)
const createReview = asyncHandler(async (req, res) => {
  const { bookingId, rating, comment } = req.body;

  const booking = await Booking.findById(bookingId);
  if (!booking) {
    return ApiResponse.error(res, 404, 'Booking not found');
  }
  if (booking.user.toString() !== req.user._id.toString()) {
    return ApiResponse.error(res, 403, 'Not authorized to review this booking');
  }
  if (booking.status !== 'completed') {
    return ApiResponse.error(res, 400, 'You can only review completed bookings');
  }
  if (booking.hasReview) {
    return ApiResponse.error(res, 400, 'This booking has already been reviewed');
  }

  const review = await Review.create({
    booking: bookingId,
    user: req.user._id,
    worker: booking.worker,
    category: booking.category,
    rating,
    comment,
  });

  booking.hasReview = true;
  await booking.save();

  // Recalculate worker's average rating
  const workerReviews = await Review.find({ worker: booking.worker });
  const avgRating = workerReviews.reduce((sum, r) => sum + r.rating, 0) / workerReviews.length;

  await Worker.findByIdAndUpdate(booking.worker, {
    rating: avgRating,
    reviewCount: workerReviews.length,
  });

  await Notification.create({
    recipient: booking.worker,
    recipientModel: 'Worker',
    type: 'review',
    title: 'New review received',
    message: `${req.user.name} left you a ${rating}-star review.`,
    link: '/worker/reviews',
  });

  return ApiResponse.success(res, 201, 'Review submitted', { review });
});

// @route GET /api/reviews/worker/:workerId
const getWorkerReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ worker: req.params.workerId })
    .populate('user', 'name avatar')
    .sort({ createdAt: -1 });

  return ApiResponse.success(res, 200, 'Reviews fetched', { reviews });
});

// @route GET /api/reviews/my (worker only — reviews they've received)
const getMyReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ worker: req.user._id })
    .populate('user', 'name avatar')
    .sort({ createdAt: -1 });

  return ApiResponse.success(res, 200, 'Reviews fetched', { reviews });
});

// @route PUT /api/reviews/:id/reply (worker only)
const replyToReview = asyncHandler(async (req, res) => {
  const { reply } = req.body;

  const review = await Review.findById(req.params.id);
  if (!review) return ApiResponse.error(res, 404, 'Review not found');
  if (review.worker.toString() !== req.user._id.toString()) {
    return ApiResponse.error(res, 403, 'Not authorized to reply to this review');
  }

  review.workerReply = reply;
  await review.save();

  return ApiResponse.success(res, 200, 'Reply added', { review });
});

// @route GET /api/reviews (admin only)
const getAllReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find()
    .populate('user', 'name avatar')
    .populate('worker', 'name')
    .sort({ createdAt: -1 });

  return ApiResponse.success(res, 200, 'All reviews fetched', { reviews });
});

// @route DELETE /api/reviews/:id (admin only)
const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) return ApiResponse.error(res, 404, 'Review not found');
  await review.deleteOne();
  return ApiResponse.success(res, 200, 'Review deleted', null);
});

module.exports = {
  createReview, getWorkerReviews, getMyReviews, replyToReview, getAllReviews, deleteReview,
};