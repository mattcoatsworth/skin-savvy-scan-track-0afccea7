
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { animations } from "@/design";

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically navigate to onboarding after 3 seconds
    const timer = setTimeout(() => {
      navigate("/onboarding");
    }, 3000);

    // Clean up timer if component unmounts
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="animate-[fade-in_1s_ease-out,scale-in_0.8s_ease-out]">
        <div className="flex flex-col items-center">
          {/* Logo */}
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-4">
            <span className="text-white text-3xl font-bold">SS</span>
          </div>
          
          {/* App Name */}
          <h1 className="text-3xl font-bold text-primary mb-2">Skin Savvy</h1>
          
          {/* Tagline */}
          <p className="text-muted-foreground text-center">
            Your personalized skin care journey
          </p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
