const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const provideToken = (id, email) => {
  const token = jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
}

module.exports = provideToken;