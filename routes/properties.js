const express = require('express');
const router = express.Router();
const propertiesController = require('../controllers/propertiesController');

router.post('/properties', propertiesController.createProperty);

router.get('/properties', propertiesController.getAllProperties) ; 

router.get('/properties/:id', propertiesController.getPropertyById); 

// router.put('/:id', propertiesController.updatePropertyById); // for updating property information by ID

// router.delete('/:id', propertiesController.deletePropertyById); // Route to delete landlord information by ID

module.exports = router;