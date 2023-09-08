const express = require('express');
const router = express.Router();
const propertiesController = require('../controllers/propertiesController');

router.post('/properties/create', propertiesController.createProperty); // Route to create a new landlord account

router.get('/properties', propertiesController.getAllProperties) ; // Route to retrieve all landlords

router.get('properties/:id', propertiesController.getPropertyById); // Route to retrieve landlord details by ID

// router.put('/:id', propertiesController.updatePropertyById); // Route to update landlord information by ID

// router.delete('/:id', propertiesController.deletePropertyById); // Route to delete landlord information by ID

module.exports = router;