import React from "react";
import DailySkinSnapshot from "@/components/DailySkinSnapshot";
import ScanButton from "@/components/ScanButton";
import RecentLogsCarousel from "@/components/RecentLogsCarousel";
import InsightsTrends from "@/components/InsightsTrends";
import SuggestedActions from "@/components/SuggestedActions";
import ExploreSection from "@/components/ExploreSection";
import AppNavigation from "@/components/AppNavigation";
import SkinHistory from "@/components/SkinHistory";

const Index = () => {
  // Sample data
  const skinFactors = [
    { type: "Food" as const, status: "Hydrating", icon: "🥗" },
    { type: "Supplement" as const, status: "New", icon: "💊" },
    { type: "Makeup" as const, status: "Same as usual", icon: "💄" },
    { type: "Weather" as const, status: "Dry + Cold", icon: "🌡️" },
  ];

  const recentLogs = [
    { 
      title: "Retinol Cream", 
      status: "positive" as const, 
      description: "No reaction",
      rating: 85
    },
    { 
      title: "Whey Protein", 
      status: "negative" as const, 
      description: "Possible acne trigger",
      rating: 30
    },
    { 
      title: "Avocado", 
      status: "positive" as const, 
      description: "Skin hydration improved",
      rating: 92
    },
    { 
      title: "New Foundation", 
      status: "neutral" as const, 
      description: "No noticeable change",
      rating: 65
    },
  ];

  // Get current date and the past 7 days
  const getDayName = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const getDateString = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const today = new Date();
  const skinHistory = Array(7).fill(null).map((_, i) => {
    const date = new Date();
    date.setDate(today.getDate() - (6 - i));
    // Generate a random rating between 50 and 95 for demo purposes
    const rating = Math.floor(Math.random() * (95 - 50 + 1)) + 50;
    return {
      day: getDayName(date),
      date: getDateString(date),
      rating: rating
    };
  });

  const insights = [
    {
      title: "Collagen supplements",
      description: "Improved skin elasticity after 2 weeks",
      icon: "✨"
    },
    {
      title: "Alcohol consumption",
      description: "Correlates with next-day puffiness 3 times this month",
      icon: "🍷"
    },
    {
      title: "Vitamin C serum",
      description: "Brightening effect noted after regular use",
      icon: "🍊"
    },
  ];

  const suggestedActions = [
    { text: "Try logging your water intake today" },
    { text: "Consider pausing this supplement to see if irritation decreases" },
    { text: "Use SPF more consistently this week" },
  ];

  const exploreItems = [
    { 
      title: "Skin Tips for Your Skin Type", 
      subtitle: "Personalized advice" 
    },
    { 
      title: "Science Behind Vitamin C", 
      subtitle: "Research & benefits" 
    },
    { 
      title: "New in the Community", 
      subtitle: "Connect with others" 
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Simplified header with smaller Skin Savvy text */}
        <header className="mb-6">
          <h1 className="text-xl font-bold">Skin Savvy</h1>
        </header>
        
        <main className="space-y-8">
          <DailySkinSnapshot 
            emoji="😊" 
            status="Balanced" 
            factors={skinFactors} 
          />
          
          <div className="my-4">
            <ScanButton />
          </div>
          
          <SkinHistory ratings={skinHistory} />
          
          <RecentLogsCarousel logs={recentLogs} />
          
          <InsightsTrends insights={insights} />
          
          <SuggestedActions actions={suggestedActions} />
          
          <ExploreSection items={exploreItems} />
        </main>
      </div>
      
      <AppNavigation />
    </div>
  );
};

export default Index;
