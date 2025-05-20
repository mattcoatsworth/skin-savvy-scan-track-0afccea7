
import React from "react";
import DailySkinSnapshot from "@/components/DailySkinSnapshot";
import ScanButton from "@/components/ScanButton";
import RecentLogsCarousel from "@/components/RecentLogsCarousel";
import InsightsTrends from "@/components/InsightsTrends";
import SuggestedActions from "@/components/SuggestedActions";
import ExploreSection from "@/components/ExploreSection";
import SkinHistory from "@/components/SkinHistory";
import BottomTemplate from "@/components/BottomTemplate";
import MealPlanCard from "@/components/MealPlanCard";
import SkinEnergyCard from "@/components/SkinEnergyCard";
import { useSampleData } from "@/hooks/useSampleData";

const Index = () => {
  // Get all sample data from our custom hook
  const {
    skinFactors,
    fallbackRecommendations,
    skinHistory,
    recentLogs,
    insights,
    suggestedActions,
    exploreItems,
    mealPlanToday
  } = useSampleData();

  return (
    <div>
      {/* Simplified header with smaller Skin Savvy text */}
      <header className="mb-4">
        <h1 className="text-xl font-bold">Skin Savvy</h1>
      </header>
      
      <main>
        {/* Skin History at the top with proper spacing */}
        <div className="mb-6">
          <SkinHistory ratings={skinHistory} />
        </div>
        
        {/* ScanButton in its own div with proper spacing */}
        <div className="mb-6">
          <ScanButton />
        </div>
        
        <div className="space-y-6">
          {/* Daily Skin Snapshot */}
          <DailySkinSnapshot 
            emoji="😊" 
            status="Balanced" 
            factors={skinFactors} 
            recommendations={fallbackRecommendations}
          />
          
          {/* Meal Plan Card */}
          <MealPlanCard mealPlanToday={mealPlanToday} />
          
          {/* Skin Energy Card */}
          <SkinEnergyCard />
          
          {/* Recent Logs Carousel */}
          <RecentLogsCarousel logs={recentLogs} />
          
          {/* Insights & Trends */}
          <InsightsTrends insights={insights} />
          
          {/* Suggested Actions */}
          <SuggestedActions actions={suggestedActions} />
          
          {/* Explore Section */}
          <ExploreSection items={exploreItems} />
        </div>
      </main>

      {/* Add BottomTemplate to the home page */}
      <BottomTemplate pageTitle="Skin Savvy" />
    </div>
  );
};

export default Index;
