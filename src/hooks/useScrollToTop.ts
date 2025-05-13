
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook that scrolls the window to the top whenever the pathname changes
 * or when the component using this hook mounts
 */
export const useScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    try {
      // Simple and direct approach - scroll to top immediately
      window.scrollTo(0, 0);
    } catch (e) {
      console.error("Error in useScrollToTop hook:", e);
    }
    
    // No dependencies array means this effect runs once on mount
  }, [pathname]); // Re-run when pathname changes
};

export default useScrollToTop;
