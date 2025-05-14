
import React, { useState } from "react";
import DailySkinSnapshot from "@/components/DailySkinSnapshot";
import ScanButton from "@/components/ScanButton";
import RecentLogsCarousel from "@/components/RecentLogsCarousel";
import InsightsTrends from "@/components/InsightsTrends";
import SuggestedActions from "@/components/SuggestedActions";
import ExploreSection from "@/components/ExploreSection";
import SkinHistory from "@/components/SkinHistory";
import { Salad, Pill, Palette, CloudSun, Droplet } from "lucide-react";
import BottomTemplate from "@/components/BottomTemplate";

const Index = () => {
  // Sample data
  const skinFactors = [
    { type: "Food" as const, status: "Hydrating", icon: <Salad className="h-4 w-4" /> },
    { type: "Supplement" as const, status: "New", icon: <Pill className="h-4 w-4" /> },
    { type: "Makeup" as const, status: "Same as usual", icon: <Palette className="h-4 w-4" /> },
    { type: "Weather" as const, status: "Dry + Cold", icon: <CloudSun className="h-4 w-4" /> },
  ];

  // Define the RecommendationType to match what's expected by DailySkinSnapshot
  type RecommendationType = "skincare" | "food" | "lifestyle" | "supplements";
  
  // Add fallback static recommendations in case AI fails
  const fallbackRecommendations = [
    { 
      type: "lifestyle" as RecommendationType, 
      text: "water intake to at least 8 cups (64 ounces) daily to support hydration.", 
      icon: <Droplet className="h-4 w-4" />,
      linkTo: "/recommendations-detail/water-intake" 
    },
    { 
      type: "skincare" as RecommendationType, 
      text: "a daily moisturizer with hyaluronic acid to retain skin moisture effectively.", 
      icon: <Droplet className="h-4 w-4" />,
      linkTo: "/recommendations-detail/hyaluronic-acid"
    },
    { 
      type: "skincare" as RecommendationType, 
      text: "a gentle cleanser to remove makeup and impurities without stripping your skin's natural oils.", 
      icon: <Droplet className="h-4 w-4" />,
      linkTo: "/recommendations-detail/gentle-cleanser"
    },
    { 
      type: "supplements" as RecommendationType, 
      text: "omega-3 supplements to your diet to enhance skin barrier function and combat dryness.", 
      icon: <Droplet className="h-4 w-4" />,
      linkTo: "/recommendations-detail/omega-3-supplements" 
    },
    { 
      type: "food" as RecommendationType, 
      text: "Include foods rich in antioxidants (like berries and nuts) to protect your skin from environmental stressors.", 
      icon: <Droplet className="h-4 w-4" />,
      linkTo: "/recommendations-detail/antioxidant-foods"
    },
    { 
      type: "lifestyle" as RecommendationType, 
      text: "a humidifier in your living space to combat dry air and maintain skin hydration.", 
      icon: <Droplet className="h-4 w-4" />,
      linkTo: "/recommendations-detail/humidifier"
    },
    { 
      type: "skincare" as RecommendationType, 
      text: "Apply a nourishing overnight mask or facial oil weekly.", 
      icon: <Droplet className="h-4 w-4" />,
      linkTo: "/recommendations-detail/overnight-mask" 
    },
    { 
      type: "supplements" as RecommendationType, 
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

  // Updated sample data with diverse scan types for the RecentLogsCarousel
  const recentLogs = [
    {
      title: "Face Scan Analysis",
      status: "positive" as const,
      description: "No irritation detected",
      rating: 88,
      id: "face-scan-morning"
    },
    {
      title: "Moisturizer Scan",
      status: "negative" as const,
      description: "Found 2 potential irritants",
      rating: 35,
      id: "moisturizer-scan"
    },
    {
      title: "Skin Barrier Analysis",
      status: "positive" as const,
      description: "Barrier improving",
      rating: 82,
      id: "skin-barrier-scan"
    },
    {
      title: "Sunscreen SPF Scan",
      status: "neutral" as const,
      description: "Adequate protection",
      rating: 65,
      id: "sunscreen-scan"
    }
  ];

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

  // Update suggested actions to use proper type and id format for AIRecommendationDetail
  const suggestedActions = [
    { 
      text: "Try logging your water intake today",
      linkTo: "/day-log/today", // Link directly to today's log
      id: "water-intake",
      type: "action" // Explicit type for consistency
    },
    { 
      text: "Consider pausing this supplement to see if irritation decreases",
      supplementId: "collagen", // Add supplementId to link directly to supplement page
      id: "supplement-irritation", 
      type: "factor" // Consistent with AI recommendation types
    },
    { 
      text: "Use SPF more consistently this week",
      id: "spf-consistency",
      type: "action" // Consistent with AI recommendation types
    },
    { 
      text: "Try a weekly exfoliation routine",
      id: "exfoliation",
      type: "factor", // Using factor type for testing
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
        
        {/* Today's Selfies section removed */}
        
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
