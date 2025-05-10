import React from "react";
import DailySkinSnapshot from "@/components/DailySkinSnapshot";
import ScanButton from "@/components/ScanButton";
import RecentLogsCarousel from "@/components/RecentLogsCarousel";
import InsightsTrends from "@/components/InsightsTrends";
import SuggestedActions from "@/components/SuggestedActions";
import ExploreSection from "@/components/ExploreSection";
import SkinHistory from "@/components/SkinHistory";
import ForYouPage from "@/components/ForYouPage";
import { Salad, Pill, Palette, CloudSun } from "lucide-react";

const Index = () => {
  // Sample data
  const skinFactors = [
    { type: "Food" as const, status: "Hydrating", icon: <Salad className="h-4 w-4" /> },
    { type: "Supplement" as const, status: "New", icon: <Pill className="h-4 w-4" /> },
    { type: "Makeup" as const, status: "Same as usual", icon: <Palette className="h-4 w-4" /> },
    { type: "Weather" as const, status: "Dry + Cold", icon: <CloudSun className="h-4 w-4" /> },
  ];

  // For You Page recommendations
  const recommendations = [
    {
      id: "rec-001",
      title: "Try vitamin C serum",
      description: "Based on your skin type and concerns about hyperpigmentation",
      category: "skincare",
      priority: "high"
    },
    {
      id: "rec-002",
      title: "Increase water intake",
      description: "Your skin appears dehydrated based on recent logs",
      category: "lifestyle",
      priority: "medium"
    },
    {
      id: "rec-003",
      title: "Consider pausing this supplement",
      description: "Possible correlation with recent breakouts",
      category: "supplements",
      priority: "high"
    },
    {
      id: "rec-004",
      title: "Reduce dairy consumption",
      description: "May be triggering inflammation based on your food logs",
      category: "food",
      priority: "medium"
    },
    {
      id: "rec-005",
      title: "Try oil-free makeup options",
      description: "Better suited for your combination skin type",
      category: "makeup",
      priority: "low"
    }
  ];

  // Sample data
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
        {/* Move ScanButton to the top, below the header */}
        <div className="mb-6">
          <ScanButton />
        </div>
        
        <DailySkinSnapshot 
          emoji="😊" 
          status="Balanced" 
          factors={skinFactors} 
        />
        
        {/* Insert the ForYouPage component right after DailySkinSnapshot */}
        <ForYouPage recommendations={recommendations} />
        
        <SkinHistory ratings={skinHistory} />
        
        <RecentLogsCarousel logs={recentLogs} />
        
        <InsightsTrends insights={insights} />
        
        <SuggestedActions actions={suggestedActions} />
        
        <ExploreSection items={exploreItems} />
      </main>
    </div>
  );
};

export default Index;
