import { Link, useLocation } from 'react-router-dom';
import '../css/NavBar.css';
import { useState } from 'react';
import Logo from './Logo';
import MovieSearch from './MovieSearch';
import { logoutUser } from '../api/logoutUser';
import GenreFilter from './GenreFilter';
import { useUser } from './AuthorizeView';

interface NavBarProps {
  selectedGenres: string[];
  setSelectedGenres: React.Dispatch<React.SetStateAction<string[]>>;
}

const NavBar = ({ selectedGenres, setSelectedGenres }: NavBarProps) => {
  const [showSearch, setShowSearch] = useState(false);
  const [selectedMovies, setSelectedMovies] = useState<string[]>([]);
  const [showGenreDropdown, setShowGenreDropdown] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const user = useUser();
  const toggleProfileMenu = () => setShowProfileMenu((prev) => !prev);
  const toggleSearch = () => setShowSearch((prev) => !prev);

  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="nav-wrapper">
      <div className="nav-row">
        <Logo />

        {/* Center nav links */}
        <div className="nav-main">
          <div className="nav-inner">
            <div className="nav-left">
              {currentPath === '/genres' && (
                <Link to="/movies" className="navbar-brand">
                  Go Back
                </Link>
              )}
              {['/managemovies', '/movies'].includes(currentPath) && (
                <Link to="/" className="navbar-brand">
                  Home
                </Link>
              )}
            </div>

            <div className="nav-middle">
              {currentPath === '/managemovies' && (
                <Link to="/movies" className="navbar-brand">
                  Access Movies
                </Link>
              )}
              {currentPath === '/movies' && (
                <div className="genre-toggle-wrapper">
                  <div
                    className="navbar-brand genre-filter-toggle"
                    onClick={() => setShowGenreDropdown((prev) => !prev)}
                    style={{ cursor: 'pointer' }}
                  >
                    Filter by Genre <span className="arrow">▼</span>
                  </div>
                  {showGenreDropdown && (
                    <div className="floating-genre-dropdown">
                      <GenreFilter
                        selectedGenres={selectedGenres}
                        setSelectedGenres={setSelectedGenres}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="nav-right">
              <div className="search-icon navbar-brand" onClick={toggleSearch}>
                Search 🔍
              </div>
              {showSearch && (
                <div className="col-md-12 mb-4 drop-down">
                  <MovieSearch
                    selectedMovies={selectedMovies}
                    setSelectedMovies={setSelectedMovies}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Avatar and email side-by-side */}
        <div className="nav-avatar" onClick={toggleProfileMenu}>
          <div className="user-info-wrapper-horizontal ">
            {user?.email && (
              <span className="user-name text-black">{user.email}</span>
            )}
            <img
              src="/images/person.png"
              className="avatar-img"
              alt="Profile"
            />
          </div>

          {showProfileMenu && (
            <div className="profile-dropdown text-black">
              <Link to="/profile" className="dropdown-item">
                <span className="icon">👤</span> View Profile
              </Link>
              <Link to="/setting" className="dropdown-item">
                <span className="icon">⚙️</span> Settings
              </Link>
              <button
                className="dropdown-item"
                onClick={async () => {
                  const success = await logoutUser();
                  if (success) {
                    document.cookie =
                      '.AspNetCore.Identity.Application=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
                    window.location.href = '/login';
                  } else {
                    console.error('Logout failed');
                  }
                }}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
