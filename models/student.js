const pool = require('../config/database');

const getAllStudents = async () => {
  const query = 'SELECT * FROM students';
  const { rows } = await pool.query(query);
  return rows;
};

const createStudent = async (username, campus) => {
  const query = 'INSERT INTO students (username, campus) VALUES ($1, $2) RETURNING *';
  const values = [username, campus];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const getStudentById = async (id) => {
  const query = 'SELECT * FROM students WHERE id = $1';
  const values = [id];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

module.exports = {
  getAllStudents,
  createStudent,
  getStudentById,
};
