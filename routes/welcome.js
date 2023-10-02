const express = require('express');

const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Welcome route.
 *     description: Returns a welcome message for the WhereToStay API.
 *     responses:
 *       200:
 *         description: Successful response with a welcome message.
 *         content:
 *           application/json:
 *             example:
 *               message: Welcome to WhereToStay API
*/
router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to WhereToStay API' 
    });
});// welcome route

module.exports = router;