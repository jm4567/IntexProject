// Import hooks and components
import { useEffect, useRef, useState } from 'react';
import { Movie } from '../types/Movie';
import { deleteMovie, fetchMovies } from '../api/MoviesAPI';
import Pagination from '../components/PaginationStyled';
import NewMovieForm from '../components/NewMovieForm';
import EditMovieForm from '../components/EditMovieForm';
import { confirmDelete } from '../utils/confirmDelete';
import AdminTable from '../components/AdminTable';
import { useUser } from '../components/AuthorizeView';
import { useNavigate } from 'react-router-dom';

function ManageMovies() {
  // State variables for movies, errors, loading, pagination, forms, etc.
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);

  // User and navigation utilities
  const user = useUser();
  const navigate = useNavigate();

  // Redirect non-admins to homepage
  useEffect(() => {
    if (user && user.role !== 'Administrator') {
      navigate('/');
    }
  }, [user]);

  // Guard: block rendering until user role is verified
  if (!user || user.role !== 'Administrator') return null;

  // Ref for smooth scroll when editing
  const topRef = useRef<HTMLDivElement>(null);

  // Load paginated movies
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

  // Handle delete button
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

  // Trigger editing and scroll to form
  const handleEdit = (movie: Movie) => {
    setEditingMovie(movie);
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Utility: sanitize poster file name by removing punctuation
  const sanitizeTitle = (title: string) =>
    title.replace(/[^\w\s]/gi, '').trim();

  // Apply sanitized poster URLs to each movie
  const cleanedMovies: Movie[] = movies.map((movie) => {
    const cleanTitle = movie.title
      ? sanitizeTitle(movie.title)
      : 'Image_coming_soon';
    return {
      ...movie,
      posterUrl: `https://movieposters2025.blob.core.windows.net/posters/${cleanTitle}.jpg`,
    };
  });

  // Render loading state
  if (loading)
    return (
      <p className="text-center text-lg text-[#264653] font-semibold">
        Loading movies and TV shows...
      </p>
    );

  // Render error state
  if (error)
    return <p className="text-center text-red-600 font-bold">Error: {error}</p>;

  return (
    <div
      style={{ background: '#fdf6ec' }}
      className="min-h-screen text-[#264653] px-6 py-10 font-sans"
    >
      {/* Scroll ref anchor */}
      <div ref={topRef} />

      {/* Page title */}
      <h1
        className="text-4xl font-bold mb-8 text-center tracking-wider uppercase"
        style={{ color: '#264653' }}
      >
        Admin Dashboard
      </h1>

      {/* Add movie button (only shown if not already showing the form) */}
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

      {/* Render New Movie form */}
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

      {/* Render Edit Movie form */}
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

      {/* Movie admin table */}
      <AdminTable
        movies={cleanedMovies}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Pagination Controls */}
      <div className="flex justify-center mt-10">
        <Pagination
          currentPage={pageNum}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={setPageNum}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setPageNum(1); // Reset to first page
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
