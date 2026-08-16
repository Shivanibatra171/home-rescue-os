const express = require('express');
const router = express.Router();

const {
  getMyNotifications, markAsRead, markAllAsRead, deleteNotification,
} = require('../controllers/notification.controller');
const { protect } = require('../middlewares/auth.middleware');

router.use(protect);

router.get('/', getMyNotifications);
router.patch('/:id/read', markAsRead);
router.patch('/mark-all-read', markAllAsRead);
router.delete('/:id', deleteNotification);

module.exports = router;