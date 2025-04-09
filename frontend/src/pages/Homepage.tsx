import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import '../css/Homepage.css';
import { useState } from 'react';
import AuthorizeView, { AuthorizedUser } from '../components/AuthorizeView';
import Logout from '../components/Logout';

function Homepage() {
  const navigate = useNavigate();
  return (
    <div className="homepage-container">
      <NavBar />
      <div className="background-overlay">
        <img
          src="/images/homepage.png"
          alt="Background collage"
          className="background-image"
        />
      </div>

      <div className="foreground-content">
        <h1>Welcome to CineNiche</h1>
        <p>Delivering curated, hard-fi cinema</p>
        <div className="button-group">
          <button onClick={() => navigate('/movies')} className="cta-button">
            Get Started
          </button>
          <button className="cta-button secondary">Learn More</button>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
