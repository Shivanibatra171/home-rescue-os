const express = require('express');
const router = express.Router();

const {
  registerUser, loginUser, registerWorker, loginWorker, loginAdmin, getMe,
} = require('../controllers/auth.controller');
const { protect } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const {
  userRegisterValidator, workerRegisterValidator, loginValidator,
} = require('../validators/auth.validator');

router.post('/user/register', userRegisterValidator, validate, registerUser);
router.post('/user/login', loginValidator, validate, loginUser);

router.post('/worker/register', workerRegisterValidator, validate, registerWorker);
router.post('/worker/login', loginValidator, validate, loginWorker);

router.post('/admin/login', loginValidator, validate, loginAdmin);

router.get('/me', protect, getMe);

module.exports = router;