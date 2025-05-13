// src/pages/reportpage.js
import React, { useState, useEffect } from 'react';
import './reportpage.css'; // Optional: Add CSS for styling the report page

const ReportPage = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Fetch reports data (you can replace this with actual API calls)
    const fetchedReports = [
      { studentName: 'John Doe', assignment: 'Math Assignment 1', grade: 'A', plagiarism: 'No' },
      { studentName: 'Jane Smith', assignment: 'Math Assignment 2', grade: 'B+', plagiarism: 'Yes' },
      { studentName: 'Sam Brown', assignment: 'Math Assignment 1', grade: 'A-', plagiarism: 'No' },
    ];
    setReports(fetchedReports); // Update state with fetched reports
  }, []);

  return (
    <div className="report-page">
      <h1>Student Reports</h1>
      <table className="report-table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Assignment</th>
            <th>Grade</th>
            <th>Plagiarism Detected</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, index) => (
            <tr key={index}>
              <td>{report.studentName}</td>
              <td>{report.assignment}</td>
              <td>{report.grade}</td>
              <td>{report.plagiarism}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportPage;
