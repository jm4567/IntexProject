import { useEffect, useState } from 'react';
import { Movie } from '../types/Movie';
import { fetchAllMovies } from '../api/MoviesAPI';
import MovieRow from '../components/MovieRow';
import NavBar from '../components/NavBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MovieCard from '../components/MovieCard';
import '../css/MoviePage.css';

const MoviesPage = () => {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [startSplit, setStartSplit] = useState(false);
  const [showCurtain, setShowCurtain] = useState(true);

  const handlePlay = () => {
    const moviepage = document.querySelector('.movie-container');
    if (moviepage) moviepage.classList.add('visible');

    setTimeout(() => {
      setStartSplit(true);
    }, 3000);

    setTimeout(() => {
      setShowCurtain(false);
    }, 4000);

    setTimeout(() => {
      const curtain = document.querySelector(
        '.video-split-container'
      ) as HTMLElement;
      if (curtain) curtain.style.display = 'none';
    }, 4000);
  };

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchAllMovies([]);
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

  const filteredMovies = selectedGenres.length
    ? allMovies.filter((movie) =>
        movie.genres?.some((genre) => selectedGenres.includes(genre))
      )
    : [];

  return (
    <div className="full-screen-wrapper">
      <div className="movie-container">
        <div className="background-overlay"></div>

        <div className="movie-content foreground-content">
          <NavBar
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
          />
          {selectedGenres.length === 0 && <Header movies={topBannerMovies} />}

          <div className="container-fluid mt-4 foreground-content">
            <div className="row">
              {/* <div className="col-md-12 mb-4 drop-down">
                <GenreFilter
                  selectedGenres={selectedGenres}
                  setSelectedGenres={setSelectedGenres}
                />
              </div> */}

              <div className="col-md-12">
                {error && <p className="text-danger">{error}</p>}

                {selectedGenres.length > 0 ? (
                  <div className="row">
                    {filteredMovies.map((movie) => (
                      <div className="col-md-2 mb-4" key={movie.showId}>
                        <MovieCard movie={movie} />
                      </div>
                    ))}
                    {filteredMovies.length === 0 && (
                      <p className="text-light">No movies found.</p>
                    )}
                  </div>
                ) : (
                  <>
                    <h1 className="mb-3">Recently Watched</h1>
                    <MovieRow title="" movies={allMovies} />
                    <h1 className="mb-3">All Movies</h1>
                    <MovieRow title="" movies={allMovies} />
                    <h1 className="mb-3">Temp Title</h1>
                    <MovieRow title="" movies={allMovies} />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>

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
