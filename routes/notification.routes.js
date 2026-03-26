const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/auth.middleware');
const notificationController = require('../controllers/notification.controller');

//  Employee notifications
router.get('/my', protect, notificationController.getMyNotifications);
router.put('/:id/read', protect, notificationController.markAsRead);

module.exports = router;
