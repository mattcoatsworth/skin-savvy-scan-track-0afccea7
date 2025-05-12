
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import AppNavigation from "@/components/AppNavigation";
import DailySkinSnapshot from "@/components/DailySkinSnapshot";
import SkinHistory from "@/components/SkinHistory";
import SuggestedActions from "@/components/SuggestedActions";
import ExploreSection from "@/components/ExploreSection";
import { useScrollToTop } from "@/hooks/useScrollToTop";

// Mock data for daily skin scores
const dailyScores = [
  { day: "Mon", rating: 65, date: "May 6" },
  { day: "Tue", rating: 72, date: "May 7" },
  { day: "Wed", rating: 45, date: "May 8" },
  { day: "Thu", rating: 80, date: "May 9" },
  { day: "Fri", rating: 56, date: "May 10" },
  { day: "Sat", rating: 90, date: "May 11" },
  { day: "Sun", rating: 84, date: "May 12" },
];

// Mock actions for suggestions
const suggestedActions = [
  {
    id: "hydration",
    title: "Stay Hydrated",
    description: "Drink 8 glasses of water daily",
    icon: "💧",
    category: "Lifestyle"
  },
  {
    id: "sunscreen",
    title: "Apply Sunscreen",
    description: "Use SPF 30+ even indoors",
    icon: "☀️",
    category: "Protection"
  },
  {
    id: "sleep",
    title: "Get Enough Sleep",
    description: "Aim for 7-8 hours nightly",
    icon: "😴",
    category: "Wellness"
  }
];

// Mock items for explore section
const exploreItems = [
  {
    title: "Acne Solutions",
    subtitle: "Tips for clearer skin",
    id: "acne"
  },
  {
    title: "Anti-Aging",
    subtitle: "Preventative care",
    id: "aging"
  },
  {
    title: "Sensitive Skin",
    subtitle: "Gentle routines",
    id: "sensitive"
  },
  {
    title: "Product Guide",
    subtitle: "Top recommendations",
    id: "products"
  }
];

const Index = () => {
  useScrollToTop();
  
  return (
    <div className="pb-20">
      <header className="mb-2">
        <h1 className="text-2xl font-bold">Skin</h1>
      </header>
      
      <main className="space-y-6">
        {/* Skin History Card */}
        <SkinHistory ratings={dailyScores} />
        
        {/* Daily Skin Snapshot - Today's Selfies */}
        <DailySkinSnapshot title="Today's Selfies" />
        
        {/* Suggested Action Cards */}
        <SuggestedActions actions={suggestedActions} />
        
        {/* Explore Section */}
        <ExploreSection items={exploreItems} />
      </main>
      
      <AppNavigation />
    </div>
  );
};

export default Index;
