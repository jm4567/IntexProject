import { Movie } from '../types/Movie'; // adjust path as needed
import '../css/MovieRow.css';

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

const MovieRow = ({ title, movies }: MovieRowProps) => {
  return (
    <div className="movie-row">
      <h2 className="row-title">{title}</h2>
      <div className="movie-row-scroll">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.show_id}>
            <img alt={movie.title} className="movie-poster" />
            <p className="movie-title">{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieRow;
