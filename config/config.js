require('dotenv').config();

module.exports = {
    production: {
      dialect: 'postgres',
      use_env_variable: 'DATABASE_URL',
      logging: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        }
      }
    },
        development: {
          dialect: 'postgres',
         password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            host: process.env.DB_HOST,
      }
    }
