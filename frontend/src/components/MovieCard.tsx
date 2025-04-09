import { Movie } from '../types/Movie';
import { useNavigate } from 'react-router-dom';
import '../css/MovieRow.css';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.showId}`, {
      state: movie,
    });
  };

  return (
    <div
      className="movie-card"
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <img
        src={movie.posterUrl || 'https://via.placeholder.com/150x220'}
        alt={movie.title}
        className="movie-poster"
      />
      <p className="movie-title">{movie.title}</p>
    </div>
  );
};

export default MovieCard;
