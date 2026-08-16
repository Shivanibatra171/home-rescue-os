const { body } = require('express-validator');

const createReviewValidator = [
  body('bookingId').notEmpty().withMessage('Booking ID is required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').trim().isLength({ min: 3 }).withMessage('Please write a short comment'),
];

module.exports = { createReviewValidator };