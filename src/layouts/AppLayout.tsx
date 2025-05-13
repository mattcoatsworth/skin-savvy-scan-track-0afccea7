
import React from "react";
import { Outlet } from "react-router-dom";
import AppNavigation from "@/components/AppNavigation";
import { useScrollToTop } from "@/hooks/useScrollToTop";

/**
 * Main app layout with navigation
 * Similar to how screens would be structured in React Native
 */
const AppLayout: React.FC = () => {
  // Scroll behavior (web-only)
  useScrollToTop();
  
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-md mx-auto px-4 py-6 pb-24">
        <Outlet />
      </div>
      <AppNavigation />
    </div>
  );
};

export default AppLayout;
