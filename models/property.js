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
    location: {
      type: DataTypes.STRING,
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

    isAvailable: {
      type: DataTypes.BOOLEAN,
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
        foreignKey: 'propertyId', 
        onDelete: 'CASCADE',
    });
};
    return Property;
  } 


