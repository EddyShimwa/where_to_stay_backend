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

    dialect: 'postgres',
    // development: {
    //    dialect: 'postgres',
    //     url: process.env.DEV_DATABASE_URL,
    //     dialectOptions: {
    //       ssl: {
    //         require: true,
    //         rejectUnauthorized: false
    //       },

    // },


}

