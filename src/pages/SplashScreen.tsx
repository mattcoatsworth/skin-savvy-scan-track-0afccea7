
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Sun, Smile } from "lucide-react";
import { animations } from "@/design";

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Start animations immediately after component mount
    setAnimate(true);

    // Automatically navigate to onboarding after 3 seconds
    const timer = setTimeout(() => {
      navigate("/onboarding");
    }, 3200);

    // Clean up timer if component unmounts
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden">
      {/* Vibrant gradient background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
        style={{
          backgroundSize: "200% 200%",
          animation: "gradient-animation 8s ease infinite",
        }}
      />
      
      {/* Animated floating bubbles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/30 backdrop-blur-sm"
            style={{
              width: `${Math.random() * 100 + 30}px`,
              height: `${Math.random() * 100 + 30}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 8 + 8}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.5}s`,
              boxShadow: "inset 0 0 20px rgba(255,255,255,0.6), 0 0 15px rgba(255,255,255,0.3)",
            }}
          />
        ))}
      </div>

      {/* Main content container */}
      <div className={`relative z-10 transform transition-all duration-1000 ${
        animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        {/* Logo and title container */}
        <div className="flex flex-col items-center">
          {/* Logo with enhanced animations */}
          <div className="relative mb-8">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/40 to-purple-400/40 blur-xl animate-pulse"></div>
            
            <div className="w-28 h-28 bg-gradient-to-br from-primary/90 to-purple-500 rounded-full flex items-center justify-center relative z-10 shadow-lg">
              <span className="text-white text-4xl font-bold">SS</span>
              
              {/* Sun animation in top right */}
              <div className="absolute -top-1 -right-2 animate-spin-slow">
                <Sun className="text-yellow-300 w-8 h-8" />
              </div>
              
              {/* Sparkles animations */}
              <Sparkles 
                className="absolute -top-6 -left-4 w-6 h-6 text-yellow-300 animate-bounce" 
                style={{ animationDuration: "2s", animationDelay: "0.1s" }}
              />
              <Sparkles 
                className="absolute -bottom-4 right-0 w-5 h-5 text-yellow-300 animate-bounce" 
                style={{ animationDuration: "2.3s", animationDelay: "0.3s" }}
              />
            </div>
          </div>
          
          {/* App name with staggered animation */}
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-700 mb-3">
            {/* Animated letters with staggered reveal */}
            {"Skin Savvy".split('').map((letter, index) => (
              <span
                key={index}
                className="inline-block"
                style={{
                  animation: "bounce-in 0.5s forwards",
                  animationDelay: `${0.5 + index * 0.08}s`,
                  opacity: 0,
                  transform: "translateY(20px)",
                }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
          </h1>
          
          {/* Tagline with reveal animation and smile icon */}
          <div 
            className="flex items-center gap-2 text-muted-foreground opacity-0"
            style={{ 
              animation: 'fade-in-up 0.8s ease-out 1.5s forwards'
            }}
          >
            <p>Your personalized skin care journey</p>
            <Smile className="w-4 h-4 text-primary animate-bounce" style={{ animationDuration: "2s", animationDelay: "2s" }} />
          </div>
          
          {/* Improved progress bar */}
          <div className="w-64 h-1.5 bg-gray-100 rounded-full mt-12 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary/70 via-primary to-purple-500 rounded-full"
              style={{
                animation: 'progress-bar 2.8s ease-in-out forwards',
                width: '0%',
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Add keyframes for animations using standard style tag */}
      <style>
        {`
          @keyframes gradient-animation { 
            0% { background-position: 0% 50% }
            50% { background-position: 100% 50% }
            100% { background-position: 0% 50% }
          }

          @keyframes float {
            0% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
            100% { transform: translateY(5px) rotate(-5deg); }
          }
          
          @keyframes progress-bar {
            0% { width: 0%; }
            15% { width: 5%; }
            30% { width: 15%; }
            50% { width: 40%; }
            75% { width: 80%; }
            100% { width: 100%; }
          }

          @keyframes fade-in-up {
            0% { 
              opacity: 0;
              transform: translateY(10px);
            }
            100% { 
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes bounce-in {
            0% { 
              opacity: 0;
              transform: translateY(20px);
            }
            50% { 
              opacity: 0.5;
              transform: translateY(-8px);
            }
            100% { 
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          .animate-spin-slow {
            animation: spin-slow 6s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default SplashScreen;
