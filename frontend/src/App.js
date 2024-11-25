import React, { useState, useEffect } from "react";
import StudentList from "./components/StudentList";
import CourseList from "./components/CourseList";
import AddStudent from "./components/AddStudent";
import AddCourse from "./components/AddCourse";
import axios from "axios";

const App = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  const fetchStudents = () => {
    axios
      .get("http://localhost:5000/students")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => console.error("Error fetching students:", error));
  };

  const fetchCourses = () => {
    axios
      .get("http://localhost:5000/courses")
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => console.error("Error fetching courses:", error));
  };

  useEffect(() => {
    fetchStudents();
    fetchCourses();
  }, []);

  return (
    <div>
      <StudentList students={students} updateStudents={fetchStudents} />
      <CourseList courses={courses} updateCourses={fetchCourses} />
      <AddStudent updateStudents={fetchStudents} />
      <AddCourse updateCourses={fetchCourses} />
    </div>
  );
};

export default App;
