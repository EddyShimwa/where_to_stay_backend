const Joi = require('joi');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const studentRoutes = require('./routes/students');
const landlordRoutes = require('./routes/landlords');
const propertyRoutes = require('./routes/properties');
// const applicationRoutes = require('./routes/applications');

// using routes
app.use('/api', studentRoutes);
app.use('/api', landlordRoutes);
app.use('/api', propertyRoutes);
app.use('/api', applicationRoutes)


app.listen(port, () => console.log(`Server running on port ${port}...`));

// function validateCourse(course) {
//     const schema = {
//         name: Joi.string().min(3).required()
//      };
//       return Joi.validate(course, schema);
// }


