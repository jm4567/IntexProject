import { useEffect, useState, useRef, useCallback } from 'react';
import { Movie } from '../types/Movie';
import { fetchMoreMovies } from '../api/MoviesAPI';
import NavBar from '../components/NavBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MovieCard from '../components/MovieCard';
import { useUser } from '../components/AuthorizeView';
import MovieRow from '../components/MovieRow';
import '../css/MoviePage.css';
import { useMemo } from 'react';

const MoviesPage = () => {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [startSplit, setStartSplit] = useState(false);
  const [showCurtain, setShowCurtain] = useState(true);
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
  const [contentBasedMovies, setContentBasedMovies] = useState<Movie[]>([]);
  const [genreBasedMovies, setGenreBasedMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const loader = useRef<HTMLDivElement | null>(null);
  const user = useUser();
  //for header
  const [topBannerMovies, setTopBannerMovies] = useState<Movie[]>([]);

  const handleScroll = () => {
    setShowScrollTop(window.scrollY > 400);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlay = () => {
    const moviepage = document.querySelector('.movie-container');
    if (moviepage) moviepage.classList.add('visible');

    setTimeout(() => setStartSplit(true), 3000);
    setTimeout(() => setShowCurtain(false), 4000);
    setTimeout(() => {
      // const curtain = document.querySelector(
      //   '.video-split-container'
      // ) as HTMLElement;
      // if (curtain) curtain.style.display = 'none';
    }, 4000);
  };

  const loadMovies = useCallback(async () => {
    try {
      const data = await fetchMoreMovies([], page, 10);
      if (data.movies.length === 0) {
        setHasMore(false);
      } else {
        setAllMovies((prev) => {
          const existingIds = new Set(prev.map((m) => m.showId));
          const newUnique = data.movies.filter(
            (m) => !existingIds.has(m.showId)
          );
          return [...prev, ...newUnique];
        });
      }
    } catch (err) {
      setError((err as Error).message);
    }
  }, [page]);

  useEffect(() => {
    const fetchBannerMovies = async () => {
      try {
        const data = await fetchMoreMovies([], 1, 20000); // adjust if needed
        const bannerList = data.movies.filter((movie) =>
          ['s42', 's7073', 's603', 's6065', 's6891', 's6063', 's6152'].includes(
            movie.showId
          )
        );
        setTopBannerMovies(bannerList);
      } catch (err) {
        console.error('Error fetching banner movies:', err);
      }
    };

    fetchBannerMovies();
  }, []);

  useEffect(() => {
    if (selectedGenres.length === 0) {
      setPage(1);
      setAllMovies([]);
      setHasMore(true);
    }
  }, [selectedGenres]);

  useEffect(() => {
    if (selectedGenres.length === 0) {
      loadMovies();
    }
  }, [loadMovies, selectedGenres]);

  useEffect(() => {
    if (!hasMore) return;

    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    });

    if (loader.current) {
      observer.current.observe(loader.current);
    }

    return () => {
      if (loader.current && observer.current) {
        observer.current.unobserve(loader.current);
      }
    };
  }, [hasMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchRecs = async () => {
      try {
        const res = await fetch(
          'https://localhost:5000/api/personalizedrecommendations/by-user',
          {
            credentials: 'include',
          }
        );

        if (!res.ok) {
          throw new Error('Failed to fetch recommendations');
        }

        const data = await res.json();
        setRecommendedMovies(data.recommendations || []);
        setContentBasedMovies(data.content || []);
        setGenreBasedMovies(data.genre || []);
      } catch (err) {
        console.error('Failed to load recommendations:', err);
      }
    };

    if (user?.email) {
      fetchRecs();
    }
  }, [user]);

  // const topBannerMovies = useMemo(() => {
  //   return allMovies.filter((movie) =>
  //     ['s42', 's7073', 's603', 's6065', 's6891', 's6063', 's6152'].includes(
  //       movie.showId
  //     )
  //   );
  // }, [allMovies]);

  // const topBannerMovies = useMemo(() => {
  //   return allMovies.filter((movie) =>
  //     ['s3653', 's307', 's5972', 's2141', 's2037', 's2305', 's2667'].includes(
  //       movie.showId
  //     )
  //   );
  // }, [allMovies]);

  const filteredMovies = selectedGenres.length
    ? allMovies.filter((movie) =>
        movie.genres?.some((genre) => selectedGenres.includes(genre))
      )
    : [];

  console.log('ALL MOVIES:', allMovies);

  return (
    <div className="full-screen-wrapper">
      <div className="movie-container">
        <div className="background-overlay"></div>
        <div className="movie-content ">
          <NavBar
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
          />
          {/* <Header movies={topBannerMovies} /> */}
          {!selectedGenres || selectedGenres.length === 0 ? (
            <Header movies={topBannerMovies} />
          ) : null}
          <div className="container-fluid mt-4 ">
            <div className="row">
              <div className="col-md-12">
                {error && <p className="text-danger">{error}</p>}

                {selectedGenres.length > 0 ? (
                  <div className="row">
                    {filteredMovies.map((movie) => (
                      <div className="col-md-2 mb-4" key={movie.showId}>
                        <MovieCard movie={movie} />
                      </div>
                    ))}
                    {filteredMovies.length === 0 && (
                      <p className="text-light">No movies found.</p>
                    )}
                  </div>
                ) : (
                  <>
                    <h1 className="mb-3">Recommended for You</h1>
                    <MovieRow title="" movies={recommendedMovies} />

                    <h1 className="mb-3">Hidden Gems Based on Your Taste</h1>
                    <MovieRow title="" movies={contentBasedMovies} />

                    <h1 className="mb-3">Similar Genres You Might Like</h1>
                    <MovieRow title="" movies={genreBasedMovies} />

                    <h1 className="mb-3">All Movies</h1>
                    <div className="row">
                      {allMovies.map((movie) => (
                        <div className="col-md-2 mb-4" key={movie.showId}>
                          <MovieCard movie={movie} />
                        </div>
                      ))}
                    </div>

                    {hasMore && (
                      <div
                        ref={loader}
                        className="text-center py-4"
                        style={{
                          fontWeight: 'bold',
                          letterSpacing: '1.2px',
                          fontSize: '1.1rem',
                          fontFamily: `'Segoe UI', sans-serif`,
                          textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                          color: '#3a2c1d',
                          background:
                            'linear-gradient(to right, #f7e6cd, #fdf6ec)',
                          padding: '12px 24px',
                          borderRadius: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          maxWidth: 'fit-content',
                          margin: '30px auto',
                          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                        }}
                      >
                        <img
                          src="/images/cleaned_logo_transparent copy.png"
                          alt="logo"
                          style={{
                            width: '24px',
                            height: '24px',
                            marginRight: '12px',
                            verticalAlign: 'middle',
                            filter: 'sepia(40%) contrast(1.1)',
                          }}
                        />
                        Rolling in more movies for you...
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {showScrollTop && (
        <button className="back-to-top-btn" onClick={scrollToTop}>
          ⬆ Back to Top
        </button>
      )}

      {showCurtain && (
        <div className={`video-split-container ${startSplit ? 'split' : ''}`}>
          <div className="video-half top-half">
            <video
              src="/videos/intro.mp4"
              autoPlay
              muted
              playsInline
              className="video"
              onPlay={handlePlay}
            />
          </div>
          <div className="video-half bottom-half">
            <video
              src="/videos/intro.mp4"
              autoPlay
              muted
              playsInline
              className="video"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MoviesPage;
