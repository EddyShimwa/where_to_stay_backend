const express = require('express');
const cors = require('cors');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');
const ioMiddleware = require('./middleware/ioMiddleware').ioMiddleware;
const app = express();
const server = http.createServer(app);
const swaggerSetup = require('./swagger');

swaggerSetup(app);

const io = socketIo(server)

const port = process.env.PORT || 3001;

io.use(async (socket, next) => {
  ioMiddleware(socket);
  next();
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

// Routes
const studentRoutes = require('./routes/students');
const landlordRoutes = require('./routes/landlords');
const propertyRoutes = require('./routes/properties');
const bookingRoutes = require('./routes/bookings');
const authsRouter = require('./routes/auths');
const usersRouter = require('./routes/users');
const welcome = require('./routes/welcome');
const notificationsRoutes = require('./routes/notifications');  

// Mount routes
app.use('/', welcome);
app.use('/api', studentRoutes);
app.use('/api', landlordRoutes);
app.use('/api', propertyRoutes);
app.use('/api', bookingRoutes);
app.use('/api', authsRouter);
app.use('/api', usersRouter);
app.use('/api', notificationsRoutes);

app.use('/public', express.static(path.join(__dirname, 'public')));

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
