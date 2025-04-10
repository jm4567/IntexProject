import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { Movie } from '../types/Movie'; // or wherever you define the interface
import '../css/Header.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeaderProps {
  movies: Movie[];
}

const PrevArrow = ({ onClick }: any) => (
  <div className="custom-arrow left" onClick={onClick}>
    <ChevronLeft size={36} strokeWidth={2.5} />
  </div>
);

const NextArrow = ({ onClick }: any) => (
  <div className="custom-arrow right" onClick={onClick}>
    <ChevronRight size={36} strokeWidth={2.5} />
  </div>
);

const Header: React.FC<HeaderProps> = ({ movies }) => {
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

  //mapping for images
  const imageMap: Record<string, string> = {
    s42: '/images/jaws.jpg',
    s7073: '/images/indianajones.jpg',
    s603: '/images/kk2.jpg',
    s6065: '/images/weekinwatts.png',
    s6891: '/images/grandbudapest.png',
    s6063: '/images/awalktoremember.jpeg',
    s6152: '/images/americantail.jpg',
  };

  //styles
  const imageStyles: Record<string, React.CSSProperties> = {
    s7073: { objectPosition: 'top' }, // Indiana Jones
    s603: { objectPosition: 'center left' }, // Karate Kid
    s6891: { objectPosition: 'top' },
    s6065: { objectPosition: 'top ' },
  };

  const getImageForMovie = (movie: Movie): string =>
    imageMap[movie.showId] || '/images/Image_coming_soon.png';

  //descritpions
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
            <img
              src={getImageForMovie(movie)}
              alt={movie.title}
              className="hero-img"
              style={imageStyles[movie.showId]}
            />
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
