
import React from "react";
import { Outlet } from "react-router-dom";
import { useScrollToTop } from "@/hooks/useScrollToTop";

/**
 * Onboarding layout without navigation
 * Similar to how screens would be structured in React Native
 */
const OnboardingLayout: React.FC = () => {
  // Scroll behavior (web-only)
  useScrollToTop();
  
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-md mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default OnboardingLayout;
