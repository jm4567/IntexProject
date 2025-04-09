import { Link } from 'react-router-dom';
import '../css/styles.css';
import '../css/NavBar.css';
import { useState } from 'react';

const Navbar = () => {
  //toggle search
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  //toggle profile so it shows menu
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const toggleProfileMenu = () => {
    setShowProfileMenu((prev) => !prev);
  };

  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
  };
  return (
    <div className="nav-wrapper">
      {/* Left - Logo */}

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
              <textPath
                href="#text-curve"
                startOffset="50%"
                textAnchor="middle"
              >
                CINENICHE
              </textPath>
            </text>
          </svg>
        </Link>
      </div>

      {/* Center - Pill nav */}
      <div className="nav-center">
        <div className="nav-inner">
          <div className="nav-left">
            <Link to="/" className="nav-link active navbar-brand">
              Home
            </Link>
          </div>
          <div className="nav-middle">
            <Link to="/genres" className="nav-link active navbar-brand">
              Genre <span className="arrow">▼</span>
            </Link>
          </div>
          <div className="nav-right">
            <div
              className="search-icon nav-link active navbar-brand"
              onClick={toggleSearch}
            >
              Search 🔍
            </div>
            {showSearch && (
              <input
                type="text"
                className="search-input"
                placeholder="Search movie titles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            )}
          </div>
        </div>
      </div>

      {/* Avatar with dropdown */}
      <div className="nav-avatar">
        <img
          src="/images/person.png"
          onClick={toggleProfileMenu}
          className="avatar-img"
          width="120"
          height="120"
        />
        {showProfileMenu && (
          <div className="profile-dropdown">
            <Link to="/profile" className="dropdown-item">
              <span className="icon">👤</span> View Profile
            </Link>
            <Link to="/setting" className="dropdown-item">
              <span className="icon">⚙️</span> Settings
            </Link>
            <button className="dropdown-item">Sign Out</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
