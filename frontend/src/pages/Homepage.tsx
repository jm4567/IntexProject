import { useNavigate } from 'react-router-dom';
import '../css/Homepage.css';
import '../css/NavBar.css';
// import AuthorizeView, { AuthorizedUser } from '../components/AuthorizeView';
// import Logout from '../components/Logout';
import Logo from '../components/Logo';
import Footer from '../components/Footer';
import { Movie } from '../types/Movie';
import { useEffect, useState } from 'react';
import { fetchAllMovies } from '../api/MoviesAPI';

const Homepage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadMovies = async () => {
      const data = await fetchAllMovies([]);
      setMovies(data.movies);
    };
    loadMovies();
  }, []);

  const trendingIds = [
    's42',
    's7073',
    's603',
    's6065',
    's6891',
    's6063',
    's6152',
    's7640',
    's8083',
    's8513',
  ];

  const trendingMovies = movies.filter((movie) =>
    trendingIds.includes(movie.showId)
  );

  return (
    <>
      <div className="homepage-container">
        {/* Logo (top-left, above overlay) */}
        <div className="logo-fixed">
          <Logo />
        </div>
        <div className="login-butt">
          <button onClick={() => navigate('/login')} className="home-button">
            Login
          </button>
        </div>
        <div className="background-overlay">
          <img
            src="/images/homepage.png"
            alt="Background collage"
            className="background-image"
          />
        </div>

        <div className="foreground-content">
          <h1>Unlimited Movies and TV Shows.</h1>
          <br />
          <h1>Never-ending Recommendations</h1>
          <p>
            A movie experience made just for you — discover, rate, and get
            curated picks.
          </p>

          <form
            className="email-form"
            onSubmit={(e) => {
              e.preventDefault();
              const email = (e.target as HTMLFormElement).email.value;
              console.log('Email submitted:', email);
            }}
          >
            <input
              type="email"
              name="email"
              placeholder="Email address"
              className="email-input"
              required
            />
            <button
              onClick={() => navigate('/createaccount')}
              type="submit"
              className="email-button"
            >
              Sign Up Today!
            </button>
          </form>
        </div>
      </div>

      <div className="trending-section">
        <h2 className="trending-title">Trending Now</h2>
        <div className="trending-carousel">
          {trendingMovies.map((movie, index) => (
            <div className="poster-wrapper" key={movie.showId}>
              <span className="rank-number">{index + 1}</span>
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="trending-poster"
              />
            </div>
          ))}
        </div>
      </div>

      <section className="reasons-section">
        <h2>More Reasons to Join</h2>
        <div className="reasons-grid">
          <div className="reason-card">
            <h4>Indie Movie Selections</h4>
            <p>Enjoy finding a good collection of Indie Movies</p>
          </div>
          <div className="reason-card">
            <h4>Review Movies With Fun Stars</h4>
            <p>Rate on a scale of 5 to know what movies you like</p>
          </div>
          <div className="reason-card">
            <h4>Display Movie Details</h4>
            <p>No need to wonder who, what, where, when, how</p>
          </div>
          <div className="reason-card">
            <h4>Filter By Favorite Genre</h4>
            <p>Action. Comedy. Romance? Let's go!</p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Homepage;
