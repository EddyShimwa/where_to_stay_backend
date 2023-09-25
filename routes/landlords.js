const express = require('express');
const router = express.Router();
const landlordController = require('../controllers/landlordsContoller');
const { isLandLord, isAuth }  = require('../middleware/isAuth');


router.get('/landlords', isAuth, landlordController.getAllLandlords) ;

router.get('/landlords/:id', isAuth, isLandLord, landlordController.getLandlordById);

router.get('/properties/:propertyId/students', isAuth, isLandLord, landlordController.getStudentsForProperty);

module.exports = router;
