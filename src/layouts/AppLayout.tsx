
import React from "react";
import { Outlet, Link } from "react-router-dom";
import AppNavigation from "@/components/AppNavigation";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { onboardingRoutes } from "@/navigation/OnboardingStack";

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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">Skin Savvy</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex gap-1">
                Pages <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white">
              <DropdownMenuLabel>Main Pages</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/home">Home</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/skin">Skin</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/products">Products</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/profile">Profile</Link>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Onboarding</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {onboardingRoutes.map((route) => (
                <DropdownMenuItem key={route.path} asChild>
                  <Link to={route.path}>{route.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Outlet />
      </div>
      <AppNavigation />
    </div>
  );
};

export default AppLayout;
