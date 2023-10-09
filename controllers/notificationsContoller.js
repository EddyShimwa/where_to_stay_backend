const db = require('../models')
const Notification = db.Notification;

const createNotification = async (req, res) => {
    const { content, recipientUserId } = req.body;
    try {
        const notification = await Notification.create({
            content,
            recipientUserId
        });
        res.status(201).json(notification);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const markNotificationAsRead = async (req, res) => {
    const notificationId = req.params.id; 

    try {
        const notification = await Notification.findByPk(notificationId);

        if (!notification) {
            return res.status(404).json({ error: 'Notification not found' });
        }

        notification.isRead = true;
        await notification.save();

        res.status(200).json({ message: 'Notification marked as read' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getAllNotifications = async (req, res) => {
    const userId = req.user.id;
    try {
        const notifications = await Notification.findAll({
            where: {
                recipientUserId: userId
            },
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json(notifications);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    createNotification,
    markNotificationAsRead,
    getAllNotifications
}