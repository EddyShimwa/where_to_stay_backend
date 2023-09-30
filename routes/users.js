const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const { isAuth } = require('../middleware/isAuth');

router.get('/user', isAuth, usersController.getUserProfile);

module.exports = router;