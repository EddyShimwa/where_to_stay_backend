const {Sequelize, DataTypes} = require('sequelize');
const dotenv = require('dotenv');

const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    dialect: 'postgres',
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    logging: false,
    });

    // Test the database connection

    sequelize.authenticate().then(() => {
        console.log(`Database connected to discover`)
    }).catch((err) => {
        console.log(err)
    })

    const db = {};

    db.Sequelize = Sequelize;
    db.sequelize = sequelize;

 //conncetion to models

    db.Student = require('../models/student')(sequelize, DataTypes);
    db.Landlord = require('../models/landlord')(sequelize, DataTypes);
    db.Property = require('../models/property')(sequelize, DataTypes);
    db.Application = require('../models/application')(sequelize, DataTypes);