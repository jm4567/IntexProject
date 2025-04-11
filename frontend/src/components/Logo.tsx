// Import Link from React Router to allow navigation to the homepage
import { Link } from 'react-router-dom';
// Import custom styles for the navigation bar
import '../css/NavBar.css';

// Logo component for use in header or navbar
const Logo = () => {
  return (
    <div className="nav-logo">
      {/* Clicking the logo navigates back to the homepage */}
      <Link to="/" className="logo-link">
        {/* Image logo (PNG) */}
        <img
          src="/images/cleaned_logo_transparent.png"
          alt="CineNiche logo"
          className="cine-logo-img"
        />

        {/* SVG logo text on a curved path */}
        <svg
          width="200"
          height="100"
          xmlns="http://www.w3.org/2000/svg"
          className="cine-logo-svg"
        >
          <defs>
            {/* Define a curved path that the text will follow */}
            <path id="text-curve" d="M 0 80 A 100 40 0 0 1 200 70" />
          </defs>

          {/* Render the text along the curved path using <textPath> */}
          <text
            fill="#B23127" // Retro red fill color
            fontFamily="'RetroCool', cursive" // Custom retro font
            fontSize="30"
            letterSpacing="2"
          >
            <textPath href="#text-curve" startOffset="50%" textAnchor="middle">
              CINENICHE
            </textPath>
          </text>
        </svg>
      </Link>
    </div>
  );
};

export default Logo;
