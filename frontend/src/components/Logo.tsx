import { Link } from 'react-router-dom';
import '../css/NavBar.css';

const Logo = () => {
  return (
    <div className="nav-logo">
      <Link to="/" className="logo-link">
        <img
          src="/images/cleaned_logo_transparent.png"
          alt="CineNiche logo"
          className="cine-logo-img"
        />
        <svg
          width="200"
          height="100"
          xmlns="http://www.w3.org/2000/svg"
          className="cine-logo-svg"
        >
          <defs>
            <path id="text-curve" d="M 0 80 A 100 40 0 0 1 200 70" />
          </defs>
          <text
            fill="#B23127"
            fontFamily="'RetroCool', cursive"
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
