
import React from "react";
import AppNavigation from "@/components/AppNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { Salad, Pill, Palette, CloudSun, MoonStar, Activity, Smile } from "lucide-react";
import { Link } from "react-router-dom";
import BackButton from "@/components/BackButton";
import TrendChart from "@/components/TrendChart";
import { spacing } from "@/design/spacing";

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

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6 flex items-center">
          <BackButton />
          <h1 className="text-2xl font-bold">Full Skin Analysis</h1>
        </header>
        
        <div className="space-y-6">
          <Link to="/factor-analysis/skin">
            <Card className="ios-card hover:shadow-lg transition-shadow">
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
          </Link>
          
          <div>
            <h2 className="text-xl font-semibold mb-3">Contributing Factors</h2>
            <div className="space-y-4">
              {skinFactors.map((factor, index) => (
                <Link key={index} to={`/factor-analysis/${factor.type.toLowerCase()}`}>
                  <Card className="ios-card hover:shadow-lg transition-shadow">
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
                </Link>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-3">Weekly Trend</h2>
            <Link to="/weekly-skin-analysis">
              <Card className="ios-card hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <p className="text-muted-foreground mb-3">Your skin has been gradually improving this week</p>
                  <TrendChart data={weeklyTrendData} height={80} />
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkinAnalysis;
