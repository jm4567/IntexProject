// Import necessary React hooks, types, API functions, and components
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
import HiddenGems from '../components/HiddenGems';
import { useLayoutEffect } from 'react';

// Main MoviesPage component
const MoviesPage = () => {
  // Local state hooks for various data pieces
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
  const observer = useRef<IntersectionObserver | null>(null); // For infinite scrolling
  const loader = useRef<HTMLDivElement | null>(null); // Sentinel element for loading more
  const user = useUser(); // Authenticated user info
  const [topBannerMovies, setTopBannerMovies] = useState<Movie[]>([]);
  const [genreSections, setGenreSections] = useState<
    { title: string; movies: Movie[] }[]
  >([]);
  const [allGenreMovies, setAllGenreMovies] = useState<Movie[]>([]);
  const [fadeOutCurtain, setFadeOutCurtain] = useState(false);

  useLayoutEffect(() => {
    const justLoggedIn = sessionStorage.getItem('justLoggedIn');
    if (justLoggedIn === 'true') {
      setShowCurtain(true);
      setTimeout(() => {
        sessionStorage.removeItem('justLoggedIn');
      }, 10); // wait a tiny bit
    } else {
      setShowCurtain(false);
    }
  }, []);

  // Show/hide scroll-to-top button based on scroll position
  const handleScroll = () => {
    setShowScrollTop(window.scrollY > 400);
  };

  // Scroll the page to the top smoothly
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Animates the intro split-screen curtain and then removes it
  const handlePlay = () => {
    const moviepage = document.querySelector('.movie-container');
    if (moviepage) moviepage.classList.add('visible');
    setTimeout(() => setStartSplit(true), 3000);

    setTimeout(() => setShowCurtain(false), 4000);
  };

  // Load movies with pagination (infinite scrolling)
  const loadMovies = useCallback(async () => {
    try {
      const data = await fetchMoreMovies([], page, 10);
      if (data.movies.length === 0) {
        setHasMore(false); // Stop if no more movies
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
  {
    /**top banner with automatic slideshow */
  }

  // Fetch banner movies when component mounts
  useEffect(() => {
    const fetchBannerMovies = async () => {
      try {
        const data = await fetchMoreMovies([], 1, 20000);
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

  // Reset movies when selected genres are changed
  useEffect(() => {
    const fetchAllForGenre = async () => {
      try {
        const data = await fetchMoreMovies([], 1, 10000); // or however many you want
        setAllGenreMovies(data.movies);
      } catch (err) {
        console.error('Error fetching movies for filtering:', err);
      }
    };

    if (selectedGenres.length > 0 && allGenreMovies.length === 0) {
      fetchAllForGenre();
    }
  }, [selectedGenres, allGenreMovies.length]);

  // useEffect(() => {
  //   if (selectedGenres.length === 0) {
  //     setPage(1);
  //     setAllMovies([]);
  //     setHasMore(true);
  //   }
  // }, [selectedGenres]);

  // useEffect(() => {
  //   if (selectedGenres.length === 0) {
  //     loadMovies();
  //   }
  // }, [loadMovies, selectedGenres]);

  // Reset paging when not filtering
  useEffect(() => {
    if (selectedGenres.length === 0) {
      setPage(1);
      setAllMovies([]);
      setHasMore(true);
    }
  }, [selectedGenres]);

  // Trigger loading more movies if no genres are selected

  // Lazy-load when not filtering
  useEffect(() => {
    if (selectedGenres.length === 0) {
      loadMovies();
    }
  }, [loadMovies, selectedGenres]);

  // Set up the IntersectionObserver to handle infinite scrolling
  useEffect(() => {
    if (!hasMore) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    });
    if (loader.current) observer.current.observe(loader.current);
    return () => {
      if (loader.current && observer.current) {
        observer.current.unobserve(loader.current);
      }
    };
  }, [hasMore]);

  // Attach scroll event listener for "back to top" button
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch personalized recommendations if user is logged in
  useEffect(() => {
    const fetchRecs = async () => {
      try {
        const res = await fetch(
          'https://localhost:5000/api/personalized-recommendations/by-user',
          { credentials: 'include' }
        );
        if (!res.ok) throw new Error('Failed to fetch recommendations');
        const data = await res.json();
        setRecommendedMovies(data.recommended || []);
        setContentBasedMovies(data.content || []);
        setGenreBasedMovies(data.genre || []);
        setGenreSections(data.genreSections || []);
      } catch (err) {
        console.error('Failed to load recommendations:', err);
      }
    };
    if (user?.email) fetchRecs();
  }, [user]);

  const filteredMovies = selectedGenres.length
    ? allGenreMovies.filter((movie) =>
        movie.genres?.some((genre) => selectedGenres.includes(genre))
      )
    : [];

  // JSX layout

  return (
    <div className="full-screen-wrapper">
      <div className="movie-container">
        <div className="background-overlay"></div>
        <div className="movie-content ">
          <NavBar
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
          />

          {/* Show header only if no genre is selected */}
          {!selectedGenres || selectedGenres.length === 0 ? (
            <Header movies={topBannerMovies} />
          ) : null}

          <div className="container-fluid mt-4 ">
            <div className="row">
              <div className="col-md-12">
                {error && <p className="text-danger">{error}</p>}

                {/* Genre-filtered movies view */}
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
                    {/* Only show if NOT admin */}
                    {user?.email !== 'adminuser1@gmail.com' && (
                      <>
                        {/* Personalized and genre-based recommendations */}
                        <h1 className="mb-3 text-white">Recommended for You</h1>
                        <MovieRow
                          title=""
                          movies={recommendedMovies}
                          useAltCard
                        />

                        {genreSections.map((section, idx) => (
                          <div key={idx}>
                            <h2 className="mb-3 text-white">{section.title}</h2>
                            <MovieRow
                              title=""
                              movies={section.movies}
                              useAltCard
                            />
                          </div>
                        ))}

                        {/* Hidden gems section */}
                        <HiddenGems defaultGenre="Action" />
                      </>
                    )}

                    {/* All movies with infinite scroll */}

                    <h1 className="mb-3 text-white">All Movies</h1>
                    <div className="row">
                      {allMovies.map((movie) => (
                        <div className="col-md-2 mb-4" key={movie.showId}>
                          <MovieCard movie={movie} />
                        </div>
                      ))}
                    </div>

                    {/* Infinite loader visual */}
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

      {/* Scroll-to-top button */}
      {showScrollTop && (
        <button className="back-to-top-btn" onClick={scrollToTop}>
          ⬆ Back to Top
        </button>
      )}

      {/* Opening video split screen curtain */}
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
