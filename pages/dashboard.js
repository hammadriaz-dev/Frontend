// src/pages/Dashboard.js
import React, { useState } from 'react';
import StudentDashboard from './studentdashboard';
import TeacherDashboard from './teacherdashboard';

const Dashboard = () => {
  const [role, setRole] = useState('student'); // You can set role dynamically

  return (
    <div>
      {role === 'student' ? (
        <StudentDashboard />
      ) : (
        <TeacherDashboard />
      )}
    </div>
  );
};

export default Dashboard;
