const db = require('../config/database')

const getAllStudents = async (req, res) => {
  try {
    const students = await db.any('SELECT * FROM students');
    res.json(students);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createStudent = async (req, res) => {
  const { username, email } = req.body;
  try {
    const newStudent = await db.one(
      'INSERT INTO students (username, email) VALUES ($1, $2) RETURNING *',
      [username, email]
    );
    res.status(201).json(newStudent);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getStudentById = async (req, res) => {
    const studentId = req.params.id;
    try {
        const student = await db.one('SELECT * FROM students WHERE id = $1', [studentId]);
        res.json(student);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
  getAllStudents,
  createStudent,
  getStudentById
};

// Implement other controller functions for updating, deleting, etc.
