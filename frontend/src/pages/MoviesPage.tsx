import { useEffect, useState } from 'react';
import { Movie } from '../types/Movie';
import { fetchAllMovies } from '../api/MoviesAPI';
import MovieRow from '../components/MovieRow';
import NavBar from '../components/NavBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/MoviePage.css';

const MoviesPage = () => {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [startSplit, setStartSplit] = useState(false);

  const [showCurtain, setShowCurtain] = useState(true);
  const handlePlay = () => {
    const moviepage = document.querySelector('.movie-container');
    if (moviepage) moviepage.classList.add('visible');

    setTimeout(() => {
      setStartSplit(true);
    }, 3000);

    setTimeout(() => {
      setShowCurtain(false); // use state instead of querySelector
    }, 4000);

    // Step 3: Fully remove the curtain after animation
    setTimeout(() => {
      const curtain = document.querySelector(
        '.video-split-container'
      ) as HTMLElement;
      if (curtain) curtain.style.display = 'none';
    }, 4000); // matches curtain animation time
  };

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchAllMovies([]); // get all movies
        setAllMovies(data.movies);
      } catch (err) {
        setError((err as Error).message);
      }
    };
    loadMovies();
  }, []);

  //for header
  const topBannerMovies = allMovies.filter((movie) =>
    ['s42', 's7073', 's603', 's6065', 's6891', 's6063', 's6152'].includes(
      movie.showId
    )
  );

  return (
    <div className="full-screen-wrapper">
      <div className="movie-container">
        {/* Background image behind everything */}

        <div className="background-overlay"></div>

        {/* Movie content over the background */}
        <div className="movie-content foreground-content">
          <NavBar />
          <Header movies={topBannerMovies} />
          <div className="container-fluid mt-4 foreground-content">
            <div className="row">
              <div>
                <h1 className="mb-3">Recently Watched</h1>
                {error && <p className="text-danger">{error}</p>}
                <MovieRow title="" movies={allMovies} />
                <h1 className="mb-3">All Movies</h1>
                {error && <p className="text-danger">{error}</p>}
                <MovieRow title="" movies={allMovies} />
                <h1 className="mb-3">Temp Title</h1>
                {error && <p className="text-danger">{error}</p>}
                <MovieRow title="" movies={allMovies} />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      {/* Curtain reveal over homepage */}
      {showCurtain && (
        <div className={`video-split-container ${startSplit ? 'split' : ''}`}>
          <div className="video-half top-half">
            <video
              src="/videos/intro.mp4"
              autoPlay
              muted
              playsInline
              className="video"
              onPlay={handlePlay}
            />
          </div>
          <div className="video-half bottom-half">
            <video
              src="/videos/intro.mp4"
              autoPlay
              muted
              playsInline
              className="video"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MoviesPage;
