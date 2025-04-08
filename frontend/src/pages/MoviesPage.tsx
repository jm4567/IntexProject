import { useEffect, useState } from 'react';
import { Movie } from '../types/Movie';
import { fetchMovies } from '../api/MoviesAPI';
import MovieRow from '../components/MovieRow';

const MoviesPage = () => {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchMovies([]); // get all movies
        setAllMovies(data.movies);
      } catch (err) {
        setError((err as Error).message);
      }
    };
    loadMovies();
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-12">
          {error && <p className="text-danger">{error}</p>}
          <MovieRow title="All Movies" movies={allMovies} />
        </div>
      </div>
    </div>
  );
};

export default MoviesPage;
