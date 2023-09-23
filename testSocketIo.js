const io = require('socket.io-client');

// Replace with your Socket.IO server address
const socket = io('http://localhost:3001');

// Listen for the 'connect' event to confirm the socket connection
socket.on('connect', () => {
  console.log('Connected to the Socket.IO server');

  // Simulate a new booking event
  const notificationContent = 'New booking notification content';
  socket.emit('newBooking', notificationContent);

  // Listen for the 'newBooking' event
  socket.on('newBooking', (notificationContent) => {
    console.log('Received new booking notification:', notificationContent);
    // Handle the notification as needed
  });
});

// Handle any errors
socket.on('error', (error) => {
  console.error('Socket.IO error:', error);
});
