const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentsController');
const { isAuth, isStudent } = require('../middleware/isAuth');

// students routes
router.get('/students', isAuth, studentController.getAllStudents); // get all students
router.get('/students/:id', isAuth, isStudent, studentController.getStudentById); // get student by id


module.exports = router;