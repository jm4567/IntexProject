import { Link } from 'react-router-dom';
import '../css/styles.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/movies">
        CineNiche
      </Link>
      <Link to="/genres" className="plain-link">
        Browse by Genres
      </Link>
    </nav>
  );
};

export default Navbar;
