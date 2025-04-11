// Importing external styles for the carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Slider component from react-slick
import Slider from 'react-slick';

// Movie type definition
import { Movie } from '../types/Movie';

// Custom styles for the header
import '../css/Header.css';

// Icons used for navigation arrows
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Define the expected props for the Header component
interface HeaderProps {
  movies: Movie[];
}

// Custom previous arrow for the slider
const PrevArrow = ({ onClick }: any) => (
  <div className="custom-arrow left" onClick={onClick}>
    <ChevronLeft size={36} strokeWidth={2.5} />
  </div>
);

// Custom next arrow for the slider
const NextArrow = ({ onClick }: any) => (
  <div className="custom-arrow right" onClick={onClick}>
    <ChevronRight size={36} strokeWidth={2.5} />
  </div>
);

// Header component that displays a carousel of featured movies
const Header: React.FC<HeaderProps> = ({ movies }) => {
  // Carousel settings for slick slider
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  // Maps movie showId to the custom image path for header
  const imageMap: Record<string, string> = {
    s42: '/images/jaws.jpg',
    s7073: '/images/indianajones.jpg',
    s603: '/images/kk2.jpg',
    s6065: '/images/weekinwatts.png',
    s6891: '/images/grandbudapest.png',
    s6063: '/images/awalktoremember.jpeg',
    s6152: '/images/americantail.jpg',
  };

  // Optional styling tweaks for some posters
  const imageStyles: Record<string, React.CSSProperties> = {
    s7073: { objectPosition: 'top' },
    s603: { objectPosition: 'center left' },
    s6891: { objectPosition: 'top' },
    s6065: { objectPosition: 'top' },
  };

  // Returns the correct image path or fallback if not mapped
  const getImageForMovie = (movie: Movie): string =>
    imageMap[movie.showId] || '/images/Image_coming_soon.png';

  // Description map for hero overlay text
  const descriptionMap: Record<string, string> = {
    s42: 'A small town faces terror as a giant great white shark threatens beachgoers.',
    s7073:
      'Indiana Jones embarks on a daring quest to find the legendary Ark of the Covenant.',
    s603: 'Daniel and Mr. Miyagi journey to Okinawa, where honor and courage are tested.',
    s6065:
      'A charming student film showcasing campus life and quirky perspectives.',
    s6891:
      'A quirky concierge and lobby boy navigate war, romance, and mystery in style.',
    s6063:
      'A rebellious teen and a quiet girl fall in love — with a secret that changes everything.',
    s6152:
      'A young mouse journeys across America in search of his immigrant family.',
  };

  return (
    <div className="hero-carousel">
      <Slider {...settings}>
        {movies.map((movie) => (
          <div key={movie.showId} className="hero-slide">
            {/* Movie poster image */}
            <img
              src={getImageForMovie(movie)}
              alt={movie.title}
              className="hero-img"
              style={imageStyles[movie.showId]}
            />

            {/* Overlay with title, description, and buttons */}
            <div className="hero-overlay">
              <h1>{movie.title}</h1>
              <p>
                {descriptionMap[movie.showId] || 'No description available.'}
              </p>
              <div className="hero-buttons">
                <button>▶ Play</button>
                <button>🛈 More Info</button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Header;
