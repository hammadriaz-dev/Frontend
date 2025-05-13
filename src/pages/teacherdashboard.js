import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './teacherdashboard.css';

const TeacherDashboard = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();
  const teacherId = localStorage.getItem('teacherId') || '1';

  const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000',
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !title || !description || !deadline) {
      setError('Please fill all the fields.');
      return;
    }

    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      setError('Please upload a valid file (PDF or DOCX).');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('File size exceeds the 10MB limit.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('dueDate', deadline);
    formData.append('uploadedBy', teacherId);

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      const response = await apiClient.post('/api/teacher/upload-assignment', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setSuccess('Assignment uploaded successfully!');
        resetForm();
        setIsUploadModalOpen(false);
      } else {
        setError(response.data.message || 'Failed to upload assignment.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during upload. Please try again.');
      console.error('Upload Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFile(null);
    setTitle('');
    setDescription('');
    setDeadline('');
  };

  return (
    <div className="teacher-dashboard">
      <div className="dashboard-header">
        <h1>Teacher Dashboard</h1>
        <p className="intro-text">Welcome to the Teacher Dashboard. Manage assignments, grade submissions, and track student progress.</p>
      </div>

      {/* Dashboard Features */}
      <section className="dashboard-features">
        {/* Upload Assignment Card */}
        <div className="feature" onClick={() => setIsUploadModalOpen(true)}>
          <div className="feature-icon">📤</div>
          <h3>Upload Assignment</h3>
          <p>Upload new assignments for students to complete. You can include instructions and set deadlines.</p>
        </div>

        {/* Manage Assignments Card */}
        <div className="feature" onClick={() => navigate('/manage-assignments')}>
          <div className="feature-icon">📋</div>
          <h3>Manage Assignments</h3>
          <p>View and manage all the assignments submitted by students. You can check the handwritten work and provide feedback.</p>
        </div>

       
        {/* View Reports Card */}
        {/* <div className="feature" onClick={() => navigate('/reports')}>
          <div className="feature-icon">📊</div>
          <h3>View uploaded assignments</h3>
          <p>Get detailed reports on student performance, plagiarism detection, and overall progress for each assignment.</p>
        </div> */}
      </section>

      {/* Modal for uploading assignment */}
      {isUploadModalOpen && (
        <div className="upload-modal">
          <div className="modal-content">
            <h2>Upload New Assignment</h2>
            <div className="modal-body">
              <label htmlFor="file-upload">Choose Assignment File:</label>
              <input type="file" id="file-upload" onChange={handleFileChange} />
            </div>
            <div className="modal-body">
              <label htmlFor="title">Assignment Title:</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter assignment title"
              />
            </div>
            <div className="modal-body">
              <label htmlFor="description">Assignment Instructions:</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter assignment instructions"
              />
            </div>
            <div className="modal-body">
              <label htmlFor="deadline">Set Deadline:</label>
              <input
                type="date"
                id="deadline"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>

            {/* Display loading, success, or error message */}
            {loading && <p>Uploading assignment...</p>}
            {success && <p className="success-message">{success}</p>}
            {error && <p className="error-message">{error}</p>}

            <div className="modal-footer">
              <button onClick={() => setIsUploadModalOpen(false)}>Cancel</button>
              <button onClick={handleUpload} disabled={loading}>
                {loading ? 'Uploading...' : 'Upload Assignment'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;
