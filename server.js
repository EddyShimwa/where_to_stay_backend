const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors'); 
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(cors({
    origin: 'http://localhost:3001', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
  }));


//Routes
const studentRoutes = require('./routes/students');
const landlordRoutes = require('./routes/landlords');
const propertyRoutes = require('./routes/properties');
const bookingRoutes = require('./routes/bookings');
const authsRouter = require('./routes/auths');
const welcome = require('./routes/welcome');
// using routes
app.get('/', welcome);
app.use('/api', studentRoutes);
app.use('/api', landlordRoutes);
app.use('/api', propertyRoutes);
app.use('/api', bookingRoutes);
app.use('/api', authsRouter);


app.listen(port, () => console.log(`Server running on port ${port}/api`));


