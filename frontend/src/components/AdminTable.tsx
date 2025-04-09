// File: components/AdminTable.tsx
import React from 'react';
import styles from './AdminTable.module.css';
import { Movie } from '../types/Movie';

interface Props {
  movies: Movie[];
  onEdit: (movie: Movie) => void;
  onDelete: (showId: string) => void;
}

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
          {movies.map((movie) => (
            <tr key={movie.showId} className={styles.row}>
              <td>{movie.showId}</td>

              <td>
                <div
                  style={{
                    overflow: 'hidden',
                    borderRadius: '6px',
                    width: '80px',
                  }}
                >
                  <img
                    src={movie.posterUrl || '/images/Image_coming_soon.png'}
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
                  />
                </div>
              </td>

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
