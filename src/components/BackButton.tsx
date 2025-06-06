
import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const BackButton: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleGoBack = (e: React.MouseEvent) => {
    // Prevent any default browser behavior that might interfere
    e.preventDefault();
    
    // Special case for log-skin-condition page - always go to /home
    if (location.pathname === '/log-skin-condition') {
      navigate('/home');
      return;
    }
    
    // Special case for day-log pages - always go to /skin
    if (location.pathname.startsWith('/day-log')) {
      navigate('/skin');
      return;
    }
    
    // Special case for Skin page - always go to home
    if (location.pathname === '/skin') {
      navigate('/home');
      return;
    }

    // Special case for Settings page - always go to home
    if (location.pathname === '/settings') {
      navigate('/home');
      return;
    }

    // Special case for recommendation detail pages - always go to home
    if (location.pathname.includes('/recommendations-detail/')) {
      navigate('/home');
      return;
    }
    
    // Check if we have state from the product card navigation
    if (location.state?.from) {
      navigate(location.state.from);
      return;
    }
    
    // If there's browser history, go back
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    
    // Fallback behavior using pathname logic
    const getBackPath = () => {
      // Default to home
      let backPath = "/home";
      
      // If the path has multiple segments (like /product/skincare/123)
      // Go back one level if possible
      const pathParts = location.pathname.split('/').filter(Boolean);
      if (pathParts.length > 1) {
        pathParts.pop();
        backPath = '/' + pathParts.join('/');
        
        // If we're in a product page path
        if (pathParts[0] === 'product') {
          // Default to insights
          backPath = '/products';
        }
        
        // Special case for products page - always go back to home
        if (location.pathname === '/products') {
          backPath = '/home';
        }
        
        // If we're in a second-level page under a main section, go back to that section
        if (backPath === '/day-log') {
          backPath = '/skin';
        }
        
        // Handle the new category analysis pages
        if (pathParts[0] === 'category-analysis' && pathParts.length > 1) {
          backPath = '/category-analysis';
        }
        
        // Handle correlations and recommendations pages
        if (pathParts[0] === 'correlations-detail' || pathParts[0] === 'recommendations-detail') {
          backPath = '/weekly-skin-analysis';
        }
        
        // Handle product AI test pages
        if (pathParts[0] === 'product' && pathParts.length > 3 && pathParts[3] === 'testai') {
          backPath = `/product/${pathParts[1]}/${pathParts[2]}`;
        }
      }
      
      return backPath;
    };
    
    navigate(getBackPath());
  };
  
  return (
    <button 
      onClick={handleGoBack} 
      className="mr-4 p-2"
      aria-label="Go back"
    >
      <ArrowLeft className="h-5 w-5" />
    </button>
  );
};

export default BackButton;
