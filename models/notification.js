module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define('Notification', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        recipientUserId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        isRead: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },

    }, {
        tableName: 'notifications',
        timestamps: true,
    });

    // Associations
    Notification.associate = (models) => {
        Notification.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: 'CASCADE',
            as: 'user',
        });
    }
    
    Notification.prototype.isRecipientLandlord = async function() {
        const recipientUser = await this.getUser();
        return recipientUser.role === 'landlord';
    }
    return Notification;
};