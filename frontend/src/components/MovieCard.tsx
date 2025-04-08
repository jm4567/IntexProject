import { useEffect, useState } from 'react';
import { Movie } from '../types/Movie';
import { useNavigate } from 'react-router-dom';
import { fetchMovies } from '../api/MoviesAPI';

function MovieCard({ selectedGenres }: { selectedGenres: string[] }) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        const data = await fetchMovies(selectedGenres);
        setMovies(data.movies);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [selectedGenres]);

  if (loading) return <p>Loading Movies...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  return (
    <>
      {movies.map((m) => (
        <div id="movieCard" className="card p-3 shadow-sm">
          <h3 className="card-title">{m.title}</h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Director:</strong> {m.director}
                <br />
                <strong>Genre:</strong>{' '}
                {m.genres && m.genres.length > 0 ? m.genres.join(', ') : 'None'}
              </li>
            </ul>
          </div>
        </div>
      ))}
    </>
  );
}

export default MovieCard;
