import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import illustration from '../assets/illu.png';
import featureImg1 from '../assets/hand.jpg';
import featureImg2 from '../assets/check.jpg';
import featureImg3 from '../assets/grade.jpg';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Revolutionizing the Way Handwritten Assignments Are Graded.</h1>
          <p>For free. For everyone. Forever.</p>
        </div>
        <div className="hero-image">
          <img src={illustration} alt="Learning illustration" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="services">
        <h2>Our Services</h2>
        <div className="features-list">
          <div className="feature-card">
            <img src={featureImg1} alt="Feature 1" />
            <h3>From Handwritten to Digital in Seconds</h3>
            <ul>
              <li>Scans and converts handwritten content into digital text with accuracy.</li>
              <li>Fast processing time for immediate feedback.</li>
              <li>Uses advanced AI to recognize different handwriting styles and fonts.</li>
            </ul>
          </div>
          <div className="feature-card">
            <img src={featureImg2} alt="Feature 2" />
            <h3>Ensure Originality with AI-Driven Plagiarism Detection</h3>
            <ul>
              <li>Checks against millions of academic sources, websites, and published content.</li>
              <li>Instant, detailed plagiarism reports highlighting any potential issues.</li>
              <li>Provides a clear breakdown of sources for any flagged content, ensuring transparency.</li>
            </ul>
          </div>
          <div className="feature-card">
            <img src={featureImg3} alt="Feature 3" />
            <h3>Efficient Grading at Your Fingertips</h3>
            <ul>
              <li>Includes custom rubrics and grading scales tailored for both teachers and students.</li>
              <li>Grading dashboard provides clear feedback on each assignment.</li>
              <li>AI assistance ensures high accuracy in evaluating handwriting and content, guaranteeing fairness and consistency.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>How it is usefull?</h2>
        <div className="testimonials-list">
          <div className="testimonial-card">
            <p>
              "Our portal simplifies assignment management by automating key tasks, saving time and effort for both educators and students"
            </p>
            <span>Educator</span>
          </div>
          <div className="testimonial-card">
            <p>
              "By combining handwriting recognition, plagiarism detection, and smart grading, it ensures accuracy, fairness, and academic excellence in every step"
            </p>
            <span>For both Educators and students</span>
          </div>
        </div>
      </section>

      {/* Join Us Section - Cards without buttons */}
      <section className="join-us-section">
        <h2>Join Us Today</h2>
        <div className="join-cards">
          <div className="join-card">
            <h3>Join as a Student</h3>
            <p>
              Sign up to experience efficient, AI-powered grading and get personalized feedback. Take your learning to the next level with IntelliWrite.
            </p>
          </div>
          <div className="join-card">
            <h3>Join as a Teacher</h3>
            <p>
              Become a part of a community of educators and grade handwritten assignments more efficiently with IntelliWrite's innovative tools.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
