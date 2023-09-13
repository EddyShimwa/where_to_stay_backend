const Joi = require('joi');
const express = require('express');
const app = express();
const checkAuth = require('./middleware/isAuth')
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
const studentRoutes = require('./routes/students');
const landlordRoutes = require('./routes/landlords');
const propertyRoutes = require('./routes/properties');
const applicationRoutes = require('./routes/applications');
const authsRouter = require('./routes/auths');

// using routes
app.use('/api', checkAuth, studentRoutes);
app.use('/api', checkAuth, landlordRoutes);
app.use('/api', propertyRoutes);
app.use('/api', applicationRoutes)
app.use('/api', authsRouter);


app.listen(port, () => console.log(`Server running on port ${port}...`));

// function validateCourse(course) {
//     const schema = {
//         name: Joi.string().min(3).required()
//      };
//       return Joi.validate(course, schema);
// }


