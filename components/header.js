import React, { useState } from 'react';
import './header.css';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import logoImg from '../assets/logo.png';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); // Access the current route

  // Handle Search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      // Navigate to the desired page based on the search query
      const query = searchQuery.toLowerCase();
      if (query === 'home') {
        navigate('/');
      } else if (query === 'about') {
        navigate('/about');
      } else if (query === 'services') {
        navigate('/#services');
      } else if (query === 'contact') {
        navigate('/contact');
      } else {
        alert('Page not found!'); // Handle invalid queries
      }
      setSearchQuery(''); // Clear the search field after submission
    }
  };

  // Check if we are on the teacher or student dashboard
  const isTeacherDashboard = location.pathname === '/teacher-dashboard';
  const isStudentDashboard = location.pathname === '/student-dashboard';

  const handleLogout = () => {
    // Implement the logout logic here (clear session, tokens, etc.)
    alert('Logged out!');
    navigate('/'); // Redirect to the homepage after logout
  };

  return (
    <header className="header">
      <div className="header-content">
        {/* Logo */}
        <div className="logo">
          <img src={logoImg} alt="My Logo" />
          Intelli-Write
        </div>

        {/* Navigation */}
        <nav className="nav">
          <Link to="/"><span>Home</span></Link>
          <Link to="/about"><span>About</span></Link>
          <a href="#services"><span>Services</span></a>
          <Link to="/contact"><span>Contact</span></Link>
        </nav>

        {/* Search Bar */}
        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        {/* Auth Buttons */}
        <div className="auth-buttons">
          {/* Show Logout button only on Teacher or Student Dashboard */}
          {(isTeacherDashboard || isStudentDashboard) ? (
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <Link to="/signup"><button className="signup-btn">Sign Up</button></Link>
              <Link to="/login"><button className="login-btn">Log In</button></Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;