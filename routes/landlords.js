const express = require('express');
const router = express.Router();
const landlordController = require('../controllers/landlordsContoller');

router.post('/applications/create', landlordController.createLandlord);

router.get('/landlords', landlordController.getAllLandlords) ;

router.get('/landlords/:id', landlordController.getLandlordById);

// router.put('landlords/:id', landlordController.updateLandlordById);

module.exports = router;
