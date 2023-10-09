const dotenv = require('dotenv');
const db = require('../models');
const jwt = require('jsonwebtoken')

dotenv.config();

const connectedUsers = {};

const ioMiddleware = async (socket) => {
  try {
    socket.emit('messageFromServer', 'this is comming from server socket')
   
    const { token } = socket.handshake.headers;
    decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.error) {
    const userInfo = await db.User.findOne({ where: { id: decoded.id } });

      // Users that are online
      if (!connectedUsers[decoded.id]) {
        connectedUsers[decoded.id] = [];
      }
      connectedUsers[decoded.id].push(socket.id);

      // // Display users that are online
      // console.log('connectedUsers', connectedUsers);
      // const userIds = Object.keys(connectedUsers);
      // const usersOnline = Promise.all(userIds.map(async (id) => {
      //   const user = await db.User.findOne({ where: { id } });
      //   return `${user.firstName} ${user.lastName}`;
      // })).then((users) => users);

      // const onlineUsers = JSON.stringify((await usersOnline).map((user) => user));
      // socket.emit('onlineUsers', onlineUsers);
      // console.log(onlineUsers)

      socket.emit('initialize', JSON.stringify({ notif: await db.Notification.findAll({ where: {
        recipientUserId: decoded.id
      },
        order: [['createdAt', 'DESC']]
      })}))

        
      socket.on('disconnect', () => {
        process.stdout.write('a user is disconnected');
        connectedUsers[decoded.id].forEach((el, index, arr) => {
          if (arr[index] === socket.id) {
            arr.splice(index, 1);
          }
        });
      });
    }
  } catch (err) {
    console.log('ERRORRRR...', err)
    if (err.name === 'JsonWebTokenError') {
      socket.emit('initialize', JSON.stringify({ error: 'The token is not provided or the token provided is an invalid token' }));
    }
  }
};

module.exports = {ioMiddleware, connectedUsers};