import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="text-center mt-5 py-4 border-top">
      <p className="mb-0">
        &copy; 2025 CineNiche. All rights reserved.{' '}
        <Link to="/privacy" className="text-decoration-underline">
          Privacy Policy
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
