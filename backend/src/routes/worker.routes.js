const express = require('express');
const router = express.Router();

const {
  getWorkers, getWorkerById, updateProfile, toggleAvailability, updateSchedule,
} = require('../controllers/worker.controller');
const { protect } = require('../middlewares/auth.middleware');
const { authorizeRoles } = require('../middlewares/role.middleware');

router.get('/', getWorkers);
router.get('/:id', getWorkerById);

router.put('/profile', protect, authorizeRoles('worker'), updateProfile);
router.patch('/availability', protect, authorizeRoles('worker'), toggleAvailability);
router.put('/schedule', protect, authorizeRoles('worker'), updateSchedule);

module.exports = router;