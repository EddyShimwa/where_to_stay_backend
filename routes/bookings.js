const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/bookingsController');
const { isAuth, isStudent } = require('../middleware/isAuth');
const ioMiddleware = require('../middleware/ioMiddleware');

router.post('/bookings/create', isAuth, isStudent, ioMiddleware, bookingsController.createBooking);
router.delete('/bookings/cancel/:id', isAuth, isStudent, ioMiddleware, bookingsController.cancelBooking);

module.exports = router;
