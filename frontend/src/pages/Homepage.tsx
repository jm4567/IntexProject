import NavBar from '../components/NavBar';
import '../css/Homepage.css';
import { useState } from 'react';
import AuthorizeView, { AuthorizedUser } from '../components/AuthorizeView';
import Logout from '../components/Logout';

function Homepage() {
  const [startSplit, setStartSplit] = useState(false);

  const handlePlay = () => {
    // Step 1: Fade in homepage behind video
    const homepage = document.querySelector('.homepage-container');
    if (homepage) homepage.classList.add('visible');

    // Step 2: Start curtain split after a delay
    setTimeout(() => {
      setStartSplit(true);
    }, 3000);

    // Step 3: Fully remove the curtain after animation
    setTimeout(() => {
      const curtain = document.querySelector(
        '.video-split-container'
      ) as HTMLElement;
      if (curtain) curtain.style.display = 'none';
    }, 4000); // matches curtain animation time
  };

  return (
    <AuthorizeView>
    <div className="full-screen-wrapper">
      {/* Homepage content always rendered */}
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
            <button className="cta-button">Get Started</button>
            <button className="cta-button secondary">Learn More</button>
          </div>
        </div>
      </div>

      {/* Curtain reveal over homepage */}
      <div className={`video-split-container ${startSplit ? 'split' : ''}`}>
        <div className="video-half top-half">
          <video
            src="/videos/intro.mp4"
            autoPlay
            muted
            playsInline
            className="video"
            onPlay={handlePlay}
          />
        </div>
        <div className="video-half bottom-half">
          <video
            src="/videos/intro.mp4"
            autoPlay
            muted
            playsInline
            className="video"
          />
        </div>
      </div>
    </div>
    </AuthorizeView>
  );
}

export default Homepage;