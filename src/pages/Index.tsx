import React from "react";
import DailySkinSnapshot from "@/components/DailySkinSnapshot";
import ScanButton from "@/components/ScanButton";
import RecentLogsCarousel from "@/components/RecentLogsCarousel";
import InsightsTrends from "@/components/InsightsTrends";
import SuggestedActions from "@/components/SuggestedActions";
import ExploreSection from "@/components/ExploreSection";
import SkinHistory from "@/components/SkinHistory";
import { Salad, Pill, Palette, CloudSun } from "lucide-react";

const Index = () => {
  // Sample data
  const skinFactors = [
    { type: "Food" as const, status: "Hydrating", icon: <Salad className="h-4 w-4" /> },
    { type: "Supplement" as const, status: "New", icon: <Pill className="h-4 w-4" /> },
    { type: "Makeup" as const, status: "Same as usual", icon: <Palette className="h-4 w-4" /> },
    { type: "Weather" as const, status: "Dry + Cold", icon: <CloudSun className="h-4 w-4" /> },
  ];

  // Add fallback static recommendations in case AI fails
  const fallbackRecommendations = [
    { 
      type: "skincare", 
      text: "Use gentle cleanser", 
      icon: <Pill className="h-4 w-4" />,
      linkTo: "/recommendations-detail/gentle-cleanser" 
    },
    { 
      type: "food", 
      text: "Limit dairy intake", 
      icon: <Salad className="h-4 w-4" />,
      linkTo: "/recommendations-detail/limit-dairy"
    },
    { 
      type: "lifestyle", 
      text: "Practice meditation", 
      icon: <CloudSun className="h-4 w-4" />,
      linkTo: "/recommendations-detail/meditation"
    },
    { 
      type: "skincare", 
      text: "Try vitamin C serum", 
      icon: <Pill className="h-4 w-4" />,
      linkTo: "/recommendations-detail/vitamin-c-serum/testai" 
    },
    { 
      type: "food", 
      text: "Add antioxidant foods", 
      icon: <Salad className="h-4 w-4" />,
      linkTo: "/recommendations-detail/antioxidants/testai"
    },
    { 
      type: "lifestyle", 
      text: "Morning hydration", 
      icon: <CloudSun className="h-4 w-4" />,
      linkTo: "/recommendations-detail/hydration/testai"
    },
    { 
      type: "skincare", 
      text: "SPF reapplication", 
      icon: <Pill className="h-4 w-4" />,
      linkTo: "/recommendations-detail/spf/testai" 
    },
    { 
      type: "supplements", 
      text: "Add zinc", 
      icon: <Pill className="h-4 w-4" />,
      linkTo: "/recommendations-detail/zinc"
    },
  ];

  // We no longer need to define static recommendations here as they'll be dynamically generated
  // by the DailySkinSnapshot component using the useSkinAdvice hook

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
      icon: "✨",
      id: "collagen-supplements",
      iconName: "badge-check",
      category: "positive" as const
    },
    {
      title: "Alcohol consumption",
      description: "Correlates with next-day puffiness 3 times this month",
      icon: "🍷",
      id: "alcohol-consumption",
      iconName: "wine",
      category: "negative" as const
    },
    {
      title: "Vitamin C serum",
      description: "Brightening effect noted after regular use",
      icon: "🍊",
      id: "vitamin-c-brightening",
      iconName: "sun",
      category: "positive" as const
    },
  ];

  const suggestedActions = [
    { 
      text: "Try logging your water intake today",
      linkTo: "/day-log/today", // Link directly to today's log
      id: "water-intake",
      type: "action"
    },
    { 
      text: "Consider pausing this supplement to see if irritation decreases",
      id: "supplement-irritation", 
      supplementId: "collagen", // Add supplementId to link directly to supplement page
      type: "action"
    },
    { 
      text: "Use SPF more consistently this week",
      id: "spf-consistency",
      type: "action"
    },
  ];

  const exploreItems = [
    { 
      title: "Skin Tips for Your Skin Type", 
      subtitle: "Personalized advice",
      id: "skin-tips",
      linkTo: "/explore/skin-tips"
    },
    { 
      title: "Science Behind Vitamin C", 
      subtitle: "Research & benefits",
      id: "vitamin-c-science",
      linkTo: "/explore/vitamin-c-science"
    },
    { 
      title: "New in the Community", 
      subtitle: "Connect with others",
      id: "community",
      linkTo: "/explore/community"
    },
  ];

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
    </div>
  );
};

export default Index;
