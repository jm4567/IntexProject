import { Movie } from '../types/Movie'; // adjust path if needed
import '../css/MovieRow.css'; // be sure this file has the scroll styling

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
          <div
            className="movie-card text-center"
            key={movie.showId}
            style={{ width: '150px' }}
          >
            <img
              src={'https://via.placeholder.com/150x220'}
              alt={movie.title}
              className="movie-poster img-fluid rounded"
              style={{ height: '220px', objectFit: 'cover' }}
            />
            <p className="movie-title mt-2">{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieRow;
