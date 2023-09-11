const bycrpt = require('bcryptjs');
const dotenv = require('dotenv');

const pool = require('../config/database');

// import { provideToken } from '../utils/tokenHandler';

dotenv.config();

 const registerUser = async (req, res) => {
    try {
      const query = '';
      const {
        firstName,
        lastName,
        email,
        password,
      } = req.body;
      const existingUser = await Pool.findOne({
        where: { email }
      });

      if (existingUser) {
        return res.status(500).json({ error: 'Email already exists' })
      }
      const hashedPassword = bcrypt.hashSync(password.trim(), Number(process.env.passwordHashSalt));
      const user = await Pool.User.create({
        id: uuid(),
        firstName: firstName.toLowerCase(),
        lastName: lastName.toLowerCase(),
        email,
        password: hashedPassword,
        role: 'requester',
      });
      const token = provideToken(user.id, user.isVerified, email, user.role);
      return res.status(201).json({ message: 'user registered successfully', user, token }) ;

    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error detected' })
    }
  }

  const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Pool.User.findOne({
        where: {
          email,
        },
        attributes: ['id', 'email', 'password', 'isVerified', 'role'],
      });
      if (!user) {
        return res.status(401).json({ error: 'Incorrect email or password' })
      }
      if (bcrypt.compareSync(password, user.password)) {
        const { id, isVerified, role } = user.dataValues;
        const token = provideToken(id, isVerified, email, role);
        localStorage.setItem('token', token);
        return res.status(200).json({ error: 'user successfully logged in' });
      }
      return res.status(401).json({ error: 'Error logging in' });
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error detected' });
    }
  }

  module.exports = {
    registerUser,
    login,
  }

