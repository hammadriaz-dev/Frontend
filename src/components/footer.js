// src/components/footer.js
import React from 'react';
import './footer.css'; // Import footer CSS

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2024 IntelliWrite. All Rights Reserved.</p>
        <div className="footer-links">
          <a href="/terms">Terms & Conditions</a>
          <a href="/privacy">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
