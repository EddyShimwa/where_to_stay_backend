const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
const studentRoutes = require('./routes/students');
const landlordRoutes = require('./routes/landlords');
const propertyRoutes = require('./routes/properties');
// const applicationRoutes = require('./routes/applications');
const authsRouter = require('./routes/auths');

// using routes
app.use('/api', studentRoutes);
app.use('/api', landlordRoutes);
app.use('/api', propertyRoutes);
// app.use('/api', applicationRoutes)
app.use('/api', authsRouter);


app.listen(port, () => console.log(`Server running on port ${port}...`));


