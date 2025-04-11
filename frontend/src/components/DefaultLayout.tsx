// Import required dependencies and components
import { ReactNode } from 'react';
import Footer from './Footer';
import NavBar from './NavBar';
import { useGenre } from './GenreContext'; // Custom context for genre state

// Define the props that DefaultLayout expects
type DefaultLayoutProps = {
  children: ReactNode; // Any nested components/elements inside the layout
};

// Layout wrapper used for pages that require the full layout (Navbar + Footer)
function DefaultLayout({ children }: DefaultLayoutProps) {
  // Get the selected genre state and updater function from context
  const { selectedGenres, setSelectedGenres } = useGenre(); // ✅ shared genre context across app

  return (
    <main className="container-fluid px-0">
      {/* Navbar receives the current genre state for filtering */}
      <NavBar
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
      />

      {/* Render the page content inside the layout */}
      {children}

      {/* Footer remains constant across pages */}
      <Footer />
    </main>
  );
}

export default DefaultLayout;
