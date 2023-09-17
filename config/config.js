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
          host: 'localhost',
          username: 'your_username',
          password: 'your_password',
          database: 'your_database_name',
        },
      };

      
      
      
      
      
  };
  