import { Link, useLocation } from 'react-router-dom';
import '../css/NavBar.css';
import { useState } from 'react';
import Logo from './Logo';
import MovieSearch from './MovieSearch';
import { logoutUser } from '../api/logoutUser';
import GenreFilter from './GenreFilter';
import { useUser } from './AuthorizeView';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  {
    /*change nav bar depending on page */
  }
  return (
    <div className="nav-wrapper">
      <div className="nav-row">
        <Logo />

        {/* Center nav links */}
        <div className="nav-inner">
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
            {(['/movies', '/managemovies'].includes(currentPath) ||
              currentPath.startsWith('/movie/')) && (
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
            {user?.email === 'adminuser1@gmail.com' && (
              <Link to="/managemovies" className="navbar-brand">
                Admin Dashboard
              </Link>
            )}
            {['/privacy'].includes(currentPath) && (
              <>
                <div className="privacy-buttons">
                  <button
                    onClick={() => navigate('/register')}
                    className="privButt"
                  >
                    Sign Up Today!
                  </button>

                  <button
                    onClick={() => navigate('/login')}
                    className="privButt"
                  >
                    Login
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {['/movies', '/managemovies', '/profile'].includes(currentPath) ||
        currentPath.startsWith('/movie/') ? (
          <div className="nav-avatar" onClick={toggleProfileMenu}>
            <div className="user-info-wrapper-horizontal">
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
        ) : null}
      </div>
    </div>
  );
};

export default NavBar;
