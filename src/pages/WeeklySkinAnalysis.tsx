
import React, { useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { format, subDays, parseISO } from "date-fns";
import { 
  ArrowLeft, 
  Calendar, 
  Droplet, 
  Apple, 
  Pill, 
  Moon, 
  Sun, 
  Activity,
  Thermometer,
  Eye,
  RefreshCcw
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/BackButton";
import ViewScoringMethod from "@/components/ViewScoringMethod";
import useScrollToTop from "@/hooks/useScrollToTop";
import { useSkinAdvice } from "@/hooks/useSkinAdvice";

// Types for the analysis data
type AnalysisData = {
  startDate: string;
  endDate: string;
  overallScore: number;
  categories: {
    [key: string]: {
      score: number;
      factors: {
        name: string;
        impact: "positive" | "negative" | "neutral";
        rating: number;
        details: string;
      }[];
    };
  };
  dailyScores: {
    date: string;
    score: number;
    factors: {
      category: string;
      name: string;
      impact: "positive" | "negative" | "neutral";
    }[];
  }[];
  recommendations: string[];
};

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

// Get icon for category
const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case "food":
      return <Apple className="h-5 w-5" />;
    case "products":
      return <Pill className="h-5 w-5" />;
    case "sleep":
      return <Moon className="h-5 w-5" />;
    case "stress":
      return <Activity className="h-5 w-5" />;
    case "hydration":
      return <Droplet className="h-5 w-5" />;
    case "weather":
      return <Thermometer className="h-5 w-5" />;
    case "skin":
      return <Eye className="h-5 w-5" />;
    default:
      return <Sun className="h-5 w-5" />;
  }
};

