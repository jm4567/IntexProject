import { Link } from 'react-router-dom';
// import '../css/styles.css';
import '../css/NavBar.css';
import { useState } from 'react';
import Logo from './Logo';
import { useLocation } from 'react-router-dom';
import MovieSearch from './MovieSearch';
import { logoutUser } from '../api/logoutUser';
import GenreFilter from './GenreFilter';

interface NavBarProps {
  selectedGenres: string[];
  setSelectedGenres: React.Dispatch<React.SetStateAction<string[]>>;
}

const NavBar = ({ selectedGenres, setSelectedGenres }: NavBarProps) => {
  //toggle search
  const [showSearch, setShowSearch] = useState(false);
  const [selectedMovies, setSelectedMovies] = useState<string[]>([]);
  const [showGenreDropdown, setShowGenreDropdown] = useState(false);

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
      {/* Horizontal row: logo - pill - avatar */}
      <div className="nav-row">
        {/* Center pill nav */}
        <div className="nav-inner">
          <Logo />
          <div className="nav-left">
            {currentPath === '/genres' && (
              <Link to="/movies" className="navbar-brand">
                Go Back
              </Link>
            )}
            {currentPath === '/managemovies' && (
              <Link to="/" className="navbar-brand">
                Landing Page
              </Link>
            )}
            {(['/movies'].includes(currentPath) ||
              currentPath.startsWith('/movie/')) && (
              <Link to="/movies" className="navbar-brand">
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
                  Filter by Genre
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
            {['/movies', '/managemovies'].includes(currentPath) && (
              <>
                <div
                  className="search-icon navbar-brand"
                  onClick={toggleSearch}
                >
                  Search
                </div>
                {showSearch && (
                  <div className="col-md-12 mb-4 search-dropdown nav-search">
                    <MovieSearch
                      selectedMovies={selectedMovies}
                      setSelectedMovies={setSelectedMovies}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Avatar on right side */}
        <div className="nav-avatar">
          {(['/movies', '/managemovies'].includes(currentPath) ||
            currentPath.startsWith('/movie/')) && (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
