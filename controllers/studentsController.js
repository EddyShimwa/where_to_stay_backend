const db = require('../models');

const Student = db.Student;

const createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json("Internal server error");
  }
};

// Retrieve all Students from the database.
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll();
    res.json(students);
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json("Internal server error");
  }
};

// Find a single Student with an id
const getStudentById = async (req, res) => {
  const id = req.params.id;
  try {
    const student = await Student.findByPk(id);
    if (student === null) {
      return res.status(404).json("Student not found");
    }
    res.json(student);
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json("Internal server error");
  }
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById
};