require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false
  },
  test: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    logging: false
  },
  production: {
    url: process.DATABASE_URL,
    dialect: 'postgres',
    logging: false
  },
};