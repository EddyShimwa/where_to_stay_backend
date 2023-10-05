module.exports = (sequelize, DataTypes) => { 
  const Property = sequelize.define('Property', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    street_address: {
      type: DataTypes.STRING,
      allowNull: false
    },

    location: {
      type: DataTypes.ARRAY(DataTypes.FLOAT),
      allowNull: false
    },
    property_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imageUrls: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },

    number_rooms: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    number_of_bathrooms: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amenities: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    bookings_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }

  }, {
    tableName: 'Properties',
    timestamps: true,
  },);

  Property.associate = (models) => {
    Property.belongsTo(models.User, { 
        foreignKey: 'userId', 
        onDelete: 'CASCADE',
        
    });
    Property.hasMany(models.Booking, {
        foreignKey: 'property_id', 
        onDelete: 'CASCADE',
        as: 'bookings',
    });
};
    return Property;
  } 


