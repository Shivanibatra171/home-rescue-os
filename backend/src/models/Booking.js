const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    worker: { type: mongoose.Schema.Types.ObjectId, ref: 'Worker', required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },

    problemDescription: { type: String, required: true },
    problemImages: [{ type: String }],

    scheduledDate: { type: Date, required: true },
    scheduledTime: { type: String, required: true },
    address: { type: String, required: true },

    price: { type: Number, required: true, min: 0 },
    isEmergency: { type: Boolean, default: false },

    status: {
      type: String,
      enum: ['pending', 'accepted', 'in_progress', 'completed', 'cancelled', 'rejected'],
      default: 'pending',
    },

    hasReview: { type: Boolean, default: false },
    completedAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);