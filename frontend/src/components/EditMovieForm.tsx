import { useState, useEffect } from 'react';
import { Movie } from '../types/Movie';
import { updateMovie } from '../api/MoviesAPI';

interface EditMovieFormProps {
  movie: Movie;
  onSuccess: () => void;
  onCancel: () => void;
}

const EditMovieForm = ({ movie, onSuccess, onCancel }: EditMovieFormProps) => {
  const [formData, setFormData] = useState<Movie>({ ...movie });
  const [availableGenres, setAvailableGenres] = useState<string[]>([]);

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const res = await fetch(
          'https://localhost:5000/api/Movie/GetMovieGenres'
        );
        const data = await res.json();
        setAvailableGenres(data);
      } catch (error) {
        console.error('Failed to load genres:', error);
      }
    };

    loadGenres();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateMovie(formData.showId, formData);
      onSuccess();
    } catch (error) {
      console.error('Error during updateMovie call:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4 shadow-sm mt-4">
      <h2 className="mb-4">Edit Movie</h2>

      {/* Standard Fields */}
      {[
        { label: 'Title', name: 'title' },
        { label: 'Type', name: 'type' },
        { label: 'Director', name: 'director' },
        { label: 'Cast', name: 'castList' },
        { label: 'Country', name: 'country' },
        { label: 'Rating', name: 'rating' },
        { label: 'Duration', name: 'duration' },
        { label: 'Poster URL', name: 'posterUrl' },
      ].map(({ label, name }) => (
        <div className="mb-3" key={name}>
          <label className="form-label">{label}</label>
          <input
            type="text"
            name={name}
            className="form-control"
            value={(formData as any)[name] || ''}
            onChange={handleChange}
          />
        </div>
      ))}

      <div className="mb-3">
        <label className="form-label">Release Year</label>
        <input
          type="number"
          name="releaseYear"
          className="form-control"
          value={formData.releaseYear}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          name="description"
          className="form-control"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Genres</label>
        <select
          multiple
          className="form-control"
          value={formData.genres}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              genres: Array.from(e.target.selectedOptions, (opt) => opt.value),
            }))
          }
        >
          {availableGenres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        <small className="text-muted">
          Hold Ctrl (Windows) or Cmd (Mac) to select multiple
        </small>
      </div>

      {/* Optional Poster Preview */}
      {formData.posterUrl && (
        <div className="mb-3 text-center">
          <img
            src={formData.posterUrl}
            alt="Poster Preview"
            style={{ maxHeight: '200px', objectFit: 'contain' }}
            className="img-fluid rounded shadow"
          />
        </div>
      )}

      <div className="d-flex justify-content-end gap-2">
        <button type="submit" className="btn btn-success">
          Update Movie
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditMovieForm;
