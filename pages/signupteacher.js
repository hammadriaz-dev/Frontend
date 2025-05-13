import React, { useState } from 'react';
import './signupteacher.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TeacherSignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    countryCode: '',
    password: '',
    role: 'teacher', // Role fixed to 'teacher'
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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
    const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/; // Name validation: Only alphabets, single spaces allowed
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email validation regex
    const phoneRegex = /^[0-9]{10}$/; // Phone number must be exactly 10 digits
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Password: Min 8 chars, one letter, one number

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (!nameRegex.test(formData.firstName)) {
      newErrors.firstName = 'First name must contain only alphabets';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (!nameRegex.test(formData.lastName)) {
      newErrors.lastName = 'Last name must contain only alphabets';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.countryCode) {
      newErrors.countryCode = 'Country code is required';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        'Password must be at least 8 characters, with at least one letter and one number';
    }

    if (!formData.role) {
      newErrors.role = 'Role must be selected';
    }

    return newErrors;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setLoading(true); // Set loading state
      const newUser = { ...formData };

      try {
        // Sending data to the backend using axios
        const response = await axios.post('http://localhost:5000/api/signupteacher', newUser);

        if (response.status === 200) {
          // If signup is successful
          console.log('Form submitted successfully', response.data);
          alert('Form submitted successfully! A welcome email has been sent to your inbox.');
          setErrors({});
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            countryCode: '',
            password: '',
            role: 'teacher', // Reset role to 'teacher' after form submission
          });
        }
      } catch (error) {
        // Handle errors (e.g., email already exists or network issues)
        console.error('Error submitting form:', error);
        if (error.response && error.response.data) {
          // If there's a response error from the backend
          setErrors({ apiError: error.response.data.error || 'Something went wrong. Please try again.' });
        } else {
          // If it's a network or other error
          setErrors({ apiError: 'Network error. Please try again.' });
        }
      } finally {
        setLoading(false); // Reset loading state
      }
    } else {
      setErrors(validationErrors); // If validation fails, display errors
    }
  };

  return (
    <form className="sign-up-form" onSubmit={handleSubmit} noValidate>
      <h2>Teacher Sign-Up</h2>

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
        {/* Country Code Dropdown */}
        <select
          name="countryCode"
          value={formData.countryCode}
          onChange={handleChange}
          className="country-code-dropdown"
          required
        >
          <option value="">Select Country Code</option>
          <option value="+1">+1 (US, Canada)</option>
          {/* Add other country codes here */}
        </select>

        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter your phone number (without country code)"
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

      {/* Role */}
      <label>Role</label>
      <select name="role" value={formData.role} onChange={handleChange} required disabled>
        <option value="teacher">Teacher</option>
      </select>

      {/* Submit Button */}
      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Register'}
      </button>

      {/* Login Link */}
      <p className="login-link">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </form>
  );
};

export default TeacherSignUpForm;
