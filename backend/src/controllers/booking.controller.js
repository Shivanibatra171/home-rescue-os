const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const Booking = require('../models/Booking');
const Worker = require('../models/Worker');
const Notification = require('../models/Notification');

// @route POST /api/bookings (user only)
const createBooking = asyncHandler(async (req, res) => {
  const {
    worker, category, problemDescription, problemImages,
    scheduledDate, scheduledTime, address, price, isEmergency,
  } = req.body;

  const workerDoc = await Worker.findById(worker);
  if (!workerDoc) {
    return ApiResponse.error(res, 404, 'Worker not found');
  }

  const booking = await Booking.create({
    user: req.user._id,
    worker,
    category,
    problemDescription,
    problemImages: problemImages || [],
    scheduledDate,
    scheduledTime,
    address,
    price,
    isEmergency: !!isEmergency,
  });

  await Notification.create({
    recipient: worker,
    recipientModel: 'Worker',
    type: 'booking',
    title: 'New booking request',
    message: `${req.user.name} requested a ${category} service.`,
    link: '/worker/bookings',
  });

  return ApiResponse.success(res, 201, 'Booking request sent', { booking });
});

// @route GET /api/bookings/my (user only)
const getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate('worker', 'name avatar primaryCategory')
    .populate('category', 'name')
    .sort({ createdAt: -1 });

  return ApiResponse.success(res, 200, 'Bookings fetched', { bookings });
});

// @route GET /api/bookings/worker (worker only)
const getWorkerBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ worker: req.user._id })
    .populate('user', 'name avatar')
    .populate('category', 'name')
    .sort({ createdAt: -1 });

  return ApiResponse.success(res, 200, 'Bookings fetched', { bookings });
});

// @route PUT /api/bookings/:id/accept (worker only)
const acceptBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) return ApiResponse.error(res, 404, 'Booking not found');
  if (booking.worker.toString() !== req.user._id.toString()) {
    return ApiResponse.error(res, 403, 'Not authorized for this booking');
  }

  booking.status = 'accepted';
  await booking.save();

  await Notification.create({
    recipient: booking.user,
    recipientModel: 'User',
    type: 'booking',
    title: 'Booking accepted',
    message: `${req.user.name} accepted your booking request.`,
    link: '/dashboard/bookings',
  });

  return ApiResponse.success(res, 200, 'Booking accepted', { booking });
});

// @route PUT /api/bookings/:id/reject (worker only)
const rejectBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) return ApiResponse.error(res, 404, 'Booking not found');
  if (booking.worker.toString() !== req.user._id.toString()) {
    return ApiResponse.error(res, 403, 'Not authorized for this booking');
  }

  booking.status = 'rejected';
  await booking.save();

  return ApiResponse.success(res, 200, 'Booking rejected', { booking });
});

// @route PUT /api/bookings/:id/complete (worker only)
const completeBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) return ApiResponse.error(res, 404, 'Booking not found');
  if (booking.worker.toString() !== req.user._id.toString()) {
    return ApiResponse.error(res, 403, 'Not authorized for this booking');
  }

  booking.status = 'completed';
  booking.completedAt = new Date();
  await booking.save();

  const worker = await Worker.findById(req.user._id);
  worker.completedJobs += 1;
  await worker.save();

  await Notification.create({
    recipient: booking.user,
    recipientModel: 'User',
    type: 'booking',
    title: 'Job completed',
    message: 'Your service has been marked as completed. Leave a review!',
    link: '/dashboard/bookings',
  });

  return ApiResponse.success(res, 200, 'Booking marked as completed', { booking });
});

// @route PUT /api/bookings/:id/cancel (user only)
const cancelBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) return ApiResponse.error(res, 404, 'Booking not found');
  if (booking.user.toString() !== req.user._id.toString()) {
    return ApiResponse.error(res, 403, 'Not authorized for this booking');
  }

  booking.status = 'cancelled';
  await booking.save();

  return ApiResponse.success(res, 200, 'Booking cancelled', { booking });
});

// @route GET /api/bookings (admin only)
const getAllBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find()
    .populate('user', 'name email')
    .populate('worker', 'name email')
    .populate('category', 'name')
    .sort({ createdAt: -1 });

  return ApiResponse.success(res, 200, 'All bookings fetched', { bookings });
});

module.exports = {
  createBooking, getMyBookings, getWorkerBookings,
  acceptBooking, rejectBooking, completeBooking, cancelBooking, getAllBookings,
};