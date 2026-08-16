const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const workingHourSchema = new mongoose.Schema(
  {
    day: { type: String, required: true },
    start: { type: String, default: '09:00' },
    end: { type: String, default: '20:00' },
    isAvailable: { type: Boolean, default: true },
  },
  { _id: false }
);

const workerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6, select: false },
    phone: { type: String, required: true },
    cnic: { type: String, required: true, unique: true },
    avatar: { type: String, default: '' },
    city: { type: String, required: true },
    area: { type: String, required: true },
    role: { type: String, enum: ['worker'], default: 'worker' },

    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    primaryCategory: { type: String, required: true },
    skills: [{ type: String }],
    bio: { type: String, default: '' },
    hourlyRate: { type: Number, required: true, min: 0 },
    experience: { type: Number, default: 0 },
    gallery: [{ type: String }],

    workingHours: [workingHourSchema],
    isAvailableNow: { type: Boolean, default: false },
    responseTime: { type: String, default: 'Under 1 hour' },

    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    completedJobs: { type: Number, default: 0 },

    isVerified: { type: Boolean, default: false },
    verificationStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    hasWarranty: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

workerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

workerSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Worker', workerSchema);