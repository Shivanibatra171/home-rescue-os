const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const Notification = require('../models/Notification');

// @route GET /api/notifications
const getMyNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ recipient: req.user._id })
    .sort({ createdAt: -1 });

  return ApiResponse.success(res, 200, 'Notifications fetched successfully', { notifications });
});

// @route PATCH /api/notifications/:id/read
const markAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (!notification) {
    return ApiResponse.error(res, 404, 'Notification not found');
  }

  if (notification.recipient.toString() !== req.user._id.toString()) {
    return ApiResponse.error(res, 403, 'Not authorized');
  }

  notification.isRead = true;
  await notification.save();

  return ApiResponse.success(res, 200, 'Notification marked as read', { notification });
});

// @route PATCH /api/notifications/mark-all-read
const markAllAsRead = asyncHandler(async (req, res) => {
  await Notification.updateMany(
    { recipient: req.user._id, isRead: false },
    { isRead: true }
  );

  return ApiResponse.success(res, 200, 'All notifications marked as read', null);
});

// @route DELETE /api/notifications/:id
const deleteNotification = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (!notification) {
    return ApiResponse.error(res, 404, 'Notification not found');
  }

  if (notification.recipient.toString() !== req.user._id.toString()) {
    return ApiResponse.error(res, 403, 'Not authorized');
  }

  await notification.deleteOne();

  return ApiResponse.success(res, 200, 'Notification deleted successfully', null);
});

module.exports = {
  getMyNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
};