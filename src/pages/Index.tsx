
import React from "react";
import DailySkinSnapshot from "@/components/DailySkinSnapshot";
import ScanButton from "@/components/ScanButton";
import RecentLogsCarousel from "@/components/RecentLogsCarousel";
import InsightsTrends from "@/components/InsightsTrends";
import SuggestedActions from "@/components/SuggestedActions";
import ExploreSection from "@/components/ExploreSection";
import SkinHistory from "@/components/SkinHistory";
import { Salad, Pill, Palette, CloudSun, CalendarDays, Activity } from "lucide-react";
import BottomTemplate from "@/components/BottomTemplate";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  // Sample data
  const skinFactors = [
    { type: "Food", status: "Hydrating", icon: <Salad className="h-4 w-4" /> },
    { type: "Supplement", status: "New", icon: <Pill className="h-4 w-4" /> },
    { type: "Makeup", status: "Same as usual", icon: <Palette className="h-4 w-4" /> },
    { type: "Weather", status: "Dry + Cold", icon: <CloudSun className="h-4 w-4" /> },
  ];

  // Define the RecommendationType to match what's expected by DailySkinSnapshot
  type RecommendationType = "skincare" | "food" | "lifestyle" | "supplements";
  
  // Add fallback static recommendations in case AI fails
  const fallbackRecommendations = [
    { 
      type: "skincare" as RecommendationType, 
      text: "Use gentle cleanser", 
      icon: <Pill className="h-4 w-4" />,
      linkTo: "/recommendations-detail/gentle-cleanser" 
    },
    { 
      type: "food" as RecommendationType, 
      text: "Limit dairy intake", 
      icon: <Salad className="h-4 w-4" />,
      linkTo: "/recommendations-detail/limit-dairy"
    },
    { 
      type: "lifestyle" as RecommendationType, 
      text: "Practice meditation", 
      icon: <CloudSun className="h-4 w-4" />,
      linkTo: "/recommendations-detail/meditation"
    },
    { 
      type: "skincare" as RecommendationType, 
      text: "Try vitamin C serum", 
      icon: <Pill className="h-4 w-4" />,
      linkTo: "/recommendations-detail/vitamin-c-serum/testai" 
    },
    { 
      type: "food" as RecommendationType, 
      text: "Add antioxidant foods", 
      icon: <Salad className="h-4 w-4" />,
      linkTo: "/recommendations-detail/antioxidants/testai"
    },
    { 
      type: "lifestyle" as RecommendationType, 
      text: "Morning hydration", 
      icon: <CloudSun className="h-4 w-4" />,
      linkTo: "/recommendations-detail/hydration/testai"
    },
    { 
      type: "skincare" as RecommendationType, 
      text: "SPF reapplication", 
      icon: <Pill className="h-4 w-4" />,
      linkTo: "/recommendations-detail/spf/testai" 
    },
    { 
      type: "supplements" as RecommendationType, 
      text: "Add zinc", 
      icon: <Pill className="h-4 w-4" />,
      linkTo: "/recommendations-detail/zinc"
    },
  ];

  // Get current date and the past 7 days
  const getDayName = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const getDateString = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Get today's date in readable format
  const today = new Date();
  const todayFormatted = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  
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

  // Sample meal plan data
  const mealPlanToday = {
    breakfast: "Avocado toast with poached eggs",
    lunch: "Salmon salad with mixed greens",
    dinner: "Grilled chicken with roasted vegetables",
    snacks: ["Greek yogurt with berries", "Handful of almonds"],
    hydration: "2.5L water with lemon slices"
  };

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
          
          {/* Meal Plan Card */}
          <Card className="overflow-hidden border-l-4 border-l-emerald-400">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <Salad className="h-5 w-5 text-emerald-500" />
                  <h3 className="font-medium text-base">Today's Meal Plan</h3>
                </div>
                <Link to="/fyp">
                  <Button variant="ghost" size="sm" className="text-xs">
                    View Full Plan
                  </Button>
                </Link>
              </div>
              
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Breakfast</p>
                  <p className="text-sm">{mealPlanToday.breakfast}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Lunch</p>
                  <p className="text-sm">{mealPlanToday.lunch}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Dinner</p>
                  <p className="text-sm">{mealPlanToday.dinner}</p>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-emerald-600">Optimized for skin health</p>
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Skin Energy Card */}
          <Card className="overflow-hidden border-l-4 border-l-blue-400">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-500" />
                  <h3 className="font-medium text-base">Skin Energy</h3>
                </div>
                <Link to="/fyp">
                  <Button variant="ghost" size="sm" className="text-xs">
                    View Details
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm">Current Energy Level</p>
                <p className="font-semibold text-sm text-blue-600">78%</p>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: "78%" }}></div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-xs text-muted-foreground">Hydration</p>
                  <p className="text-xs font-medium">Good</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-muted-foreground">Nutrients</p>
                  <p className="text-xs font-medium">Excellent</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-muted-foreground">Sleep</p>
                  <p className="text-xs font-medium">Needs improvement</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
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
