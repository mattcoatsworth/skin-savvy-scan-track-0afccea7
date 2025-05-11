
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Apple, 
  Pill, 
  Moon, 
  Activity, 
  Droplet, 
  Thermometer,
  Eye
} from "lucide-react";
import BackButton from "@/components/BackButton";
import useScrollToTop from "@/hooks/useScrollToTop";
import { useSkinAdvice } from "@/hooks/useSkinAdvice";

const CategoryAnalysis = () => {
  useScrollToTop();
  
  // AI analysis state
  const [aiLoading, setAiLoading] = useState(false);
  const [aiAdvice, setAiAdvice] = useState("");
  const { getAdvice, isLoading } = useSkinAdvice({ adviceType: "recommendation" });
  
  // Define our categories with their icons and scores
  const categories = [
    { name: "food", icon: <Apple className="h-6 w-6" />, score: 68 },
    { name: "products", icon: <Pill className="h-6 w-6" />, score: 82 },
    { name: "sleep", icon: <Moon className="h-6 w-6" />, score: 65 },
    { name: "stress", icon: <Activity className="h-6 w-6" />, score: 55 },
    { name: "hydration", icon: <Droplet className="h-6 w-6" />, score: 70 },
    { name: "environment", icon: <Thermometer className="h-6 w-6" />, score: 78 },
    { name: "skin", icon: <Eye className="h-6 w-6" />, score: 75 }
  ];
  
  // For You personalized insights
  const personalizedInsights = [
    {
      category: "food",
      insight: "Your skin responds well to increased hydration and reduced dairy",
      score: 85,
      linkTo: "/category-analysis/food"
    },
    {
      category: "sleep",
      insight: "Consistent sleep schedule correlates with fewer breakouts",
      score: 78,
      linkTo: "/category-analysis/sleep"
    },
    {
      category: "stress",
      insight: "Meditation practices have improved your skin inflammation",
      score: 72,
      linkTo: "/category-analysis/stress"
    }
  ];

  // Function to generate AI advice
  const generateAiAdvice = async () => {
    setAiLoading(true);
    try {
      const advice = await getAdvice(
        "Provide a summary analysis of how different lifestyle categories affect my skin health", 
        { categories }
      );
      setAiAdvice(advice);
    } catch (error) {
      console.error("Error getting AI skin advice:", error);
    } finally {
      setAiLoading(false);
    }
  };
  
  // Generate AI advice on first render
  React.useEffect(() => {
    generateAiAdvice();
  }, []);

  // Determine progress color based on rating
  const getProgressColor = (rating: number) => {
    if (rating >= 70) return "#4ADE80"; // Green for good ratings
    if (rating >= 40) return "#FACC15"; // Yellow for medium ratings
    return "#F87171"; // Red for poor ratings
  };
  
  // Get the lighter background color for the circle
  const getBackgroundColor = (rating: number) => {
    if (rating >= 70) return "#E6F8EA"; // Light green
    if (rating >= 40) return "#FEF7CD"; // Light yellow
    return "#FFDEE2"; // Light red
  };
  
  // Determine label based on rating
  const getRatingLabel = (rating: number) => {
    if (rating >= 80) return "Great";
    if (rating >= 60) return "Good";
    if (rating >= 40) return "OK";
    if (rating >= 20) return "Fair";
    return "Poor";
  };
  
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6 flex items-center">
          <BackButton />
          <div>
            <h1 className="text-2xl font-bold">Category Analysis</h1>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Last 7 days</span>
            </div>
          </div>
        </header>
        
        <Tabs defaultValue="current" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="current">Current</TabsTrigger>
            <TabsTrigger value="for-you">For You</TabsTrigger>
            <TabsTrigger value="ai">AI Analysis</TabsTrigger>
          </TabsList>

          {/* Current Tab - All Categories */}
          <TabsContent value="current" className="space-y-6">
            <h2 className="text-lg font-semibold mb-3">Categories Overview</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Tap on any category to view detailed analysis of how it affects your skin.
            </p>
            
            <div className="grid grid-cols-1 gap-4">
              {categories.map((category) => (
                <Link key={category.name} to={`/category-analysis/${category.name}`} className="block">
                  <Card className="ios-card hover:shadow-md transition-all">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {category.icon}
                          <div>
                            <h3 className="text-lg font-medium capitalize">{category.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {getRatingLabel(category.score)} impact on skin
                            </p>
                          </div>
                        </div>
                        
                        <div className="relative w-12 h-12 flex items-center justify-center">
                          <svg className="w-12 h-12 absolute" viewBox="0 0 36 36">
                            <path
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke={getBackgroundColor(category.score)}
                              strokeWidth="4"
                              strokeLinecap="round"
                            />
                          </svg>
                          <svg className="w-12 h-12 absolute" viewBox="0 0 36 36">
                            <path
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke={getProgressColor(category.score)}
                              strokeWidth="4"
                              strokeDasharray={`${category.score}, 100`}
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="text-sm font-semibold">{category.score}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>
          
          {/* For You Tab - Personalized Insights */}
          <TabsContent value="for-you" className="space-y-6">
            <h2 className="text-lg font-semibold mb-3">Personalized Insights</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Based on your data, these categories have the most significant impact on your skin:
            </p>
            
            <div className="space-y-4">
              {personalizedInsights.map((item, index) => (
                <Link key={index} to={item.linkTo}>
                  <Card className="ios-card hover:shadow-md transition-all">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-lg capitalize">{item.category}</h3>
                        <div className="bg-skin-teal text-white text-xs rounded-full px-2 py-0.5">
                          Top Impact
                        </div>
                      </div>
                      <p className="text-sm mb-3">{item.insight}</p>
                      <div className="flex items-center">
                        <div className="w-full bg-slate-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-skin-teal h-2 rounded-full" 
                            style={{ width: `${item.score}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium">{item.score}%</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            
            <Card className="ios-card mt-4">
              <CardContent className="p-4">
                <h3 className="font-medium text-lg mb-2">This Week's Focus</h3>
                <p className="text-sm">
                  Focus on maintaining your sleep schedule and hydration levels for continued improvement.
                  Consider exploring the stress category for additional benefits.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* AI Analysis Tab */}
          <TabsContent value="ai" className="space-y-6">
            <Card className="ios-card">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">AI Category Analysis</h2>
                
                {aiLoading || isLoading ? (
                  <div className="flex flex-col items-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-skin-teal mb-4"></div>
                    <p className="text-muted-foreground">Generating your personalized category analysis...</p>
                  </div>
                ) : (
                  <div className="prose prose-sm max-w-none">
                    {aiAdvice ? (
                      <div dangerouslySetInnerHTML={{ __html: aiAdvice.replace(/\n/g, '<br/>') }} />
                    ) : (
                      <p>Unable to generate AI analysis at this time. Please try again later.</p>
                    )}
                    
                    <button 
                      onClick={generateAiAdvice} 
                      className="mt-6 px-4 py-2 bg-skin-teal text-white rounded-md hover:bg-skin-teal-dark transition-colors"
                    >
                      Regenerate Analysis
                    </button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card className="ios-card">
              <CardContent className="p-6">
                <h3 className="font-medium mb-2">Key Takeaways</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Food and sleep have the strongest correlations with your skin health</li>
                  <li>Environmental factors show less impact than expected</li>
                  <li>Consistent skincare products show positive trends</li>
                  <li>Consider tracking hydration more closely for better insights</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CategoryAnalysis;
