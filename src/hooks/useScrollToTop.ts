
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook that scrolls the window to the top whenever the pathname changes
 * or when the component using this hook mounts
 */
export const useScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    // Force scroll to top with smooth behavior
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto' // Using 'auto' instead of 'smooth' for immediate effect
    });
  }, [pathname]);
};

export default useScrollToTop;
