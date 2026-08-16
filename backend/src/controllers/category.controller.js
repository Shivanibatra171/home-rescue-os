const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const Category = require('../models/Category');

// @route GET /api/categories
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({ isActive: true }).sort({ createdAt: 1 });
  return ApiResponse.success(res, 200, 'Categories fetched', { categories });
});

// @route GET /api/categories/:slug
const getCategoryBySlug = asyncHandler(async (req, res) => {
  const category = await Category.findOne({ slug: req.params.slug });
  if (!category) {
    return ApiResponse.error(res, 404, 'Category not found');
  }
  return ApiResponse.success(res, 200, 'Category fetched', { category });
});

// @route POST /api/categories (admin only)
const createCategory = asyncHandler(async (req, res) => {
  const { name, description, startingPrice, icon, color } = req.body;

  const slug = name.toLowerCase().trim().replace(/\s+/g, '-');

  const existing = await Category.findOne({ slug });
  if (existing) {
    return ApiResponse.error(res, 400, 'A category with this name already exists');
  }

  const category = await Category.create({ name, slug, description, startingPrice, icon, color });
  return ApiResponse.success(res, 201, 'Category created', { category });
});

// @route PUT /api/categories/:id (admin only)
const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return ApiResponse.error(res, 404, 'Category not found');
  }

  const { name, description, startingPrice, icon, color } = req.body;

  if (name) {
    category.name = name;
    category.slug = name.toLowerCase().trim().replace(/\s+/g, '-');
  }
  if (description !== undefined) category.description = description;
  if (startingPrice !== undefined) category.startingPrice = startingPrice;
  if (icon) category.icon = icon;
  if (color) category.color = color;

  await category.save();
  return ApiResponse.success(res, 200, 'Category updated', { category });
});

// @route DELETE /api/categories/:id (admin only)
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return ApiResponse.error(res, 404, 'Category not found');
  }
  await category.deleteOne();
  return ApiResponse.success(res, 200, 'Category deleted', null);
});

module.exports = { getCategories, getCategoryBySlug, createCategory, updateCategory, deleteCategory };