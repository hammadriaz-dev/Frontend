// src/components/Layout.js
import React from 'react';
import Footer from './footer';  // Import Footer Component
import Header from './header';  // Import Header Component

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <Header /> {/* Header is shown across all pages */}
      <div className="main-content">
        {children} {/* This will render the page content */}
      </div>
      <Footer /> {/* Footer will be shown on all pages */}
    </div>
  );
};

export default Layout;
