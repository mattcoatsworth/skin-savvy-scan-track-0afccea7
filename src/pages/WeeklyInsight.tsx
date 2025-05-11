
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import BackButton from "@/components/BackButton";
import { Calendar, Brain, AlertCircle, Lightbulb, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import useScrollToTop from "@/hooks/useScrollToTop";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSkinAdvice } from "@/hooks/useSkinAdvice";
import TrendChart from "@/components/TrendChart";

const WeeklyInsight = () => {
  useScrollToTop();
  
  // Mock data for demonstrations
  const weeklyTrendData = [
    { date: "Mon", value: 65 },
    { date: "Tue", value: 70 },
    { date: "Wed", value: 62 },
    { date: "Thu", value: 58 },
    { date: "Fri", value: 72 },
    { date: "Sat", value: 78 },
    { date: "Sun", value: 82 }
  ];
  
  // AI analysis state
  const [aiLoading, setAiLoading] = React.useState(false);
  const [aiAdvice, setAiAdvice] = React.useState("");
  const { getAdvice, isLoading } = useSkinAdvice({ adviceType: "general" });
  
  // Generate AI advice on first render
  React.useEffect(() => {
    generateAiAdvice();
  }, []);
  
  // Function to generate AI advice
  const generateAiAdvice = async () => {
    setAiLoading(true);
    try {
      const advice = await getAdvice(
        "Analyze my skin trends this week and provide insights on patterns and potential connections", 
        { weeklyTrendData }
      );
      setAiAdvice(advice);
    } catch (error) {
      console.error("Error getting AI skin advice:", error);
    } finally {
      setAiLoading(false);
    }
  };
  
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6 flex items-center">
          <BackButton />
          <div>
            <h1 className="text-2xl font-bold">Weekly Insight</h1>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />
              <span>May 4 - May 11, 2025</span>
            </div>
          </div>
        </header>
        
        <Tabs defaultValue="current" className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="current">Current</TabsTrigger>
            <TabsTrigger value="for-you">For You</TabsTrigger>
            <TabsTrigger value="ai">AI Analysis</TabsTrigger>
          </TabsList>
          
          {/* Current Tab */}
          <TabsContent value="current" className="space-y-6">
            <Card className="ios-card mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Weekly Overview</h2>
                
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-3">Your skin trend this week:</p>
                  <TrendChart 
                    data={weeklyTrendData} 
                    height={120}
                    showLabels={true}
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-3 flex-shrink-0 mt-0.5">
                      <Brain className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-medium">Key Observation</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Your skin condition has steadily improved throughout the week, with a significant 
                        positive shift over the weekend. This pattern correlates with reduced stress levels 
                        and consistent hydration.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-500 mr-3 flex-shrink-0 mt-0.5">
                      <AlertCircle className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-medium">Concern Area</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Mid-week decline (Wednesday-Thursday) correlates with reported high stress days 
                        and two instances of dairy consumption. Consider monitoring these factors closely next week.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Detected Patterns */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Detected Patterns</h2>
              <Card className="ios-card">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="pb-3 border-b border-gray-100">
                      <h3 className="font-medium">Food & Hydration</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Dairy consumption shows 92% correlation with breakouts within 48 hours. 
                        Days with 8+ cups of water consistently rank 20% higher in overall skin scores.
                      </p>
                    </div>
                    
                    <div className="pb-3 border-b border-gray-100">
                      <h3 className="font-medium">Stress & Sleep</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        High stress days (Wed-Thu) resulted in increased oil production and redness.
                        Weekend improvement correlates with 7+ hours of sleep and lower reported stress levels.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium">Products</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Consistent application of your hydrating serum correlates with improved barrier function.
                        Current cleanser shows multiple indicators of causing mild irritation.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Focus Areas */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Week Ahead Focus</h2>
              <Card className="ios-card">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3 flex-shrink-0 mt-0.5">
                        <Lightbulb className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="font-medium">Primary Focus: Hydration</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Continue excellent water intake habits, which show the strongest positive correlation with skin health.
                          Consider adding a humidifier at night to support overnight hydration.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3 flex-shrink-0 mt-0.5">
                        <Lightbulb className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="font-medium">Secondary Focus: Stress Management</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          The mid-week dip suggests implementing targeted stress-reduction techniques, 
                          particularly on workdays. Even 5 minutes of meditation may help maintain your weekend gains.
                        </p>
                        <Link to="/recommendations-detail/meditation" className="text-skin-teal text-xs flex items-center mt-1">
                          View meditation techniques <ArrowRight className="h-3 w-3 ml-1" />
                        </Link>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3 flex-shrink-0 mt-0.5">
                        <Lightbulb className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="font-medium">Product Adjustment: Cleanser</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Consider switching to a gentler cleanser to support your skin barrier, 
                          especially on days when you experience sensitivity.
                        </p>
                        <Link to="/recommendations-detail/gentle-cleanser" className="text-skin-teal text-xs flex items-center mt-1">
                          View cleanser recommendations <ArrowRight className="h-3 w-3 ml-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* For You Tab */}
          <TabsContent value="for-you" className="space-y-6">
            <Card className="ios-card mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Personalized Weekly Insights</h2>
                
                <div className="space-y-4">
                  <div className="pb-3 border-b border-gray-100">
                    <h3 className="font-medium text-lg">Pattern Recognition</h3>
                    <p className="text-sm text-gray-600 mt-2">
                      Your skin shows the strongest positive response to:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 mt-2 text-sm">
                      <li>Consistent 8+ cups of water daily</li>
                      <li>7+ hours of sleep</li>
                      <li>Evening hydrating serum application</li>
                    </ul>
                  </div>
                  
                  <div className="pb-3 border-b border-gray-100">
                    <h3 className="font-medium text-lg">Habit Formation</h3>
                    <p className="text-sm text-gray-600 mt-2">
                      You've successfully established the following beneficial routines:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 mt-2 text-sm">
                      <li>Morning sunscreen application (100% adherence)</li>
                      <li>Weekend hydration goals (met consistently)</li>
                      <li>Reduced dairy intake by 60% compared to previous month</li>
                    </ul>
                    
                    <div className="mt-3 p-3 bg-amber-50 rounded-md">
                      <p className="text-sm text-amber-800">
                        <strong>Area for growth:</strong> Mid-week stress management and hydration consistency 
                        could further improve your results.
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-lg">Your Unique Response</h3>
                    <p className="text-sm text-gray-600 mt-2">
                      Based on your data, your skin is particularly responsive to:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 mt-2 text-sm">
                      <li><strong>Sensitivity triggers:</strong> Dairy (92% correlation) and foaming cleansers</li>
                      <li><strong>Positive influences:</strong> Hydration, sleep quality, and niacinamide products</li>
                      <li><strong>Neutral factors:</strong> Coffee consumption shows no significant correlation</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Weekly Challenges */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Weekly Challenges</h2>
              
              <Link to="/challenge/hydration" className="block transition-transform hover:scale-[1.01] active:scale-[0.99]">
                <Card className="ios-card hover:shadow-md transition-all border border-transparent hover:border-slate-200 mb-4">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-medium text-lg">Hydration Challenge</h3>
                      <div className="bg-skin-teal text-white text-xs rounded-full px-2 py-0.5">
                        this week
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Maintain 8+ cups of water daily, with reminders set for mid-day when you typically drop off
                    </p>
                  </CardContent>
                </Card>
              </Link>
              
              <Link to="/challenge/meditation" className="block transition-transform hover:scale-[1.01] active:scale-[0.99]">
                <Card className="ios-card hover:shadow-md transition-all border border-transparent hover:border-slate-200">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-medium text-lg">Mid-Week Meditation</h3>
                      <div className="bg-skin-teal text-white text-xs rounded-full px-2 py-0.5">
                        try this
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      5-minute guided meditation on Wednesday and Thursday evenings to break the mid-week stress pattern
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
            
            {/* Success Metrics */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Success Metrics</h2>
              <Card className="ios-card">
                <CardContent className="p-6">
                  <p className="text-sm mb-4">
                    Here's how your skin metrics have changed from last week:
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Overall score</span>
                      <div className="flex items-center">
                        <span className="text-green-500 text-sm font-medium">+13%</span>
                        <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center ml-2">
                          <ArrowRight className="h-3 w-3 text-green-500 rotate-45" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Hydration level</span>
                      <div className="flex items-center">
                        <span className="text-green-500 text-sm font-medium">+22%</span>
                        <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center ml-2">
                          <ArrowRight className="h-3 w-3 text-green-500 rotate-45" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Inflammation</span>
                      <div className="flex items-center">
                        <span className="text-green-500 text-sm font-medium">-18%</span>
                        <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center ml-2">
                          <ArrowRight className="h-3 w-3 text-green-500 -rotate-45" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Breakout frequency</span>
                      <div className="flex items-center">
                        <span className="text-green-500 text-sm font-medium">-35%</span>
                        <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center ml-2">
                          <ArrowRight className="h-3 w-3 text-green-500 -rotate-45" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* AI Analysis Tab */}
          <TabsContent value="ai" className="space-y-6">
            <Card className="ios-card">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">AI Weekly Analysis</h2>
                
                {aiLoading || isLoading ? (
                  <div className="flex flex-col items-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-skin-teal mb-4"></div>
                    <p className="text-muted-foreground">Generating your personalized weekly analysis...</p>
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
                <h3 className="font-medium mb-2">AI Pattern Detection</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Your skin appears most responsive to hydration changes, with water intake being the strongest single factor</li>
                  <li>Weekend improvements suggest lifestyle factors are significantly impacting your skin health</li>
                  <li>Your breakouts show cyclical patterns that may benefit from preventative treatment 2-3 days before expected occurrences</li>
                  <li>Product efficacy analysis suggests your cleanser may be disrupting your barrier function</li>
                </ul>
                
                <div className="mt-4 pt-4 border-t">
                  <h3 className="font-medium mb-2">AI Recommendations</h3>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>Focus on maintaining your weekend hydration habits throughout the week</li>
                    <li>Consider gentler cleansing options, especially on days with increased sensitivity</li>
                    <li>Implement targeted stress management techniques for Wednesday-Thursday</li>
                    <li>Continue dairy reduction while monitoring for improvements</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WeeklyInsight;
