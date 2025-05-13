import React, { useState, useEffect } from 'react';
import { FaEye, FaClipboardCheck, FaFilePdf, FaFileWord, FaFileAlt } from 'react-icons/fa';
import axios from 'axios';
import './manageassignment.css';

const ManageAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/teacher/assignments');
        console.log(response.data);
        setAssignments(response.data);
      } catch (error) {
        console.error("Error fetching assignments:", error);
        setError('Failed to fetch assignments. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  const handleGrade = (assignmentId) => {
    alert(`Grading Assignment ${assignmentId}`);
  };

  const handlePlagiarismCheck = (assignmentId) => {
    alert(`Running Plagiarism Check for Assignment ${assignmentId}`);
  };

  const getFileIcon = (fileName) => {
    if (fileName.endsWith('.pdf')) return <FaFilePdf className="file-icon pdf" />;
    if (fileName.endsWith('.docx')) return <FaFileWord className="file-icon word" />;
    return <FaFileAlt className="file-icon generic" />;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="manage-assignments">
      <h1>Manage Assignments</h1>
      <p>View and grade student assignments, check for plagiarism, and more.</p>

      {loading && <p>Loading assignments...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && assignments.length === 0 && <p>No assignments submitted yet.</p>}

      {!loading && !error && assignments.length > 0 && (
        <div className="assignments-container">
          <table className="assignments-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Student</th>
                <th>File</th>
                <th>Submitted</th>
                <th>Grade</th>
                <th>Similarity</th>
                <th>Action</th> {/* New column */}
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment, index) => (
                <tr key={assignment._id}>
                  <td>{index + 1}</td>
                  <td className="student-name">{assignment.studentName}</td>
                  <td className="file-cell">
                    {getFileIcon(assignment.fileName)}
                    <span className="file-name">{assignment.fileName}</span>
                  </td>
                  <td>{formatDate(assignment.uploadedDate)}</td>
                  <td>
                    <span className={`grade-badge ${assignment.grade === 'Pending' ? 'pending' : 'graded'}`}>
                      {assignment.grade || 'Pending'}
                    </span>
                  </td>
                  <td>
                    <span className={`plagiarism-score ${assignment.plagiarismScore > 20 ? 'high' : 'low'}`}>
                      {assignment.plagiarismScore !== null ? `${assignment.plagiarismScore*100}%` : '--'}
                    </span>
                  </td>
                  <td>
                  <button
  className="view-button"
  onClick={() => window.open(`http://localhost:5000/uploads/studentAssignments/${encodeURIComponent(assignment.filePath.split('\\').pop())}`, '_blank')}
>
  <FaEye /> View
</button>



      </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageAssignments;