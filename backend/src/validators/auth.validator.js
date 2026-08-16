const { body } = require('express-validator');

const userRegisterValidator = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').trim().notEmpty().withMessage('Phone number is required'),
  body('city').trim().notEmpty().withMessage('City is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

const workerRegisterValidator = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').trim().notEmpty().withMessage('Phone number is required'),
  body('city').trim().notEmpty().withMessage('City is required'),
  body('primaryCategory').trim().notEmpty().withMessage('Primary category is required'),
  body('cnic').optional().trim(),
  body('area').optional().trim(),
  body('hourlyRate').optional().isNumeric().withMessage('Hourly rate must be a number'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

const loginValidator = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

module.exports = { userRegisterValidator, workerRegisterValidator, loginValidator };