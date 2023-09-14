const { application } = require("express");

module.exports = (sequelize, DataTypes) => {
    const Application = sequelize.define('Application', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        student_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        property_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        tableName: 'applications',
        timestamps: true,
    });

    Application.associate = (models) => {
        Application.belongsTo(models.User, { 
            foreignKey: 'userId', 
            onDelete: 'CASCADE',
        });
        Application.belongsTo(models.Property, {
            foreignKey: 'propertyId', 
            onDelete: 'CASCADE',
        });
    };

    return Application;
};



