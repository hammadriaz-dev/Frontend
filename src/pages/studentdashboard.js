import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './studentdashboard.css';
import { FaUpload, FaEye, FaDownload } from 'react-icons/fa';
import axios from 'axios';
import { FaFilePdf, FaFileWord, FaFileAlt } from 'react-icons/fa';



const StudentDashboard = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [teacherAssignments, setTeacherAssignments] = useState([]);
  const [studentName, setStudentName] = useState('');

  


  // Fetch student details
  useEffect(() => {
    const fetchStudentDetails = async () => {
      const email = localStorage.getItem("userEmail");
      if (!email) return alert("User not logged in.");

      try {
        const response = await axios.get('http://localhost:5000/api/user/profile', {
          params: { email },
        });
        setStudentName(response.data.name);
      } catch (error) {
        console.error('Error fetching student details:', error);
        alert('Failed to fetch student information');
      }
    };

    fetchStudentDetails();
  }, []);

  // Fetch student-submitted assignments
  const fetchStudentAssignments = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return alert("User not logged in.");

    try {
      const response = await axios.get("http://localhost:5000/api/assignments", {
        params: { userId },
      });
      setAssignments(response.data);
    } catch (error) {
      console.error("Error fetching assignments:", error);
      alert("Failed to load your assignments");
    }
  };

  // Fetch teacher-uploaded assignments
  const fetchTeacherAssignments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/teacher-assignments");
      setTeacherAssignments(response.data);
    } catch (error) {
      console.error("Error fetching teacher assignments:", error);
    }
  };

  useEffect(() => {
    fetchStudentAssignments();
    fetchTeacherAssignments();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // const handleFileUpload = async () => {
  //   if (!file) return alert('Please select a file');

  //   const validExtensions = ['.pdf', '.docx'];
  //   const maxSize = 5 * 1024 * 1024;

  //   if (!validExtensions.some(ext => file.name.endsWith(ext))) {
  //     return alert('Only .pdf or .docx files are allowed');
  //   }

  //   if (file.size > maxSize) {
  //     return alert('File size must not exceed 5MB');
  //   }

  //   setIsUploading(true);

  //   try {
  //     const formData = new FormData();
  //     formData.append('file', file);
  //     formData.append('studentName', studentName);
  //     formData.append('fileName', file.name);
  //     formData.append('uploadedDate', new Date().toISOString());

  //     await axios.post('http://localhost:5000/api/submit-assignment', formData, {
  //       headers: { 'Content-Type': 'multipart/form-data' },
  //     });

  //     alert('File uploaded successfully!');
  //     fetchStudentAssignments();
  //   } catch (error) {
  //     console.error('Upload failed:', error);
  //     alert('Upload failed');
  //   } finally {
  //     setIsUploading(false);
  //   }
  // };

  
  const handleFileUpload = async () => {
    if (!file) return alert('Please select a file');
  
    const validExtensions = ['.pdf', '.docx', '.png', '.jpg', '.jpeg'];
    const maxSize = 5 * 1024 * 1024; // 5MB
  
    if (!validExtensions.some(ext => file.name.endsWith(ext))) {
      return alert('Only .pdf or .docx files are allowed');
    }
  
    if (file.size > maxSize) {
      return alert('File size must not exceed 5MB');
    }
  
    setIsUploading(true);
  
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('studentName', studentName);
      formData.append('fileName', file.name);
      formData.append('uploadedDate', new Date().toISOString());
  
      // First upload to your Node.js server (if needed)
      await axios.post('http://localhost:5000/api/submit-assignment', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      // Then send to Python backend for grading
      const pythonResponse = await axios.post('http://localhost:8000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      // Extract results from Python response
      const grade = pythonResponse.data.grading_result?.overall_score || 'Pending';
      const plagiarismScore = pythonResponse.data.plagiarism_score || 0;
      
      // Update the assignment with the grade and plagiarism score
      await axios.put(`http://localhost:5000/api/assignments/grade`, {
        fileName: file.name,
        grade: grade,
        plagiarismScore: plagiarismScore
      });
  
      alert(`File uploaded and graded successfully! Your grade: ${grade}, Plagiarism Score: ${plagiarismScore}%`);
      fetchStudentAssignments();
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed');
    } finally {
      setIsUploading(false);
    }
  };
  
  
  // const handleViewGrade = (assignmentId) => {
  //   const assignment = assignments.find(a => a.id === assignmentId);
  //   if (!assignment) return alert('Assignment not found');
  //   alert(`Your grade for ${assignment.fileName}: ${assignment.grade || 'Pending'}`);
  // };
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTeacherAssignments = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/student/teacher-assignments');
        // Map the response to include fileName and download URL
        const assignments = response.data.map(assignment => ({
          ...assignment,
          fileName: assignment.title + (assignment.filePath.match(/\.\w+$/) ? assignment.filePath.match(/\.\w+$/)[0] : ''),
          url: `http://localhost:5000/api/download-teacher-assignment/${assignment.id}`
        }));
        setTeacherAssignments(assignments);
      } catch (err) {
        console.error('Error fetching teacher assignments:', err);
        setError('Failed to load teacher assignments. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherAssignments();
  }, []);
  
  return (
    <div className="student-dashboard-container">
      <h1>Welcome to Your Dashboard</h1>
      {studentName && <p>Hello, {studentName}! Manage your assignments below.</p>}

      {/* Upload Section */}
      <section className="upload-section">
        <h2>Upload Your Assignment</h2>
        <div className="file-upload-container">
          <input type="file" accept=".pdf,.docx" onChange={handleFileChange} className="file-input" />
          <button onClick={handleFileUpload} disabled={isUploading} className="upload-button">
            {isUploading ? 'Uploading...' : <><FaUpload className="upload-icon" /> Upload</>}
          </button>
        </div>
        {file && <p className="file-name">{file.name}</p>}
      </section>

      {/* Teacher Assignments Download */}
      <section className="teacher-assignments">
      <h2>Assignments From Teachers</h2>
      {loading ? (
        <p>Loading assignments...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : teacherAssignments.length === 0 ? (
        <p>No assignments uploaded by teachers.</p>
      ) : (
        <ul className="assignments-list">
          {teacherAssignments.map((assignment, index) => (
            <li key={index} className="assignment-item">
              <div className="assignment-info">
                <h3>{assignment.title}</h3>
                <p className="assignment-description">{assignment.description}</p>
                <p className="assignment-due">Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
              </div>
              <div className="assignment-actions">
                <a 
                  href={assignment.url} 
                  download={`${assignment.title.replace(/\s+/g, '_')}${assignment.filePath.match(/\.\w+$/) ? assignment.filePath.match(/\.\w+$/)[0] : ''}`}
                  className="download-link"
                >
                  <FaDownload className="download-icon" /> Download
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>

      {/* Student's Submitted Assignments */}
      <section className="existing-assignments">
        <h2>Your Submitted Assignments</h2>
        {assignments.length === 0 ? (
          <p>No assignments submitted yet.</p>
        ) : (
          <ul>
            {assignments.map((assignment) => (
              // <li key={assignment.id} className="assignment-item">
              //   <div>
              //     <p>{assignment.fileName}</p>
              //     <p>Status: {assignment.grade ? `Grade: ${assignment.grade}` : 'Pending'}</p>
              //     <p>{assignment.plagiarismScore  ? `plagiarismScore : ${assignment.plagiarismScore }` : 'Pending'}</p>
              //   </div>
              //   <button onClick={() => handleViewGrade(assignment.id)}>
              //     <FaEye /> View Grade
              //   </button>
              // </li>
              <li key={assignment.id} className="assignment-item">
  <div className="assignment-card">
    <div className="assignment-header">
      <span className="file-icon">
        {assignment.fileName.endsWith('.pdf') ? <FaFilePdf /> : 
         assignment.fileName.endsWith('.docx') ? <FaFileWord /> : 
         <FaFileAlt />}
      </span>
      <h3 className="file-name">{assignment.fileName}</h3>
    </div>
    
    <div className="assignment-details">
      <div className="detail-row">
        <span className="detail-label">Status:</span>
        <span className={`status-badge ${assignment.grade === 'Pending' ? 'pending' : 'graded'}`}>
          {assignment.grade === 'Pending' ? 'Pending Review' : `Graded: ${assignment.grade}`}
        </span>
      </div>
      
      <div className="detail-row">
        <span className="detail-label">Similarity:</span>
        <span className={`plagiarism-score ${assignment.plagiarismScore > 20 ? 'high' : 'low'}`}>
          {assignment.plagiarismScore !== null ? `${assignment.plagiarismScore*100}%` : 'Pending'}
        </span>
      </div>
      
      <div className="detail-row">
        <span className="detail-label">Submitted:</span>
        <span className="submission-date">
          {new Date(assignment.uploadedDate).toLocaleDateString()}
        </span>
      </div>
    </div>
  </div>
</li>
            ))}
          </ul>
        )}
      </section>

      <div className="back-home">
        <Link to="/" className="back-link">Back to Home</Link>
      </div>
    </div>
  );
};

export default StudentDashboard;
