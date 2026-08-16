const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const User = require('../models/User');
const Worker = require('../models/Worker');

const sanitize = (doc) => {
  const obj = doc.toObject();
  delete obj.password;
  return obj;
};

// @route PUT /api/users/profile
const updateProfile = asyncHandler(async (req, res) => {
  const { name, phone, city, avatar } = req.body;

  const user = await User.findById(req.user._id);
  if (!user) {
    return ApiResponse.error(res, 404, 'User not found');
  }

  if (name) user.name = name;
  if (phone) user.phone = phone;
  if (city) user.city = city;
  if (avatar) user.avatar = avatar;

  await user.save();
  const sanitized = sanitize(user);
  return ApiResponse.success(res, 200, 'Profile updated', { account: sanitized, user: sanitized });
});

// @route GET /api/users/favourites
const getFavourites = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate('favouriteWorkers');
  return ApiResponse.success(res, 200, 'Favourites fetched', { favourites: user.favouriteWorkers });
});

// @route POST /api/users/favourites/:workerId
const addFavourite = asyncHandler(async (req, res) => {
  const { workerId } = req.params;

  const worker = await Worker.findById(workerId);
  if (!worker) {
    return ApiResponse.error(res, 404, 'Worker not found');
  }

  const user = await User.findById(req.user._id);
  if (!user.favouriteWorkers.includes(workerId)) {
    user.favouriteWorkers.push(workerId);
    await user.save();
  }

  return ApiResponse.success(res, 200, 'Worker added to favourites', null);
});

// @route DELETE /api/users/favourites/:workerId
const removeFavourite = asyncHandler(async (req, res) => {
  const { workerId } = req.params;

  const user = await User.findById(req.user._id);
  user.favouriteWorkers = user.favouriteWorkers.filter((id) => id.toString() !== workerId);
  await user.save();

  return ApiResponse.success(res, 200, 'Worker removed from favourites', null);
});

module.exports = { updateProfile, getFavourites, addFavourite, removeFavourite };