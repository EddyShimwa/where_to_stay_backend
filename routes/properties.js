const express = require('express');
const router = express.Router();
const propertiesController = require('../controllers/propertiesController');
const { isAuth, isLandLord } = require('../middleware/isAuth');

/**
 * @swagger
 * /properties/create:
 *   post:
 *     summary: Create a new property.
 *     description: Create a new property listing.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               location:
 *                 type: string
 *               property_type:
 *                 type: string
 *               imageUrls:
 *                 type: array
 *                 items:
 *                   type: string
 *               isAvailable:
 *                 type: boolean
 *               number_rooms:
 *                 type: integer
 *               number_of_bathrooms:
 *                 type: integer
 *           example:
 *             description: "luxurious apartment with a view"
 *             price: 1200
 *             location: "123 Main St, City, State"
 *             property_type: "studio"
 *             imageUrls: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
 *             isAvailable: true
 *             number_rooms: 1
 *             number_of_bathrooms: 2
 *     responses:
 *       200:
 *         description: Successful response indicating the property has been created.
 *         content:
 *           application/json:
 *             // Define the response schema if applicable
 */


router.post('/properties/create', isAuth, isLandLord, propertiesController.createProperty); // create property

/**
 * @swagger
 * /properties/all:
 *   get:
 *     summary: Get all properties.
 *     description: Retrieve a list of all properties.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response with a list of properties.
 *         content:
 *           application/json:
 *             // Define the response schema for the list of properties
 */

router.get('/properties/all', propertiesController.getAllProperties); // get all properties

/**
 * @swagger
 * /properties/{id}:
 *   get:
 *     summary: Get property by ID.
 *     description: Retrieve property details by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the property to retrieve.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with property details.
 *         content:
 *           application/json:
 *             // Define the response schema for a property
 */

router.get('/properties/:id', propertiesController.getPropertyById); // get property by id

/**
 * @swagger
 * /my-properties:
 *   get:
 *     summary: Get landlord's properties.
 *     description: Retrieve properties owned by the authenticated landlord.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response with properties owned by the landlord.
 *         content:
 *           application/json:
 *             // Define the response schema for properties owned by a landlord
 */

router.get('/my-properties', isAuth, isLandLord, propertiesController.getLandlordProperties); // get landlord's properties

/**
 * @swagger
 * /properties/{id}:
 *   put:
 *     summary: Update a property.
 *     description: Update the details of a property.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the property to update.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             // Define the request body schema for updating a property
 *     responses:
 *       200:
 *         description: Successful response indicating the property has been updated.
 *         content:
 *           application/json:
 *             // Define the response schema if applicable
 */

router.put('/properties/:id', isAuth, isLandLord, propertiesController.updateProperty); // update property

/**
 * @swagger
 * /properties/delete/{id}:
 *   delete:
 *     summary: Delete a property.
 *     description: Delete a property by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the property to delete.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response indicating the property has been deleted.
 *         content:
 *           application/json:
 *             // Define the response schema if applicable
 */

router.delete('/properties/delete/:id', isAuth, isLandLord, propertiesController.deleteProperty); // delete property


module.exports = router;