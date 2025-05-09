import React from "react";
import BackButton from "@/components/BackButton";
import InsightsTrends from "@/components/InsightsTrends";
import ViewScoringMethod from "@/components/ViewScoringMethod";

// Mock data for insights
const insightData = [
  {
    title: "Hydration Effect",
    description: "Drinking 8+ glasses of water improved skin moisture by 30%",
    iconName: "droplet"
  },
  {
    title: "Vitamin C Serum",
    description: "Regular use has helped with brightening and texture",
    iconName: "star"
  },
  {
    title: "Sleep Quality",
    description: "Nights with 7+ hours sleep show 40% better skin clarity",
    iconName: "activity"
  }
];

const InsightsTrendsPage = () => {
  return (
    <div className="pb-20">
      <header className="mb-6 flex items-center">
        <BackButton />
        <h1 className="text-2xl font-bold">Insights & Trends</h1>
      </header>
      
      <InsightsTrends insights={insightData} />
      
      {/* Add View Scoring Method component at the bottom */}
      <ViewScoringMethod />
    </div>
  );
};

export default InsightsTrendsPage;
