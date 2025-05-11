import React, { useState } from "react";
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
  const [aiLoading, setAiLoading] = useState(false);
  const [aiRawAdvice, setAiRawAdvice] = useState("");
  const [aiStructuredData, setAiStructuredData] = useState<any>(null);
  
  const { getAdvice: getRawAdvice, isLoading: isRawLoading } = useSkinAdvice({ 
    adviceType: "weekly-insight" 
  });
  
  const { getAdvice: getStructuredAdvice, isLoading: isStructuredLoading } = useSkinAdvice({ 
    adviceType: "weekly-insight",
    structuredOutput: true
  });
  
  // Generate AI advice on first render
  React.useEffect(() => {
    generateAiAdvice();
  }, []);
  
  // Function to generate AI advice
  const generateAiAdvice = async () => {
    setAiLoading(true);
    try {
      // Get raw text advice for the prose section
      const advice = await getRawAdvice(
        "Analyze my skin trends this week and provide insights on patterns and potential connections", 
        { weeklyTrendData }
      );
      setAiRawAdvice(advice);
      
      // Get structured data for the formatted sections
      const structuredData = await getStructuredAdvice(
        "Analyze my weekly skin trends and provide structured insights on patterns, correlations, focus areas, metrics and challenges.", 
        { weeklyTrendData }
      );
      setAiStructuredData(structuredData);
    } catch (error) {
      console.error("Error getting AI skin advice:", error);
    } finally {
      setAiLoading(false);
    }
  };
  
  // Helper function to render metrics with arrows
  const renderMetric = (label: string, value: string) => {
    const isPositive = value.startsWith('+');
    const isNegative = value.startsWith('-');
    
    return (
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">{label}</span>
        <div className="flex items-center">
          <span className={`${isPositive ? 'text-green-500' : isNegative ? 'text-green-500' : 'text-gray-500'} text-sm font-medium`}>
            {value}
          </span>
          <div className={`h-5 w-5 rounded-full ${isPositive ? 'bg-green-100' : isNegative ? 'bg-green-100' : 'bg-gray-100'} flex items-center justify-center ml-2`}>
            <ArrowRight 
              className={`h-3 w-3 ${isPositive ? 'text-green-500 rotate-45' : isNegative ? 'text-green-500 -rotate-45' : 'text-gray-500'}`} 
            />
          </div>
        </div>
      </div>
    );
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
            {aiLoading || isRawLoading || isStructuredLoading ? (
              <div className="flex flex-col items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-skin-teal mb-4"></div>
                <p className="text-muted-foreground">Generating your personalized weekly analysis...</p>
              </div>
            ) : (
              <>
                {aiStructuredData ? (
                  <>
                    {/* Overview Card - Similar to Current tab */}
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
                          {/* AI Generated Key Observation */}
                          <div className="flex items-start">
                            <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-3 flex-shrink-0 mt-0.5">
                              <Brain className="h-4 w-4" />
                            </div>
                            <div>
                              <h3 className="font-medium">Key Observation</h3>
                              {aiStructuredData.patternAnalysis ? (
                                <p className="text-sm text-gray-600 mt-1">
                                  {aiStructuredData.patternAnalysis.split('\n')[0]}
                                </p>
                              ) : (
                                <p className="text-sm text-gray-600 mt-1">
                                  Your skin condition has shown notable patterns this week that may correlate with your habits and environment.
                                </p>
                              )}
                            </div>
                          </div>
                          
                          {/* AI Generated Concern Area */}
                          <div className="flex items-start">
                            <div className="h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-500 mr-3 flex-shrink-0 mt-0.5">
                              <AlertCircle className="h-4 w-4" />
                            </div>
                            <div>
                              <h3 className="font-medium">Concern Area</h3>
                              {aiStructuredData.detectedPatterns && 
                               aiStructuredData.detectedPatterns.find((p: any) => p.correlation < 0) ? (
                                <p className="text-sm text-gray-600 mt-1">
                                  {aiStructuredData.detectedPatterns.find((p: any) => p.correlation < 0).description}
                                </p>
                              ) : (
                                <p className="text-sm text-gray-600 mt-1">
                                  Mid-week decline correlates with potential stressors or environmental factors that may require attention.
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Detected Patterns - Similar to For You tab */}
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold mb-3">Detected Patterns</h2>
                      <Card className="ios-card">
                        <CardContent className="p-6">
                          <div className="space-y-4">
                            {aiStructuredData.detectedPatterns ? 
                              aiStructuredData.detectedPatterns.map((pattern: any, index: number) => (
                                <div key={index} className={index < aiStructuredData.detectedPatterns.length - 1 ? "pb-3 border-b border-gray-100" : ""}>
                                  <h3 className="font-medium">{pattern.category || "Pattern"}</h3>
                                  <p className="text-sm text-gray-600 mt-1">
                                    {pattern.description}
                                    {pattern.correlation && (
                                      <span className="ml-1 font-medium">
                                        ({pattern.correlation > 0 ? '+' : ''}{pattern.correlation}% correlation)
                                      </span>
                                    )}
                                  </p>
                                </div>
                              )) : (
                                <p className="text-sm text-gray-600">
                                  Pattern analysis requires more data. Continue logging regularly for improved insights.
                                </p>
                              )
                            }
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    {/* Focus Areas - Similar to both tabs */}
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold mb-3">Week Ahead Focus</h2>
                      <Card className="ios-card">
                        <CardContent className="p-6">
                          <div className="space-y-4">
                            {aiStructuredData.focusAreas ? 
                              aiStructuredData.focusAreas.map((focus: any, index: number) => (
                                <div key={index} className="flex items-start">
                                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3 flex-shrink-0 mt-0.5">
                                    <Lightbulb className="h-4 w-4" />
                                  </div>
                                  <div>
                                    <h3 className="font-medium">
                                      {focus.priority === "primary" ? "Primary" : 
                                       focus.priority === "secondary" ? "Secondary" : 
                                       "Additional"} Focus: {focus.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-1">
                                      {focus.description}
                                    </p>
                                    {focus.link && (
                                      <Link to={focus.link} className="text-skin-teal text-xs flex items-center mt-1">
                                        View recommendations <ArrowRight className="h-3 w-3 ml-1" />
                                      </Link>
                                    )}
                                  </div>
                                </div>
                              )) : (
                                <p className="text-sm text-gray-600">
                                  Focus areas will be generated based on your skin patterns and data.
                                </p>
                              )
                            }
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    {/* Weekly Challenges - Similar to For You tab */}
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold mb-3">Weekly Challenges</h2>
                      
                      {aiStructuredData.challenges ? 
                        aiStructuredData.challenges.map((challenge: any, index: number) => (
                          <Link key={index} to={`/challenge/${challenge.title.toLowerCase().replace(/\s+/g, '-')}`} className="block transition-transform hover:scale-[1.01] active:scale-[0.99] mb-4 last:mb-0">
                            <Card className="ios-card hover:shadow-md transition-all border border-transparent hover:border-slate-200">
                              <CardContent className="p-4">
                                <div className="flex justify-between items-center mb-1">
                                  <h3 className="font-medium text-lg">{challenge.title}</h3>
                                  <div className="bg-skin-teal text-white text-xs rounded-full px-2 py-0.5">
                                    {challenge.difficulty || "try this"}
                                  </div>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {challenge.description}
                                </p>
                              </CardContent>
                            </Card>
                          </Link>
                        )) : (
                          <Card className="ios-card">
                            <CardContent className="p-4">
                              <p className="text-sm text-gray-600 text-center py-4">
                                Custom challenges will be generated based on your skin data and patterns.
                              </p>
                            </CardContent>
                          </Card>
                        )
                      }
                    </div>
                    
                    {/* Success Metrics - Similar to For You tab */}
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold mb-3">Success Metrics</h2>
                      <Card className="ios-card">
                        <CardContent className="p-6">
                          <p className="text-sm mb-4">
                            Here's how your skin metrics have changed from last week:
                          </p>
                          
                          <div className="space-y-4">
                            {aiStructuredData.metrics ? (
                              <>
                                {renderMetric("Overall score", aiStructuredData.metrics.overall)}
                                {renderMetric("Hydration level", aiStructuredData.metrics.hydration)}
                                {renderMetric("Inflammation", aiStructuredData.metrics.inflammation)}
                                {renderMetric("Breakout frequency", aiStructuredData.metrics.breakouts)}
                              </>
                            ) : (
                              <p className="text-sm text-center text-gray-600">Metrics will be calculated as you log more data.</p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    {/* AI Analysis - Raw text version with improved formatting */}
                    <Card className="ios-card">
                      <CardContent className="p-6">
                        <h2 className="text-xl font-semibold mb-4">Detailed AI Analysis</h2>
                        
                        <div className="prose prose-sm max-w-none">
                          {aiRawAdvice ? (
                            <div dangerouslySetInnerHTML={{ __html: aiRawAdvice }} />
                          ) : (
                            <p>Unable to generate detailed analysis at this time. Please try again later.</p>
                          )}
                          
                          <button 
                            onClick={generateAiAdvice} 
                            className="mt-6 px-4 py-2 bg-skin-teal text-white rounded-md hover:bg-skin-teal-dark transition-colors"
                          >
                            Regenerate Analysis
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  </>
                ) : (
                  <Card className="ios-card">
                    <CardContent className="p-6">
                      <h2 className="text-xl font-semibold mb-4">AI Weekly Analysis</h2>
                      
                      <div className="prose prose-sm max-w-none">
                        {aiRawAdvice ? (
                          <div dangerouslySetInnerHTML={{ __html: aiRawAdvice }} />
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
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WeeklyInsight;
