import { Movie } from '../types/Movie';
import { useNavigate } from 'react-router-dom';
import { getBestPosterUrl } from '../utils/getBestPosterUrl';
import '../css/MovieRow.css';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!movie.showId) {
      console.warn('No showId provided for movie:', movie);
      return;
    }
    navigate(`/movie/${movie.showId}`);
  };

  const fallback = '/images/Image_coming_soon.png';
  const initialSrc = getBestPosterUrl(movie.title, movie.posterUrl);

  return (
    <div
      className="movie-card"
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      {initialSrc ? (
        <img
          src={initialSrc}
          alt={movie.title}
          onError={(e) => {
            const current = e.currentTarget;
            if (!current.src.includes(fallback)) {
              current.onerror = null;
              current.src = fallback;
            }
          }}
          onLoad={(e) => {
            if (e.currentTarget.naturalWidth === 0) {
              e.currentTarget.src = fallback;
            }
          }}
          className="movie-poster"
        />
      ) : (
        <img
          src={fallback}
          alt="Poster not available"
          className="movie-poster"
        />
      )}
      <p className="movie-title">{movie.title}</p>
    </div>
  );
};

export default MovieCard;
