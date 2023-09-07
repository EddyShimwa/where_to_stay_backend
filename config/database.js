const pgp = require('pg-promise')();
const dotenv = require('dotenv');
dotenv.config();

const db = pgp({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Test the database connection
db.any('SELECT 1')
  .then(() => {
    console.log('Connected to PostgreSQL');
  })
  .catch((err) => {
    console.error('Error connecting to PostgreSQL:', err);
  });

module.exports = db;

































// const {Client} = require('pg');

// const client = new Client({
//     host: 'localhost',
//     user: "postgres",
//     password: "password",
//     port: 5432,
//     database: "postgres" 
// });

// client.connect(); 

// client.query('SELECT * FROM users', (err, res) => {
//     if (!err) {
//         console.log(res.rows);
//     }
//         else {
//         console.log(err.message);

//     }
//     client.end();
// });