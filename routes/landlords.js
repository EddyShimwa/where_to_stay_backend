const express = require('express');
const router = express.Router();
const landlordController = require('../controllers/landlordsContoller');

// Route to create a new landlord account
router.post('/create', landlordController.createLandlord);

// Route to retrieve all landlords
router.get('/', landlordController.getAllLandlords) ;

// Route to retrieve landlord details by ID
router.get('/:id', landlordController.getLandlordById);

// Route to update landlord information by ID
// router.put('/:id', landlordController.updateLandlordById);

module.exports = router;
