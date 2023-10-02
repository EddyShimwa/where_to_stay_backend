const express = require('express');
const router = express.Router();
const authsController = require('../controllers/authsController');

router.post('/auths/signup', authsController.registerUser); // register user
router.post('/auths/login', authsController.login); // login user

module.exports = router;