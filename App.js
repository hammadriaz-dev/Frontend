import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Components
import Header from './components/header';
import Footer from './components/footer';

// Import Pages
import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import TeacherDashboard from './pages/teacherdashboard';
import StudentDashboard from './pages/studentdashboard';
import SignupOptions from './pages/signupoption';
import SignupStudent from './pages/signupstudent';
import SignupTeacher from './pages/signupteacher';
import TermsAndConditions from './pages/termsconditions';
import PrivacyPolicy from './pages/privacypolicy';

// Import new pages
import GradesPage from './pages/gradespage'; // Grades Page
import ManageAssignments from './pages/manageassignment'; // Manage Assignments Page
import ReportPage from './pages/reportpage'; // Report Page (newly added)

// App Component
const App = () => {
  return (
    <Router>
      {/* Persistent Header */}
      <Header />

      {/* Routes Configuration */}
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />

        {/* Main Dashboards */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />

        {/* Teacher-Only Pages */}
        <Route path="/manage-assignments" element={<ManageAssignments />} />
        <Route path="/grades" element={<GradesPage />} /> {/* Grades Page */}

        {/* Sign-Up Pages */}
        <Route path="/signup" element={<SignupOptions />} />
        <Route path="/signup-student" element={<SignupStudent />} />
        <Route path="/signup-teacher" element={<SignupTeacher />} />

        {/* Terms and Privacy Pages */}
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />

        {/* Report Page (New Page) */}
        <Route path="/reports" element={<ReportPage />} /> {/* View Reports Page */}
      </Routes>

      {/* Persistent Footer */}
      <Footer />
    </Router>
  );
};

export default App;
