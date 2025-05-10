
import React from "react";
import AppNavigation from "@/components/AppNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { Salad, Pill, Palette, CloudSun, MoonStar, Activity, Smile, Droplet, Utensils, Circle } from "lucide-react";
import { Link } from "react-router-dom";
import BackButton from "@/components/BackButton";
import TrendChart from "@/components/TrendChart";

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

  // For You Recommendations - All 12 from homepage
  const skinRecommendations = [
    { 
      type: "skincare" as const, 
      text: "Try vitamin C serum", 
      iconName: "droplet",
      linkTo: "/recommendations-detail/vitamin-c-serum"
    },
    { 
      type: "food" as const, 
      text: "Increase omega-3", 
      iconName: "utensils",
      linkTo: "/recommendations-detail/increase-omega-3"
    },
    { 
      type: "supplements" as const, 
      text: "Add zinc", 
      iconName: "pill",
      linkTo: "/recommendations-detail/add-zinc"
    },
    { 
      type: "makeup" as const, 
      text: "Switch foundation", 
      iconName: "circle",
      linkTo: "/recommendations-detail/switch-foundation"
    },
    { 
      type: "lifestyle" as const, 
      text: "Stress management", 
      iconName: "activity",
      linkTo: "/recommendations-detail/stress-management"
    },
    { 
      type: "skincare" as const, 
      text: "Gentle night exfoliant", 
      iconName: "droplet",
      linkTo: "/recommendations-detail/night-exfoliant"
    },
    { 
      type: "food" as const, 
      text: "Add antioxidant foods", 
      iconName: "utensils",
      linkTo: "/recommendations-detail/antioxidant-foods"
    },
    { 
      type: "supplements" as const, 
      text: "Try evening primrose", 
      iconName: "pill",
      linkTo: "/recommendations-detail/evening-primrose"
    },
    { 
      type: "lifestyle" as const, 
      text: "Morning hydration", 
      iconName: "activity",
      linkTo: "/recommendations-detail/morning-hydration"
    },
    { 
      type: "makeup" as const, 
      text: "Oil-free concealer", 
      iconName: "circle",
      linkTo: "/recommendations-detail/oil-free-concealer"
    },
    { 
      type: "skincare" as const, 
      text: "Add ceramide moisturizer", 
      iconName: "droplet",
      linkTo: "/recommendations-detail/ceramide-moisturizer"
    },
    { 
      type: "food" as const, 
      text: "Limit dairy consumption", 
      iconName: "utensils",
      linkTo: "/recommendations-detail/limit-dairy"
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
      case "droplet":
        return <Droplet className="text-2xl mr-3" />;
      case "utensils":
        return <Utensils className="text-2xl mr-3" />;
      case "circle":
        return <Circle className="text-2xl mr-3" />;
      default:
        return null;
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
            </CardContent>
          </Card>
          
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
          
          <div>
            <h2 className="text-xl font-semibold mb-3">For You Recommendations</h2>
            <div className="space-y-3">
              {skinRecommendations.map((recommendation, index) => (
                <Link key={index} to={recommendation.linkTo}>
                  <Card className="ios-card hover:shadow-md transition-all">
                    <CardContent className="p-4">
                      <div className="flex items-start">
                        {getIconComponent(recommendation.iconName)}
                        <div>
                          <h3 className="font-medium">{recommendation.type}: {recommendation.text}</h3>
                          <p className="text-sm text-muted-foreground">
                            Suggested for your skin profile
                          </p>
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
