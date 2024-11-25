import React, { useState } from "react";

const StudentList = ({ students, updateStudents }) => {
  const [editingStudent, setEditingStudent] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedDepartment, setUpdatedDepartment] = useState("");

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/students/${id}`, { method: "DELETE" })
      .then(() => updateStudents())
      .catch((error) => console.error("Error deleting student:", error));
  };

  const handleUpdateClick = (student) => {
    setEditingStudent(student);
    setUpdatedName(student.name);
    setUpdatedDepartment(student.department);
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();

    const updatedStudent = {
      name: updatedName,
      department: updatedDepartment,
      semester: 1,  // You can also add the option to update other fields like semester
      enrolledCourses: [],
      completedCourses: []
    };

    fetch(`http://localhost:5000/students/${editingStudent.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedStudent)
    })
      .then(() => {
        updateStudents();
        setEditingStudent(null);
        setUpdatedName("");
        setUpdatedDepartment("");
      })
      .catch((error) => console.error("Error updating student:", error));
  };

  return (
    <div>
      <h1>Students</h1>
      <ul>
        {students.map((s) => (
          <li key={s.id}>
            {editingStudent && editingStudent.id === s.id ? (
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
                <button type="submit">Save</button>
                <button onClick={() => setEditingStudent(null)}>Cancel</button>
              </form>
            ) : (
              <>
                {s.name} - {s.department}
                <button onClick={() => handleUpdateClick(s)}>Update</button>
                <button onClick={() => handleDelete(s.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
