const express = require('express');
const router = express.Router();

const {
  getDashboardStats, getAllUsers, deleteUser,
  getAllWorkers, approveWorker, rejectWorker, deleteWorker,
  getMessages, markMessageRead, deleteMessage,
} = require('../controllers/admin.controller');
const { protect } = require('../middlewares/auth.middleware');
const { authorizeRoles } = require('../middlewares/role.middleware');

router.use(protect, authorizeRoles('admin'));

router.get('/dashboard', getDashboardStats);

router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);

router.get('/workers', getAllWorkers);
router.put('/workers/:id/approve', approveWorker);
router.put('/workers/:id/reject', rejectWorker);
router.delete('/workers/:id', deleteWorker);

router.get('/messages', getMessages);
router.put('/messages/:id/read', markMessageRead);
router.delete('/messages/:id', deleteMessage);

module.exports = router;