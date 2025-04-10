import { Movie } from '../types/Movie';
import { useNavigate } from 'react-router-dom';
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

    // Just navigate using showId — let the details page fetch all info
    navigate(`/movie/${movie.showId}`);
  };

  return (
    <div
      className="movie-card"
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <img
        src={movie.posterUrl || '/images/Image_coming_soon.png'}
        alt={movie.title}
        className="movie-poster"
      />
      <p className="movie-title">{movie.title}</p>
    </div>
  );
};

export default MovieCard;
