const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const { isAuth } = require('../middleware/isAuth');

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get user profile.
 *     description: Retrieve the user's profile information.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response with user profile data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 phoneNumber:
 *                   type: string
 *                 email:
 *                   type: string
 *             
 */


router.get('/user', isAuth, usersController.getUserProfile);// get user profile

module.exports = router;