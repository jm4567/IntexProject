import React from 'react';
import styles from './AdminTable.module.css'; // ✅ Import scoped CSS module for table styling
import { Movie } from '../types/Movie';

// Define props for AdminTable component
interface Props {
  movies: Movie[]; // List of movies to display
  onEdit: (movie: Movie) => void; // Function to trigger edit form
  onDelete: (showId: string) => void; // Function to delete a movie
}

// Helper function to return fallback poster if original fails
const getFallbackPosterUrl = (title?: string): string => {
  if (!title) return '/images/Image_coming_soon.png'; // Default placeholder
  return `https://postersintex29.blob.core.windows.net/posters/${title}.jpg`;
};

// AdminTable component renders movie data in a styled table
const AdminTable: React.FC<Props> = ({ movies, onEdit, onDelete }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Show ID</th>
            <th>Poster</th>
            <th>Title</th>
            <th>Type</th>
            <th>Director</th>
            <th>Cast</th>
            <th>Country</th>
            <th>Year</th>
            <th>Rating</th>
            <th>Duration</th>
            <th>Description</th>
            <th>Genres</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Render each movie as a table row */}
          {movies.map((movie) => (
            <tr key={movie.showId} className={styles.row}>
              <td>{movie.showId}</td>

              {/* Poster image cell with fallback handling and hover zoom */}
              <td>
                <div
                  style={{
                    overflow: 'hidden',
                    borderRadius: '6px',
                    width: '80px',
                  }}
                >
                  <img
                    src={movie.posterUrl || '/images/Image_coming_soon.png'} // Use provided or default poster
                    alt={movie.title || 'Poster Coming Soon'}
                    style={{
                      width: '80px',
                      height: '120px',
                      objectFit: 'contain',
                      borderRadius: '6px',
                      boxShadow: '0 0 6px rgba(0,0,0,0.15)',
                      transition: 'transform 0.2s ease-in-out',
                    }}
                    onMouseOver={(e) =>
                      ((e.target as HTMLImageElement).style.transform =
                        'scale(1.05)')
                    }
                    onMouseOut={(e) =>
                      ((e.target as HTMLImageElement).style.transform =
                        'scale(1)')
                    }
                    onError={(e) => {
                      // Fallback to secondary blob URL if image fails
                      const fallback = getFallbackPosterUrl(movie.title);
                      if (e.currentTarget.src !== fallback) {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = fallback;
                      }
                    }}
                  />
                </div>
              </td>

              {/* Other metadata fields */}
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

              {/* Action buttons: Edit + Delete */}
              <td>
                <button
                  className={styles.btnEdit}
                  onClick={() => onEdit(movie)}
                >
                  Edit
                </button>
                <button
                  className={styles.btnDelete}
                  onClick={() => onDelete(movie.showId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
