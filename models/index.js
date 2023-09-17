const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    dialect: 'postgres',
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        }
    },
});

    sequelize.authenticate().then(() => {
        console.log('Database connected successfully')
    }).catch((err) => {
        console.log(err)
    })

    const db = {};

    db.Sequelize = Sequelize;
    db.sequelize = sequelize;

 //connection to models
    db.User = require('../models/user')(sequelize, DataTypes);
    // db.Student = require('../models/student')(sequelize, DataTypes);
    // db.Landlord = require('./landlord')(sequelize, DataTypes);
    db.Property = require('../models/property')(sequelize, DataTypes);
    db.booking = require('../models/booking')(sequelize, DataTypes);

    module.exports = db;
