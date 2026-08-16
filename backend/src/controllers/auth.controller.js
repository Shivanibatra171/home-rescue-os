const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const generateToken = require('../utils/generateToken');
const User = require('../models/User');
const Worker = require('../models/Worker');
const Admin = require('../models/Admin');

// Strip password before sending account back to client
const sanitize = (doc) => {
  const obj = doc.toObject();
  delete obj.password;
  return obj;
};

// @route POST /api/auth/user/register
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, phone, city, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) {
    return ApiResponse.error(res, 400, 'An account with this email already exists');
  }

  const user = await User.create({ name, email, phone, city, password });
  const token = generateToken({ id: user._id, role: 'user' });
  const sanitized = sanitize(user);
  return ApiResponse.success(res, 201, 'Registration successful', { account: sanitized, user: sanitized, token, role: 'user' });
});

// @route POST /api/auth/user/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    return ApiResponse.error(res, 401, 'Invalid email or password');
  }

  const token = generateToken({ id: user._id, role: 'user' });
  const sanitized = sanitize(user);
  return ApiResponse.success(res, 200, 'Login successful', { account: sanitized, user: sanitized, token, role: 'user' });
});

// @route POST /api/auth/worker/register
const registerWorker = asyncHandler(async (req, res) => {
  const { name, email, phone, cnic, city, area, primaryCategory, hourlyRate, password } = req.body;

  const query = [{ email }];
  if (cnic) query.push({ cnic });
  const existing = await Worker.findOne({ $or: query });
  if (existing) {
    return ApiResponse.error(res, 400, 'An account with this email or CNIC already exists');
  }

  const worker = await Worker.create({
    name,
    email,
    phone,
    cnic: cnic || `42101-${Date.now().toString().slice(-7)}-1`,
    city: city || 'Karachi',
    area: area || 'Central',
    primaryCategory: (primaryCategory || 'plumber').toLowerCase(),
    hourlyRate: Number(hourlyRate) || 800,
    password,
    workingHours: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => ({
      day, start: '09:00', end: '20:00', isAvailable: day !== 'Sun',
    })),
  });

  const token = generateToken({ id: worker._id, role: 'worker' });
  const sanitized = sanitize(worker);
  return ApiResponse.success(res, 201, 'Application submitted, awaiting verification', { account: sanitized, user: sanitized, token, role: 'worker' });
});

// @route POST /api/auth/worker/login
const loginWorker = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const worker = await Worker.findOne({ email }).select('+password');
  if (!worker || !(await worker.comparePassword(password))) {
    return ApiResponse.error(res, 401, 'Invalid email or password');
  }

  const token = generateToken({ id: worker._id, role: 'worker' });
  const sanitized = sanitize(worker);
  return ApiResponse.success(res, 200, 'Login successful', { account: sanitized, user: sanitized, token, role: 'worker' });
});

// @route POST /api/auth/admin/login
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email }).select('+password');
  if (!admin || !(await admin.comparePassword(password))) {
    return ApiResponse.error(res, 401, 'Invalid email or password');
  }

  const token = generateToken({ id: admin._id, role: 'admin' });
  const sanitized = sanitize(admin);
  return ApiResponse.success(res, 200, 'Login successful', { account: sanitized, user: sanitized, token, role: 'admin' });
});

// @route GET /api/auth/me
const getMe = asyncHandler(async (req, res) => {
  const sanitized = sanitize(req.user);
  return ApiResponse.success(res, 200, 'Account fetched', { account: sanitized, user: sanitized, role: req.role });
});

module.exports = { registerUser, loginUser, registerWorker, loginWorker, loginAdmin, getMe };