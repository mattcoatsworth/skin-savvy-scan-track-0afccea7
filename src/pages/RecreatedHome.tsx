import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Salad, Pill, Palette, CloudSun, CalendarDays, Activity, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Define types
type FactorType = "Food" | "Supplement" | "Makeup" | "Weather" | "Lifestyle" | "Environment" | "Skincare" | "Health";
  
type Factor = {
  type: FactorType;
  status: string;
  icon: React.ReactNode;
};

type RecommendationType = "skincare" | "food" | "lifestyle" | "supplements";

type Recommendation = {
  type: RecommendationType;
  text: string;
  icon: React.ReactNode;
  linkTo: string;
};

type DayRating = {
  day: string;
  rating: number;
  date: string;
};

type RecentLogType = {
  title: string;
  status: "positive" | "negative" | "neutral";
  description: string;
  rating?: number;
  id?: string;
  linkTo?: string;
};

// Helper functions for rating styling
const getRatingLabel = (rating: number) => {
  if (rating >= 80) return "Great";
  if (rating >= 60) return "Good";
  if (rating >= 40) return "OK";
  if (rating >= 20) return "Fair";
  return "Poor";
};

const getRatingColor = (rating: number) => {
  if (rating >= 80) return "#4ADE80"; // Green for good ratings
  if (rating >= 60) return "#22C55E"; // Lower green
  if (rating >= 40) return "#FACC15"; // Yellow for medium ratings
  if (rating >= 20) return "#FB923C"; // Orange for fair
  return "#F87171"; // Red for poor ratings
};

const getRatingBgColor = (rating: number) => {
  if (rating >= 80) return "#ECFDF5"; // Light green bg
  if (rating >= 60) return "#F0FDF4"; // Lower light green bg
  if (rating >= 40) return "#FEFCE8"; // Light yellow bg
  if (rating >= 20) return "#FFF7ED"; // Light orange bg
  return "#FEF2F2"; // Light red bg
};

