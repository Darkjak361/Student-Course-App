const express = require("express");
const students = require("../data/studentData");
const router = express.Router();

const validDepartments = [
  "Computer Science",
  "Mathematics",
  "Chemistry",
  "Physics",
  "Biology",
  "Fitness"
];

router.get("/", (_req, res) => {
  res.json(students);
});

router.get("/:id", (req, res) => {
  const student = students.find((s) => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).send("Student not found");
  const avgGrade = student.completedCourses.length * 10;
  res.json({ ...student, avgGrade });
});

router.post("/", (req, res) => {
  const newStudent = { id: students.length + 1, ...req.body };

  if (!validDepartments.includes(newStudent.department)) {
    return res.status(400).send(`Invalid department: ${newStudent.department}`);
  }

  students.push(newStudent);
  res.json(newStudent);
});

router.put("/:id", (req, res) => {
  const student = students.find((s) => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).send("Student not found");

  const { name, department, semester, enrolledCourses, completedCourses } = req.body;

  if (department && !validDepartments.includes(department)) {
    return res.status(400).send(`Invalid department: ${department}`);
  }

  student.name = name || student.name;
  student.department = department || student.department;
  student.semester = semester || student.semester;
  student.enrolledCourses = enrolledCourses || student.enrolledCourses;
  student.completedCourses = completedCourses || student.completedCourses;

  res.json(student);
});

router.delete("/:id", (req, res) => {
  const studentIndex = students.findIndex((s) => s.id === parseInt(req.params.id));
  if (studentIndex === -1) return res.status(404).send("Student not found");

  students.splice(studentIndex, 1);
  res.status(200).send("Student deleted successfully");
});

module.exports = router;
