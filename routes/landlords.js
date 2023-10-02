const express = require('express');
const router = express.Router();
const landlordController = require('../controllers/landlordsContoller');
const { isLandLord, isAuth }  = require('../middleware/isAuth');


router.get('/landlords', isAuth, landlordController.getAllLandlords) ; // get all landlords

router.get('/landlords/:id', isAuth, isLandLord, landlordController.getLandlordById); // get landlord by id

/**
 * @swagger
 * /studentsBooked/{id}:
 *   get:
 *     summary: Get students booked by property ID.
 *     description: Retrieve a list of students who have booked a property by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the property to retrieve booked students.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with a list of students who booked the property.
 *         content:
 *           application/json:
 *             // Define the response schema for students who booked the property
 */

router.get('/studentsBooked/:id', isAuth, isLandLord, landlordController.getStudentsBooked);// get students booked by property id

module.exports = router;
