module.exports = {
    production: {
        use_env_variable: 'DATABASE_URL', 
        dialect: 'postgres',
        logging: false,
        dialectOptions: {
            ssl: {
              require: true,
              rejectUnauthorized: false
            }
        
    },
}
};