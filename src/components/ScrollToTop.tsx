import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top immediately without animation
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
};

export default ScrollToTop; 