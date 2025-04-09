import { Link } from 'react-router-dom';
import '../css/styles.css';
import '../css/NavBar.css';
import { useState } from 'react';
import Logo from './logo';
import { useLocation } from 'react-router-dom';
import MovieSearch from './MovieSearch';

const Navbar = () => {
  //toggle search
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMovies, setSelectedMovies] = useState<string[]>([]);

  //toggle profile so it shows menu
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const toggleProfileMenu = () => {
    setShowProfileMenu((prev) => !prev);
  };

  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
  };

  //use location so navigation pill changes depending on the page we are on
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="nav-wrapper">
      {/* Left - Logo */}

      <Logo />

      {/* Center - Pill nav */}
      <div className="nav-center">
        <div className="nav-inner">
          <div className="nav-left">
            {currentPath === '/genres' && (
              <Link to="/movies" className="nav-link active navbar-brand">
                Go Back
              </Link>
            )}
            {currentPath === '/managemovies' && (
              <Link to="/" className="nav-link active navbar-brand">
                Home
              </Link>
            )}
            {currentPath === '/movies' && (
              <Link to="/" className="nav-link active navbar-brand">
                Home
              </Link>
            )}
          </div>
          <div className="nav-middle">
            {currentPath === '/managemovies' && (
              <Link to="/movies" className="nav-link active navbar-brand">
                Access Movies
              </Link>
            )}
            {currentPath === '/movies' && (
              <Link to="/genres" className="nav-link active navbar-brand">
                Genre <span className="arrow">▼</span>
              </Link>
            )}
          </div>
          <div className="nav-right">
            <div
              className="search-icon nav-link active navbar-brand"
              onClick={toggleSearch}
            >
              Search 🔍
            </div>
            <div className="col-md-12 mb-4 drop-down">
              <MovieSearch
                selectedMovies={selectedMovies}
                setSelectedMovies={setSelectedMovies}
              />
            </div>
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
