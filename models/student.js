module.exports = (sequelize, DataTypes) => {

    const Student = sequelize.define('Student', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        student_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        student_email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        student_password: {
            type: DataTypes.STRING,
            allowNull: false
        },
}, {
    tableName: 'students',
    timestamps: false }, );

    return Student;
}
