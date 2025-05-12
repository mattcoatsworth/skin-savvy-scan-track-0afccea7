
import React from "react";
import ApiKeyInput from "@/components/ApiKeyInput";
import AppNavigation from "@/components/AppNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { Salad, Pill, Palette, CloudSun, MoonStar, Activity, Smile, Droplet, Utensils, Circle, Wine, Beer, Brush } from "lucide-react";
import { Link } from "react-router-dom";
import BackButton from "@/components/BackButton";
import TrendChart from "@/components/TrendChart";
import { useScrollToTop } from "@/hooks/useScrollToTop";

const Profile = () => {
  // Add scroll to top functionality
  useScrollToTop();
  
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

  // For You Recommendations 
  const skinRecommendations = [
    { 
      type: "food" as const, 
      text: "Try vitamin C serum", 
      iconName: "utensils",
      linkTo: "/recommendations-detail/vitamin-c-serum",
      details: "Helps brighten skin and reduce visible inflammation"
    },
    { 
      type: "food" as const, 
      text: "Increase omega-3", 
      iconName: "utensils",
      linkTo: "/recommendations-detail/increase-omega-3",
      details: "May reduce redness and support skin barrier function"
    },
    { 
      type: "food" as const, 
      text: "Add antioxidant foods", 
      iconName: "utensils",
      linkTo: "/recommendations-detail/antioxidant-foods",
      details: "Support skin healing and combat environmental damage"
    },
    { 
      type: "food" as const, 
      text: "Limit dairy consumption", 
      iconName: "utensils",
      linkTo: "/recommendations-detail/limit-dairy",
      details: "Strong correlation between dairy intake and your breakouts"
    },
    { 
      type: "drink" as const, 
      text: "Morning hydration", 
      iconName: "beer",
      linkTo: "/recommendations-detail/morning-hydration",
      details: "Starting day with water could improve skin's moisture levels"
    },
    { 
      type: "supplements" as const, 
      text: "Add zinc", 
      iconName: "pill",
      linkTo: "/recommendations-detail/add-zinc",
      details: "Could help regulate oil production based on your skin pattern"
    },
    { 
      type: "supplements" as const, 
      text: "Try evening primrose", 
      iconName: "pill",
      linkTo: "/recommendations-detail/evening-primrose",
      details: "May help with hormonal fluctuations affecting your skin"
    },
    { 
      type: "makeup" as const, 
      text: "Switch foundation", 
      iconName: "brush",
      linkTo: "/recommendations-detail/switch-foundation",
      details: "Current foundation may be contributing to clogged pores"
    },
    { 
      type: "makeup" as const, 
      text: "Oil-free concealer", 
      iconName: "brush",
      linkTo: "/recommendations-detail/oil-free-concealer",
      details: "Better option for your T-zone where oil is more prominent"
    },
    { 
      type: "lifestyle" as const, 
      text: "Stress management", 
      iconName: "activity",
      linkTo: "/recommendations-detail/stress-management",
      details: "Recent stress appears to be triggering breakouts on chin area"
    },
    { 
      type: "skincare" as const, 
      text: "Gentle night exfoliant", 
      iconName: "droplet",
      linkTo: "/recommendations-detail/night-exfoliant",
      details: "Could help with uneven texture seen in recent logs"
    },
    { 
      type: "skincare" as const, 
      text: "Add ceramide moisturizer", 
      iconName: "droplet",
      linkTo: "/recommendations-detail/ceramide-moisturizer",
      details: "Would strengthen your skin barrier which shows signs of damage"
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
      case "brush":
        return <Brush className="text-2xl mr-3" />;
      case "beer":
        return <Beer className="text-2xl mr-3" />;
      case "wine":
        return <Wine className="text-2xl mr-3" />;
      default:
        return null;
    }
  };

  // Group recommendations by category
  const groupedRecommendations = skinRecommendations.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {} as Record<string, typeof skinRecommendations>);

  // Get categories in the desired order
  const categoryOrder = ["food", "drink", "supplements", "makeup", "lifestyle", "skincare"];

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Profile</h1>
      </header>
      
      <main className="space-y-6">
        {/* Today's Skin Card - Added at the top */}
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
      
        {/* API Key Input */}
        <div className="mb-6">
          <ApiKeyInput />
        </div>
        
        {/* Weekly Trend */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Weekly Trend</h2>
          <Card className="ios-card">
            <CardContent className="p-4">
              <p className="text-muted-foreground mb-3">Your skin has been gradually improving this week</p>
              <TrendChart data={weeklyTrendData} height={80} />
            </CardContent>
          </Card>
        </div>
        
        {/* Contributing Factors */}
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
        
        {/* For You Recommendations with category headings */}
        <div>
          <h2 className="text-xl font-semibold mb-3">For You Recommendations</h2>
          
          <div className="space-y-5">
            {categoryOrder.map((category) => {
              const recs = groupedRecommendations[category];
              
              // Skip if no recommendations in this category
              if (!recs || recs.length === 0) return null;
              
              return (
                <div key={category} className="space-y-3">
                  <h3 className="text-lg font-medium capitalize mt-2">{category}</h3>
                  
                  {recs.map((recommendation, index) => (
                    <div key={index} className="mb-3">
                      <Link to={recommendation.linkTo}>
                        <Card className="ios-card hover:shadow-md transition-all">
                          <CardContent className="p-4">
                            <div className="flex items-start">
                              {getIconComponent(recommendation.iconName)}
                              <div>
                                <h3 className="font-medium">{recommendation.text}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {recommendation.details}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
