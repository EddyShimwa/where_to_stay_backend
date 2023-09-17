
module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define('Booking', {
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
        tableName: 'bookings',
        timestamps: true,
    });

    Booking.associate = (models) => {
        Booking.belongsTo(models.User, { 
            foreignKey: 'userId', 
            onDelete: 'CASCADE',
        });
        Booking.belongsTo(models.Property, {
            foreignKey: 'propertyId', 
            onDelete: 'CASCADE',
        });
    };

    return Booking;
};



