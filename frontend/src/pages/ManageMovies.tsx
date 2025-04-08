import { useEffect, useState } from 'react';
import { Movie } from '../types/Movie';
import { deleteMovie, fetchMovies } from '../api/MoviesAPI';
import Pagination from '../components/Pagination';
import NewMovieForm from '../components/NewMovieForm';
import EditMovieForm from '../components/EditMovieForm';

function ManageMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchMovies(pageSize, pageNum, []);
        setMovies(data.movies);
        setTotalPages(Math.ceil(data.totalNumMovies / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, [pageSize, pageNum]);

  const handleDelete = async (showId: string) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this movie/TV show?'
    );
    if (!confirmDelete) return;

    try {
      await deleteMovie(showId);
      setMovies(movies.filter((movie) => movie.showId !== showId));
    } catch (error) {
      alert('Failed to delete movie. Please try again.');
    }
  };

  if (loading) return <p>Loading movies and TV shows...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4 text-center">
        Admin - Movies and TV Shows
      </h1>

      {!showForm && (
        <div className="flex justify-center mb-4">
          <button className="btn btn-success" onClick={() => setShowForm(true)}>
            Add Movie
          </button>
        </div>
      )}

      {showForm && (
        <NewMovieForm
          onSuccess={() => {
            setShowForm(false);
            fetchMovies(pageSize, pageNum, []).then((data) =>
              setMovies(data.movies)
            );
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editingMovie && (
        <EditMovieForm
          movie={editingMovie}
          onSuccess={() => {
            setEditingMovie(null);
            fetchMovies(pageSize, pageNum, []).then((data) =>
              setMovies(data.movies)
            );
          }}
          onCancel={() => setEditingMovie(null)}
        />
      )}

      <div className="overflow-x-auto">
        <table className="table table-bordered table-striped w-full">
          <thead className="table-dark">
            <tr>
              <th>Show ID</th>
              <th>Title</th>
              <th>Type</th>
              <th>Director</th>
              <th>Cast</th>
              <th>Country</th>
              <th>Release Year</th>
              <th>Rating</th>
              <th>Duration</th>
              <th>Description</th>
              <th>Genres</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie.showId}>
                <td>{movie.showId}</td>
                <td>{movie.title}</td>
                <td>{movie.type}</td>
                <td>{movie.director}</td>
                <td>{movie.castList}</td>
                <td>{movie.country}</td>
                <td>{movie.releaseYear}</td>
                <td>{movie.rating}</td>
                <td>{movie.duration}</td>
                <td>{movie.description}</td>
                <td>{movie.genres.join(', ')}</td>
                <td>
                  <button
                    onClick={() => setEditingMovie(movie)}
                    className="btn btn-primary btn-sm w-full mb-1"
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm w-full"
                    onClick={() => handleDelete(movie.showId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Centered Pagination */}
      <div className="flex justify-center mt-6">
        <Pagination
          currentPage={pageNum}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={setPageNum}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setPageNum(1);
          }}
        />
      </div>
    </div>
  );
}

export default ManageMovies;
