
import React from "react";
import { useParams } from "react-router-dom";
import BackButton from "@/components/BackButton";
import { Card, CardContent } from "@/components/ui/card";
import { Salad, Pill, Palette, CloudSun, MoonStar, Activity, ArrowRight } from "lucide-react";
import TrendChart from "@/components/TrendChart";
import { Progress } from "@/components/ui/progress";

const FactorAnalysisDetail = () => {
  const { factorType } = useParams();
  
  // Get factor data based on the factorType
  const getFactorData = () => {
    // In a real app, this would fetch data for the specific factor
    // For now, we'll use sample data
    
    switch (factorType) {
      case 'food':
        return {
          title: "Food Impact Analysis",
          icon: <Salad className="h-8 w-8 mr-2" />,
          status: "Hydrating",
          description: "Your food choices are supporting your skin health well.",
          details: "Increased water-rich foods and avoided dairy this week. Your intake of antioxidant-rich fruits and vegetables has been consistent.",
          score: 75,
          trend: [
            { date: "Mon", value: 60 },
            { date: "Tue", value: 65 },
            { date: "Wed", value: 68 },
            { date: "Thu", value: 70 },
            { date: "Fri", value: 74 },
            { date: "Sat", value: 78 },
            { date: "Sun", value: 75 }
          ],
          subFactors: [
            { name: "Hydration", impact: "positive", score: 85, details: "8+ glasses daily" },
            { name: "Dairy", impact: "negative", score: 40, details: "Moderate consumption" },
            { name: "Fruits & Vegetables", impact: "positive", score: 80, details: "5+ servings daily" },
            { name: "Processed foods", impact: "negative", score: 60, details: "Limited intake" }
          ],
          recommendations: [
            "Continue high water intake",
            "Consider reducing dairy consumption further",
            "Maintain high intake of antioxidant-rich foods",
            "Try adding more omega-3 rich foods like salmon or walnuts"
          ]
        };
      case 'supplement':
        return {
          title: "Supplement Impact Analysis",
          icon: <Pill className="h-8 w-8 mr-2" />,
          status: "New",
          description: "Your new supplement regimen is showing promising results.",
          details: "Started collagen supplement 3 days ago. Initial results are positive with improved skin elasticity.",
          score: 70,
          trend: [
            { date: "Mon", value: 55 },
            { date: "Tue", value: 55 },
            { date: "Wed", value: 58 },
            { date: "Thu", value: 62 },
            { date: "Fri", value: 65 },
            { date: "Sat", value: 68 },
            { date: "Sun", value: 70 }
          ],
          subFactors: [
            { name: "Collagen", impact: "positive", score: 75, details: "Started 3 days ago" },
            { name: "Vitamin D", impact: "positive", score: 80, details: "Daily intake" },
            { name: "Multivitamin", impact: "neutral", score: 65, details: "Regular use" },
          ],
          recommendations: [
            "Continue collagen supplement to see full results",
            "Maintain vitamin D supplementation",
            "Consider adding hyaluronic acid supplement"
          ]
        };
      case 'makeup':
        return {
          title: "Makeup Impact Analysis",
          icon: <Palette className="h-8 w-8 mr-2" />,
          status: "Same as usual",
          description: "Your makeup routine is consistent and not causing issues.",
          details: "Using the same foundation and concealer with proper removal each night.",
          score: 80,
          trend: [
            { date: "Mon", value: 78 },
            { date: "Tue", value: 79 },
            { date: "Wed", value: 80 },
            { date: "Thu", value: 80 },
            { date: "Fri", value: 81 },
            { date: "Sat", value: 82 },
            { date: "Sun", value: 80 }
          ],
          subFactors: [
            { name: "Foundation", impact: "neutral", score: 75, details: "Non-comedogenic" },
            { name: "Makeup Removal", impact: "positive", score: 90, details: "Thorough cleansing" },
            { name: "Makeup Duration", impact: "neutral", score: 70, details: "8+ hours daily" }
          ],
          recommendations: [
            "Continue proper makeup removal routine",
            "Consider switching to a foundation with SPF protection",
            "Try letting skin breathe makeup-free one day per week"
          ]
        };
      case 'weather':
        return {
          title: "Weather Impact Analysis",
          icon: <CloudSun className="h-8 w-8 mr-2" />,
          status: "Dry + Cold",
          description: "Current weather conditions are challenging for skin health.",
          details: "Low humidity affecting skin hydration. Additional moisturizing recommended.",
          score: 55,
          trend: [
            { date: "Mon", value: 60 },
            { date: "Tue", value: 58 },
            { date: "Wed", value: 56 },
            { date: "Thu", value: 55 },
            { date: "Fri", value: 54 },
            { date: "Sat", value: 55 },
            { date: "Sun", value: 55 }
          ],
          subFactors: [
            { name: "Humidity", impact: "negative", score: 40, details: "Low indoor & outdoor" },
            { name: "Temperature", impact: "negative", score: 45, details: "Cold air exposure" },
            { name: "Sun Exposure", impact: "neutral", score: 70, details: "Limited exposure" }
          ],
          recommendations: [
            "Use a humidifier in your bedroom",
            "Apply heavier moisturizer before going outside",
            "Consider adding a hydrating face mist throughout the day",
            "Continue SPF use despite cloudy conditions"
          ]
        };
      case 'sleep':
        return {
          title: "Sleep Impact Analysis",
          icon: <MoonStar className="h-8 w-8 mr-2" />,
          status: "Improved",
          description: "Your sleep quality has improved, benefiting skin recovery.",
          details: "Getting 7+ hours consistently this week. Skin appears more rested and recovery is improved.",
          score: 85,
          trend: [
            { date: "Mon", value: 75 },
            { date: "Tue", value: 78 },
            { date: "Wed", value: 80 },
            { date: "Thu", value: 82 },
            { date: "Fri", value: 84 },
            { date: "Sat", value: 86 },
            { date: "Sun", value: 85 }
          ],
          subFactors: [
            { name: "Duration", impact: "positive", score: 85, details: "7+ hours nightly" },
            { name: "Quality", impact: "positive", score: 80, details: "Few disruptions" },
            { name: "Consistency", impact: "positive", score: 75, details: "Regular schedule" }
          ],
          recommendations: [
            "Maintain current sleep schedule",
            "Consider silk pillowcase to reduce friction",
            "Apply night-time skincare 30 minutes before bed for better absorption"
          ]
        };
      case 'stress':
        return {
          title: "Stress Impact Analysis",
          icon: <Activity className="h-8 w-8 mr-2" />,
          status: "Moderate",
          description: "Your stress levels are having some negative impact on skin health.",
          details: "Work deadline approaching. Stress-related inflammation observed around T-zone.",
          score: 60,
          trend: [
            { date: "Mon", value: 70 },
            { date: "Tue", value: 68 },
            { date: "Wed", value: 65 },
            { date: "Thu", value: 62 },
            { date: "Fri", value: 60 },
            { date: "Sat", value: 60 },
            { date: "Sun", value: 60 }
          ],
          subFactors: [
            { name: "Work Stress", impact: "negative", score: 50, details: "Deadline pressure" },
            { name: "Relaxation", impact: "positive", score: 70, details: "Some meditation" },
            { name: "Physical Activity", impact: "positive", score: 75, details: "Regular exercise" }
          ],
          recommendations: [
            "Add 5-10 minutes of breathing exercises daily",
            "Consider a calming face mask twice this week",
            "Try facial massage to reduce tension",
            "Ensure adequate breaks during work periods"
          ]
        };
      default:
        return {
          title: "Factor Analysis",
          icon: null,
          status: "",
          description: "No data available for this factor.",
          details: "",
          score: 0,
          trend: [],
          subFactors: [],
          recommendations: []
        };
    }
  };
  
  const factorData = getFactorData();
  
  // Helper functions for UI colors
  const getScoreColor = (score: number) => {
    if (score >= 70) return "bg-green-500";
    if (score >= 40) return "bg-amber-500";
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
          <h1 className="text-2xl font-bold">{factorData.title}</h1>
        </header>
        
        <div className="space-y-6">
          {/* Overview Card */}
          <Card className="ios-card">
            <CardContent className="p-4">
              <div className="flex items-center mb-4">
                {factorData.icon}
                <div>
                  <h2 className="font-medium">Status: {factorData.status}</h2>
                  <p className="text-xl font-semibold">{factorData.description}</p>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                {factorData.details}
              </p>
              
              <div className="mt-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Overall Impact</span>
                  <span className="text-sm font-medium">{factorData.score}/100</span>
                </div>
                <Progress value={factorData.score} className="h-2" indicatorClassName={getScoreColor(factorData.score)} />
              </div>
            </CardContent>
          </Card>
          
          {/* Trend Analysis */}
          <Card className="ios-card">
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold mb-3">Weekly Trend</h2>
              
              {factorData.trend.length > 0 ? (
                <TrendChart data={factorData.trend} height={160} />
              ) : (
                <p className="text-sm text-muted-foreground">No trend data available.</p>
              )}
            </CardContent>
          </Card>
          
          {/* Sub-factors Analysis */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Detailed Breakdown</h2>
            <div className="space-y-3">
              {factorData.subFactors.map((subFactor, index) => (
                <Card key={index} className="ios-card">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{subFactor.name}</h3>
                        <p className="text-sm text-muted-foreground">{subFactor.details}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${getImpactColor(subFactor.impact)}`}>
                        {subFactor.impact === "positive" ? "Positive" : 
                         subFactor.impact === "negative" ? "Negative" : "Neutral"}
                      </span>
                    </div>
                    
                    <div className="mt-3">
                      <div className="flex justify-between mb-1">
                        <span className="text-xs">Impact</span>
                        <span className="text-xs font-medium">{subFactor.score}/100</span>
                      </div>
                      <Progress value={subFactor.score} className="h-2" indicatorClassName={getScoreColor(subFactor.score)} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Recommendations */}
          <Card className="ios-card">
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold mb-3">Recommendations</h2>
              
              <ul className="space-y-2">
                {factorData.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span className="text-sm">{recommendation}</span>
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

export default FactorAnalysisDetail;
