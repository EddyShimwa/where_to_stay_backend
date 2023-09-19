// models/booking.js
module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define('Booking', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      student_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      property_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, {
      tableName: 'bookings',
      timestamps: true,
    });
  
    Booking.associate = (models) => {
      Booking.belongsTo(models.User, {
        foreignKey: 'student_id',
        targetKey: 'id',
        onDelete: 'CASCADE',
        constraints: false, 
        scope: {
          role: 'student', 
        },
      });
      Booking.belongsTo(models.Property, {
        foreignKey: 'property_id',
        onDelete: 'CASCADE',
        as: 'property',
      });
    };
  
    return Booking;
  };
  