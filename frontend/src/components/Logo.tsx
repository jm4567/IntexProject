import { Link } from 'react-router-dom';
import '../css/NavBar.css';

const Logo = () => {
  return (
    <div
      className="nav-logo"
      style={{
        display: 'flex',
        alignItems: 'flex-end', // ✅ aligns image bottom with SVG arc
        gap: '0.25rem', // ✅ closer spacing
      }}
    >
      <Link
        className="navbar-name"
        to="/"
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          textDecoration: 'none',
        }}
      >
        <img
          src="/images/cleaned_logo_transparent.png"
          alt="CineNiche logo"
          className="cine-logo-img"
        />
        <svg
          width="300"
          height="125"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: 'block' }}
        >
          <defs>
            <path id="text-curve" d="M 0 100 A 150 20 0 0 1 300 100" />
          </defs>
          <text
            fill="#B23127"
            fontFamily="'RetroCool', cursive"
            fontSize="50"
            letterSpacing="6"
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
