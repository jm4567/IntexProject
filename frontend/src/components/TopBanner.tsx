// File: components/TopBanner.tsx
import React from 'react';
import { Movie } from '../types/Movie';
import Header from './Header';

interface TopBannerProps {
  movies: Movie[];
}
{
  /*automatically slideshow through movie banners */
}
const TopBanner: React.FC<TopBannerProps> = ({ movies }) => {
  const topBannerMovies = movies.filter((movie) =>
    ['s42', 's7073', 's603', 's6065', 's6891', 's6063', 's6152'].includes(
      movie.showId
    )
  );

  return <Header movies={topBannerMovies} />;
};

export default TopBanner;
