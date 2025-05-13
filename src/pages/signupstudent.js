import React, { useState } from 'react';
import './signupteacher.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    countryCode: '',
    password: '',
    role: 'student', // Default role set to 'student'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Validation logic
  const validate = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/; // Only alphabets, allowing single spaces between words
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    // Validate first name
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (!nameRegex.test(formData.firstName)) {
      newErrors.firstName = 'First name must contain only alphabets';
    }

    // Validate last name
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (!nameRegex.test(formData.lastName)) {
      newErrors.lastName = 'Last name must contain only alphabets';
    }

    // Validate email
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Validate country code
    if (!formData.countryCode) {
      newErrors.countryCode = 'Country code is required';
    }

    // Validate phone number
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        'Password must be at least 8 characters, with at least one letter and one number';
    }

    // Validate role
    if (!formData.role) {
      newErrors.role = 'Please select a role';
    }

    return newErrors;
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      console.log('Form submitted successfully', formData);

      // Sending data to the backend API (change URL to your correct endpoint)
      axios
        .post('http://localhost:5000/api/signupstudent', formData)
        .then((response) => {
          console.log('User registered successfully', response.data);
          alert('User registered successfully!');
          setIsSubmitting(false);
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            countryCode: '',
            password: '',
            role: 'student', // Reset role to 'teacher' after form submission
          });
        })
        .catch((error) => {
          console.error('Error registering user:', error);
          alert('Registration failed. Please try again.');
          setIsSubmitting(false);
        });

      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <form className="sign-up-form" onSubmit={handleSubmit} noValidate>
      <h2>Sign Up</h2>

      {/* Error Summary */}
      {Object.keys(errors).length > 0 && (
        <div className="error-summary">
          <p>Please fix the following errors:</p>
          <ul>
            {Object.values(errors).map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* First Name */}
      <label>First Name</label>
      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        required
      />
      {errors.firstName && <p className="error-text">{errors.firstName}</p>}

      {/* Last Name */}
      <label>Last Name</label>
      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        required
      />
      {errors.lastName && <p className="error-text">{errors.lastName}</p>}

      {/* Email */}
      <label>Email</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      {errors.email && <p className="error-text">{errors.email}</p>}

      {/* Phone */}
      <label>Phone</label>
      <div className="phone-input-container">
        <select
          name="countryCode"
          value={formData.countryCode}
          onChange={handleChange}
          className="country-code-dropdown"
          required
        >
          <option value="">Select Country Code</option>
          <option value="+1">+1 (US, Canada)</option>
          <option value="+44">+44 (UK)</option>
          <option value="+91">+91 (India)</option>
          {/* Add other countries here */}
        </select>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter phone number (without country code)"
          maxLength="10"
          required
        />
      </div>
      {errors.phone && <p className="error-text">{errors.phone}</p>}

      {/* Password */}
      <label>Password</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      {errors.password && <p className="error-text">{errors.password}</p>}

      {/* Role Selection */}
      <label>Role</label>
      <select name="role" value={formData.role} onChange={handleChange} required>
        <option value="teacher">Teacher</option>
        <option value="student">Student</option>
      </select>
      {errors.role && <p className="error-text">{errors.role}</p>}

      {/* Submit Button */}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Registering...' : 'Register'}
      </button>

      {/* Login Link */}
      <p className="login-link">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </form>
  );
};

export default SignUpForm;
