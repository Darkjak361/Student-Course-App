import React, { useState } from "react";

const CourseList = ({ courses, updateCourses }) => {
  const [editingCourse, setEditingCourse] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedDepartment, setUpdatedDepartment] = useState("");
  const [updatedIsOpen, setUpdatedIsOpen] = useState(true);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/courses/${id}`, { method: "DELETE" })
      .then(() => updateCourses())
      .catch((error) => console.error("Error deleting course:", error));
  };

  const handleUpdateClick = (course) => {
    setEditingCourse(course);
    setUpdatedName(course.name);
    setUpdatedDepartment(course.department);
    setUpdatedIsOpen(course.isOpen);
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();

    const updatedCourse = {
      name: updatedName,
      department: updatedDepartment,
      isOpen: updatedIsOpen
    };

    fetch(`http://localhost:5000/courses/${editingCourse.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedCourse)
    })
      .then(() => {
        updateCourses();
        setEditingCourse(null);
        setUpdatedName("");
        setUpdatedDepartment("");
        setUpdatedIsOpen(true);
      })
      .catch((error) => console.error("Error updating course:", error));
  };

  return (
    <div>
      <h1>Courses</h1>
      <ul>
        {courses.map((c) => (
          <li key={c.id}>
            {editingCourse && editingCourse.id === c.id ? (
              <form onSubmit={handleUpdateSubmit}>
                <input
                  type="text"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                />
                <input
                  type="text"
                  value={updatedDepartment}
                  onChange={(e) => setUpdatedDepartment(e.target.value)}
                />
                <label>
                  Open:
                  <input
                    type="checkbox"
                    checked={updatedIsOpen}
                    onChange={() => setUpdatedIsOpen(!updatedIsOpen)}
                  />
                </label>
                <button type="submit">Save</button>
                <button onClick={() => setEditingCourse(null)}>Cancel</button>
              </form>
            ) : (
              <>
                {c.name} - {c.department} ({c.isOpen ? "Open" : "Closed"})
                <button onClick={() => handleUpdateClick(c)}>Update</button>
                <button onClick={() => handleDelete(c.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;
