
import React, { useState } from "react";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BackButton from "@/components/BackButton";
import AppNavigation from "@/components/AppNavigation";
import { Link } from "react-router-dom";
import TrendChart from "@/components/TrendChart";
import { 
  Salad, 
  Pill, 
  Palette, 
  CloudSun, 
  MoonStar, 
  Activity, 
  Smile, 
  Droplet,
  Utensils,
  Circle,
  Wine,
  Beer,
  Brush,
  Info
} from "lucide-react";
import FactorsList from "./FactorsList";
import { SkinFactor, RecommendationItem } from "./types";
import { groupRecommendationsByCategory, getCategoryOrder } from "./utils";

// Sample data for skin factors
const skinFactors: SkinFactor[] = [
  { type: "Food", status: "Hydrating", iconName: "salad", details: "Increased water-rich foods and avoided dairy this week" },
  { type: "Supplement", status: "New", iconName: "pill", details: "Started collagen supplement 3 days ago" },
  { type: "Makeup", status: "Same as usual", iconName: "palette", details: "Using the same foundation and concealer" },
  { type: "Weather", status: "Dry + Cold", iconName: "cloud-sun", details: "Low humidity affecting skin hydration" },
  { type: "Sleep", status: "Improved", iconName: "moon-star", details: "Getting 7+ hours consistently this week" },
  { type: "Stress", status: "Moderate", iconName: "activity", details: "Work deadline approaching" },
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
const skinRecommendations: RecommendationItem[] = [
  { 
    type: "food", 
    text: "Try vitamin C serum", 
    iconName: "utensils",
    linkTo: "/recommendations-detail/vitamin-c-serum",
    details: "Helps brighten skin and reduce visible inflammation"
  },
  { 
    type: "food", 
    text: "Increase omega-3", 
    iconName: "utensils",
    linkTo: "/recommendations-detail/increase-omega-3",
    details: "May reduce redness and support skin barrier function"
  },
  { 
    type: "food", 
    text: "Add antioxidant foods", 
    iconName: "utensils",
    linkTo: "/recommendations-detail/antioxidant-foods",
    details: "Support skin healing and combat environmental damage"
  },
  { 
    type: "food", 
    text: "Limit dairy consumption", 
    iconName: "utensils",
    linkTo: "/recommendations-detail/limit-dairy",
    details: "Strong correlation between dairy intake and your breakouts"
  },
  { 
    type: "drink", 
    text: "Morning hydration", 
    iconName: "beer",
    linkTo: "/recommendations-detail/morning-hydration",
    details: "Starting day with water could improve skin's moisture levels"
  },
  { 
    type: "supplements", 
    text: "Add zinc", 
    iconName: "pill",
    linkTo: "/recommendations-detail/add-zinc",
    details: "Could help regulate oil production based on your skin pattern"
  },
  { 
    type: "supplements", 
    text: "Try evening primrose", 
    iconName: "pill",
    linkTo: "/recommendations-detail/evening-primrose",
    details: "May help with hormonal fluctuations affecting your skin"
  },
  { 
    type: "makeup", 
    text: "Switch foundation", 
    iconName: "brush",
    linkTo: "/recommendations-detail/switch-foundation",
    details: "Current foundation may be contributing to clogged pores"
  },
  { 
    type: "makeup", 
    text: "Oil-free concealer", 
    iconName: "brush",
    linkTo: "/recommendations-detail/oil-free-concealer",
    details: "Better option for your T-zone where oil is more prominent"
  },
  { 
    type: "lifestyle", 
    text: "Stress management", 
    iconName: "activity",
    linkTo: "/recommendations-detail/stress-management",
    details: "Recent stress appears to be triggering breakouts on chin area"
  },
  { 
    type: "skincare", 
    text: "Gentle night exfoliant", 
    iconName: "droplet",
    linkTo: "/recommendations-detail/night-exfoliant",
    details: "Could help with uneven texture seen in recent logs"
  },
  { 
    type: "skincare", 
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
    case "info":
      return <Info className="text-2xl mr-3" />;
    default:
      return <Circle className="text-2xl mr-3" />;
  }
};

// Sample AI analysis data
const aiAnalysis = {
  patternAnalysis: "Your skin health improved steadily throughout the week, showing a positive response to your consistent hydration routine. The most notable improvement was in overall texture and brightness, particularly after introducing the new hydrating serum. Your skin appears most reactive to sleep quality and hydration levels, with a clear correlation between increased water intake and skin clarity.",
  
  detectedPatterns: [
    { 
      category: "Hydration & Diet", 
      title: "Water Intake Correlation", 
      description: "Days with 8+ glasses of water showed 12% higher skin scores",
      correlation: 85 
    },
    { 
      category: "Sleep & Stress", 
      title: "Sleep Quality Impact", 
      description: "Nights with 7+ hours of sleep led to reduced inflammation",
      correlation: 78 
    },
    { 
      category: "Product Usage", 
      title: "Hydrating Serum Effect", 
      description: "Consistent usage led to improved elasticity within 4 days",
      correlation: 72 
    }
  ],
  
  focusAreas: [
    { 
      title: "Continue Hydration Routine", 
      description: "Maintain 8+ glasses of water daily and consistent use of humidifier at night",
      priority: "primary", 
      type: "habit" 
    },
    { 
      title: "Monitor Sugar Intake", 
      description: "Sugar consumption on Friday and Saturday correlated with Sunday's slight dullness",
      priority: "secondary", 
      type: "diet" 
    },
    { 
      title: "Address Stress Levels", 
      description: "Implement brief mindfulness sessions on workdays to reduce cortisol impact",
      priority: "tertiary", 
      type: "lifestyle" 
    }
  ],
  
  metrics: {
    overall: "+7%",
    hydration: "+13%",
    inflammation: "-6%",
    breakouts: "-4%"
  },
  
  challenges: [
    { 
      title: "Morning Hydration Boost", 
      description: "Start each day with 16oz of water before coffee for one week",
      difficulty: "easy",
      category: "food" 
    },
    { 
      title: "Niacinamide Integration", 
      description: "Add a niacinamide serum to your evening routine to help with oil control",
      difficulty: "medium",
      category: "product" 
    },
    { 
      title: "Stress-Reduction Protocol", 
      description: "Complete three 5-minute breathing exercises daily during work hours",
      difficulty: "medium",
      category: "stress" 
    },
    { 
      title: "Sleep Schedule Consistency", 
      description: "Aim for the same bedtime (within 30 minutes) every night this week",
      difficulty: "hard",
      category: "sleep" 
    }
  ]
};

const SkinAnalysis: React.FC = () => {
  useScrollToTop();
  const [showAllRecommendations, setShowAllRecommendations] = useState(false);
  
  // Group recommendations by category
  const groupedRecommendations = groupRecommendationsByCategory(skinRecommendations);
  
  // Get categories in the desired order
  const categoryOrder = getCategoryOrder();
  
  // Helper function to get the badge styling based on difficulty
  const getDifficultyBadgeClass = (difficulty: string) => {
    switch(difficulty) {
      case 'easy':
        return 'inline bg-green-100 text-green-800 px-2 py-0.5 text-xs';
      case 'medium':
        return 'inline bg-yellow-100 text-yellow-800 px-2 py-0.5 text-xs';
      case 'hard':
        return 'inline bg-red-100 text-red-800 px-2 py-0.5 text-xs';
      default:
        return 'inline bg-slate-100 text-slate-800 px-2 py-0.5 text-xs';
    }
  };

  // Helper function to get the category badge styling
  const getCategoryBadgeClass = () => {
    return 'inline bg-slate-200 text-slate-700 px-2 py-0.5 text-xs';
  };
  
  // Display count for recommendations - show first 8 by default
  const displayCount = 8;

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6 flex items-center">
          <BackButton />
          <h1 className="text-2xl font-bold">Full Skin Analysis</h1>
        </header>
        
        <Tabs defaultValue="current" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="current">Current</TabsTrigger>
            <TabsTrigger value="for-you">For You</TabsTrigger>
            <TabsTrigger value="ai">AI Analysis</TabsTrigger>
          </TabsList>
          
          {/* Current Tab - Original content */}
          <TabsContent value="current" className="space-y-6">
            {/* Today's Skin Card */}
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
              <FactorsList factors={skinFactors} />
            </div>
          </TabsContent>
          
          {/* For You Tab - Personalized Recommendations */}
          <TabsContent value="for-you" className="space-y-6">
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
                                  {recommendation.details && (
                                    <p className="text-sm text-muted-foreground">
                                      {recommendation.details}
                                    </p>
                                  )}
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
          </TabsContent>
          
          {/* AI Tab - AI-Generated Analysis */}
          <TabsContent value="ai" className="space-y-6">
            {/* Pattern Analysis */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Weekly Pattern Analysis</h2>
              <Card className="ios-card">
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">{aiAnalysis.patternAnalysis}</p>
                </CardContent>
              </Card>
            </div>
            
            {/* Detected Patterns */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Detected Patterns</h2>
              <div className="space-y-3">
                {aiAnalysis.detectedPatterns.map((pattern, index) => (
                  <Card key={index} className="ios-card">
                    <CardContent className="p-4">
                      <div className="bg-slate-50 p-3 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-slate-500">{pattern.category}</span>
                          <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-0.5 rounded">
                            {pattern.correlation}% correlation
                          </span>
                        </div>
                        <h4 className="font-medium my-1">{pattern.title}</h4>
                        <p className="text-sm text-muted-foreground">{pattern.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Focus Areas */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Focus Areas</h2>
              <Card className="ios-card">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {aiAnalysis.focusAreas.map((area, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className={`mt-1 w-2 h-2 rounded-full ${
                          area.priority === 'primary' ? 'bg-green-500' : 
                          area.priority === 'secondary' ? 'bg-blue-500' : 'bg-purple-500'
                        }`}></div>
                        <div>
                          <h4 className="font-medium">{area.title}</h4>
                          <p className="text-sm text-muted-foreground">{area.description}</p>
                          <span className="text-xs bg-slate-100 px-2 py-0.5 rounded mt-1 inline-block">
                            {area.type}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Weekly Metrics */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Weekly Metrics</h2>
              <Card className="ios-card">
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(aiAnalysis.metrics).map(([key, value]) => (
                      <div key={key} className="bg-slate-50 p-3 rounded-lg">
                        <p className="text-xs text-slate-500 capitalize">{key}</p>
                        <p className={`text-lg font-medium ${value.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Weekly Challenges */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Weekly Challenges</h2>
              <div className="space-y-3">
                {aiAnalysis.challenges.map((challenge, index) => (
                  <Card key={index} className="ios-card">
                    <CardContent className="p-4">
                      <div className="bg-slate-50 p-3 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium">{challenge.title}</h4>
                            <span className={getCategoryBadgeClass()}>
                              {challenge.category}
                            </span>
                          </div>
                          <span className={getDifficultyBadgeClass(challenge.difficulty)}>
                            {challenge.difficulty}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{challenge.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* About This Analysis card */}
            <Card className="ios-card">
              <CardContent className="p-6">
                <h3 className="font-medium mb-3">About This Analysis</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>This analysis is based on your recent skin logs and trends</li>
                  <li>The AI considers various factors like diet, products, environment, and lifestyle</li>
                  <li>Recommendations are personalized based on your specific skin patterns</li>
                  <li>Update your logs regularly for increasingly accurate insights</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <AppNavigation />
    </div>
  );
};

export default SkinAnalysis;
