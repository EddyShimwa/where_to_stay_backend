const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

// Create a new PostgreSQL pool
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Test the database connection
pool.connect()
  .then(() => {
    console.log('Connected to PostgreSQL SuccessFully!');
  })
  .catch((err) => {
    console.error('Error connecting to PostgreSQL:', err);
  });

module.exports = pool;