const getFactorColor = (type: FactorType) => {
  const theme = document.body.getAttribute('data-theme') || 'default';
  
  if (theme === 'summer') {
    switch (type) {
      case "Food":
        return "bg-emerald-50 text-emerald-800"; // Soft green
      case "Supplement":
        return "bg-sky-50 text-sky-800"; // Soft blue
      case "Makeup":
        return "bg-violet-50 text-violet-800"; // Soft purple
      case "Weather":
        return "bg-amber-50 text-amber-800"; // Soft amber
      default:
        return "bg-gray-100 text-gray-800";
    }
  } else if (theme === 'spring') {
    switch (type) {
      case "Food":
        return "bg-green-100 text-green-800";
      case "Supplement":
        return "bg-blue-100 text-blue-800";
      case "Makeup":
        return "bg-purple-100 text-purple-800";
      case "Weather":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  } else {
    // Default theme
    switch (type) {
      case "Food":
        return "bg-green-100 text-green-800";
      case "Supplement":
        return "bg-blue-100 text-blue-800";
      case "Makeup":
        return "bg-purple-100 text-purple-800";
      case "Weather":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }
};

const getRecommendationColor = (type: RecommendationType) => {
  const theme = document.body.getAttribute('data-theme') || 'default';
  
  if (theme === 'summer') {
    switch (type) {
      case "skincare":
        return "bg-sky-100 text-sky-800";
      case "food":
        return "bg-emerald-100 text-emerald-800";
      case "supplements":
        return "bg-slate-100 text-slate-800";
      case "lifestyle":
        return "bg-stone-100 text-stone-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  } else if (theme === 'spring') {
    switch (type) {
      case "skincare":
        return "bg-blue-100 text-blue-800";
      case "food":
        return "bg-green-100 text-green-800";
      case "supplements":
        return "bg-indigo-100 text-indigo-800";
      case "lifestyle":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  } else {
    // Default theme
    switch (type) {
      case "skincare":
        return "bg-blue-100 text-blue-800";
      case "food":
        return "bg-green-100 text-green-800";
      case "supplements":
        return "bg-indigo-100 text-indigo-800";
      case "lifestyle":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }
};

const RecreatedHome = () => {
  // Sample data generation for the home page
  const skinFactors = [
    { type: "Food" as FactorType, status: "Hydrating", icon: <Salad className="h-4 w-4" /> },
    { type: "Supplement" as FactorType, status: "New", icon: <Pill className="h-4 w-4" /> },
    { type: "Makeup" as FactorType, status: "Same as usual", icon: <Palette className="h-4 w-4" /> },
    { type: "Weather" as FactorType, status: "Dry + Cold", icon: <CloudSun className="h-4 w-4" /> },
  ];
  
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

  // Sample data for the RecentLogsCarousel
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

  const suggestedActions = [
    { 
      text: "Try logging your water intake today",
      linkTo: "/day-log/today", 
      id: "water-intake",
      type: "action" 
    },
    { 
      text: "Consider pausing this supplement to see if irritation decreases",
      supplementId: "collagen", 
      id: "supplement-irritation", 
      type: "factor" 
    },
    { 
      text: "Use SPF more consistently this week",
      id: "spf-consistency",
      type: "action" 
    },
    { 
      text: "Try a weekly exfoliation routine",
      id: "exfoliation",
      type: "factor", 
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

  // Function to navigate to weekly skin analysis
  const navigateToWeeklyAnalysis = (event: React.MouseEvent) => {
    // In a real implementation, this would handle navigation while preventing default
    event.preventDefault();
    window.scrollTo(0, 0);
    // Example: history.push('/skin?tab=weekly');
  };

  return (
    <div>
      {/* Simplified header with smaller Skin Savvy text */}
      <header className="mb-4">
        <h1 className="text-xl font-bold">Skin Savvy</h1>
      </header>
      
      <main>
        {/* Weekly Skin Report (SkinHistory component) */}
        <div className="mb-6 block ios-section">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold">Weekly Skin Report</h2>
            <Link 
              to="/skin?tab=weekly" 
              className="text-skin-black text-sm font-medium flex items-center"
              onClick={navigateToWeeklyAnalysis}
            >
              View Report <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <Card className="ios-card hover:shadow-md transition-all cursor-pointer" onClick={navigateToWeeklyAnalysis}>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                {skinHistory.map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <span className="text-xs font-medium">{item.day}</span>
                    <span className="text-[10px] text-muted-foreground">{item.date}</span>
                    
                    <div className="mt-2 mb-1 relative">
                      {/* Rating circle with updated design */}
                      <div 
                        className="relative w-10 h-10 flex items-center justify-center rounded-full"
                        style={{ backgroundColor: getRatingBgColor(item.rating) }}
                      >
                        {/* Rating number */}
                        <div 
                          className="text-sm font-semibold"
                          style={{ color: getRatingColor(item.rating) }}
                        >
                          {item.rating}
                        </div>
                      </div>
                      
                      {/* Rating label below the circle */}
                      <div className="text-center mt-1">
                        <span 
                          className="text-[10px] font-medium"
                          style={{ color: getRatingColor(item.rating) }}
                        >
                          {getRatingLabel(item.rating)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* ScanButton */}
        <div className="mb-6">
          <div className="bg-gradient-to-r from-skin-flame to-skin-amber p-4 rounded-xl text-white">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-lg">Scan Now</h3>
                <p className="text-sm opacity-90">Analyze your skin or a product</p>
              </div>
              <Button className="bg-white text-skin-flame hover:bg-white/90 h-10 px-4">
                Scan
              </Button>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          {/* Daily Skin Snapshot */}
          <Link to="/skin">
            <Card className="ios-card hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-3">
                    <CloudSun className="h-8 w-8" />
                  </div>
                  <div>
                    <h2 className="font-medium text-lg">Today's Skin</h2>
                    <p className="text-xl font-semibold">Balanced</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-2">Contributing Factors:</p>
                  <div className="flex flex-wrap gap-2">
                    {skinFactors.map((factor, index) => (
                      <span 
                        key={index} 
                        className={`${getFactorColor(factor.type)} flex items-center px-3 py-1.5 rounded-full text-sm`}
                      >
                        <span className="mr-1.5">{factor.icon}</span> {factor.status}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mb-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">For You Recommendations:</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {fallbackRecommendations.map((recommendation, index) => (
                      <Link 
                        key={index} 
                        to={recommendation.linkTo}
                        className={`${getRecommendationColor(recommendation.type)} flex items-center px-3 py-1.5 rounded-full text-sm cursor-pointer hover:opacity-80 transition-opacity`}
                        onClick={(e) => {
                          // Prevent parent link navigation when clicking on a recommendation
                          e.stopPropagation();
                        }}
                      >
                        <span className="mr-1.5">{recommendation.icon}</span> {recommendation.text}
                      </Link>
                    ))}
                  </div>
                </div>
                
                <div className="text-center mt-4 flex items-center justify-center">
                  <span className="text-skin-black font-medium">
                    View Full Analysis <ArrowRight className="h-4 w-4 ml-1 inline-block" />
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
          
          {/* Meal Plan Card - with left border highlight */}
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
          
          {/* Skin Energy Card - with left border highlight */}
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
          
          {/* Recent Scans (RecentLogsCarousel component) */}
          <div className="ios-section">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold">Recent Scans</h2>
              <Link to="/recent-logs" className="text-sm text-skin-black font-medium">
                View Full Analysis
              </Link>
            </div>
            
            <div className="relative">
              <div className="flex space-x-4 px-1 overflow-x-auto pb-4 scrollbar-none">
                {recentLogs.map((log, index) => (
                  <Link 
                    key={index} 
                    to={log.id ? `/recent-logs/${log.id}` : "/recent-logs"} 
                    className="min-w-[260px] flex-shrink-0"
                  >
                    <Card className="ios-card animate-fade-in hover:shadow-md transition-all">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium mb-1">{log.title}</h3>
                            <div className="text-sm text-muted-foreground">
                              <div className="flex items-start">
                                <div>
                                  {log.description}
                                  <br />
                                  <span className="text-xs">{log.description.includes("days") ? "" : "3 days"}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {log.rating !== undefined && (
                            <div className="flex flex-col items-center">
                              {/* Rating circle with updated design */}
                              <div 
                                className="w-12 h-12 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: getRatingBgColor(log.rating) }}
                              >
                                <div 
                                  className="text-base font-semibold" 
                                  style={{ color: getRatingColor(log.rating) }}
                                >
                                  {log.rating}
                                </div>
                              </div>
                              
                              {/* Rating label */}
                              <span 
                                className="text-xs mt-1" 
                                style={{ color: getRatingColor(log.rating) }}
                              >
                                {getRatingLabel(log.rating)}
                              </span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          {/* Rest of the components would follow here... */}
          {/* (Insights & Trends, Suggested Actions, Explore Section) */}
        </div>
      </main>
    </div>
  );
};

export default RecreatedHome;
