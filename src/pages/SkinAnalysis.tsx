
import React from "react";
import AppNavigation from "@/components/AppNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { Salad, Pill, Palette, CloudSun, MoonStar, Activity, Smile, Frown, ArrowRight, Droplet, Utensils, Circle } from "lucide-react";
import { Link } from "react-router-dom";
import BackButton from "@/components/BackButton";
import TrendChart from "@/components/TrendChart";
import { Separator } from "@/components/ui/separator";

// Define the types for recommendations
type RecommendationType = "skincare" | "food" | "supplements" | "makeup" | "lifestyle";

type Recommendation = {
  type: RecommendationType;
  text: string;
  icon: React.ReactNode;
  linkTo: string;
};

const SkinAnalysis = () => {
  // Sample data
  const skinFactors = [
    { type: "Food" as const, status: "Hydrating", iconName: "salad", details: "Increased water-rich foods and avoided dairy this week" },
    { type: "Supplement" as const, status: "New", iconName: "pill", details: "Started collagen supplement 3 days ago" },
    { type: "Makeup" as const, status: "Same as usual", iconName: "palette", details: "Using the same foundation and concealer" },
    { type: "Weather" as const, status: "Dry + Cold", iconName: "cloud-sun", details: "Low humidity affecting skin hydration" },
    { type: "Sleep" as const, status: "Improved", iconName: "moon-star", details: "Getting 7+ hours consistently this week" },
    { type: "Stress" as const, status: "Moderate", iconName: "activity", details: "Work deadline approaching" },
  ];

  // Weekly trend data
  const weeklyTrendData = [
    { date: "Mon", value: 35 },
    { date: "Tue", value: 40 },
    { date: "Wed", value: 45 },
    { date: "Thu", value: 60 },
    { date: "Fri", value: 75 },
    { date: "Sat", value: 80 },
    { date: "Sun", value: 85 }
  ];
  
  // For You Recommendations - Same as the ones in the Homepage
  const forYouRecommendations = [
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
    }
  ];

  // Function to get icon component based on iconName
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "salad":
        return <Salad className="text-2xl mr-3" />;
      case "pill":
        return <Pill className="text-2xl mr-3" />;
      case "palette":
        return <Palette className="text-2xl mr-3" />;
      case "cloud-sun":
        return <CloudSun className="text-2xl mr-3" />;
      case "moon-star":
        return <MoonStar className="text-2xl mr-3" />;
      case "activity":
        return <Activity className="text-2xl mr-3" />;
      default:
        return null;
    }
  };

  // Helper function for recommendation tag colors
  const getRecommendationColor = (type: RecommendationType) => {
    switch (type) {
      case "skincare":
        return "bg-blue-100 text-blue-800";
      case "food":
        return "bg-green-100 text-green-800";
      case "supplements":
        return "bg-indigo-100 text-indigo-800";
      case "makeup":
        return "bg-purple-100 text-purple-800";
      case "lifestyle":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6 flex items-center">
          <BackButton />
          <h1 className="text-2xl font-bold">Full Skin Analysis</h1>
        </header>
        
        <div className="space-y-6">
          <Card className="ios-card">
            <CardContent className="p-4">
              <div className="flex items-center mb-4">
                <Smile className="text-4xl mr-3" />
                <div>
                  <h2 className="font-medium text-lg">Today's Skin</h2>
                  <p className="text-xl font-semibold">Balanced</p>
                </div>
              </div>
              
              <div className="mb-3">
                <p className="text-sm font-medium mb-2">Detailed Analysis:</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Your skin appears balanced today with good hydration levels. Inflammation is minimal and there's
                  an improvement in overall tone compared to yesterday.
                </p>
              </div>
              
              <Link to="/full-skin-analysis" className="text-sm text-skin-teal flex items-center">
                View Full Analysis <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </CardContent>
          </Card>
          
          {/* Weekly Trend Section - Positioned above Contributing Factors */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Weekly Trend</h2>
            <Card className="ios-card">
              <CardContent className="p-4">
                <p className="text-muted-foreground mb-3">Your skin has been gradually improving this week</p>
                <TrendChart data={weeklyTrendData} height={80} />
              </CardContent>
            </Card>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-3">Contributing Factors</h2>
            <div className="space-y-3">
              {skinFactors.map((factor, index) => (
                <Card key={index} className="ios-card">
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      {getIconComponent(factor.iconName)}
                      <div>
                        <h3 className="font-medium">{factor.type}: {factor.status}</h3>
                        <p className="text-sm text-muted-foreground">{factor.details}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* For You Recommendations Section - Below Contributing Factors */}
          <div>
            <h2 className="text-xl font-semibold mb-3">For You Recommendations</h2>
            <div className="space-y-3">
              {forYouRecommendations.map((recommendation, index) => (
                <Link to={recommendation.linkTo} key={index}>
                  <Card className="ios-card hover:shadow-md transition-all">
                    <CardContent className="p-4">
                      <div className="flex items-start">
                        {recommendation.icon}
                        <div className="ml-3">
                          <h3 className="font-medium">{recommendation.text}</h3>
                          <p className="text-sm text-muted-foreground">Recommended for your skin type</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <AppNavigation />
    </div>
  );
};

export default SkinAnalysis;
