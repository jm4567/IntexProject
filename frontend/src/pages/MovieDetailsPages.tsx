import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import MovieRow from '../components/MovieRow';
import { Movie } from '../types/Movie';
import { fetchAllMovies, fetchMovieById } from '../api/MoviesAPI';
import '../css/MovieDetail.css';

function MovieDetailsPage() {
  const location = useLocation();
  const { showId } = useParams();
  const [movieData, setMovieData] = useState<Movie | null>(
    location.state || null
  );
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (location.state) {
          setMovieData(location.state as Movie); // preload from nav state
        }

        if (showId) {
          const fetchedMovie = await fetchMovieById(showId);
          setMovieData(fetchedMovie); // always fetch fresh version too
        }

        const all = await fetchAllMovies([]);
        setAllMovies(all.movies);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    loadData();
  }, [showId]);
  if (!movieData) {
    return <p className="text-center mt-5">Loading movie details...</p>;
  }

  const {
    title,
    director,
    genres,
    posterUrl,
    description,
    duration,
    releaseYear,
    rating,
    country,
    type,
    castList,
  } = movieData;

  return (
    <div className="full-screen-wrapper">
      <div className="background-overlay"></div>
      <div className="foreground-content">
        <div className="container-fluid movie-detail-container py-5 px-4">
          <div className="row justify-content-center align-items-start">
            <div className="col-lg-4 col-md-5 text-center mb-4 mb-md-0">
              <img src={posterUrl} alt={title} className="movie-poster-img" />
            </div>

            <div className="col-lg-6 col-md-7">
              <div className="movie-detail ps-md-4">
                <h1 className="fw-bold display-4">{title}</h1>
                <h5 className="text-secondary mb-3">Directed by {director}</h5>
                <p>
                  <strong>Genres:</strong> {genres.join(', ')}
                </p>
                <p>
                  <strong>Rating:</strong> {rating}
                </p>
                <p>
                  <strong>Type:</strong> {type}
                </p>
                <p>
                  <strong>Duration:</strong> {duration}
                </p>
                <p>
                  <strong>Release Year:</strong> {releaseYear}
                </p>
                <p>
                  <strong>Country:</strong> {country}
                </p>
                <p className="mt-3">
                  <strong>Description:</strong> {description}
                </p>
                <p>
                  <strong>Cast:</strong> {castList}
                </p>

                <button className="btn btn-outline-dark mt-3">
                  <i className="bi bi-play-fill me-2"></i> Watch Now
                </button>
              </div>
            </div>

            <h1 className="mb-3">Movies like {title}:</h1>
            <MovieRow title="" movies={allMovies} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailsPage;
