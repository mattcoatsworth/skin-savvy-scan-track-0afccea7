
import React from "react";
import DailySkinSnapshot from "@/components/DailySkinSnapshot";
import ScanButton from "@/components/ScanButton";
import RecentLogsCarousel from "@/components/RecentLogsCarousel";
import InsightsTrends from "@/components/InsightsTrends";
import SuggestedActions from "@/components/SuggestedActions";
import ExploreSection from "@/components/ExploreSection";
import BottomTemplate from "@/components/BottomTemplate";
import { useSampleData } from "@/hooks/useSampleData";
import type { Factor, Recommendation } from "@/types/skin-types";
import HeroSection from "@/components/HeroSection";

const Index = () => {
  // Get all the sample data from our custom hook
  const { 
    skinFactors,
    fallbackRecommendations,
    skinHistory,
    recentLogs,
    insights,
    suggestedActions,
    exploreItems
  } = useSampleData();

  return (
    <div>
      {/* Header with profile picture */}
      <header className="mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center overflow-hidden mr-2 border-2 border-white shadow-sm">
            {/* This could be replaced with an actual profile image */}
            <span className="text-white text-lg font-bold">JS</span>
          </div>
        </div>
        <h2 className="text-lg">May 22</h2>
      </header>
      
      <main>
        {/* New Hero Section that combines Skin History and Streak */}
        <div className="mb-6">
          <HeroSection skinHistory={skinHistory} />
        </div>
        
        {/* ScanButton in its own div with proper spacing */}
        <div className="mb-6">
          <ScanButton />
        </div>
        
        <div className="space-y-6">
          <DailySkinSnapshot 
            emoji="😊" 
            status="Balanced" 
            factors={skinFactors} 
            recommendations={fallbackRecommendations}
          />
          
          <RecentLogsCarousel logs={recentLogs} />
          
          <InsightsTrends insights={insights} />
          
          <SuggestedActions actions={suggestedActions} />
          
          <ExploreSection items={exploreItems} />
        </div>
      </main>

      {/* Add BottomTemplate to the home page */}
      <BottomTemplate pageTitle="Skin Savvy" />
    </div>
  );
};

export default Index;
