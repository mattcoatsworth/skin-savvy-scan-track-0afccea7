
import React from "react";
import DailySkinSnapshot from "@/components/DailySkinSnapshot";
import ScanButton from "@/components/ScanButton";
import RecentLogsCarousel from "@/components/RecentLogsCarousel";
import InsightsTrends from "@/components/InsightsTrends";
import SuggestedActions from "@/components/SuggestedActions";
import ExploreSection from "@/components/ExploreSection";
import HeroSection from "@/components/HeroSection";
import BottomTemplate from "@/components/BottomTemplate";
import { useSampleData } from "@/hooks/useSampleData";
import type { Factor, Recommendation } from "@/types/skin-types";

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

  // Calculate streak from skin history (for demo purposes)
  const currentStreak = skinHistory.filter(day => day.rating > 0).length;

  return (
    <div>
      {/* New Hero Section combining weekly skin report and streak */}
      <HeroSection 
        ratings={skinHistory}
        streak={currentStreak}
      />
      
      <main>
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
      <BottomTemplate pageTitle="Home" />
    </div>
  );
};

export default Index;
