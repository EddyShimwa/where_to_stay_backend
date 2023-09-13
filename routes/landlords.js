const express = require('express');
const router = express.Router();
const landlordController = require('../controllers/landlordsContoller');
const { auth, isLandLord }  = require('../middleware/isAuth');

router.post('/landlord/create', auth, isLandLord, landlordController.createLandlord);

router.get('/landlords', auth, isLandLord, landlordController.getAllLandlords) ;

router.get('/landlords/:id', auth, isLandLord, getLandlordById);

// router.put('landlords/:id', landlordController.updateLandlordById);

module.exports = router;
