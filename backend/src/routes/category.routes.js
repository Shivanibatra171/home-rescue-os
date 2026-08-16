const express = require('express');
const router = express.Router();

const {
  getCategories, getCategoryBySlug, createCategory, updateCategory, deleteCategory,
} = require('../controllers/category.controller');
const { protect } = require('../middlewares/auth.middleware');
const { authorizeRoles } = require('../middlewares/role.middleware');

router.get('/', getCategories);
router.get('/:slug', getCategoryBySlug);

router.post('/', protect, authorizeRoles('admin'), createCategory);
router.put('/:id', protect, authorizeRoles('admin'), updateCategory);
router.delete('/:id', protect, authorizeRoles('admin'), deleteCategory);

module.exports = router;