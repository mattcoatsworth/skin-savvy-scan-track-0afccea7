
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Salad, Pill, Palette, CloudSun, MoonStar, Activity, ArrowLeft } from "lucide-react";
import BackButton from "@/components/BackButton";
import TrendChart from "@/components/TrendChart";

type FactorData = {
  title: string;
  icon: React.ReactNode;
  description: string;
  impact: "positive" | "negative" | "neutral";
  score: number;
  details: string[];
  recommendations: string[];
  trendData: Array<{ date: string; value: number }>;
};

const FactorAnalysisDetail = () => {
  const { factorType } = useParams<{ factorType: string }>();
  const navigate = useNavigate();

  // Mock data for different factor types
  const getFactorData = (): FactorData => {
    switch (factorType) {
      case "food":
        return {
          title: "Food & Nutrition",
          icon: <Salad className="h-8 w-8" />,
          description: "Your diet has been generally hydrating this week with good nutrient intake.",
          impact: "positive",
          score: 78,
          details: [
            "Increased water-rich foods (cucumber, watermelon) correlated with improved skin hydration",
            "Reduced dairy consumption over the past 5 days showed decreased inflammation",
            "Consistent antioxidant intake through berries and leafy greens",
            "Higher protein consumption supporting collagen production"
          ],
          recommendations: [
            "Continue minimizing dairy consumption",
            "Consider adding more omega-3 rich foods like salmon or flaxseeds",
            "Maintain current hydration levels with water-rich foods"
          ],
          trendData: [
            { date: "Mon", value: 60 },
            { date: "Tue", value: 65 },
            { date: "Wed", value: 70 },
            { date: "Thu", value: 75 },
            { date: "Fri", value: 80 },
            { date: "Sat", value: 82 },
            { date: "Sun", value: 78 }
          ]
        };
      case "supplement":
        return {
          title: "Supplements",
          icon: <Pill className="h-8 w-8" />,
          description: "You started a new collagen supplement that may be affecting your skin.",
          impact: "neutral",
          score: 65,
          details: [
            "Started collagen supplement 3 days ago",
            "Too early to determine definitive impact",
            "No negative reactions observed",
            "Previous vitamin C supplement continues to show positive results"
          ],
          recommendations: [
            "Continue collagen supplement for at least 3-4 weeks to evaluate effects",
            "Consider pairing with vitamin C for enhanced collagen synthesis",
            "Document any changes in skin elasticity or hydration"
          ],
          trendData: [
            { date: "Mon", value: 50 },
            { date: "Tue", value: 55 },
            { date: "Wed", value: 60 },
            { date: "Thu", value: 60 },
            { date: "Fri", value: 65 },
            { date: "Sat", value: 65 },
            { date: "Sun", value: 70 }
          ]
        };
      case "makeup":
        return {
          title: "Makeup & Cosmetics",
          icon: <Palette className="h-8 w-8" />,
          description: "Your cosmetic routine has remained consistent with no apparent irritation.",
          impact: "neutral",
          score: 70,
          details: [
            "Using the same foundation and concealer for 3 weeks",
            "No signs of clogged pores or irritation",
            "Consistent removal routine every evening",
            "Non-comedogenic products supporting skin health"
          ],
          recommendations: [
            "Continue current makeup removal routine",
            "Consider switching to a lighter foundation for summer months",
            "Ensure makeup brushes are cleaned weekly"
          ],
          trendData: [
            { date: "Mon", value: 70 },
            { date: "Tue", value: 70 },
            { date: "Wed", value: 68 },
            { date: "Thu", value: 72 },
            { date: "Fri", value: 70 },
            { date: "Sat", value: 71 },
            { date: "Sun", value: 70 }
          ]
        };
      case "weather":
        return {
          title: "Weather & Environment",
          icon: <CloudSun className="h-8 w-8" />,
          description: "Recent dry and cold weather conditions are affecting your skin hydration.",
          impact: "negative",
          score: 55,
          details: [
            "Low humidity (below 30%) for the past 5 days",
            "Cold temperatures leading to drier skin surface",
            "Increased indoor heating contributing to moisture loss",
            "Wind exposure causing mild irritation"
          ],
          recommendations: [
            "Use a humidifier in your home, especially while sleeping",
            "Apply heavier moisturizer during cold weather periods",
            "Consider adding a hydrating serum to your routine",
            "Limit hot shower duration which can further dry skin"
          ],
          trendData: [
            { date: "Mon", value: 70 },
            { date: "Tue", value: 65 },
            { date: "Wed", value: 60 },
            { date: "Thu", value: 58 },
            { date: "Fri", value: 55 },
            { date: "Sat", value: 52 },
            { date: "Sun", value: 55 }
          ]
        };
      case "sleep":
        return {
          title: "Sleep Quality",
          icon: <MoonStar className="h-8 w-8" />,
          description: "Your sleep has improved this week, positively affecting your skin's recovery.",
          impact: "positive",
          score: 85,
          details: [
            "Averaging 7+ hours of sleep consistently this week",
            "Earlier bedtime supporting skin's natural repair cycle",
            "Reduced screen time before bed improving sleep quality",
            "Less overnight oil production with better sleep"
          ],
          recommendations: [
            "Maintain current sleep schedule",
            "Consider using a silk pillowcase to reduce friction",
            "Stay hydrated before bed without excessive fluid intake",
            "Continue reducing blue light exposure before sleep"
          ],
          trendData: [
            { date: "Mon", value: 60 },
            { date: "Tue", value: 65 },
            { date: "Wed", value: 72 },
            { date: "Thu", value: 75 },
            { date: "Fri", value: 80 },
            { date: "Sat", value: 85 },
            { date: "Sun", value: 85 }
          ]
        };
      case "stress":
        return {
          title: "Stress Levels",
          icon: <Activity className="h-8 w-8" />,
          description: "Your stress levels are moderate with upcoming work deadlines affecting skin.",
          impact: "negative",
          score: 60,
          details: [
            "Work deadline approaching leading to moderate stress",
            "Cortisol fluctuations affecting oil production",
            "Implemented breathing exercises on 3 days showing improvement",
            "Stress-related breakout around chin area"
          ],
          recommendations: [
            "Continue daily breathing or meditation practice",
            "Consider stress-reducing activities like walking or yoga",
            "Apply targeted treatments to stress-induced breakouts",
            "Maintain skincare routine even during busy periods"
          ],
          trendData: [
            { date: "Mon", value: 75 },
            { date: "Tue", value: 70 },
            { date: "Wed", value: 68 },
            { date: "Thu", value: 65 },
            { date: "Fri", value: 60 },
            { date: "Sat", value: 62 },
            { date: "Sun", value: 60 }
          ]
        };
      case "skin":
        return {
          title: "Overall Skin Health",
          icon: <Activity className="h-8 w-8" />,
          description: "Your skin appears balanced with good hydration and minimal irritation.",
          impact: "positive",
          score: 78,
          details: [
            "Hydration levels improved compared to last week",
            "Reduced redness and inflammation around T-zone",
            "Consistent skincare routine showing positive results",
            "Slight dryness around cheeks likely weather-related"
          ],
          recommendations: [
            "Add extra hydration to cheek area",
            "Continue current cleanser which is working well",
            "Consider adding a weekly hydrating mask",
            "Maintain SPF application even on cloudy days"
          ],
          trendData: [
            { date: "Mon", value: 65 },
            { date: "Tue", value: 68 },
            { date: "Wed", value: 70 },
            { date: "Thu", value: 72 },
            { date: "Fri", value: 75 },
            { date: "Sat", value: 78 },
            { date: "Sun", value: 78 }
          ]
        };
      default:
        return {
          title: "Unknown Factor",
          icon: <Activity className="h-8 w-8" />,
          description: "No data available for this factor type.",
          impact: "neutral",
          score: 50,
          details: ["No detailed information available"],
          recommendations: ["Return to main analysis"],
          trendData: [
            { date: "Mon", value: 50 },
            { date: "Tue", value: 50 },
            { date: "Wed", value: 50 },
            { date: "Thu", value: 50 },
            { date: "Fri", value: 50 },
            { date: "Sat", value: 50 },
            { date: "Sun", value: 50 }
          ]
        };
    }
  };

  const factorData = getFactorData();
  
  const getImpactClass = (impact: string) => {
    switch (impact) {
      case "positive":
        return "bg-green-100 text-green-800";
      case "negative":
        return "bg-red-100 text-red-800";
      case "neutral":
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6">
          <BackButton />
          <h1 className="text-2xl font-bold">{factorData.title}</h1>
        </header>
        
        <div className="space-y-6">
          {/* Overview Card */}
          <Card className="ios-card">
            <CardContent className="p-4">
              <div className="flex items-center mb-4">
                <div className="mr-4 p-2 rounded-full bg-slate-100">
                  {factorData.icon}
                </div>
                <div>
                  <div className={`inline-block px-2 py-1 rounded-full text-xs ${getImpactClass(factorData.impact)} mb-1`}>
                    {factorData.impact.charAt(0).toUpperCase() + factorData.impact.slice(1)} Impact
                  </div>
                  <div className="text-lg font-semibold">Score: {factorData.score}/100</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {factorData.description}
              </p>
            </CardContent>
          </Card>
          
          {/* Trend Chart */}
          <div>
            <h2 className="text-lg font-semibold mb-3">7-Day Trend</h2>
            <Card className="ios-card">
              <CardContent className="p-4">
                <TrendChart data={factorData.trendData} height={120} />
              </CardContent>
            </Card>
          </div>
          
          {/* Details */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Detailed Analysis</h2>
            <Card className="ios-card">
              <CardContent className="p-4">
                <ul className="space-y-2">
                  {factorData.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span className="text-sm">{detail}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          
          {/* Recommendations */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Recommendations</h2>
            <Card className="ios-card">
              <CardContent className="p-4">
                <ul className="space-y-2">
                  {factorData.recommendations.map((rec, idx) => (
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
    </div>
  );
};

export default FactorAnalysisDetail;
