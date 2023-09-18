
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull:false
        },
        
        lastName: {
            type: DataTypes.STRING,
            allowNull:false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
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
        tableName: 'users',
        timestamps: true,
    });

    // Associations
    User.associate = (models) => {
       if(models.role === 'student'){
        User.hasMany(models.Booking, {
            foreignKey: 'userId', 
            onDelete: 'CASCADE',
        });
       }
         else if(models.role === 'landlord'){
            User.hasMany(models.Property, {
                foreignKey: 'userId', 
                onDelete: 'CASCADE',
            });
         }
    };

    return User;
};


