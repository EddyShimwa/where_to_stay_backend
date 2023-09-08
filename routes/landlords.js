const express = require('express');
const router = express.Router();
const landlordController = require('../controllers/landlordsContoller');

// Route to create a new landlord accountt
router.post('/create', landlordController.createLandlord);

// Route to retrieve all landlords
router.get('/landlords', landlordController.getAllLandlords) ;

// Route to retrieve landlord details by ID
router.get('/landlords/:id', landlordController.getLandlordById);

// Route to update landlord information by ID
// router.put('landlords/:id', landlordController.updateLandlordById);

module.exports = router;
