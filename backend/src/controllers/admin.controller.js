const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const User = require('../models/User');
const Worker = require('../models/Worker');
const Booking = require('../models/Booking');
const Review = require('../models/Review');
const ContactMessage = require('../models/ContactMessage');

// @route GET /api/admin/dashboard
const getDashboardStats = asyncHandler(async (req, res) => {
  const [totalUsers, totalWorkers, totalBookings, completedBookings] = await Promise.all([
    User.countDocuments(),
    Worker.countDocuments(),
    Booking.countDocuments(),
    Booking.find({ status: 'completed' }),
  ]);

  const totalRevenue = completedBookings.reduce((sum, b) => sum + b.price, 0);

  const latestBookings = await Booking.find()
    .populate('user', 'name')
    .populate('worker', 'name')
    .populate('category', 'name')
    .sort({ createdAt: -1 })
    .limit(5);

  const latestReviews = await Review.find()
    .populate('user', 'name avatar')
    .populate('worker', 'name')
    .sort({ createdAt: -1 })
    .limit(5);

  return ApiResponse.success(res, 200, 'Dashboard stats fetched', {
    stats: { totalUsers, totalWorkers, totalBookings, totalRevenue },
    latestBookings,
    latestReviews,
  });
});

// @route GET /api/admin/users
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  return ApiResponse.success(res, 200, 'Users fetched', { users });
});

// @route DELETE /api/admin/users/:id
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return ApiResponse.error(res, 404, 'User not found');
  await user.deleteOne();
  return ApiResponse.success(res, 200, 'User deleted', null);
});

// @route GET /api/admin/workers
const getAllWorkers = asyncHandler(async (req, res) => {
  const workers = await Worker.find().sort({ createdAt: -1 });
  return ApiResponse.success(res, 200, 'Workers fetched', { workers });
});

// @route PUT /api/admin/workers/:id/approve
const approveWorker = asyncHandler(async (req, res) => {
  const worker = await Worker.findById(req.params.id);
  if (!worker) return ApiResponse.error(res, 404, 'Worker not found');

  worker.verificationStatus = 'approved';
  worker.isVerified = true;
  await worker.save();

  return ApiResponse.success(res, 200, 'Worker approved', { worker });
});

// @route PUT /api/admin/workers/:id/reject
const rejectWorker = asyncHandler(async (req, res) => {
  const worker = await Worker.findById(req.params.id);
  if (!worker) return ApiResponse.error(res, 404, 'Worker not found');

  worker.verificationStatus = 'rejected';
  worker.isVerified = false;
  await worker.save();

  return ApiResponse.success(res, 200, 'Worker rejected', { worker });
});

// @route DELETE /api/admin/workers/:id
const deleteWorker = asyncHandler(async (req, res) => {
  const worker = await Worker.findById(req.params.id);
  if (!worker) return ApiResponse.error(res, 404, 'Worker not found');
  await worker.deleteOne();
  return ApiResponse.success(res, 200, 'Worker deleted', null);
});

// @route GET /api/admin/messages
const getMessages = asyncHandler(async (req, res) => {
  const messages = await ContactMessage.find().sort({ createdAt: -1 });
  return ApiResponse.success(res, 200, 'Messages fetched', { messages });
});

// @route PUT /api/admin/messages/:id/read
const markMessageRead = asyncHandler(async (req, res) => {
  const message = await ContactMessage.findById(req.params.id);
  if (!message) return ApiResponse.error(res, 404, 'Message not found');
  message.isRead = true;
  await message.save();
  return ApiResponse.success(res, 200, 'Message marked as read', { message });
});

// @route DELETE /api/admin/messages/:id
const deleteMessage = asyncHandler(async (req, res) => {
  const message = await ContactMessage.findById(req.params.id);
  if (!message) return ApiResponse.error(res, 404, 'Message not found');
  await message.deleteOne();
  return ApiResponse.success(res, 200, 'Message deleted', null);
});

module.exports = {
  getDashboardStats, getAllUsers, deleteUser,
  getAllWorkers, approveWorker, rejectWorker, deleteWorker,
  getMessages, markMessageRead, deleteMessage,
};