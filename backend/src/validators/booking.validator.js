const { body } = require('express-validator');

const createBookingValidator = [
  body('worker').notEmpty().withMessage('Worker is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('problemDescription').trim().isLength({ min: 10 }).withMessage('Please describe the issue in more detail'),
  body('scheduledDate').notEmpty().withMessage('Scheduled date is required'),
  body('scheduledTime').notEmpty().withMessage('Scheduled time is required'),
  body('address').trim().notEmpty().withMessage('Address is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
];

module.exports = { createBookingValidator };