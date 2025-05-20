
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import TrendChart from "@/components/TrendChart";
import { WeeklySkinData } from "./types";

// Sample data for weekly skin health
const sampleWeeklyData: WeeklySkinData = {
  weekStartDate: "2024-07-15",
  weekEndDate: "2024-07-21",
  overallScore: 82,
  previousWeekScore: 75,
  weeklyTrend: [
    { date: "Mon", value: 65 },
    { date: "Tue", value: 72 },
    { date: "Wed", value: 78 },
    { date: "Thu", value: 80 },
    { date: "Fri", value: 85 },
    { date: "Sat", value: 88 },
    { date: "Sun", value: 82 }
  ],
  dailyScores: [
    { day: "Monday", date: "2024-07-15", score: 65, note: "Slightly dehydrated" },
    { day: "Tuesday", date: "2024-07-16", score: 72, note: "Improved after increased water intake" },
    { day: "Wednesday", date: "2024-07-17", score: 78, note: "Minor breakout on chin" },
    { day: "Thursday", date: "2024-07-18", score: 80, note: "Calmer skin after using aloe" },
    { day: "Friday", date: "2024-07-19", score: 85, note: "Good skin day overall" },
    { day: "Saturday", date: "2024-07-20", score: 88, note: "Best skin day this week" },
    { day: "Sunday", date: "2024-07-21", score: 82, note: "Slight dullness in the evening" }
  ],
  skinParameters: [
    { name: "Hydration", current: 78, previous: 65 },
    { name: "Elasticity", current: 85, previous: 82 },
    { name: "Oil Control", current: 72, previous: 68 },
    { name: "Texture", current: 88, previous: 75 }
  ],
  positiveFactors: [
    { name: "Consistent hydration", impact: "+15%" },
    { name: "Regular exfoliation", impact: "+12%" },
    { name: "Quality sleep (7+ hrs)", impact: "+10%" }
  ],
  negativeFactors: [
    { name: "Stress levels", impact: "-8%" },
    { name: "Sugar consumption", impact: "-5%" }
  ]
};

const WeeklySkinView: React.FC = () => {
  // State for week navigation
  const [currentWeekIndex, setCurrentWeekIndex] = useState<number>(0);
  
  // Navigate to previous week
  const goToPreviousWeek = () => {
    setCurrentWeekIndex(prev => prev + 1);
  };
  
  // Navigate to next week
  const goToNextWeek = () => {
    if (currentWeekIndex > 0) {
      setCurrentWeekIndex(prev => prev - 1);
    }
  };
  
  // Check if this is the current week
  const isCurrentWeek = currentWeekIndex === 0;
  
  return (
    <div className="space-y-6">
      {/* Week Selector */}
      <Card className="ios-card">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <button 
              className="p-2 rounded-full hover:bg-gray-100"
              onClick={goToPreviousWeek}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            <div className="text-center">
              <p className="font-medium">
                {isCurrentWeek ? "This Week" : `Week ${currentWeekIndex} ago`}
              </p>
              <p className="text-sm text-muted-foreground">
                {sampleWeeklyData.weekStartDate} to {sampleWeeklyData.weekEndDate}
              </p>
            </div>
            
            <button 
              className={`p-2 rounded-full ${!isCurrentWeek ? 'hover:bg-gray-100' : 'opacity-50 cursor-not-allowed'}`}
              onClick={goToNextWeek}
              disabled={isCurrentWeek}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </CardContent>
      </Card>
      
      {/* Weekly Overview */}
      <div>
        <Card className="ios-card">
          <CardContent className="p-4">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-end mb-1">
                  <span className="text-3xl font-bold">{sampleWeeklyData.overallScore}</span>
                  {sampleWeeklyData.previousWeekScore && (
                    <span className="text-green-600 text-sm">+{sampleWeeklyData.overallScore - sampleWeeklyData.previousWeekScore} from last week</span>
                  )}
                </div>
                <Progress value={sampleWeeklyData.overallScore} className="h-2" />
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-3">Weekly Trend</p>
                <TrendChart data={sampleWeeklyData.weeklyTrend} height={100} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Weekly Insights */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold">Weekly Insights</h2>
          <Link 
            to="/weekly-skin-analysis"
            className="text-blue-500 text-sm hover:underline"
          >
            See Full Analysis
          </Link>
        </div>
        
        <Card className="ios-card">
          <CardContent className="p-4 space-y-3">
            {/* Skin Parameters */}
            {sampleWeeklyData.skinParameters.map((param, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{param.name}</span>
                  <span className="text-sm text-green-600">
                    +{param.current - param.previous}%
                  </span>
                </div>
                <Progress value={param.current} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      
      {/* Key Factors */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Key Factors</h2>
        
        <div className="space-y-4">
          {/* Positive Factors */}
          <Card className="ios-card">
            <CardContent className="p-4">
              <h3 className="font-medium text-green-600 mb-2">Positive Impact</h3>
              <ul className="space-y-2">
                {sampleWeeklyData.positiveFactors.map((factor, index) => (
                  <li key={index} className="flex justify-between text-sm">
                    <span>{factor.name}</span>
                    <span className="font-medium text-green-600">{factor.impact}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          {/* Negative Factors */}
          <Card className="ios-card">
            <CardContent className="p-4">
              <h3 className="font-medium text-red-600 mb-2">Negative Impact</h3>
              <ul className="space-y-2">
                {sampleWeeklyData.negativeFactors.map((factor, index) => (
                  <li key={index} className="flex justify-between text-sm">
                    <span>{factor.name}</span>
                    <span className="font-medium text-red-600">{factor.impact}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* View More Link */}
      <Link 
        to="/skin-analysis"
        className="block bg-slate-100 hover:bg-slate-200 transition-colors p-4 rounded-lg text-center"
      >
        View Full Skin Analysis
      </Link>
    </div>
  );
};

export default WeeklySkinView;