const WeeklySkinAnalysis = () => {
  // Apply the scroll to top hook
  useScrollToTop();
  
  // AI analysis state
  const [aiLoading, setAiLoading] = useState(false);
  const [aiAdvice, setAiAdvice] = useState<{
    formattedHtml: string;
    sections: Record<string, string | string[]>;
  }>({
    formattedHtml: "",
    sections: {}
  });
  const { getAdvice, isLoading, getTextContent } = useSkinAdvice({ adviceType: "weekly-insight" });
  
  // In a real app, we would fetch this data from an API based on date range
  // For now, we'll use mock data
  const generateMockData = (): AnalysisData => {
    const today = new Date();
    const startDate = subDays(today, 6); // 7 days including today
    
    return {
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(today, "yyyy-MM-dd"),
      overallScore: 72,
      categories: {
        food: {
          score: 68,
          factors: [
            {
              name: "Hydration",
              impact: "positive",
              rating: 85,
              details: "Consistently drinking 8+ cups of water daily"
            },
            {
              name: "Dairy",
              impact: "negative",
              rating: 35,
              details: "Consumed dairy products on 4/7 days, correlating with inflammation"
            },
            {
              name: "Fruits & Vegetables",
              impact: "positive",
              rating: 78,
              details: "Averaged 5 servings daily, good antioxidant intake"
            },
            {
              name: "Sugar",
              impact: "negative",
              rating: 45,
              details: "Moderate sugar intake, possible correlation with breakouts"
            }
          ]
        },
        products: {
          score: 82,
          factors: [
            {
              name: "Sunscreen",
              impact: "positive",
              rating: 95,
              details: "Daily application, preventing UV damage"
            },
            {
              name: "Retinol",
              impact: "positive",
              rating: 88,
              details: "Used 3 times this week, improving cell turnover"
            },
            {
              name: "New Moisturizer",
              impact: "neutral",
              rating: 60,
              details: "Started using 3 days ago, no significant effect yet"
            }
          ]
        },
        sleep: {
          score: 65,
          factors: [
            {
              name: "Sleep Duration",
              impact: "neutral",
              rating: 60,
              details: "Average 6.5 hours, slightly below optimal range"
            },
            {
              name: "Sleep Quality",
              impact: "positive",
              rating: 75,
              details: "Few disruptions, generally restful"
            }
          ]
        },
        stress: {
          score: 55,
          factors: [
            {
              name: "Work Pressure",
              impact: "negative",
              rating: 40,
              details: "High stress levels on 3 days, correlating with skin inflammation"
            },
            {
              name: "Relaxation",
              impact: "positive",
              rating: 70,
              details: "Incorporated meditation on 4 days, improving overall skin tone"
            }
          ]
        },
        environment: {
          score: 78,
          factors: [
            {
              name: "Humidity",
              impact: "positive",
              rating: 85,
              details: "Optimal humidity levels supporting skin hydration"
            },
            {
              name: "Pollution",
              impact: "negative",
              rating: 60,
              details: "Moderate exposure to urban pollutants"
            }
          ]
        }
      },
      dailyScores: Array(7).fill(null).map((_, index) => {
        const date = subDays(today, 6 - index);
        // Generate a somewhat realistic score between 50 and 95
        const score = Math.floor(Math.random() * (95 - 50 + 1)) + 50;
        
        return {
          date: format(date, "yyyy-MM-dd"),
          score,
          factors: [
            {
              category: "food",
              name: index % 2 === 0 ? "Healthy Diet" : "Sugar Intake",
              impact: index % 2 === 0 ? "positive" : "negative"
            },
            {
              category: "sleep",
              name: score > 70 ? "Good Sleep" : "Poor Sleep",
              impact: score > 70 ? "positive" : "negative"
            }
          ]
        };
      }),
      recommendations: [
        "Reduce dairy consumption to improve skin clarity",
        "Continue consistent hydration habits",
        "Maintain sunscreen application routine",
        "Consider adding vitamin C serum to morning routine",
        "Aim for 7-8 hours of sleep consistently"
      ]
    };
  };

  // For You recommendations
  const skinRecommendations = [
    { 
      type: "food",
      text: "Limit dairy intake", 
      details: "Your logs show a 92% correlation between dairy and breakouts",
      linkTo: "/recommendations-detail/limit-dairy"
    },
    { 
      type: "skincare",
      text: "Try vitamin C serum", 
      details: "Would help with the redness you've been experiencing",
      linkTo: "/recommendations-detail/vitamin-c-serum"
    },
    { 
      type: "lifestyle",
      text: "Evening meditation", 
      details: "Could reduce stress-triggered breakouts on your chin",
      linkTo: "/recommendations-detail/meditation"
    },
    { 
      type: "supplements",
      text: "Zinc supplement", 
      details: "May help regulate your oil production",
      linkTo: "/recommendations-detail/zinc"
    },
    { 
      type: "products",
      text: "Gentle cleanser", 
      details: "Your current cleanser may be too harsh for your skin",
      linkTo: "/recommendations-detail/gentle-cleanser"
    }
  ];

  const analysisData = generateMockData();

  // Process AI response into clickable sections
  const processAIResponse = (sections: Record<string, string | string[]>) => {
    const aiSections = [];
    
    // Map section names to display names and types
    const sectionConfig: Record<string, {title: string, type: string, icon: string}> = {
      "Weekly Summary": { title: "Summary", type: "summary", icon: "info" },
      "Key Patterns": { title: "Patterns", type: "pattern", icon: "activity" },
      "Correlations": { title: "Correlations", type: "correlation", icon: "activity" },
      "Progress Metrics": { title: "Progress", type: "metric", icon: "activity" },
      "Recommendations": { title: "Recommendations", type: "recommendation", icon: "droplet" },
      "Focus Areas": { title: "Focus Areas", type: "focus", icon: "eye" }
    };
    
    // Process each section
    Object.entries(sections || {}).forEach(([key, content]) => {
      if (!content) return; // Skip if content is null/undefined
      
      const config = sectionConfig[key] || { title: key, type: "info", icon: "info" };
      
      if (Array.isArray(content)) {
        // Create a section with items for array content
        aiSections.push({
          title: config.title,
          items: content.map((item, index) => ({
            text: item,
            type: config.type,
            linkTo: `/recommendations-detail/weekly-${config.type}-${index + 1}`
          }))
        });
      } else if (typeof content === 'string') {
        // Create a section with a single item for string content
        aiSections.push({
          title: config.title,
          items: [{
            text: content,
            type: config.type,
            linkTo: `/recommendations-detail/weekly-${config.type}`
          }]
        });
      }
    });
    
    return aiSections;
  };
  
  // Function to generate AI advice using useSkinAdvice hook
  const generateAiAdvice = async (forceRefresh = false) => {
    // Check if we have cached advice in localStorage
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    const cacheKey = `weekly-skin-analysis-advice-${today}`;
    
    // If not forcing a refresh, try to get data from localStorage first
    if (!forceRefresh) {
      try {
        const cachedAdvice = localStorage.getItem(cacheKey);
        if (cachedAdvice) {
          const parsedAdvice = JSON.parse(cachedAdvice);
          setAiAdvice(parsedAdvice);
          return; // Exit early if we have cached data
        }
      } catch (error) {
        console.error("Error reading from cache:", error);
        // Continue with API request if cache read fails
      }
    }
    
    setAiLoading(true);
    try {
      const analysisData = generateMockData();
      const advice = await getAdvice(
        "Provide a comprehensive weekly analysis of my skin health with clear sections for patterns, correlations, recommendations, and focus areas. Include metrics and comparative insights based on my logs.", 
        { analysisData, skinRecommendations }
      );
      
      if (advice) {
        setAiAdvice(advice);
        
        // Save to localStorage for future use
        try {
          localStorage.setItem(cacheKey, JSON.stringify(advice));
        } catch (storageError) {
          console.error("Error saving to localStorage:", storageError);
        }
      } else {
        setAiAdvice({ formattedHtml: "", sections: {} });
      }
    } catch (error) {
      console.error("Error getting AI skin advice:", error);
      setAiAdvice({ formattedHtml: "", sections: {} });
    } finally {
      setAiLoading(false);
    }
  };
  
  // Generate AI advice on first render
  React.useEffect(() => {
    generateAiAdvice();
  }, []);

  // Process AI sections for structured display
  const aiSections = processAIResponse(aiAdvice.sections || {});

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6 flex items-center">
          <BackButton />
          <div>
            <h1 className="text-2xl font-bold">Weekly Skin Analysis</h1>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />
              <span>
                {format(parseISO(analysisData.startDate), "MMM d")} - {format(parseISO(analysisData.endDate), "MMM d, yyyy")}
              </span>
            </div>
          </div>
        </header>
        
        <Tabs defaultValue="current" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="current">Current</TabsTrigger>
            <TabsTrigger value="for-you">For You</TabsTrigger>
            <TabsTrigger value="ai">AI Analysis</TabsTrigger>
          </TabsList>

          {/* Current Tab - Original content */}
          <TabsContent value="current" className="space-y-6">
            {/* Overall Score Card */}
            <Card className="ios-card mb-6">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">Overall Skin Health</h2>
                    <p className="text-sm text-muted-foreground">Week Average</p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="relative w-20 h-20 flex items-center justify-center">
                      {/* Background circle */}
                      <svg className="w-20 h-20 absolute" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke={getBackgroundColor(analysisData.overallScore)}
                          strokeWidth="4"
                          strokeLinecap="round"
                        />
                      </svg>
                      
                      {/* Foreground circle - the actual progress */}
                      <svg className="w-20 h-20 absolute" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke={getProgressColor(analysisData.overallScore)}
                          strokeWidth="4"
                          strokeDasharray={`${analysisData.overallScore}, 100`}
                          strokeLinecap="round"
                        />
                      </svg>
                      
                      {/* Rating number in the center */}
                      <div className="text-xl font-semibold">
                        {analysisData.overallScore}
                      </div>
                    </div>
                    <span className="text-sm font-medium mt-1">
                      {getRatingLabel(analysisData.overallScore)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Daily Scores */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Daily Scores</h2>
              <div className="overflow-x-auto pb-2">
                <div className="flex justify-between min-w-full space-x-2">
                  {analysisData.dailyScores.map((day, index) => (
                    <Link key={index} to={`/day-log/day-${6-index}`} className="flex flex-col items-center">
                      <span className="text-sm font-medium">
                        {format(parseISO(day.date), "EEE")}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {format(parseISO(day.date), "M/d")}
                      </span>
                      <div className="mt-2">
                        <div className="relative w-12 h-12 flex items-center justify-center">
                          {/* Background circle */}
                          <svg className="w-12 h-12 absolute" viewBox="0 0 36 36">
                            <path
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke={getBackgroundColor(day.score)}
                              strokeWidth="4"
                              strokeLinecap="round"
                            />
                          </svg>
                          
                          {/* Foreground circle */}
                          <svg className="w-12 h-12 absolute" viewBox="0 0 36 36">
                            <path
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke={getProgressColor(day.score)}
                              strokeWidth="4"
                              strokeDasharray={`${day.score}, 100`}
                              strokeLinecap="round"
                            />
                          </svg>
                          
                          {/* Rating number */}
                          <div className="text-sm font-semibold">
                            {day.score}
                          </div>
                        </div>
                        <span className="text-xs block text-center mt-1">
                          {getRatingLabel(day.score)}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Category Analysis - MODIFIED: Removed section titles from inside cards */}
            <div className="space-y-6 mb-6">
              <h2 className="text-lg font-semibold mb-3">Category Analysis</h2>
              
              {Object.entries(analysisData.categories).map(([category, data]) => (
                <div key={category} className="mb-4">
                  <Link to={`/category-analysis/${category}`} className="block">
                    <Card className="ios-card hover:shadow-md transition-all">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            {getCategoryIcon(category)}
                            <h3 className="text-lg font-medium capitalize">{category}</h3>
                          </div>
                          <div className="flex items-center">
                            <div className="relative w-10 h-10 mr-2 flex items-center justify-center">
                              <svg className="w-10 h-10 absolute" viewBox="0 0 36 36">
                                <path
                                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                  fill="none"
                                  stroke={getProgressColor(data.score)}
                                  strokeWidth="4"
                                  strokeDasharray={`${data.score}, 100`}
                                  strokeLinecap="round"
                                />
                              </svg>
                              <div className="text-sm font-medium">{data.score}</div>
                            </div>
                            <span className="text-sm">{getRatingLabel(data.score)}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          {data.factors.map((factor, idx) => (
                            <div key={idx} className="border-t pt-3">
                              <div className="flex justify-between">
                                <div>
                                  <span className="font-medium">{factor.name}</span>
                                  <p className="text-sm text-muted-foreground mt-1">{factor.details}</p>
                                </div>
                                <div className="ml-2 flex flex-shrink-0 items-center">
                                  <span className="text-sm font-medium">{factor.rating}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              ))}
            </div>

            {/* Correlations Table */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Key Correlations</h2>
              <Link to="/correlations-detail" className="block">
                <Card className="ios-card hover:shadow-md transition-all">
                  <CardContent className="p-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Factor</TableHead>
                          <TableHead>Impact</TableHead>
                          <TableHead className="text-right">Correlation</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Dairy Consumption</TableCell>
                          <TableCell>
                            <span className="text-xs">
                              Negative
                            </span>
                          </TableCell>
                          <TableCell className="text-right">92%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Hydration</TableCell>
                          <TableCell>
                            <span className="text-xs">
                              Positive
                            </span>
                          </TableCell>
                          <TableCell className="text-right">89%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Stress Levels</TableCell>
                          <TableCell>
                            <span className="text-xs">
                              Negative
                            </span>
                          </TableCell>
                          <TableCell className="text-right">78%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Sunscreen Use</TableCell>
                          <TableCell>
                            <span className="text-xs">
                              Positive
                            </span>
                          </TableCell>
                          <TableCell className="text-right">85%</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </Link>
            </div>

            {/* Recommendations */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Recommendations</h2>
              <Link to="/recommendations-detail" className="block">
                <Card className="ios-card hover:shadow-md transition-all">
                  <CardContent className="p-4">
                    <ul className="space-y-2">
                      {analysisData.recommendations.map((rec, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-slate-500 mr-2">•</span>
                          <span className="text-sm">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </TabsContent>
          
          {/* For You Tab */}
          <TabsContent value="for-you" className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-3">Personalized Recommendations</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Based on your recent skin logs, here are some tailored recommendations to improve your skin health:
              </p>
              
              <div className="space-y-4">
                {skinRecommendations.map((recommendation, index) => (
                  <Link 
                    key={index} 
                    to={recommendation.linkTo}
                    className="block transition-transform hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <Card className="ios-card hover:shadow-md transition-all border border-transparent hover:border-slate-200">
                      <CardContent className="p-4">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <h3 className="font-medium text-lg">{recommendation.text}</h3>
                            <div className="text-skin-teal text-xs">
                              {recommendation.type}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {recommendation.details}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
              
              <Link 
                to="/weekly-insight"
                className="block transition-transform hover:scale-[1.01] active:scale-[0.99] mt-8"
              >
                <Card className="ios-card hover:shadow-md transition-all border border-transparent hover:border-slate-200">
                  <CardContent className="p-4">
                    <h3 className="font-medium text-lg mb-2">Weekly Insight</h3>
                    <p className="text-sm">
                      Your skin shows consistent patterns with food intake and stress levels. 
                      Focus on hydration and stress management this week for best results.
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </TabsContent>
          
          {/* AI Analysis Tab */}
          <TabsContent value="ai" className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">AI Analysis</h2>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={() => generateAiAdvice(true)}
                disabled={aiLoading || isLoading}
              >
                <RefreshCcw className="h-3 w-3" />
                Refresh
              </Button>
            </div>
            
            {aiLoading || isLoading ? (
              <Card className="ios-card">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-skin-teal mb-4"></div>
                    <p className="text-muted-foreground">Generating your personalized weekly analysis...</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Overall Score Card */}
                <Card className="ios-card mb-6">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-semibold">AI Overall Assessment</h2>
                        <p className="text-sm text-muted-foreground">Weekly Analysis</p>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <div className="relative w-20 h-20 flex items-center justify-center">
                          {/* Background circle */}
                          <svg className="w-20 h-20 absolute" viewBox="0 0 36 36">
                            <path
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke={getBackgroundColor(analysisData.overallScore)}
                              strokeWidth="4"
                              strokeLinecap="round"
                            />
                          </svg>
                          
                          {/* Foreground circle - the actual progress */}
                          <svg className="w-20 h-20 absolute" viewBox="0 0 36 36">
                            <path
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke={getProgressColor(analysisData.overallScore)}
                              strokeWidth="4"
                              strokeDasharray={`${analysisData.overallScore}, 100`}
                              strokeLinecap="round"
                            />
                          </svg>
                          
                          {/* Rating number in the center */}
                          <div className="text-xl font-semibold">
                            {analysisData.overallScore}
                          </div>
                        </div>
                        <span className="text-sm font-medium mt-1">
                          {getRatingLabel(analysisData.overallScore)}
                        </span>
                      </div>
                    </div>
                    
                    {/* Add Weekly Summary - if available */}
                    {aiAdvice.sections["Weekly Summary"] && (
                      <div className="mt-4 pt-4 border-t border-slate-100">
                        <p className="text-sm text-muted-foreground">
                          {typeof aiAdvice.sections["Weekly Summary"] === 'string' 
                            ? aiAdvice.sections["Weekly Summary"] 
                            : Array.isArray(aiAdvice.sections["Weekly Summary"])
                              ? aiAdvice.sections["Weekly Summary"].join(" ")
                              : "Weekly summary of your skin health."}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Daily Scores */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-3">Daily Scores</h2>
                  <div className="overflow-x-auto pb-2">
                    <div className="flex justify-between min-w-full space-x-2">
                      {analysisData.dailyScores.map((day, index) => (
                        <Link key={index} to={`/day-log/day-${6-index}`} className="flex flex-col items-center">
                          <span className="text-sm font-medium">
                            {format(parseISO(day.date), "EEE")}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {format(parseISO(day.date), "M/d")}
                          </span>
                          <div className="mt-2">
                            <div className="relative w-12 h-12 flex items-center justify-center">
                              {/* Background circle */}
                              <svg className="w-12 h-12 absolute" viewBox="0 0 36 36">
                                <path
                                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                  fill="none"
                                  stroke={getBackgroundColor(day.score)}
                                  strokeWidth="4"
                                  strokeLinecap="round"
                                />
                              </svg>
                              
                              {/* Foreground circle */}
                              <svg className="w-12 h-12 absolute" viewBox="0 0 36 36">
                                <path
                                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                  fill="none"
                                  stroke={getProgressColor(day.score)}
                                  strokeWidth="4"
                                  strokeDasharray={`${day.score}, 100`}
                                  strokeLinecap="round"
                                />
                              </svg>
                              
                              {/* Rating number */}
                              <div className="text-sm font-semibold">
                                {day.score}
                              </div>
                            </div>
                            <span className="text-xs block text-center mt-1">
                              {getRatingLabel(day.score)}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* AI Sections in Formatted Cards - MODIFIED: Removed section titles from cards */}
                {aiSections.length > 0 && aiSections.map((section, index) => {
                  if (section.title === "Summary") return null; // Skip summary as it's displayed above
                  
                  return (
                    <div key={index} className="mb-6">
                      <h2 className="text-lg font-semibold mb-3">{section.title}</h2>
                      <Card className="ios-card">
                        <CardContent className="p-4">
                          <div className="space-y-4">
                            {section.items.map((item, itemIdx) => (
                              <div key={itemIdx} className={itemIdx > 0 ? "border-t pt-3 mt-3" : ""}>
                                <Link to={item.linkTo}>
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <span className="font-medium">
                                        {item.text.split(":")[0] || `Item ${itemIdx + 1}`}
                                      </span>
                                      <p className="text-sm text-muted-foreground mt-1">
                                        {item.text.includes(":") 
                                          ? item.text.split(":").slice(1).join(":").trim()
                                          : item.text}
                                      </p>
                                    </div>
                                    <div className="ml-2 text-muted-foreground">
                                      <span className="text-xs">
                                        {section.title}
                                      </span>
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  );
                })}

                {/* Correlations Table */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-3">AI Correlations</h2>
                  <Card className="ios-card hover:shadow-md transition-all">
                    <CardContent className="p-4">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Factor</TableHead>
                            <TableHead>Impact</TableHead>
                            <TableHead className="text-right">Correlation</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">Dairy Consumption</TableCell>
                            <TableCell>
                              <span className="text-xs">
                                Negative
                              </span>
                            </TableCell>
                            <TableCell className="text-right">92%</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Hydration</TableCell>
                            <TableCell>
                              <span className="text-xs">
                                Positive
                              </span>
                            </TableCell>
                            <TableCell className="text-right">89%</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Stress Levels</TableCell>
                            <TableCell>
                              <span className="text-xs">
                                Negative
                              </span>
                            </TableCell>
                            <TableCell className="text-right">78%</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
                
                {/* If no structured sections but we have formatted HTML */}
                {(!aiSections || aiSections.length === 0) && aiAdvice.formattedHtml && (
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-3">AI Analysis</h2>
                    <Card className="ios-card">
                      <CardContent className="p-4">
                        <div className="prose prose-sm max-w-none">
                          <div dangerouslySetInnerHTML={{ __html: aiAdvice.formattedHtml }} />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </>
            )}
            
            {/* View Scoring Method component */}
            <ViewScoringMethod />
            
            {/* Add disclaimer card */}
            <Card className="ios-card mt-6">
              <CardContent className="p-4">
                <h3 className="font-medium text-sm mb-2">Disclaimer</h3>
                <p className="text-xs text-muted-foreground">
                  AI analysis is based on the data you've provided and general skin health principles. 
                  This is not medical advice. For persistent skin issues, please consult a dermatologist.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WeeklySkinAnalysis;
