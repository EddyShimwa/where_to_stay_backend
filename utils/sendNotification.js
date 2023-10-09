const   connectedUsers = require( '../middleware/ioMiddleware').connectedUsers

const sendNotif = (notification, req, res) => {
  try {
    if (connectedUsers[notification.recipientUserId]) {
      connectedUsers[notification.recipientUserId].forEach(async (el) => {
        await req.io.to(el).emit('new_notification', JSON.stringify(notification));
      });
    }

  } catch (error) {
    return res.status(500).json({ error: error.message});
  }
}

module.exports = sendNotif;