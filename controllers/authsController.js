const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const db = require('../models');
const jwt = require('jsonwebtoken');
dotenv.config();

const User = db.User;

// const User = db.User;
const provideToken = (id, email) => {
  const token = jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: '1d' });
  console.log(token);
  return "Bearer " + token;
}

// Sign up
const registerUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      role,
    } = req.body;

    // Check if a User with the given email exists

    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    if (!password || password.trim() === '') {
      return res.status(400).json({ error: 'Password is required' });
    }

    const hashedPassword = bcrypt.hashSync(password.trim(), Number(process.env.SALT_ROUNDS));
    const user = await User.create({
      firstName: firstName.toLowerCase(),
      lastName: lastName.toLowerCase(),
      email,
      password: hashedPassword,
      role: role.toLowerCase(),
    });

    const userResponse = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };

    const token = provideToken(user.id, email);

    return res.status(201).json({ message: 'Student registered successfully', userResponse, token });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Internal Server Error detected' });
  }
};

// Login route
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email,
      },
      attributes: ['id', 'email', 'password', 'role'],
    });

    if (!user) {
      return res.status(401).json({ error: 'Incorrect email or password' });
    }
    // check if password is correct
    if (bcrypt.compareSync(password, user.password)) {
      const { id, role } = user.dataValues;
      const token = provideToken(id, email);
      return res.status(200).json({ message: `${role} successfuly logged in`, token });
      // localStorage.setItem('token', token);
      
    }

    return res.status(401).json({ error: 'incorrect email or password' });
  } catch (error) {
    return res.status(500).json({ error: 'something went wrong' });
  }
};

module.exports = {
  registerUser,
  login,
};
