import { Link, useLocation } from 'react-router-dom';
import '../css/Footer.css';

const Footer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isMoviesPage = location.pathname === '/movies';

  return (
    <footer
      className={`text-center ${
        isHomePage
          ? 'homepage-footer'
          : isMoviesPage
            ? 'moviespage-footer'
            : 'default-footer'
      }`}
    >
      <p className="mb-0 footer-p">
        &copy; 2025 CineNiche. All rights reserved.{' '}
        <Link to="/privacy" className="text-decoration-underline">
          Privacy Policy
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
