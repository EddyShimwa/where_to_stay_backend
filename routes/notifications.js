const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationsContoller');
const { isAuth } = require('../middleware/isAuth');

// notification routes
router.get('/notifications', isAuth, notificationController.getAllNotifications);
router.post('/notifications', isAuth, notificationController.createNotification); 
router.put('/notifications/:id', isAuth, notificationController.markNotificationAsRead);

module.exports = router;