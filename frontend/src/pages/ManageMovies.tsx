// File: pages/ManageMovies.tsx
import { useEffect, useState } from 'react';
import { Movie } from '../types/Movie';
import { deleteMovie, fetchMovies } from '../api/MoviesAPI';
import Pagination from '../components/PaginationStyled';
import NewMovieForm from '../components/NewMovieForm';
import EditMovieForm from '../components/EditMovieForm';
import { confirmDelete } from '../utils/confirmDelete';
import AdminTable from '../components/AdminTable';

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
    const isConfirmed = await confirmDelete();
    if (!isConfirmed) return;

    try {
      await deleteMovie(showId);
      setMovies(movies.filter((movie) => movie.showId !== showId));
    } catch (error) {
      alert('Failed to delete movie. Please try again.');
    }
  };

  if (loading)
    return (
      <p className="text-center text-lg text-[#264653] font-semibold">
        Loading movies and TV shows...
      </p>
    );
  if (error)
    return <p className="text-center text-red-600 font-bold">Error: {error}</p>;

  return (
    <div
      style={{ background: '#fdf6ec' }}
      className="min-h-screen text-[#264653] px-6 py-10 font-sans"
    >
      <h1
        className="text-4xl font-bold mb-8 text-center tracking-wider uppercase"
        style={{ color: '#264653' }}
      >
        Admin Dashboard
      </h1>

      {!showForm && (
        <div className="flex justify-center mb-6">
          <button
            style={{
              backgroundColor: '#e4572e',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1rem',
              padding: '10px 24px',
              borderRadius: '9999px',
              boxShadow: '0 0 10px rgba(120, 84, 211, 0.92)',
              border: '2px solid white',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLButtonElement).style.backgroundColor =
                '#922b21')
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLButtonElement).style.backgroundColor =
                '#b03a2e')
            }
            onClick={() => setShowForm(true)}
          >
            ➕ Add Movie / TV Show
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

      <AdminTable
        movies={movies}
        onEdit={setEditingMovie}
        onDelete={handleDelete}
      />

      <div className="flex justify-center mt-10">
        <Pagination
          currentPage={pageNum}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={setPageNum}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setPageNum(1);
          }}
          themeColors={{
            border: '#264653',
            active: '#e76f51',
            hover: '#f4a261',
            text: '#264653',
          }}
        />
      </div>
    </div>
  );
}

export default ManageMovies;
