
import React from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { format, subDays, parseISO } from "date-fns";
import { 
  ArrowLeft, 
  Calendar, 
  Droplet, 
  Food, 
  Medicine, 
  Moon, 
  Sun, 
  Activity,
  Thermometer,
  Eye
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import BackButton from "@/components/BackButton";

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
      return <Food className="h-5 w-5" />;
    case "products":
      return <Medicine className="h-5 w-5" />;
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

  const analysisData = generateMockData();

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

        {/* Daily Breakdown */}
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

        {/* Category Analysis Tabs */}
        <Tabs defaultValue="food" className="w-full mb-6">
          <TabsList className="grid grid-cols-5 mb-2">
            <TabsTrigger value="food">Food</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="sleep">Sleep</TabsTrigger>
            <TabsTrigger value="stress">Stress</TabsTrigger>
            <TabsTrigger value="environment">Env.</TabsTrigger>
          </TabsList>
          
          {Object.entries(analysisData.categories).map(([category, data]) => (
            <TabsContent key={category} value={category} className="mt-2">
              <Card className="ios-card">
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
                            <div className={`w-3 h-3 rounded-full mr-1 ${
                              factor.impact === 'positive' 
                                ? 'bg-green-500' 
                                : factor.impact === 'negative' 
                                  ? 'bg-red-500' 
                                  : 'bg-yellow-500'
                            }`}></div>
                            <span className="text-sm font-medium">{factor.rating}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* Correlations Table */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Key Correlations</h2>
          <Card className="ios-card">
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
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                        Negative
                      </span>
                    </TableCell>
                    <TableCell className="text-right">92%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Hydration</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                        Positive
                      </span>
                    </TableCell>
                    <TableCell className="text-right">89%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Stress Levels</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                        Negative
                      </span>
                    </TableCell>
                    <TableCell className="text-right">78%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Sunscreen Use</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                        Positive
                      </span>
                    </TableCell>
                    <TableCell className="text-right">85%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Recommendations</h2>
          <Card className="ios-card">
            <CardContent className="p-4">
              <ul className="space-y-2">
                {analysisData.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span className="text-sm">{rec}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WeeklySkinAnalysis;
