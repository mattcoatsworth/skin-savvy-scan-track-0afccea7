import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import BackButton from "@/components/BackButton";
import TrendChart from "@/components/TrendChart";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import SkinIndexComparison from "@/components/SkinIndexComparison";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { useSkinAdvice } from "@/hooks/useSkinAdvice";
import { useAIContentCache } from "@/hooks/useAIContentCache";
import ViewScoringMethod from "@/components/ViewScoringMethod";
import Disclaimer from "@/components/Disclaimer";
import { Badge } from "@/components/ui/badge";
import { getRatingColor, getRatingBgColor, getRatingLabel } from "@/utils/skin-utils";

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

  // AI Analysis data using our hooks
  const { getAdvice, isLoading } = useSkinAdvice({
    adviceType: "weekly-insight",
    model: "gpt-4o-mini"
  });
  
  const { getOrGenerate } = useAIContentCache();
  
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
      
      {/* 2. Daily Scores - Updated with circular rating display */}
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
                  <div className="flex flex-col items-center">
                    {/* Updated Rating Circle to match Weekly Skin Report */}
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: getRatingBgColor(day.score) }}
                    >
                      <span 
                        className="text-lg font-semibold"
                        style={{ color: getRatingColor(day.score) }}
                      >
                        {day.score}
                      </span>
                    </div>
                    <span 
                      className="text-xs mt-1 font-medium"
                      style={{ color: getRatingColor(day.score) }}
                    >
                      {getRatingLabel(day.score)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* 3. Skin Index Comparison */}
      <div className="mb-6">
        <SkinIndexComparison gender="female" age={28} />
      </div>
      
      {/* AI Analysis Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">AI Skin Analysis</h2>
        <Card className="mb-4">
          <CardContent className="p-4 space-y-4">
            <div>
              <h3 className="font-medium text-base mb-2">Weekly Pattern Analysis</h3>
              <p className="text-sm text-muted-foreground">{aiAnalysis.patternAnalysis}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-base mb-2">Detected Patterns</h3>
              <div className="space-y-3">
                {aiAnalysis.detectedPatterns.map((pattern, index) => (
                  <div key={index} className="bg-slate-50 p-3 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-500">{pattern.category}</span>
                      <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-0.5 rounded">
                        {pattern.correlation}% correlation
                      </span>
                    </div>
                    <h4 className="font-medium my-1">{pattern.title}</h4>
                    <p className="text-sm text-muted-foreground">{pattern.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-base mb-2">Focus Areas</h3>
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
            </div>
            
            <div>
              <h3 className="font-medium text-base mb-2">Weekly Metrics</h3>
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
            </div>
            
            <div>
              <h3 className="font-medium text-base mb-2">Weekly Challenges</h3>
              <div className="space-y-3">
                {aiAnalysis.challenges.map((challenge, index) => (
                  <div key={index} className="bg-slate-50 p-3 rounded-lg">
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
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
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
      <div className="mb-6">
        <Link 
          to="/monthly-analysis"
          className="block bg-slate-100 hover:bg-slate-200 transition-colors p-4 rounded-lg text-center"
        >
          View Monthly Analysis
        </Link>
      </div>
      
      {/* 7. View Scoring Method */}
      <ViewScoringMethod />
      
      {/* 8. Disclaimer */}
      <Disclaimer />
    </div>
  );
};

export default WeeklySkinAnalysis;
