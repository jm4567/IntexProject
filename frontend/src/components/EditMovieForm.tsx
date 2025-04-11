// File: components/EditMovieForm.tsx
import { useState, useEffect } from 'react';
import { Movie } from '../types/Movie';
import { updateMovie } from '../api/MoviesAPI';

// Props for the EditMovieForm component
interface EditMovieFormProps {
  movie: Movie;
  onSuccess: () => void;
  onCancel: () => void;
}

// Main component for editing a movie
const EditMovieForm = ({ movie, onSuccess, onCancel }: EditMovieFormProps) => {
  // Local state to manage form data and available genres
  const [formData, setFormData] = useState<Movie>({ ...movie });
  const [availableGenres, setAvailableGenres] = useState<string[]>([]);

  // Load available genres from the API when the component mounts
  useEffect(() => {
    const loadGenres = async () => {
      try {
        const res = await fetch(
          'https://moviecollection-team209-backend-f6cdakf2a6avh8bt.eastus-01.azurewebsites.net/api/Movie/GetMovieGenres',
          {
            credentials: 'include',
          }
        );
        const data = await res.json();
        setAvailableGenres(data);
      } catch (error) {
        console.error('Failed to load genres:', error);
      }
    };

    loadGenres();
  }, []);

  // Handle changes to text/textarea input fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission (updates the movie via API)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateMovie(formData.showId, formData);
      onSuccess(); // Callback to refresh or notify success
    } catch (error) {
      console.error('Error during updateMovie call:', error);
    }
  };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', fontSize: '0.9rem' }}>
      {/* Form container */}
      <form
        onSubmit={handleSubmit}
        style={{
          background: '#fffaf0',
          border: '2px solid #264653',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '4px 4px 0px #264653',
        }}
      >
        <h2
          style={{ color: '#264653', fontWeight: 'bold', marginBottom: '20px' }}
        >
          ✏️ Edit Movie / TV Show
        </h2>

        {/* Text input fields for basic movie details */}
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
          <div key={name} style={{ marginBottom: '12px' }}>
            <label
              style={{
                fontWeight: 'bold',
                display: 'block',
                marginBottom: '4px',
              }}
            >
              {label}
            </label>
            <input
              type="text"
              name={name}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '6px',
                border: '1px solid #ccc',
              }}
              value={(formData as any)[name] || ''}
              onChange={handleChange}
            />
          </div>
        ))}

        {/* Numeric input for release year */}
        <div style={{ marginBottom: '12px' }}>
          <label
            style={{
              fontWeight: 'bold',
              display: 'block',
              marginBottom: '4px',
            }}
          >
            Release Year
          </label>
          <input
            type="number"
            name="releaseYear"
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '6px',
              border: '1px solid #ccc',
            }}
            value={formData.releaseYear}
            onChange={handleChange}
          />
        </div>

        {/* Textarea for movie description */}
        <div style={{ marginBottom: '12px' }}>
          <label
            style={{
              fontWeight: 'bold',
              display: 'block',
              marginBottom: '4px',
            }}
          >
            Description
          </label>
          <textarea
            name="description"
            rows={3}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '6px',
              border: '1px solid #ccc',
            }}
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        {/* Multi-select dropdown for genres */}
        <div style={{ marginBottom: '12px' }}>
          <label
            style={{
              fontWeight: 'bold',
              display: 'block',
              marginBottom: '4px',
            }}
          >
            Genres
          </label>
          <select
            multiple
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '6px',
              border: '1px solid #ccc',
            }}
            value={formData.genres}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                genres: Array.from(
                  e.target.selectedOptions,
                  (opt) => opt.value
                ),
              }))
            }
          >
            {availableGenres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          <small style={{ fontSize: '0.75rem', color: '#555' }}>
            Hold Ctrl (Windows) or Cmd (Mac) to select multiple
          </small>
        </div>

        {/* Poster preview if a poster URL is provided */}
        {formData.posterUrl && (
          <div style={{ marginBottom: '20px', textAlign: 'center' }}>
            <img
              src={formData.posterUrl}
              alt="Poster Preview"
              style={{
                maxHeight: '200px',
                objectFit: 'contain',
                borderRadius: '8px',
              }}
            />
          </div>
        )}

        {/* Action buttons */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px',
            marginTop: '20px',
          }}
        >
          {/* Submit button */}
          <button
            type="submit"
            style={{
              backgroundColor: '#e4572e',
              color: 'white',
              fontWeight: 'bold',
              padding: '10px 20px',
              borderRadius: '6px',
              border: '2px solid #fff',
              boxShadow: '0 0 6px rgba(228, 87, 46, 0.6)',
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLButtonElement).style.backgroundColor =
                '#cf4524')
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLButtonElement).style.backgroundColor =
                '#e4572e')
            }
          >
            ✅ Update
          </button>

          {/* Cancel button */}
          <button
            type="button"
            onClick={onCancel}
            style={{
              backgroundColor: '#264653',
              color: 'white',
              fontWeight: 'bold',
              padding: '10px 20px',
              borderRadius: '6px',
              border: '2px solid #fff',
              boxShadow: '0 0 6px rgba(38, 70, 83, 0.5)',
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLButtonElement).style.backgroundColor =
                '#1f3a43')
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLButtonElement).style.backgroundColor =
                '#264653')
            }
          >
            ✖ Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMovieForm;
