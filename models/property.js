
module.exports = (sequelize, DataTypes) => { 
  const Property = sequelize.define('Property', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    property_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    property_description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    property_price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    property_location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    property_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    property_image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    property_owner: {
      type: DataTypes.STRING,
      allowNull: false
    },
    property_status: DataTypes.STRING,
    property_bedrooms: {
      type: DataTypes.INTEGER,
      allowNull: false
    },  
    property_created_on: {
      type: DataTypes.DATE,
      allowNull: false
    },

  }, {
    tableName: 'properties',
    timestamps: true,
  }, {} );
    Property.associate = (models) => {
        Property.belongsTo(models.Landlord, {
            foreignKey: 'landlord_id',
            onDelete: 'CASCADE',
        });
        Property.hasMany(models.Application, {
            foreignKey: 'property_id',
            onDelete: 'CASCADE',
        });
    };
  } 

