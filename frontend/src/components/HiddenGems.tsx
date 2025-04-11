import { useEffect, useState } from 'react';
import { Movie } from '../types/Movie';
import MovieRow from './MovieRow';

interface HiddenGemsProps {
  defaultGenre: string;
}

const HiddenGems = ({ defaultGenre }: HiddenGemsProps) => {
  const [selectedGenre, setSelectedGenre] = useState(defaultGenre);
  const [hiddenGemMovies, setHiddenGemMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHiddenGems = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(
          `https://moviecollection-team209-backend-f6cdakf2a6avh8bt.eastus-01.azurewebsites.net/api/HiddenGems/by-genre?genres=${selectedGenre}`,
          { credentials: 'include' }
        );
        if (!res.ok) throw new Error('Failed to fetch hidden gems');
        const data = await res.json();
        setHiddenGemMovies(data);
      } catch (err) {
        console.error('Error loading hidden gems:', err);
        setError('Not enough movies watched for hidden gems to appear.');
      } finally {
        setLoading(false);
      }
    };

    if (selectedGenre) {
      fetchHiddenGems();
    }
  }, [selectedGenre]);

  return (
    <div className="mt-5">
      <h2 className="text-light text-center">🎬 Hidden Gems</h2>
      <p className="text-light text-center">
        Hidden Gems are lesser-known movies and shows tailored to your watch
        history. They’re based on titles you've liked and genres you've
        explored!
      </p>

      <div className="mb-4 text-center">
        <label className="text-light me-2">Choose a genre to explore:</label>
        <select
          className="form-select d-inline w-auto"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="">-- Select Genre --</option>
          <option value="Action">Action</option>
          <option value="Drama">Drama</option>
          <option value="Horror">Horror</option>
          <option value="Family">Family</option>
        </select>
      </div>

      {loading && (
        <p className="text-light text-center">Loading hidden gems...</p>
      )}
      {!loading && error && <p className="text-warning">{error}</p>}

      {!loading && hiddenGemMovies.length > 0 && (
        <>
          <h4 className="text-light mb-3">Genre: {selectedGenre}</h4>
          <MovieRow title="" movies={hiddenGemMovies} useAltCard />
        </>
      )}
    </div>
  );
};

export default HiddenGems;
