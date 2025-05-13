import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);

      try {
        const response = await axios.post('http://localhost:5000/api/login', {
          email,
          password,
        });

        const user = response.data.user;
        console.log('Logged in user:', user);

        // Store user data in localStorage
        if (user?.id && user?.email) {
          localStorage.setItem('userId', user.id);
          localStorage.setItem('userEmail', user.email);
        }

        // Role-based redirection
        if (user?.role === 'student') {
          console.log('Navigating to student dashboard...');
          navigate('/student-dashboard');
        } else if (user?.role === 'teacher') {
          console.log('Navigating to teacher dashboard...');
          navigate('/teacher-dashboard');
        } else {
          console.error('Invalid user role:', user?.role);
          alert('Invalid user role!');
        }
      } catch (error) {
        console.error('Login error:', error.response?.data || error.message);
        alert('Invalid email or password. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const validate = () => {
    const newErrors = {};

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!emailPattern.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    return newErrors;
  };

  return (
    <div className="form-container">
      <section className="form-section">
        <div className="form-box">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            {errors.email && <p className="error-text">{errors.email}</p>}

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
            {errors.password && <p className="error-text">{errors.password}</p>}

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="alternative">
            <p>Don't have an account? <a href="/signup">Sign Up</a></p>
            <p><a href="/">Back to Home</a></p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
