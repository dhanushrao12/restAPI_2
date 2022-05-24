const Joi = require("joi");
const express = require("express");
const app = express();
app.use(express.json());

const courses = [
  {
    id: 1,
    name: "course1",
  },
  {
    id: 2,
    name: "course2",
  },
  {
    id: 3,
    name: "course3",
  },
];

app.get("/", (req, res) => {
  res.send(courses);
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send("Course with the given id was not found.");
  res.send(course);
});

//Post
app.post("/api/courses", (req, res) => {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  const result = Joi.validate(req.body, schema);

  if (result.error) {
    //400 bad request
    res.status(400).send(result.error.details[0].message);
  }
  const course = { id: courses.length + 1, name: req.body.name };
  courses.push(course);
  res.send(course);
});
//Port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

//Put
app.put("/api/courses/:id", (req, res) => {
  //Look up the course
  //If no course, send 404
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send("Course with the given id was not found.");

  //If invalid, send 400 - Bad request

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
  }

  //Update course
  course.name = req.body.name;
  //return updated course to client
  res.send(course);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  const result = Joi.validate(course, schema);
  return result;
}
