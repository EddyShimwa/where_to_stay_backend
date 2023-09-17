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
    },


}
