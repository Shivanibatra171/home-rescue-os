const express = require('express');
const router = express.Router();

const {
  createReview,
  getWorkerReviews,
  getMyReviews,
  replyToReview,
  getAllReviews,
  deleteReview,
} = require('../controllers/review.controller');

const { protect } = require('../middlewares/auth.middleware');
const { authorizeRoles } = require('../middlewares/role.middleware');
const validate = require('../middlewares/validate.middleware');
const { createReviewValidator } = require('../validators/review.validator');

// Create Review
router.post('/', protect, authorizeRoles('user'), createReviewValidator, validate, createReview);

// Worker reviews
router.get('/worker/:workerId', getWorkerReviews);

// My reviews (Worker)
router.get('/my', protect, authorizeRoles('worker'), getMyReviews);

// Reply
router.put('/:id/reply', protect, authorizeRoles('worker'), replyToReview);

// Get All (Testing ke liye open)
router.get('/', getAllReviews);

// Delete
router.delete('/:id', protect, authorizeRoles('admin'), deleteReview);

module.exports = router;