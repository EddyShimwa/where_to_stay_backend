const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io')

const app = express();
const server = http.createServer(app);

const io = socketIo(server)

const port = process.env.PORT || 3001;

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

// Mount routes
app.use('/', welcome);
app.use('/api', studentRoutes);
app.use('/api', landlordRoutes);
app.use('/api', propertyRoutes);
app.use('/api', bookingRoutes);
app.use('/api', authsRouter);
app.use('/api', usersRouter);


server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
