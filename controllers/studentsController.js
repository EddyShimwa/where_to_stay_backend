const pool = require('../config/database');

const getAllStudents = async (req, res) => {
  try {
    const query = 'SELECT * FROM students';
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error detected' });
  }
};

const createStudent = async (req, res) => {
  const { username, campus } = req.body;
  try {
    const query = 'INSERT INTO students (username, campus) VALUES ($1, $2) RETURNING *';
    const values = [username, campus];
    const { rows } = await pool.query(query, values);
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getStudentById = async (req, res) => {
  const studentId = req.params.id;
  try {
    const query = 'SELECT * FROM students WHERE id = $1';
    const values = [studentId];
    const { rows } = await pool.query(query, values);
    if (rows.length === 0) {
      res.status(404).json({ error: 'Student not found' });
    } else {
      res.json(rows[0]);
    }
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