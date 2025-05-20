
import { ReactNode } from "react";
import { Salad, Pill, Palette, CloudSun } from "lucide-react";
import { generateSkinHistoryData } from "@/utils/skin-utils";
import type { 
  Factor, 
  RecommendationType,
  Recommendation, 
  RecentLogType,
  InsightType,
  SuggestedActionType,
  ExploreItemType,
  MealPlanType
} from "@/types/skin-types";

export function useSampleData() {
  // Sample data with type assertions
  const skinFactors: Factor[] = [
    { type: "Food", status: "Hydrating", icon: <Salad className="h-4 w-4" /> },
    { type: "Supplement", status: "New", icon: <Pill className="h-4 w-4" /> },
    { type: "Makeup", status: "Same as usual", icon: <Palette className="h-4 w-4" /> },
    { type: "Weather", status: "Dry + Cold", icon: <CloudSun className="h-4 w-4" /> },
  ];

  // Add fallback static recommendations
  const fallbackRecommendations: Recommendation[] = [
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

  // Get today's date in readable format
  const today = new Date();
  const todayFormatted = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  
  const skinHistory = generateSkinHistoryData();

  // Updated sample data with diverse scan types for the RecentLogsCarousel
  const recentLogs: RecentLogType[] = [
    {
      title: "Face Scan Analysis",
      status: "positive",
      description: "No irritation detected",
      rating: 88,
      id: "face-scan-morning"
    },
    {
      title: "Moisturizer Scan",
      status: "negative",
      description: "Found 2 potential irritants",
      rating: 35,
      id: "moisturizer-scan"
    },
    {
      title: "Skin Barrier Analysis",
      status: "positive",
      description: "Barrier improving",
      rating: 82,
      id: "skin-barrier-scan"
    },
    {
      title: "Sunscreen SPF Scan",
      status: "neutral",
      description: "Adequate protection",
      rating: 65,
      id: "sunscreen-scan"
    }
  ];

  const insights: InsightType[] = [
    {
      title: "Collagen supplements",
      description: "Improved skin elasticity after 2 weeks",
      icon: "✨",
      id: "collagen-supplements",
      iconName: "badge-check",
      category: "positive"
    },
    {
      title: "Alcohol consumption",
      description: "Correlates with next-day puffiness 3 times this month",
      icon: "🍷",
      id: "alcohol-consumption",
      iconName: "wine",
      category: "negative"
    },
    {
      title: "Vitamin C serum",
      description: "Brightening effect noted after regular use",
      icon: "🍊",
      id: "vitamin-c-brightening",
      iconName: "sun",
      category: "positive"
    },
  ];

  // Update suggested actions to use proper type
  const suggestedActions: SuggestedActionType[] = [
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

  const exploreItems: ExploreItemType[] = [
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
  const mealPlanToday: MealPlanType = {
    breakfast: "Avocado toast with poached eggs",
    lunch: "Salmon salad with mixed greens",
    dinner: "Grilled chicken with roasted vegetables",
    snacks: ["Greek yogurt with berries", "Handful of almonds"],
    hydration: "2.5L water with lemon slices"
  };

  return {
    skinFactors,
    fallbackRecommendations,
    todayFormatted,
    skinHistory,
    recentLogs,
    insights,
    suggestedActions,
    exploreItems,
    mealPlanToday
  };
}
