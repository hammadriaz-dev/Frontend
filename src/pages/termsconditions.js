// src/pages/TermsAndConditions.js
import React from 'react';
import './termsconditions.css'; // Make sure the CSS file is correctly imported


const TermsAndConditions = () => {
  return (
    <div className="terms-container">
      <h1>Terms and Conditions</h1>
      <p>
        Welcome to IntelliWrite! By using our platform, you agree to the following terms and conditions:
      </p>
      <ol>
        <li>Users must comply with all applicable laws and regulations.</li>
        <li>All content uploaded should comply with intellectual property rights.</li>
        <li>We reserve the right to suspend accounts that violate these terms.</li>
        {/* Add more terms as necessary */}
      </ol>
      <p>
        By using this website, you accept these terms. If you do not agree with any part, please refrain from using our platform.
      </p>
    </div>
  );
};

export default TermsAndConditions;
