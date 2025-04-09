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
