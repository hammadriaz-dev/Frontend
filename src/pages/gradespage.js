import React, { useState, useEffect } from 'react';
import './gradespage.css'; // Custom CSS for Grades Page

const GradesPage = () => {
  const [grades, setGrades] = useState([]); // Initialize grades as an empty array

  useEffect(() => {
    // Fetch grades from a backend or API (example using static data)
    const fetchedGrades = [
      { studentName: 'John Doe', assignment: 'Math Assignment 1', grade: 'A' },
      { studentName: 'Jane Smith', assignment: 'Math Assignment 1', grade: 'B+' },
      { studentName: 'Sam Brown', assignment: 'Math Assignment 1', grade: 'A-' },
    ];
    setGrades(fetchedGrades); // Update state with fetched grades
  }, []); // Empty dependency array means it runs once when the component is mounted

  return (
    <div className="grades-page">
      <h1>Student Grades</h1>
      <table className="grades-table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Assignment</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((grade, index) => (
            <tr key={index}>
              <td>{grade.studentName}</td>
              <td>{grade.assignment}</td>
              <td>{grade.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GradesPage;
