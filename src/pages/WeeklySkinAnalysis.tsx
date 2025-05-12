
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import BackButton from "@/components/BackButton";
import TrendChart from "@/components/TrendChart";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import SkinIndexComparison from "@/components/SkinIndexComparison";
import { useScrollToTop } from "@/hooks/useScrollToTop";

const WeeklySkinAnalysis = () => {
  useScrollToTop();
  
  // Sample data for weekly skin health
  const weeklyRating = 82;
  const previousWeekRating = 75;
  const weeklyTrendData = [
    { date: "Mon", value: 65 },
    { date: "Tue", value: 72 },
    { date: "Wed", value: 78 },
    { date: "Thu", value: 80 },
    { date: "Fri", value: 85 },
    { date: "Sat", value: 88 },
    { date: "Sun", value: 82 }
  ];

  // Sample data for skin parameters
  const skinParameters = [
    { name: "Hydration", current: 78, previous: 65 },
    { name: "Elasticity", current: 85, previous: 82 },
    { name: "Oil Control", current: 72, previous: 68 },
    { name: "Texture", current: 88, previous: 75 }
  ];

  // Sample data for factors that influenced skin health
  const positiveFactors = [
    { name: "Consistent hydration", impact: "+15%" },
    { name: "Regular exfoliation", impact: "+12%" },
    { name: "Quality sleep (7+ hrs)", impact: "+10%" }
  ];
  
  const negativeFactors = [
    { name: "Stress levels", impact: "-8%" },
    { name: "Sugar consumption", impact: "-5%" }
  ];

  // Sample daily skin score data
  const dailyScores = [
    { day: "Monday", score: 65, note: "Slightly dehydrated" },
    { day: "Tuesday", score: 72, note: "Improved after increased water intake" },
    { day: "Wednesday", score: 78, note: "Minor breakout on chin" },
    { day: "Thursday", score: 80, note: "Calmer skin after using aloe" },
    { day: "Friday", score: 85, note: "Good skin day overall" },
    { day: "Saturday", score: 88, note: "Best skin day this week" },
    { day: "Sunday", score: 82, note: "Slight dullness in the evening" }
  ];

  return (
    <div className="pb-20">
      <header className="mb-6 flex items-center">
        <BackButton />
        <h1 className="text-2xl font-bold">Weekly Report</h1>
      </header>
      
      {/* 1. Skin Health Overview (at the top) */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Skin Health</h2>
        <Card>
          <CardContent className="p-4">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-end mb-1">
                  <span className="text-3xl font-bold">{weeklyRating}</span>
                  <span className="text-green-600 text-sm">+{weeklyRating - previousWeekRating} from last week</span>
                </div>
                <Progress value={weeklyRating} className="h-2" />
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-3">Weekly Trend</p>
                <TrendChart data={weeklyTrendData} height={100} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* 2. Daily Scores */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Daily Scores</h2>
        <div className="space-y-3">
          {dailyScores.map((day, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{day.day}</h3>
                    <p className="text-sm text-muted-foreground">{day.note}</p>
                  </div>
                  <div className="text-lg font-semibold">{day.score}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* 3. Skin Index Comparison */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Skin Index Comparison</h2>
        <SkinIndexComparison gender="female" age={28} />
      </div>
      
      {/* 4. Skin Parameters */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Skin Parameters</h2>
        <Card className="mb-4">
          <CardContent className="p-4 space-y-3">
            {skinParameters.map((param, index) => (
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
      
      {/* 5. Influential Factors */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">What Influenced Your Skin</h2>
        
        <div className="space-y-4">
          {/* Positive Factors */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium text-green-600 mb-2">Positive Impact</h3>
              <ul className="space-y-2">
                {positiveFactors.map((factor, index) => (
                  <li key={index} className="flex justify-between text-sm">
                    <span>{factor.name}</span>
                    <span className="font-medium text-green-600">{factor.impact}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          {/* Negative Factors */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium text-red-600 mb-2">Negative Impact</h3>
              <ul className="space-y-2">
                {negativeFactors.map((factor, index) => (
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
      
      {/* 6. Monthly Analysis Link */}
      <div>
        <Link 
          to="/monthly-analysis"
          className="block bg-slate-100 hover:bg-slate-200 transition-colors p-4 rounded-lg text-center"
        >
          View Monthly Analysis
        </Link>
      </div>
    </div>
  );
};

export default WeeklySkinAnalysis;
