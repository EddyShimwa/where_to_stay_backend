const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentsController');

const { Student } = require('../models/student');

// students routes
router.get('/students', studentController.getAllStudents); 

router.get('/students/:id', studentController.getStudentById); 

router.post('/students', studentController.createStudent); 
module.exports = router;