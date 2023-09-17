module.exports = {
    production: {
      use_env_variable: 'DATABASE_URL',
      dialect: 'postgres', // Specify the dialect (in this case, PostgreSQL)
      logging: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        }
      }
    }
  };
  