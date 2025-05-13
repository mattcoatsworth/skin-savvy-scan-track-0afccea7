
import React from "react";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useAppNavigation } from "@/navigation/navigationUtils";

const BackButton: React.FC = () => {
  const location = useLocation();
  const { goBack, navigate } = useAppNavigation();
  
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
    
    // Default behavior - go back
    goBack();
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
