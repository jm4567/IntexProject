import { useState } from 'react';

interface StarRatingProps {
  totalStars?: number;
  value: number;
  onChange: (rating: number) => void;
}

const StarRating = ({ totalStars = 5, value, onChange }: StarRatingProps) => {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div
      style={{
        display: 'flex',
        gap: '5px',
        fontSize: '2rem',
        cursor: 'pointer',
      }}
    >
      {[...Array(totalStars)].map((_, i) => {
        const ratingValue = i + 1;
        return (
          <span
            key={i}
            onClick={() => onChange(ratingValue)}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(null)}
            style={{
              color: ratingValue <= (hover ?? value) ? '#DD6F23' : '#ccc',
            }}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
