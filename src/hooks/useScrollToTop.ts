
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook that scrolls the window to the top whenever the pathname changes
 * or when the component using this hook mounts
 */
export const useScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    // Force scroll to top with immediate effect
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto' // Using 'auto' instead of 'smooth' for immediate effect
    });
    
    // Additional safety measure - set a small timeout to ensure scroll happens
    // after any rendering is complete
    const timeoutId = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto'
      });
    }, 0);
    
    // Clean up timeout on unmount
    return () => clearTimeout(timeoutId);
  }, [pathname]); // Re-run when pathname changes
};

export default useScrollToTop;
