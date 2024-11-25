import React, { useState } from "react";
import axios from "axios";

const AddStudent = ({ updateStudents }) => {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newStudent = { name, department, semester: 1, enrolledCourses: [], completedCourses: [] };

    axios
      .post("http://localhost:5000/students", newStudent)
      .then((response) => {
        alert(`Student added: ${response.data.name}`);
        setName("");
        setDepartment("");
        setError("");
        updateStudents();
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data);
        } else {
          console.error("Error adding student:", error);
          alert("Failed to add student.");
        }
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Student</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        required
      />
      <button type="submit">Add Student</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default AddStudent;
