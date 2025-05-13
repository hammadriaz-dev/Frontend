// src/pages/SignupOptions.js
import React from 'react';
import { Link } from 'react-router-dom';
import './signupoption.css'; // Create a CSS file for this page

const SignupOptions = () => {
  return (
    <div className="signup-options-container">
      <h1>Choose Your Role</h1>
      <div className="signup-buttons">
        <Link to="/signup-student">
          <button className="signup-button student">Sign Up as Student</button>
        </Link>
        <Link to="/signup-teacher">
          <button className="signup-button teacher">Sign Up as Teacher</button>
        </Link>
      </div>
    </div>
  );
};

export default SignupOptions;
