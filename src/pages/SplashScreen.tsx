
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { animations } from "@/design";
import { Sparkles } from "lucide-react";

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Start animations immediately after component mount
    setAnimate(true);

    // Automatically navigate to onboarding after 3 seconds
    const timer = setTimeout(() => {
      navigate("/onboarding");
    }, 3000);

    // Clean up timer if component unmounts
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-purple-50 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated circles in background */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full bg-primary/10 
              ${i % 2 === 0 ? 'animate-[pulse_4s_ease-in-out_infinite]' : 'animate-[pulse_5s_ease-in-out_infinite]'}`}
            style={{
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.4,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Main content container */}
      <div className={`relative z-10 transform transition-all duration-1000 ${
        animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        <div className="flex flex-col items-center">
          {/* Logo with pulsing glow */}
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse transform scale-125"></div>
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-purple-700 rounded-full flex items-center justify-center mb-6 shadow-lg relative z-10 animate-[bounce_2s_ease-in-out_infinite]">
              <span className="text-white text-3xl font-bold">SS</span>
              
              {/* Sparkle icon animations */}
              <Sparkles 
                className="absolute -top-3 -right-1 w-6 h-6 text-yellow-300 animate-[fade-in_0.5s_ease-out_forwards,pulse_2s_ease-in-out_infinite]" 
                style={{ animationDelay: '0.8s' }}
              />
              <Sparkles 
                className="absolute -bottom-2 -left-1 w-5 h-5 text-yellow-300 animate-[fade-in_0.5s_ease-out_forwards,pulse_2.5s_ease-in-out_infinite]" 
                style={{ animationDelay: '1.2s' }}
              />
            </div>
          </div>
          
          {/* App Name with staggered letter animation */}
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-700 mb-3">
            {/* Individual letters with staggered animations */}
            {"Skin Savvy".split('').map((letter, index) => (
              <span
                key={index}
                className="inline-block transition-all duration-300 transform"
                style={{
                  animationName: 'fade-in',
                  animationDuration: '0.5s',
                  animationFillMode: 'forwards',
                  animationTimingFunction: 'ease-out',
                  animationDelay: `${0.5 + index * 0.07}s`,
                  opacity: 0,
                  transform: 'translateY(10px)',
                }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
          </h1>
          
          {/* Tagline with reveal animation */}
          <p 
            className="text-muted-foreground text-center opacity-0"
            style={{ 
              animation: 'fade-in 0.8s ease-out 1.5s forwards'
            }}
          >
            Your personalized skin care journey
          </p>
          
          {/* Thin progress line showing loading progress */}
          <div className="w-60 h-0.5 bg-gray-100 rounded-full mt-10 overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-3000 ease-in-out origin-left"
              style={{
                animation: 'progress-bar 2.5s ease-in-out forwards',
                width: '0%',
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Add keyframes for the progress bar animation */}
      <style jsx>{`
        @keyframes progress-bar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
