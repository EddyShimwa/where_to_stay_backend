const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/bookingsController');
const { isAuth, isStudent, isLandLord } = require('../middleware/isAuth');

/**
 * @swagger
 * /bookings/create:
 *   post:
 *     summary: Create a new booking.
 *     description: Create a new booking for a student.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             // Define the request body schema for creating a booking
 *     responses:
 *       200:
 *         description: Successful response indicating the booking has been created.
 *         content:
 *           application/json:
 *             // Define the response schema if applicable
 */
router.post('/bookings/create', isAuth, isStudent, bookingsController.createBooking);

/**
 * @swagger
 * /my-bookings:
 *   get:
 *     summary: Get all bookings by student.
 *     description: Retrieve all bookings made by the authenticated student.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response with a list of bookings made by the student.
 *         content:
 *           application/json:
 *             // Define the response schema for bookings made by a student
 */
router.get('/my-bookings', isAuth, isStudent, bookingsController.getBookedPropertiesByStudent);

/**
 * @swagger
 * /bookings/cancel/{id}:
 *   delete:
 *     summary: Cancel a booking.
 *     description: Cancel a booking by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the booking to cancel.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response indicating the booking has been canceled.
 *         content:
 *           application/json:
 *             // Define the response schema if applicable
 */
router.delete('/bookings/cancel/:id', isAuth, isStudent, bookingsController.cancelBooking);

router.put('/bookings/approve/:id', isAuth, isLandLord, bookingsController.approveBooking);
router.put('/bookings/reject/:id', isAuth, isLandLord, bookingsController.rejectBooking);

module.exports = router;
