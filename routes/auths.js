const express = require('express');
const router = express.Router();
const authsController = require('../controllers/authsController');


router.post('/auths/signup', authsController.registerStudent);
router.post('/auths/login', authsController.login);

module.exports = router;