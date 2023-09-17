

require('dotenv').config();

module.exports = {
    production: {
        username: eddy,
        port: 5432,
        password: '1Gs9CXEwJo3JIsM0I6PrnPJvlkGJDwAA',
        database: wheretostay,
        host: dpg-ck23i3o21fec73b49nkg-a,
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