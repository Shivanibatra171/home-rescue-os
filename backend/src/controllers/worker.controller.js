const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const Worker = require('../models/Worker');

const sanitize = (doc) => {
  const obj = doc.toObject();
  delete obj.password;
  return obj;
};

// @route GET /api/workers
const getWorkers = asyncHandler(async (req, res) => {
  const { category, city, minRating, search } = req.query;

  const filter = { isVerified: true, isActive: true };
  if (category) filter.categories = category;
  if (city) filter.city = city;
  if (minRating) filter.rating = { $gte: Number(minRating) };
  if (search) filter.name = { $regex: search, $options: 'i' };

  const workers = await Worker.find(filter).select('-password');
  return ApiResponse.success(res, 200, 'Workers fetched', { workers });
});

// @route GET /api/workers/:id
const getWorkerById = asyncHandler(async (req, res) => {
  const worker = await Worker.findById(req.params.id).select('-password');
  if (!worker) {
    return ApiResponse.error(res, 404, 'Worker not found');
  }
  return ApiResponse.success(res, 200, 'Worker fetched', { worker });
});

// @route PUT /api/workers/profile
const updateProfile = asyncHandler(async (req, res) => {
  const { name, phone, city, area, bio, hourlyRate, skills, categories, avatar, gallery } = req.body;

  const worker = await Worker.findById(req.user._id);
  if (!worker) {
    return ApiResponse.error(res, 404, 'Worker not found');
  }

  if (name) worker.name = name;
  if (phone) worker.phone = phone;
  if (city) worker.city = city;
  if (area) worker.area = area;
  if (bio !== undefined) worker.bio = bio;
  if (hourlyRate) worker.hourlyRate = hourlyRate;
  if (skills) worker.skills = skills;
  if (categories) worker.categories = categories;
  if (avatar) worker.avatar = avatar;
  if (gallery) worker.gallery = gallery;

  await worker.save();
  return ApiResponse.success(res, 200, 'Profile updated', { account: sanitize(worker) });
});

// @route PUT /api/workers/availability
const toggleAvailability = asyncHandler(async (req, res) => {
  const worker = await Worker.findById(req.user._id);
  worker.isAvailableNow = !worker.isAvailableNow;
  await worker.save();
  return ApiResponse.success(res, 200, 'Availability updated', { isAvailableNow: worker.isAvailableNow });
});

// @route PUT /api/workers/schedule
const updateSchedule = asyncHandler(async (req, res) => {
  const { workingHours } = req.body;

  const worker = await Worker.findById(req.user._id);
  worker.workingHours = workingHours;
  await worker.save();

  return ApiResponse.success(res, 200, 'Schedule updated', { workingHours: worker.workingHours });
});

module.exports = { getWorkers, getWorkerById, updateProfile, toggleAvailability, updateSchedule };