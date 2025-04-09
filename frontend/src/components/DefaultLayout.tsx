import { ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';
import NavBar from './NavBar';

type DefaultLayoutProps = {
  children: ReactNode;
};

function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <main className="container-fluid px-0">
      <NavBar />
      <Header />
      {children}
      <Footer />
    </main>
  );
}

export default DefaultLayout;
