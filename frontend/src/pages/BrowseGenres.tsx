import { useEffect, useState } from 'react';
import { Movie } from '../types/Movie';
import { fetchAllMovies } from '../api/MoviesAPI';
import GenreFilter from '../components/GenreFilter';
import MovieCard from '../components/MovieCard';

function BrowseGenres() {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchAllMovies(selectedGenres);
        setMovies(data.movies);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    loadMovies();
  }, [selectedGenres]);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3">
          <GenreFilter
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
          />
        </div>

        <div className="col-md-9">
          {error && <p className="text-danger">{error}</p>}
          <div className="row">
            {movies.map((movie) => (
              <div className="col-md-4 mb-4" key={movie.showId}>
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrowseGenres;
