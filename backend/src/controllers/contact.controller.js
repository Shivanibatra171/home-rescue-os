const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const ContactMessage = require('../models/ContactMessage');

// @route POST /api/contact
const submitContactMessage = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return ApiResponse.error(res, 400, 'All fields are required');
  }

  const contactMessage = await ContactMessage.create({ name, email, subject, message });
  return ApiResponse.success(res, 201, 'Message sent successfully', { contactMessage });
});

module.exports = { submitContactMessage };