import React, { useState } from "react";
import axios from "axios";

const AddCourse = ({ updateCourses }) => {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCourse = { name, department, isOpen };

    axios
      .post("http://localhost:5000/courses", newCourse)
      .then((response) => {
        alert(`Course added: ${response.data.name}`);
        setName("");
        setDepartment("");
        setIsOpen(true);
        updateCourses();
      })
      .catch((error) => {
        console.error("Error adding course:", error);
        alert("Failed to add course. Please check the console for errors.");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Course</h2>
      <input
        type="text"
        placeholder="Course Name"
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
      <label>
        Open:
        <input
          type="checkbox"
          checked={isOpen}
          onChange={() => setIsOpen(!isOpen)}
        />
      </label>
      <button type="submit">Add Course</button>
    </form>
  );
};

export default AddCourse;
