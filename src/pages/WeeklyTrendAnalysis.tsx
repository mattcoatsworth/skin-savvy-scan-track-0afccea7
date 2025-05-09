
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import BackButton from "@/components/BackButton";
import TrendChart from "@/components/TrendChart";
import { Progress } from "@/components/ui/progress";
import { Calendar, ArrowRight, TrendingUp, TrendingDown } from "lucide-react";
import { format, subDays, parseISO } from "date-fns";
import { Link } from "react-router-dom";
import ViewScoringMethod from "@/components/ViewScoringMethod";

const WeeklyTrendAnalysis = () => {
  // Generate weekly trend data
  const generateTrendData = () => {
    const today = new Date();
    const weekData = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = subDays(today, i);
      const dayName = format(date, "EEE");
      
      // Create a realistic trend (increasing from 35 to 85)
      const baseValue = 35;
      const increment = Math.floor(50 * ((6-i) / 6)); 
      const value = baseValue + increment;
      
      weekData.push({
        date: dayName,
        fullDate: format(date, "yyyy-MM-dd"),
        value
      });
    }
    
    return weekData;
  };

  const weeklyTrendData = generateTrendData();
  
  // Sample data for factors affecting the trend
  const trendFactors = [
    { name: "Consistent Hydration", impact: "positive", value: 85, description: "Drinking 8+ glasses of water daily" },
    { name: "New Vitamin C Serum", impact: "positive", value: 78, description: "Started 5 days ago, improving brightness" },
    { name: "Sleep Quality", impact: "neutral", value: 60, description: "Average 6.5 hours per night" },
    { name: "Processed Sugar Intake", impact: "negative", value: 45, description: "Higher than usual, correlating with inflammation" },
  ];
  
  const getProgressColor = (value: number) => {
    if (value >= 70) return "bg-green-500";
    if (value >= 40) return "bg-amber-500";
    return "bg-red-500";
  };
  
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "positive": return "bg-green-100 text-green-800";
      case "negative": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-8">
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6 flex items-center">
          <BackButton />
          <div>
            <h1 className="text-2xl font-bold">Weekly Trend Analysis</h1>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />
              <span>
                {format(parseISO(weeklyTrendData[0].fullDate), "MMM d")} - {format(parseISO(weeklyTrendData[6].fullDate), "MMM d, yyyy")}
              </span>
            </div>
          </div>
        </header>
        
        <div className="space-y-6">
          {/* Trend Chart */}
          <Card className="ios-card">
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold mb-3">Week Overview</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Your skin health has shown steady improvement throughout the week, 
                with an overall increase of {weeklyTrendData[6].value - weeklyTrendData[0].value} points.
              </p>
              
              <div className="mt-6">
                <TrendChart data={weeklyTrendData.map(d => ({ date: d.date, value: d.value }))} height={160} />
              </div>
              
              <div className="mt-6 flex justify-between">
                <div>
                  <p className="text-sm font-medium">Starting Point</p>
                  <p className="text-xl font-semibold">{weeklyTrendData[0].value}</p>
                </div>
                
                <div className="flex items-center">
                  <TrendingUp className="h-5 w-5 text-green-500 mr-1" />
                  <p className="text-sm font-medium">+{weeklyTrendData[6].value - weeklyTrendData[0].value}</p>
                </div>
                
                <div className="text-right">
                  <p className="text-sm font-medium">Current</p>
                  <p className="text-xl font-semibold">{weeklyTrendData[6].value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Trend Factors */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Contributing Factors</h2>
            <div className="space-y-3">
              {trendFactors.map((factor, index) => (
                <Card key={index} className="ios-card">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{factor.name}</h3>
                        <p className="text-sm text-muted-foreground">{factor.description}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${getImpactColor(factor.impact)}`}>
                        {factor.impact === "positive" ? "Positive" : 
                         factor.impact === "negative" ? "Negative" : "Neutral"}
                      </span>
                    </div>
                    
                    <div className="mt-3">
                      <div className="flex justify-between mb-1">
                        <span className="text-xs">Impact</span>
                        <span className="text-xs font-medium">{factor.value}/100</span>
                      </div>
                      <Progress value={factor.value} className="h-2" indicatorClassName={getProgressColor(factor.value)} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Patterns & Observations */}
          <Card className="ios-card">
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold mb-3">Patterns & Observations</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium">Correlation with Hydration</h3>
                  <p className="text-sm text-muted-foreground">Days with 8+ glasses of water showed 15-20% higher skin health scores.</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium">Sugar Impact</h3>
                  <p className="text-sm text-muted-foreground">Sugar intake on Tuesday and Wednesday correlated with temporary decrease in scores.</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium">Product Effectiveness</h3>
                  <p className="text-sm text-muted-foreground">New Vitamin C serum shows clear positive correlation with improving scores.</p>
                </div>
              </div>
              
              <Link to="/monthly-analysis" className="mt-5 flex justify-center items-center text-skin-teal text-sm">
                View Monthly Analysis <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </CardContent>
          </Card>
          
          {/* Recommendations */}
          <Card className="ios-card">
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold mb-3">Recommendations</h2>
              
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span className="text-sm">Continue your excellent hydration habits</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span className="text-sm">Maintain use of Vitamin C serum for continued improvement</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span className="text-sm">Consider reducing processed sugar intake</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span className="text-sm">Try to increase sleep duration by 30-60 minutes</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          {/* Add View Scoring Method component at the bottom */}
          <ViewScoringMethod />
        </div>
      </div>
    </div>
  );
};

export default WeeklyTrendAnalysis;
