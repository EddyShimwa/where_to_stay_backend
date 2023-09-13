// module.exports = (sequelize, DataTypes) => {

//     const Student = sequelize.define('Student', {
//         id: {
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true
//         },
//         firstName: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         lastName: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         password: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
// }, {
//     tableName: 'students',
//     timestamps: true},);

//     Student.associate = (models) => {
//         Student.hasMany(models.Application, {
//             foreignKey: 'student_id',
//             onDelete: 'CASCADE',
//         });
//     };

//     return Student;
// }
