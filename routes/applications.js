const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationsController');

// Route to create a new application account
router.post('/create', applicationController.createApplication);

// Route to retrieve all applications
router.get('/', applicationController.getAllApplications) ;

// Route to retrieve application details by ID
router.get('/:id', applicationController.getApplicationById);

// Route to update application information by ID
router.put('/:id', applicationController.updateapplicationById);

module.exports = router;
