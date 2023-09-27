const db = require('../models');

const User = db.User;

const getAllStudents = async (req, res) => {
  
    try {
        const students = await User.findAll({
          where: {
            role: 'student',
          },
          attributes: ['id', 'firstName', 'lastName', 'email', 'role'], // Add other attributes you want to include
        });
    
        res.status(200).json(students);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

const getStudentById = async (req, res) => {
  
      const studentId = req.params.id;
      try {
        const student = await User.findOne({
          where: {
            id: studentId,
            role: 'student',
          },
          attributes: ['id', 'firstName', 'lastName', 'email', 'role'], // Add other attributes you want to include
        });
    
        if (!student) {
          res.status(404).json({ error: 'Student not found' });
        } else {
          res.status(200).json(student);
        }
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

module.exports = {
   getAllStudents,
   getStudentById
  }



