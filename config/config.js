

require('dotenv').config();

module.exports = {
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: 'postgres',
        logging: false,
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false, 
          },
        },
      },
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: 'postgres',
        logging: false
    },

    test: {
        username: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host:process.env.DB_HOST,
        dialect: 'postgres',
        logging: false
    },
    
}