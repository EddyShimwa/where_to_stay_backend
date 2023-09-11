const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationsController');


router.post('/application/create', applicationController.createApplication);


router.get('/applications', applicationController.getAllApplications) ;

router.get('applications/:id', applicationController.getApplicationById);

// router.put('/:id', applicationController.updateapplicationById);

module.exports = router;
