const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const db = require('../models');
dotenv.config();

const provideToken = (id, email) => {
  const token = jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
}

//sign up
const registerStudent = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
    } = req.body;

    // Check if a student with the given email exists
    const existingStudent = await db.Student.findOne({
      where: { email },
    });

    if (existingStudent) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    const hashedPassword = bcrypt.hashSync(password.trim(), Number(process.env.SALT_ROUNDS));
    const student = await db.Student.create({
      firstName: firstName.toLowerCase(),
      lastName: lastName.toLowerCase(),
      email,
      password: hashedPassword,
    });
const studentResponse = {
  firstName: student.firstName,
  lastName: student.lastName,
  email: student.email,
}
    const token = provideToken(student.id, email);
    return res.status(201).json({ message: 'student registered successfully', studentResponse, token });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error detected' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await db.Student.findOne({
      where: {
        email,
      },
      attributes: ['id', 'email', 'password'],
    });

    if (!student) {
      return res.status(401).json({ error: 'Incorrect email or password' });
    }

    if (bcrypt.compareSync(password, student.password)) {
      const { id } = student.dataValues;
      const token = provideToken(id, email);
      // localStorage.setItem('token', token);
      return res.status(200).json({ message: 'student successfully logged in' });
    }

    return res.status(401).json({ error: 'Error logging in' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error detected' });
  }
};

module.exports = {
  registerStudent,
  login,
};
  
































































//   const bcrypt = require('bcryptjs');
// const dotenv = require('dotenv');
// const db = require('../models');
// const provideToken = require('../utils/token');

// dotenv.config();

// const Landlord = db.landlords;
// const Student = db.Student;

// // Authenticate a student
// exports.authenticateStudent = async (req, res) => {
//   try {
//     const { student_email, student_password } = req.body;

//     // Find the student by email
//     const student = await Student.findOne({
//       where: {
//         student_email,
//       },
//       attributes: ['id', 'student_email', 'student_password'],
//     });

//     if (!student) {
//       return res.status(401).json({ error: 'Incorrect email or password' })
//     }

//     // Compare the password
//     if (bcrypt.compareSync(student_password, student.student_password)) {
//       const { id } = student.dataValues;
//       const token = provideToken(id, student_email, 'student');
//       return res.status(200).json({ message: 'Student authenticated successfully', student, token });
//     }

//     return res.status(401).json({ error: 'Incorrect email or password' });

//   } catch (error) {
//     console.error("Database error:", error);
//     return res.status(500).json({ error: 'Internal Server Error detected' });
//   }
// }

// // Authenticate a landlord
// exports.authenticateLandlord = async (req, res) => {
//   try {
//     const { landlord_email, landlord_password } = req.body;

//     // Find the landlord by email
//     const landlord = await Landlord.findOne({
//       where: {
//         landlord_email,
//       },
//       attributes: ['id', 'landlord_email', 'landlord_password'],
//     });

//     if (!landlord) {
//       return res.status(401).json({ error: 'Incorrect email or password' })
//     }

//     // Compare the password
//     if (bcrypt.compareSync(landlord_password, landlord.landlord_password)) {
//       const { id } = landlord.dataValues;
//       const token = provideToken(id, landlord_email, 'landlord');
//       return res.status(200).json({ message: 'Landlord authenticated successfully', landlord, token });
//     }

//     return res.status(401).json({ error: 'Incorrect email or password' });

//   } catch (error) {
//     console.error("Database error:", error);
//     return res.status(500).json({ error: 'Internal Server Error detected' });
//   }
// }