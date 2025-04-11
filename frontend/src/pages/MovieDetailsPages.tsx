import '../css/MovieDetail.css';
import MovieRow from '../components/MovieRow';
import { useState, useEffect, useRef } from 'react';
import { Movie } from '../types/Movie';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';
import { fetchAllMovies, fetchMovieById } from '../api/MoviesAPI';
import StarRating from '../components/StarRating';
import { getCurrentUserEmail } from '../api/UserAPI';

function MovieDetailsPage() {
  const location = useLocation();
  const { showId: routeShowId } = useParams();
  const [movieData, setMovieData] = useState<Movie | null>(
    (location.state as Movie) ?? null
  );
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [collabMovies, setCollabMovies] = useState<Movie[]>([]);
  const [contentMovies, setContentMovies] = useState<Movie[]>([]);
  const [loadingRecs, setLoadingRecs] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const collabRef = useRef<HTMLDivElement | null>(null);

  const [userRating, setUserRating] = useState<number>(0);
  const [userEmail, setUserEmail] = useState<string | null>(null);

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
          try {
            currentMovie = await fetchMovieById(routeShowId!);
          } catch (err) {
            setError('Movie not found.');
            return;
          }
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

        console.log('Matched Collab Movies:', matchedCollab);
        console.log('Matched Content Movies:', matchedContentInitial);
        console.log('Fallback Content Movies:', filteredFallbacks);
        console.log('Final Recommendations:', finalContentMovies);

        setCollabMovies(matchedCollab);
        setContentMovies(finalContentMovies);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoadingRecs(false);
      }
    };
    loadData();
  }, [routeShowId, location.key]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = await getCurrentUserEmail();
        setUserEmail(email);

        // 🔧 Reset before checking the database
        setUserRating(0);

        if (email && movieData?.showId) {
          const res = await axios.get(
            `https://localhost:5000/api/ratings/get?userEmail=${encodeURIComponent(email)}&showId=${movieData.showId}`,
            { withCredentials: true }
          );

          // Only set if there is actually a rating
          if (res.data?.rating !== undefined) {
            setUserRating(res.data.rating);
          }
        }
      } catch (err) {
        console.error('❌ Failed to fetch user data or rating:', err);
        // 🔧 Optional: reset here too just in case
        setUserRating(0);
      }
    };

    fetchUserData();
  }, [movieData]);

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

  const resolvePoster = () => {
    if (posterUrl) return posterUrl;
    return `https://postersintex29.blob.core.windows.net/posters/${title}.jpg`;
  };
  {
    /*display all of the details */
  }
  return (
    <div style={{ background: '#1F3B3C', minHeight: '100vh' }}>
      <div className="container-fluid py-5 px-4">
        <div className="row justify-content-center align-items-start">
          <div className="col-lg-4 col-md-5 text-center mb-4 mb-md-0">
            <img
              src={resolvePoster()}
              alt={title}
              className="movie-poster-img"
              key={resolvePoster()}
              onError={(e) => {
                console.warn('❌ Image failed:', e.currentTarget.src);
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/images/Image_coming_soon.png';
              }}
            />
          </div>
          <div className="col-lg-6 col-md-7">
            <h1 className="fw-bold display-4" style={{ color: 'white' }}>
              {title}
            </h1>
            <div className="star-rating-container mt-2">
              <div className="custom-star-wrapper">
                {/**allow user to rate movie - can rerate or add new rating */}
                <StarRating
                  value={userRating}
                  onChange={async (newRating: number) => {
                    setUserRating(newRating);
                    await axios.post(
                      'https://localhost:5000/api/ratings/rate',
                      {
                        userEmail,
                        showId: movieData?.showId,
                        rating: newRating,
                      },
                      { withCredentials: true }
                    );
                  }}
                />
              </div>
            </div>
            <div className="description-style">
              {director && (
                <h5
                  style={{
                    fontSize: '24px',
                    fontWeight: '500',
                    marginTop: '8px',
                    color: 'white',
                  }}
                >
                  Directed by {director}
                </h5>
              )}
              {genres.length > 0 && (
                <p>
                  <strong>Genres:</strong> {genres.join(' • ')}
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
                  <strong>Summary:</strong> {description}
                </p>
              )}
              {castList && (
                <p>
                  <strong>Cast:</strong>{' '}
                  {castList
                    .split(' ')
                    .reduce((acc, name, idx, arr) => {
                      acc += name;
                      if ((idx + 1) % 2 === 0 && idx !== arr.length - 1) {
                        acc += ', ';
                      } else {
                        acc += ' ';
                      }
                      return acc;
                    }, '')
                    .trim()}
                </p>
              )}
            </div>
            <button className="btn btn-outline-dark mt-3 button-style">
              ► Watch Now
            </button>
          </div>
        </div>

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
  );
}

export default MovieDetailsPage;
