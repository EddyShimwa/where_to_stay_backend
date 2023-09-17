require('dotenv').config();

module.exports = {
    production: {
      url: 'DATABASE_URL',
      dialect: 'postgres', 
        ssl: {
          require: true,
          rejectUnauthorized: false 
      },
    },
    development: {
        dialect: 'postgres',
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    },
  };
  
