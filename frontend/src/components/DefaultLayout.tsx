import { ReactNode } from 'react';
import Footer from './Footer';
import NavBar from './NavBar';
import { useGenre } from './GenreContext';

type DefaultLayoutProps = {
  children: ReactNode;
};

function DefaultLayout({ children }: DefaultLayoutProps) {
  const { selectedGenres, setSelectedGenres } = useGenre(); // ✅ Now it's valid

  return (
    <main className="container-fluid px-0">
      <NavBar
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
      />
      {children}
      <Footer />
    </main>
  );
}

export default DefaultLayout;
