import { useEffect, useState } from 'react';

function GenreFilter({
  selectedGenres,
  setSelectedGenres,
}: {
  selectedGenres: string[];
  setSelectedGenres: (genres: string[]) => void;
}) {
  const [genres, setGenres] = useState<string[]>([]); // Get genre list from backend on mount

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          'https://localhost:5000/api/Movie/GetMovieGenres'
        );
        const data = await response.json();
        setGenres(data.sort()); // Optional: sort alphabetically
      } catch (error) {
        console.error('Error fetching genres', error);
      }
    };
    fetchGenres();
  }, []); // Handle checkbox toggle

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const genre = e.target.value;
    const updated = selectedGenres.includes(genre)
      ? selectedGenres.filter((g) => g !== genre)
      : [...selectedGenres, genre];
    setSelectedGenres(updated);
  };

  return (
    <div className="genre-filter">
      <h5>Genres</h5>
      <div className="genre-list">
        {genres.map((g) => (
          <div key={g} className="genre-item">
            <input
              type="checkbox"
              id={g}
              value={g}
              checked={selectedGenres.includes(g)} // ✅ Reflect current selection
              onChange={handleCheckboxChange}
              className="genre-checkbox"
            />
            <label htmlFor={g} className="genre-text">
              {g}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GenreFilter;
