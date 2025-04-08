import { Movie } from '../types/Movie';
import '../css/MovieRow.css'; // Make sure this is imported here

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div className="movie-card">
      <img
        src={'https://via.placeholder.com/150x220'} // Replace with movie.poster if available
        alt={movie.title}
        className="movie-poster"
      />
      <p className="movie-title">{movie.title}</p>
    </div>
  );
};

export default MovieCard;
