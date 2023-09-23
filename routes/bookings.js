const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/bookingsController');
const { isAuth, isStudent } = require('../middleware/isAuth');

router.post('/bookings/create', isAuth, isStudent, bookingsController.createBooking);
router.delete('/bookings/cancel/:id', isAuth, isStudent, bookingsController.cancelBooking);

module.exports = router;
