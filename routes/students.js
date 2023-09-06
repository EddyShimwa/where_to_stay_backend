const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentsController');

// students routes
router.get('/students', userController.getAllStudents); // Route to retrieve all students

router.get('/students/:id', studentController.getStudentById); // Route to retrieve student details by ID

router.post('/students', studentController.createStudent);  // Route to create a new student account

module.exports = router;