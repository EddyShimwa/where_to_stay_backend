module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        tableName: 'Users',
        timestamps: true,
    },);
 

    if (User.role === 'landlord') {
        User.hasMany(models.Property, {
            foreignKey: 'id',
            onDelete: 'CASCADE',
        });
    } else if (User.role === 'student') {
        User.hasMany(models.Application, {
            foreignKey: 'id',
            onDelete: 'CASCADE',
        });
    }
 
    return User;
 };