const express = require('express');
const router = express.Router();
const propertiesController = require('../controllers/propertiesController');
const { isAuth, isLandLord } = require('../middleware/isAuth');

router.post('/properties/create', isAuth, isLandLord, propertiesController.createProperty);

router.get('/properties/all', propertiesController.getAllProperties); 

router.get('/properties/:id', propertiesController.getPropertyById); 

router.put('properties/:id',isAuth, isLandLord, propertiesController.updateProperty);

router.delete('properties/:id', isAuth, isLandLord, propertiesController.deleteProperty); 

module.exports = router;