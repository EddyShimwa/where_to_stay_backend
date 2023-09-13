const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentsController');
const { isAuth, isStudent, } = require('../middleware/isAuth');

// students routes
router.get('/students', isAuth, isStudent, studentController.getAllStudents); 

router.get('/students/:id', isAuth, isStudent, studentController.getStudentById); 

router.post('/students', isAuth, isStudent, studentController.createStudent); 

module.exports = router;