const express = require("express");
const courses = require("../data/courseData");
const router = express.Router();

router.get("/", (_req, res) => {
  res.json(courses);
});

router.post("/", (req, res) => {
  const newCourse = { id: courses.length + 1, ...req.body };
  courses.push(newCourse);
  res.json(newCourse);
});

router.put("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("Course not found");

  const { name, department, isOpen } = req.body;

  course.name = name || course.name;
  course.department = department || course.department;
  course.isOpen = isOpen !== undefined ? isOpen : course.isOpen;

  res.json(course);
});

router.delete("/:id", (req, res) => {
  const courseIndex = courses.findIndex((c) => c.id === parseInt(req.params.id));
  if (courseIndex === -1) return res.status(404).send("Course not found");

  courses.splice(courseIndex, 1);
  res.status(200).send("Course deleted successfully");
});

module.exports = router;
