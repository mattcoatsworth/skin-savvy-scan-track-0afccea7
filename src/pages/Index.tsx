import React from "react";
import DailySkinSnapshot from "@/components/DailySkinSnapshot";
import ScanButton from "@/components/ScanButton";
import RecentLogsCarousel from "@/components/RecentLogsCarousel";
import InsightsTrends from "@/components/InsightsTrends";
import SuggestedActions from "@/components/SuggestedActions";
import ExploreSection from "@/components/ExploreSection";
import SkinHistory from "@/components/SkinHistory";
import { Salad, Pill, Palette, CloudSun, Droplet, Utensils, Circle, Activity, Calendar } from "lucide-react";

const Index = () => {
  // Sample data
  const skinFactors = [
    { type: "Food" as const, status: "Hydrating", icon: <Salad className="h-4 w-4" /> },
    { type: "Supplement" as const, status: "New", icon: <Pill className="h-4 w-4" /> },
    { type: "Makeup" as const, status: "Same as usual", icon: <Palette className="h-4 w-4" /> },
    { type: "Weather" as const, status: "Dry + Cold", icon: <CloudSun className="h-4 w-4" /> },
  ];

  // Sample personalized recommendations - Added more recommendations
  const skinRecommendations = [
    { 
      type: "skincare" as const, 
      text: "Try vitamin C serum", 
      icon: <Droplet className="h-4 w-4" />,
      linkTo: "/recommendations-detail/vitamin-c-serum"
    },
    { 
      type: "food" as const, 
      text: "Increase omega-3", 
      icon: <Utensils className="h-4 w-4" />,
      linkTo: "/recommendations-detail/increase-omega-3"
    },
    { 
      type: "supplements" as const, 
      text: "Add zinc", 
      icon: <Pill className="h-4 w-4" />,
      linkTo: "/recommendations-detail/add-zinc"
    },
    { 
      type: "makeup" as const, 
      text: "Switch foundation", 
      icon: <Circle className="h-4 w-4" />,
      linkTo: "/recommendations-detail/switch-foundation"
    },
    { 
      type: "lifestyle" as const, 
      text: "Stress management", 
      icon: <Activity className="h-4 w-4" />,
      linkTo: "/recommendations-detail/stress-management"
    },
    // New recommendations
    { 
      type: "skincare" as const, 
      text: "Gentle night exfoliant", 
      icon: <Droplet className="h-4 w-4" />,
      linkTo: "/recommendations-detail/night-exfoliant"
    },
    { 
      type: "food" as const, 
      text: "Add antioxidant foods", 
      icon: <Utensils className="h-4 w-4" />,
      linkTo: "/recommendations-detail/antioxidant-foods"
    },
    { 
      type: "supplements" as const, 
      text: "Try evening primrose", 
      icon: <Pill className="h-4 w-4" />,
      linkTo: "/recommendations-detail/evening-primrose"
    },
    { 
      type: "lifestyle" as const, 
      text: "Morning hydration", 
      icon: <Activity className="h-4 w-4" />,
      linkTo: "/recommendations-detail/morning-hydration"
    },
    { 
      type: "makeup" as const, 
      text: "Oil-free concealer", 
      icon: <Circle className="h-4 w-4" />,
      linkTo: "/recommendations-detail/oil-free-concealer"
    },
    { 
      type: "skincare" as const, 
      text: "Add ceramide moisturizer", 
      icon: <Droplet className="h-4 w-4" />,
      linkTo: "/recommendations-detail/ceramide-moisturizer"
    },
    { 
      type: "food" as const, 
      text: "Limit dairy consumption", 
      icon: <Utensils className="h-4 w-4" />,
      linkTo: "/recommendations-detail/limit-dairy"
    }
  ];

  const recentLogs = [
    { 
      title: "Retinol Cream", 
      status: "positive" as const, 
      description: "No reaction",
      rating: 85,
      id: "retinol-cream",
      linkTo: "/recent-logs/retinol-cream"
    },
    { 
      title: "Whey Protein", 
      status: "negative" as const, 
      description: "Possible acne trigger",
      rating: 30,
      id: "whey-protein",
      linkTo: "/recent-logs/whey-protein"
    },
    { 
      title: "Avocado", 
      status: "positive" as const, 
      description: "Skin hydration improved",
      rating: 92,
      id: "avocado",
      linkTo: "/recent-logs/avocado"
    },
    { 
      title: "New Foundation", 
      status: "neutral" as const, 
      description: "No noticeable change",
      rating: 65,
      id: "new-foundation",
      linkTo: "/recent-logs/new-foundation"
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
      id: "water-intake"
    },
    { 
      text: "Consider pausing this supplement to see if irritation decreases",
      id: "supplement-irritation", 
      supplementId: "collagen" // Add supplementId to link directly to supplement page
    },
    { 
      text: "Use SPF more consistently this week",
      id: "spf-consistency"
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
      
      <main className="space-y-6">
        {/* Moved SkinHistory to the top, below the header */}
        <SkinHistory ratings={skinHistory} />
        
        {/* ScanButton is now below SkinHistory with proper spacing */}
        <ScanButton />
        
        <DailySkinSnapshot 
          emoji="😊" 
          status="Balanced" 
          factors={skinFactors}
          recommendations={skinRecommendations}
        />
        
        <RecentLogsCarousel logs={recentLogs} />
        
        <InsightsTrends insights={insights} />
        
        <SuggestedActions actions={suggestedActions} />
        
        <ExploreSection items={exploreItems} />
      </main>
    </div>
  );
};

export default Index;
