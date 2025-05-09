
import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const BackButton: React.FC = () => {
  const location = useLocation();
  
  // Determine where to go back to
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
        // If we're at /product/food/[id], go to trending foods
        if (pathParts[1] === 'food') {
          backPath = '/trending-foods';
        } 
        // If we're at /product/skincare/[id], go to trending products
        else if (pathParts[1] === 'skincare') {
          backPath = '/trending-products';
        } 
        // Fallback to products page
        else {
          backPath = '/products';
        }
      }
      
      // If we're in a second-level page under a main section, go back to that section
      if (backPath === '/day-log') {
        backPath = '/';
      }
      
      // Handle the new category analysis pages
      if (pathParts[0] === 'category-analysis') {
        backPath = '/weekly-skin-analysis';
      }
      
      // Handle correlations and recommendations pages
      if (pathParts[0] === 'correlations-detail' || pathParts[0] === 'recommendations-detail') {
        backPath = '/weekly-skin-analysis';
      }
    }
    
    return backPath;
  };
  
  return (
    <Link to={getBackPath()} className="mr-4">
      <ArrowLeft className="h-5 w-5" />
    </Link>
  );
};

export default BackButton;
