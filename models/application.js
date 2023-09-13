
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
        application_status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        application_created_on: {
            type: DataTypes.DATE,
            allowNull: false
        },
    }, {
        tableName: 'applications',
        timestamps: true,
    },);

    Application.associate = (models) => {
        Application.belongsTo(models.Student, {
            foreignKey: 'id',
            onDelete: 'CASCADE',
        });
        Application.belongsTo(models.Property, {
            foreignKey: 'id',
            onDelete: 'CASCADE',
        });
    };

    return Application;
};
