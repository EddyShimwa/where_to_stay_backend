// config/config.js

module.exports = {
    production: {
      dialect: 'postgres', 
        ssl: {
          require: true,
          rejectUnauthorized: false 
      },
      url: process.env.DATABASE_URL,
    },

  };
  
