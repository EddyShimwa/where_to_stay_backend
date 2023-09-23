const express = require('express');
//socket.io
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const cors = require('cors'); 
const port = process.env.PORT || 3001;
const studentRoutes = require('./routes/students');
const landlordRoutes = require('./routes/landlords');
const propertyRoutes = require('./routes/properties');
const bookingRoutes = require('./routes/bookings');
const authsRouter = require('./routes/auths');
const welcome = require('./routes/welcome');

//socket.io
const server = http.createServer(app);
const io = socketIo(server);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({
    origin: 'http://localhost:3001', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
  }));


//Routes

// using routes
app.get('/', welcome);
app.use('/api', studentRoutes);
app.use('/api', landlordRoutes);
app.use('/api', propertyRoutes);
app.use('/api', bookingRoutes);
app.use('/api', authsRouter);


app.listen(port, () => console.log(`Server running on port ${port}/api`));


