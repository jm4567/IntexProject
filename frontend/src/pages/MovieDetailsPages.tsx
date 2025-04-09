import '../css/MovieDetail.css';
import MovieRow from '../components/MovieRow';
import { useState, useEffect, useRef } from 'react';
import { Movie } from '../types/Movie';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { fetchAllMovies, fetchMovieById } from '../api/MoviesAPI';

function MovieDetailsPage() {
  const location = useLocation();
  const { showId } = useParams();
  const [movieData, setMovieData] = useState<Movie | null>(location.state || null);
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [collabMovies, setCollabMovies] = useState<Movie[]>([]);
  const [contentMovies, setContentMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const collabRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Always fetch the movie from the backend for freshest data
        if (!movieData && showId) {
          const fetchedMovie = await fetchMovieById(showId);
          setMovieData(fetchedMovie);
        }

        // Load all movies (needed for matching titles)
        const all = await fetchAllMovies([]);
        setAllMovies(all.movies);

        // Fetch recommendations once movieData is ready
        if (movieData) {
          const showId = movieData.showId || movieData.show_id;
          const title = movieData.title;

          const collabTitles: string[] = [];
          const contentTitles: string[] = [];

          if (showId) {
            const res = await axios.get(
              `https://localhost:5000/api/Recommendations/by-id/${showId}`
            );
            const rec = res.data;
            collabTitles.push(
              rec.collaborative?.recommendation_1,
              rec.collaborative?.recommendation_2,
              rec.collaborative?.recommendation_3,
              rec.collaborative?.recommendation_4,
              rec.collaborative?.recommendation_5
            );
          }

          if (title) {
            const res = await axios.get(
              `https://localhost:5000/api/Recommendations/by-title/${encodeURIComponent(title)}`
            );
            const rec = res.data;
            contentTitles.push(
              rec.content?.recommendation_1_title,
              rec.content?.recommendation_2_title,
              rec.content?.recommendation_3_title,
              rec.content?.recommendation_4_title,
              rec.content?.recommendation_5_title
            );
          }

          // Normalize and match
          const normalize = (s: string) => s?.trim()?.toLowerCase();
          const normalizedAll = all.movies.map((m) => ({
            ...m,
            normalizedTitle: normalize(m.title),
          }));

          setCollabMovies(
            normalizedAll.filter((m) =>
              collabTitles.map(normalize).includes(m.normalizedTitle)
            )
          );

          setContentMovies(
            normalizedAll.filter((m) =>
              contentTitles.map(normalize).includes(m.normalizedTitle)
            )
          );

          // Scroll to recommendations
          setTimeout(() => {
            (collabMovies.length &&
              collabRef.current?.scrollIntoView({ behavior: 'smooth' })) ||
              (contentMovies.length &&
                contentRef.current?.scrollIntoView({ behavior: 'smooth' }));
          }, 100);
        }
      } catch (err) {
        setError((err as Error).message);
        console.error('❌ Recommendation error:', err);
      }
    };

    loadData();
  }, [movieData, showId]);

  if (!movieData) {
    return <p className="text-center mt-5">Loading movie details...</p>;
  }

  const {
    title,
    director,
    genres = [],
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
              <img
                src={
                  posterUrl ||
                  'https://via.placeholder.com/150x220?text=No+Image'
                }
                alt={title}
                className="movie-poster-img"
              />
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
          </div>

          <div className="mt-5" ref={collabRef}>
            {collabMovies.length > 0 && (
              <MovieRow title="Other users liked…" movies={collabMovies} />
            )}
          </div>

          <div className="mt-5" ref={contentRef}>
            {contentMovies.length > 0 && (
              <MovieRow title="Similar content" movies={contentMovies} />
            )}
          </div>

          {collabMovies.length === 0 && contentMovies.length === 0 && (
            <div className="text-center mt-5">
              <h4>No recommendations found for this title.</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetailsPage;
