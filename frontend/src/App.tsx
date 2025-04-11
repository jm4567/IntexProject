import Homepage from './pages/Homepage';
import './css/styles.css';
import MovieDetailsPages from './pages/MovieDetailsPages';
import PrivacyPolicy from './pages/PrivacyPolicy';
import MoviesPage from './pages/MoviesPage';
import BrowseGenres from './pages/BrowseGenres';
import ManageMovies from './pages/ManageMovies';
import LoginPage from './pages/LoginPage';
import Register from './pages/RegisterPage';
import { Routes, Route } from 'react-router-dom';
import DefaultLayout from './components/DefaultLayout';
import AuthorizeView from './components/AuthorizeView';
import ScrollToTop from './utils/ScrollToTop';
import { GenreProvider } from './components/GenreContext';
import ProfilePage from './pages/ProfilePage';

function App() {
  // These commented-out lines were for conditionally hiding the header and footer on specific routes like "/login"
  // const location = useLocation();
  // const hideHeaderOnPaths = ['/login'];
  // const hideFooterrOnPaths = ['/login'];
  // const shouldShowHeader = !hideHeaderOnPaths.includes(location.pathname);
  // const shouldShowFooter = !hideFooterrOnPaths.includes(location.pathname);

  return (
    <main className="container-fluid px-0">
      {/* Scrolls to top on route change */}
      <ScrollToTop />

      {/* Define application routes */}
      <Routes>
        {/* Public routes available to all users */}
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />

        {/* Protected routes (require user to be authenticated) */}

        {/* Movie details page (uses genre context and layout wrapper) */}
        <Route
          path="/movie/:showId"
          element={
            <AuthorizeView>
              <GenreProvider>
                <DefaultLayout>
                  <MovieDetailsPages />
                </DefaultLayout>
              </GenreProvider>
            </AuthorizeView>
          }
        />

        {/* Main movies page */}
        <Route
          path="/movies"
          element={
            <AuthorizeView>
              <MoviesPage />
            </AuthorizeView>
          }
        />

        {/* Genre browsing page */}
        <Route
          path="/genres"
          element={
            <AuthorizeView>
              <BrowseGenres />
            </AuthorizeView>
          }
        />

        {/* User profile page */}
        <Route
          path="/profile"
          element={
            <AuthorizeView>
              <ProfilePage />
            </AuthorizeView>
          }
          key="profile"
        />

        {/* Admin management page (wrapped in genre provider and layout) */}
        <Route
          path="/managemovies"
          element={
            <AuthorizeView>
              <GenreProvider>
                <DefaultLayout>
                  <ManageMovies />
                </DefaultLayout>
              </GenreProvider>
            </AuthorizeView>
          }
        />
      </Routes>

      {/* Previously used to show/hide header/footer conditionally */}
      {/* {shouldShowHeader && <Header />} */}
    </main>
  );
}

export default App;
