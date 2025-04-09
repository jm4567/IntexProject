import { useNavigate } from 'react-router-dom';
import '../css/Homepage.css';
import '../css/NavBar.css';
// import AuthorizeView, { AuthorizedUser } from '../components/AuthorizeView';
// import Logout from '../components/Logout';
import Logo from '../components/logo';

function Homepage() {
  const navigate = useNavigate();
  return (
    <div className="homepage-container">
      <Logo />
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
