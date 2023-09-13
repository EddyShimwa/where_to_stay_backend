// module.exports = (sequelize, DataTypes) => {
//    const Landlord = sequelize.define('Landlord', {
//        id: {
//            type: DataTypes.INTEGER,
//            primaryKey: true,
//            autoIncrement: true
//        },
//        landlord_name: {
//            type: DataTypes.STRING,
//            allowNull: false
//        },
//        landlord_email: {
//            type: DataTypes.STRING,
//            allowNull: false
//        },
//        landlord_password: {
//            type: DataTypes.STRING,
//            allowNull: false
//        },
//    }, {
//        tableName: 'landlords',
//        timestamps: true,
//    },);

//     Landlord.associate = (models) => {
//          Landlord.hasMany(models.Property, {
//               foreignKey: 'landlord_id',
//               onDelete: 'CASCADE',
//          });
//     };

// };