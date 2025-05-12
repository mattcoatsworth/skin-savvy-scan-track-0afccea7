
import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const BackButton: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleGoBack = () => {
    // Special case for Skin page - always go to home
    if (location.pathname === '/skin') {
      navigate('/home');
      return;
    }
    
    // Check if we have state from the product card navigation
    if (location.state?.from) {
      return navigate(location.state.from);
    }
    
    // If there's browser history, go back
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    
    // Fallback behavior using pathname logic
    const getBackPath = () => {
      // Default to home
      let backPath = "/";
      
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
          backPath = '/';
        }
        
        // If we're in a second-level page under a main section, go back to that section
        if (backPath === '/day-log') {
          backPath = '/';
        }
        
        // Handle the new category analysis pages
        if (pathParts[0] === 'category-analysis' && pathParts.length > 1) {
          backPath = '/category-analysis';
        }
        
        // Handle correlations and recommendations pages
        if (pathParts[0] === 'correlations-detail' || pathParts[0] === 'recommendations-detail') {
          backPath = '/weekly-skin-analysis';
        }
      }
      
      return backPath;
    };
    
    navigate(getBackPath());
  };
  
  return (
    <button onClick={handleGoBack} className="mr-4">
      <ArrowLeft className="h-5 w-5" />
    </button>
  );
};

export default BackButton;

