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
    }
    }
