// src/utils/ScrollToTop.tsx

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  // Grab the current pathname from the router
  const { pathname } = useLocation();

  useEffect(() => {
    // Automatically scroll to the top of the page whenever the route changes
    window.scrollTo(0, 0);
  }, [pathname]); // Re-run this effect every time the path changes

  // This component doesn't render anything
  return null;
};

export default ScrollToTop;
