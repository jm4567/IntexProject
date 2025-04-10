import '../css/MovieDetail.css';
import MovieRow from '../components/MovieRow';
import { useState, useEffect, useRef } from 'react';
import { Movie } from '../types/Movie';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';
import { fetchAllMovies, fetchMovieById } from '../api/MoviesAPI';
import { getPosterUrl } from '../utils/getPosterUrl';

function MovieDetailsPage() {
  const location = useLocation();
  const { showId: routeShowId } = useParams();
  const [movieData, setMovieData] = useState<Movie | null>(null);
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [collabMovies, setCollabMovies] = useState<Movie[]>([]);
  const [contentMovies, setContentMovies] = useState<Movie[]>([]);
  const [loadingRecs, setLoadingRecs] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const collabRef = useRef<HTMLDivElement | null>(null);

  const extractGenres = (movie: any): string[] => {
    const genreKeys = [
      'action',
      'adventure',
      'animeSeriesInternationalTvShows',
      'britishTvShowsDocuseriesInternationalTvShows',
      'children',
      'comedies',
      'comediesDramasInternationalMovies',
      'comediesInternationalMovies',
      'comediesRomanticMovies',
      'crimeTvShowsDocuseries',
      'documentaries',
      'documentariesInternationalMovies',
      'docuseries',
      'dramas',
      'dramasInternationalMovies',
      'dramasRomanticMovies',
      'familyMovies',
      'fantasy',
      'horrorMovies',
      'internationalMoviesThrillers',
      'internationalTvShowsRomanticTvShowsTvDramas',
      'kidsTv',
      'languageTvShows',
      'musicals',
      'natureTv',
      'realityTv',
      'spirituality',
      'tvAction',
      'tvComedies',
      'tvDramas',
      'talkShowsTvComedies',
      'thrillers',
    ];
    return genreKeys.filter((key) => movie[key] === 1);
  };

  useEffect(() => {
    const loadData = async () => {
      setLoadingRecs(true);
      try {
        const all = await fetchAllMovies([]);
        setAllMovies(all.movies);

        let currentMovie = location.state as Movie;
        if (!currentMovie || currentMovie.showId !== routeShowId) {
          currentMovie = await fetchMovieById(routeShowId!);
        }
        setMovieData(currentMovie);

        window.scrollTo({ top: 0 });

        const showId = currentMovie.showId;
        const title = currentMovie.title;

        let collabTitles: string[] = [];
        let contentTitles: string[] = [];

        if (showId) {
          const res = await axios.get(
            `https://localhost:5000/api/Recommendations/by-id/${showId}`
          );
          const rec = res.data;
          collabTitles = [
            rec.collaborative?.recommendation_1,
            rec.collaborative?.recommendation_2,
            rec.collaborative?.recommendation_3,
            rec.collaborative?.recommendation_4,
            rec.collaborative?.recommendation_5,
          ].filter(Boolean);
        }

        if (title) {
          const res = await axios.get(
            `https://localhost:5000/api/Recommendations/by-title/${encodeURIComponent(title)}`
          );
          const rec = res.data;
          contentTitles = [
            rec.content?.recommendation_1_title,
            rec.content?.recommendation_2_title,
            rec.content?.recommendation_3_title,
            rec.content?.recommendation_4_title,
            rec.content?.recommendation_5_title,
          ].filter(Boolean);
        }

        const trim = (str: string) => str?.trim();

        const matchedCollab = all.movies.filter((m) =>
          collabTitles.map(trim).includes(trim(m.title))
        );

        const matchedContentInitial = all.movies.filter((m) =>
          contentTitles.map(trim).includes(trim(m.title))
        );

        const matchedContentTitles = matchedContentInitial.map((m) =>
          trim(m.title)
        );
        const missingContentTitles = contentTitles.filter(
          (t) => !matchedContentTitles.includes(trim(t))
        );

        const fallbackMovies = await Promise.all(
          missingContentTitles.map(async (t) => {
            try {
              const res = await axios.get(
                `https://localhost:5000/api/SupplementalMovie/GetByTitle/${encodeURIComponent(t)}`
              );
              const fallback = res.data;
              return {
                ...fallback,
                genres: extractGenres(fallback),
              };
            } catch {
              return null;
            }
          })
        );

        const filteredFallbacks = fallbackMovies.filter(Boolean) as Movie[];
        const finalContentMovies = [
          ...matchedContentInitial,
          ...filteredFallbacks,
        ];

        setCollabMovies(matchedCollab);
        setContentMovies(finalContentMovies);
      } catch (err) {
        setError((err as Error).message);
      }
      setLoadingRecs(false);
    };

    loadData();
  }, [routeShowId]);

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
                src={posterUrl || getPosterUrl(title)}
                alt={title}
                onError={(e) => {
                  // If backend URL fails, fall back to getPosterUrl
                  if (e.currentTarget.src !== getPosterUrl(title)) {
                    e.currentTarget.src = getPosterUrl(title);
                  } else {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/images/Image_coming_soon.png';
                  }
                }}
                className="movie-poster-img"
              />
            </div>

            <div className="col-lg-6 col-md-7">
              <div className="movie-detail ps-md-4">
                <h1 className="fw-bold display-4">{title}</h1>
                {director && (
                  <h5 className="text-secondary mb-3">
                    Directed by {director}
                  </h5>
                )}
                {genres.length > 0 && (
                  <p>
                    <strong>Genres:</strong> {genres.join(', ')}
                  </p>
                )}
                {rating && (
                  <p>
                    <strong>Rating:</strong> {rating}
                  </p>
                )}
                {type && (
                  <p>
                    <strong>Type:</strong> {type}
                  </p>
                )}
                {duration && (
                  <p>
                    <strong>Duration:</strong> {duration}
                  </p>
                )}
                {releaseYear && (
                  <p>
                    <strong>Release Year:</strong> {releaseYear}
                  </p>
                )}
                {country && (
                  <p>
                    <strong>Country:</strong> {country}
                  </p>
                )}
                {description && (
                  <p className="mt-3">
                    <strong>Description:</strong> {description}
                  </p>
                )}
                {castList && (
                  <p>
                    <strong>Cast:</strong> {castList}
                  </p>
                )}
                <button className="btn btn-outline-dark mt-3">
                  <i className="bi bi-play-fill me-2"></i> Watch Now
                </button>
              </div>
            </div>
          </div>

          {loadingRecs && (
            <div className="text-center mt-5">
              <p>Loading recommendations...</p>
            </div>
          )}

          {!loadingRecs && collabMovies.length > 0 && (
            <div className="mt-5" ref={collabRef}>
              <MovieRow title="Other users liked…" movies={collabMovies} />
            </div>
          )}

          {!loadingRecs && contentMovies.length > 0 && (
            <div className="mt-5" ref={contentRef}>
              <MovieRow
                title={`Recommendations Based on "${title}"`}
                movies={contentMovies}
              />
            </div>
          )}

          {!loadingRecs &&
            collabMovies.length === 0 &&
            contentMovies.length === 0 && (
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
