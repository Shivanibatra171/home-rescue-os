const express = require('express');
const router = express.Router();

const {
  createBooking, getMyBookings, getWorkerBookings,
  acceptBooking, rejectBooking, completeBooking, cancelBooking, getAllBookings,
} = require('../controllers/booking.controller');
const { protect } = require('../middlewares/auth.middleware');
const { authorizeRoles } = require('../middlewares/role.middleware');
const validate = require('../middlewares/validate.middleware');
const { createBookingValidator } = require('../validators/booking.validator');

router.post('/', protect, authorizeRoles('user'), createBookingValidator, validate, createBooking);
router.get('/my', protect, authorizeRoles('user'), getMyBookings);
router.get('/worker', protect, authorizeRoles('worker'), getWorkerBookings);

router.put('/:id/accept', protect, authorizeRoles('worker'), acceptBooking);
router.put('/:id/reject', protect, authorizeRoles('worker'), rejectBooking);
router.put('/:id/complete', protect, authorizeRoles('worker'), completeBooking);
router.put('/:id/cancel', protect, authorizeRoles('user'), cancelBooking);

router.get('/', protect, authorizeRoles('admin'), getAllBookings);

module.exports = router;