import { Movie } from '../types/Movie';
import '../css/MovieCard.css';

type MovieCardProps = {
  movie: Movie;
};

function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="movie-card">
      <img alt={movie.title} className="movie-poster" />
      <p className="movie-title">{movie.title}</p>
    </div>
  );
}

export default MovieCard;
