const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload.middleware');
const { protect } = require('../middlewares/auth.middleware');
const ApiResponse = require('../utils/apiResponse');

// Single image upload endpoint
router.post('/', protect, (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      console.error('Upload Error:', err.message);
      return ApiResponse.error(res, 400, err.message || 'Image upload failed');
    }
    if (!req.file) {
      return ApiResponse.error(res, 400, 'Please upload an image file');
    }
    return ApiResponse.success(res, 200, 'Image uploaded successfully', {
      url: req.file.path || req.file.url || req.file.secure_url,
    });
  });
});

module.exports = router;