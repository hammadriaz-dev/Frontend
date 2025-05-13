// src/pages/Contact.js
import React, { useState } from 'react';
import emailjs from 'emailjs-com'; // Make sure to import the EmailJS library
import './contact.css'; // Add styles here

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if fields are not empty
    if (!name || !email || !message) {
      setStatus('Please fill in all fields');
      return;
    }

    // EmailJS sendForm method to send the email
    emailjs
      .sendForm(
        'service_ubff427', // Service ID
        'template_b4bit24', // Template ID
        e.target, // Form data
        'MI42MmRINEkZtqz71' // User ID (from EmailJS dashboard)
      )
      .then(
        (result) => {
          console.log(result.text);
          setStatus('Message sent successfully!');
        },
        (error) => {
          console.error(error.text);
          setStatus('Failed to send message. Please try again.');
        }
      );
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Please fill out the form below.</p>
        </div>
      </section>

      {/* Contact Info & Form Section */}
      <div className="contact-section">
        <div className="contact-info">
          <h2>Our Details</h2>
          <div className="info-item">
            <h3>Phone</h3>
            <p>+92 3427365143</p>
          </div>
          <div className="info-item">
            <h3>Email</h3>
            <p>contact@intelliwrite.com</p>
          </div>
        </div>

        <div className="contact-form">
          <h2>Send Us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label>Name</label>
              <input
                type="text"
                name="user_name"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-field">
              <label>Email</label>
              <input
                type="email"
                name="user_email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-field">
              <label>Message</label>
              <textarea
                name="message"
                placeholder="Write your message here"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-btn">
              Send Message
            </button>
          </form>
          {status && <p>{status}</p>} {/* Display status message */}
        </div>
      </div>
    </div>
  );
};

export default Contact;