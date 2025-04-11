// AltMovieCard.tsx
import { Movie } from '../types/Movie';
import { useNavigate } from 'react-router-dom';
import { getAltPosterUrl } from '../utils/getAltPosterUrl';
import '../css/MovieRow.css'

interface AltMovieCardProps {
  movie: Movie;
}

const AltMovieCard = ({ movie }: AltMovieCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!movie.showId) return;
    navigate(`/movie/${movie.showId}`);
  };

  return (
    <div className="movie-card" onClick={handleClick}>
      <img
        className="movie-poster" // same class name
        src={getAltPosterUrl(movie.title)}
        alt={movie.title}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = '/images/Image_coming_soon.png';
        }}
      />
      <p className="movie-title">{movie.title}</p>
    </div>
  );
};

export default AltMovieCard;
