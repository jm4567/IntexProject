import { Movie } from '../types/Movie';
import MovieCard from './MovieCard';
import '../css/MovieRow.css';
import '../css/MovieCard.css';

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

const MovieRow = ({ title, movies }: MovieRowProps) => {
  return (
    <div className="movie-row mb-4">
      <h3 className="row-title mb-3">{title}</h3>
      <div className="movie-row-scroll d-flex overflow-auto gap-3 px-3">
        {movies.map((movie) => (
          <MovieCard key={movie.showId} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieRow;
