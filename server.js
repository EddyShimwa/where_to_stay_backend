const Joi = require('joi');
const express = require('express');


const app = express();

app.use(express.json());

const courses = [
    {id: 1, name: 'course1', credits: 15},
    {id: 2, name: 'course2', credits: 20},
    {id: 3, name: 'course3', credits: 25}
];


app.get('/', (req, res) => {
    res.send('Hello World i am gotten!!');
});


app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body);
  
     if(error) return res.status(400).send(error.details[0].message)
   
   const course = {
        id: courses.length + 1,
        name: req.body.name,
        credits: req.body.credits
   }

   courses.push(course)
   res.send(course)
})

app.put('/api/courses/:id', (req, res) => {
    //get the course, if it does not exist return 404 error
    const course =  courses.find(c => c.id === parseInt(req.params.id));
    if(!course)return res.status(404).send('The course with the given id was not found');
 
  const { error } = validateCourse(req.body);

     if(error){
        res.status(400).send(result.error.details[0].message)
    }
   
    //update course
    course.name = req.body.name;
    res.send(course)
});


app.get('/api/courses/:id', (req, res) => {
   const course =  courses.find(c => c.id === parseInt(req.params.id));
   if(!course) return res.status(404).send('The course with the given id was not found');
   
});


app.delete('/api/courses/:id', (req, res) => {
    const course =  courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given id was not found');

       //delete
   const index = courses.indexOf(course)
   courses.splice(index, 1);

   res.send(course);

})



function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
     };
      return Joi.validate(course, schema);
}




const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}...`));