import React from 'react';
import './about.css';

const teamMembers = [
  {
    name: 'Handwritten Text',
    role: 'Revolutionizing handwritten text recognition',
    image: '', // No image for this card
    description: 'Our technology enables accurate and efficient recognition of handwritten assignments.'
  },
  {
    name: 'Plagiarism Detection',
    role: 'Ensuring academic integrity',
    image: '', // No image for this card
    description: 'We use AI to detect plagiarism and ensure original content submission by students.'
  },
  {
    name: 'Grading',
    role: 'Automated grading system',
    image: '', // No image for this card
    description: 'Our system automatically grades assignments with high accuracy and fairness.'
  },
];

const About = () => {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <p>Meet the team behind IntelliWrite, committed to revolutionizing handwritten assignment processing.</p>
      
      <div className="team-cards">
        {teamMembers.map((member, index) => (
          <div className="team-card" key={index}>
            <h3>{member.name}</h3>
            <p>{member.role}</p>
            <p>{member.description}</p> {/* Add description below each heading */}
          </div>
        ))}
      </div>

      <div className="video-section">
        <h2>Our Mission</h2>
        <p>Learn more about our goals and how IntelliWrite is shaping the future of education.</p>
        <div className="video-wrapper">
          <video src={`${process.env.PUBLIC_URL}/intelli.mp4`} type="video/mp4" controls className="team-video" />
        </div>
      </div>
    </div>
  );
};

export default About;
