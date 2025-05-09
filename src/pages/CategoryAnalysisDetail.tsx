
import React from "react";
import { useParams, Link } from "react-router-dom";
import { format, subDays } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import BackButton from "@/components/BackButton";
import TrendChart from "@/components/TrendChart";
import { 
  Calendar, 
  Droplet, 
  Apple, 
  Pill, 
  Moon, 
  Sun, 
  Activity,
  Thermometer,
  Eye
} from "lucide-react";

type Factor = {
  name: string;
  impact: "positive" | "negative" | "neutral";
  rating: number;
  details: string;
  trend?: { date: string; value: number }[];
};

const CategoryAnalysisDetail = () => {
  const { category } = useParams<{ category: string }>();
  
  // Generate mock data based on the category
  const getCategoryData = () => {
    const today = new Date();
    
    // Generate weekly trend data
    const generateTrendData = () => {
      return Array(7).fill(null).map((_, index) => {
        const date = subDays(today, 6 - index);
        return {
          date: format(date, "EEE"),
          value: Math.floor(Math.random() * (95 - 40 + 1)) + 40
        };
      });
    };
    
    const baseFactors: Record<string, Factor[]> = {
      food: [
        {
          name: "Hydration",
          impact: "positive",
          rating: 85,
          details: "Consistently drinking 8+ cups of water daily. Proper hydration is essential for skin health and has been shown to reduce dryness and improve elasticity.",
          trend: generateTrendData()
        },
        {
          name: "Dairy",
          impact: "negative",
          rating: 35,
          details: "Consumed dairy products on 4/7 days, correlating with inflammation. Studies suggest dairy may trigger inflammatory responses in some individuals, potentially leading to acne and redness.",
          trend: generateTrendData()
        },
        {
          name: "Fruits & Vegetables",
          impact: "positive",
          rating: 78,
          details: "Averaged 5 servings daily, good antioxidant intake. Antioxidants from fruits and vegetables help protect skin cells from damage and promote a healthier complexion.",
          trend: generateTrendData()
        },
        {
          name: "Sugar",
          impact: "negative",
          rating: 45,
          details: "Moderate sugar intake, possible correlation with breakouts. High sugar consumption can lead to glycation, a process that damages collagen and can accelerate skin aging.",
          trend: generateTrendData()
        }
      ],
      products: [
        {
          name: "Sunscreen",
          impact: "positive",
          rating: 95,
          details: "Daily application, preventing UV damage. Consistent sunscreen use is one of the most effective ways to prevent premature aging and reduce risk of skin cancer.",
          trend: generateTrendData()
        },
        {
          name: "Retinol",
          impact: "positive",
          rating: 88,
          details: "Used 3 times this week, improving cell turnover. Retinol helps to increase skin cell production and unclog pores, resulting in smoother, clearer skin over time.",
          trend: generateTrendData()
        },
        {
          name: "New Moisturizer",
          impact: "neutral",
          rating: 60,
          details: "Started using 3 days ago, no significant effect yet. New skincare products typically require 4-6 weeks of consistent use before results become apparent.",
          trend: generateTrendData()
        }
      ],
      sleep: [
        {
          name: "Sleep Duration",
          impact: "neutral",
          rating: 60,
          details: "Average 6.5 hours, slightly below optimal range. During sleep, the body repairs skin cells and produces collagen. Aim for 7-9 hours for optimal skin health.",
          trend: generateTrendData()
        },
        {
          name: "Sleep Quality",
          impact: "positive",
          rating: 75,
          details: "Few disruptions, generally restful. Quality sleep allows for better cell regeneration and helps reduce stress hormones that can negatively impact skin.",
          trend: generateTrendData()
        },
        {
          name: "Sleep Position",
          impact: "negative",
          rating: 40,
          details: "Predominantly sleeping on side or stomach can lead to sleep wrinkles over time. Consider sleeping on your back to reduce facial pressure.",
          trend: generateTrendData()
        }
      ],
      stress: [
        {
          name: "Work Pressure",
          impact: "negative",
          rating: 40,
          details: "High stress levels on 3 days, correlating with skin inflammation. Stress triggers cortisol production, which can increase oil production and inflammation in the skin.",
          trend: generateTrendData()
        },
        {
          name: "Relaxation",
          impact: "positive",
          rating: 70,
          details: "Incorporated meditation on 4 days, improving overall skin tone. Mindfulness practices help reduce stress hormones and can improve circulation to the skin.",
          trend: generateTrendData()
        },
        {
          name: "Exercise",
          impact: "positive",
          rating: 65,
          details: "Regular moderate exercise improves circulation and helps deliver oxygen and nutrients to the skin, promoting a healthy glow.",
          trend: generateTrendData()
        }
      ],
      environment: [
        {
          name: "Humidity",
          impact: "positive",
          rating: 85,
          details: "Optimal humidity levels supporting skin hydration. Environmental humidity between 40-60% helps maintain skin's moisture barrier.",
          trend: generateTrendData()
        },
        {
          name: "Pollution",
          impact: "negative",
          rating: 60,
          details: "Moderate exposure to urban pollutants. Air pollution can contain free radicals that damage skin cells and accelerate aging.",
          trend: generateTrendData()
        },
        {
          name: "Indoor Heating/Cooling",
          impact: "negative",
          rating: 50,
          details: "HVAC systems can reduce indoor humidity and dry out skin. Consider using a humidifier to counteract these effects.",
          trend: generateTrendData()
        }
      ]
    };
    
    // Default to food category if the provided category doesn't exist
    return baseFactors[category || ""] || baseFactors.food;
  };
  
  const factors = getCategoryData();
  
  // Determine the overall score based on factor ratings
  const overallScore = Math.round(
    factors.reduce((sum, factor) => sum + factor.rating, 0) / factors.length
  );
  
  // Helper function to get category icon
  const getCategoryIcon = () => {
    switch (category?.toLowerCase()) {
      case "food":
        return <Apple className="h-6 w-6 mr-2" />;
      case "products":
        return <Pill className="h-6 w-6 mr-2" />;
      case "sleep":
        return <Moon className="h-6 w-6 mr-2" />;
      case "stress":
        return <Activity className="h-6 w-6 mr-2" />;
      case "hydration":
        return <Droplet className="h-6 w-6 mr-2" />;
      case "weather":
      case "environment":
        return <Thermometer className="h-6 w-6 mr-2" />;
      case "skin":
        return <Eye className="h-6 w-6 mr-2" />;
      default:
        return <Sun className="h-6 w-6 mr-2" />;
    }
  };
  
  // Helper function for color based on rating
  const getProgressColor = (rating: number) => {
    if (rating >= 70) return "#4ADE80"; // Green for good ratings
    if (rating >= 40) return "#FACC15"; // Yellow for medium ratings
    return "#F87171"; // Red for poor ratings
  };
  
  // Helper function for rating label
  const getRatingLabel = (rating: number) => {
    if (rating >= 80) return "Great";
    if (rating >= 60) return "Good";
    if (rating >= 40) return "OK";
    if (rating >= 20) return "Fair";
    return "Poor";
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6 flex items-center">
          <BackButton />
          <div className="flex items-center">
            {getCategoryIcon()}
            <h1 className="text-2xl font-bold capitalize">{category} Analysis</h1>
          </div>
        </header>
        
        {/* Overall Score Card */}
        <Card className="ios-card mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Overall {category?.charAt(0).toUpperCase() + category?.slice(1)} Impact</h2>
                <p className="text-sm text-muted-foreground">Weekly Average</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="relative w-16 h-16 flex items-center justify-center">
                  {/* Progress circle */}
                  <svg className="w-16 h-16 absolute" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke={getProgressColor(overallScore)}
                      strokeWidth="4"
                      strokeDasharray={`${overallScore}, 100`}
                      strokeLinecap="round"
                    />
                  </svg>
                  
                  {/* Rating number in the center */}
                  <div className="text-xl font-semibold">
                    {overallScore}
                  </div>
                </div>
                <span className="text-sm font-medium mt-1">
                  {getRatingLabel(overallScore)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Detailed Analysis */}
        <div className="space-y-6 mb-6">
          <h2 className="text-lg font-semibold mb-3">Detailed Analysis</h2>
          
          {factors.map((factor, index) => (
            <Card key={index} className="ios-card">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-medium">{factor.name}</h3>
                    <div className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mt-1 ${
                      factor.impact === 'positive' 
                        ? 'bg-green-100 text-green-800' 
                        : factor.impact === 'negative' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {factor.impact.charAt(0).toUpperCase() + factor.impact.slice(1)} Impact
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="relative w-10 h-10 mr-2 flex items-center justify-center">
                      <svg className="w-10 h-10 absolute" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke={getProgressColor(factor.rating)}
                          strokeWidth="4"
                          strokeDasharray={`${factor.rating}, 100`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="text-sm font-medium">{factor.rating}</div>
                    </div>
                    <span className="text-sm">{getRatingLabel(factor.rating)}</span>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">{factor.details}</p>
                
                {factor.trend && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Weekly Trend</h4>
                    <TrendChart data={factor.trend} height={60} />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Recommendations */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Recommendations</h2>
          <Card className="ios-card">
            <CardContent className="p-4">
              <ul className="space-y-2">
                {/* Generate recommendations based on category */}
                {category === "food" && (
                  <>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span className="text-sm">Continue hydration habits, aiming for 8+ cups daily</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span className="text-sm">Reduce dairy consumption for 1 week to test impact</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span className="text-sm">Maintain high fruit and vegetable intake</span>
                    </li>
                  </>
                )}
                {category === "products" && (
                  <>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span className="text-sm">Continue consistent sunscreen application</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span className="text-sm">Consider increasing retinol use to 4x weekly</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span className="text-sm">Continue with new moisturizer for at least 4 weeks</span>
                    </li>
                  </>
                )}
                {category === "sleep" && (
                  <>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span className="text-sm">Aim for 7+ hours of sleep consistently</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span className="text-sm">Try sleeping on your back to reduce facial compression</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span className="text-sm">Consider a silk pillowcase to reduce friction</span>
                    </li>
                  </>
                )}
                {category === "stress" && (
                  <>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span className="text-sm">Continue meditation practice, aim for daily</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span className="text-sm">Incorporate brief breathing exercises during high-stress moments</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span className="text-sm">Maintain regular exercise for stress reduction</span>
                    </li>
                  </>
                )}
                {(category === "environment" || category === "weather") && (
                  <>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span className="text-sm">Consider a humidifier for home use</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span className="text-sm">Double-cleanse when exposed to high pollution</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span className="text-sm">Use antioxidant serum as environmental protection</span>
                    </li>
                  </>
                )}
                {/* Default recommendations if category doesn't match */}
                {!["food", "products", "sleep", "stress", "environment", "weather"].includes(category || "") && (
                  <>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span className="text-sm">Continue monitoring this factor</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span className="text-sm">Make adjustments based on weekly patterns</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span className="text-sm">Consult your skincare specialist for personalized advice</span>
                    </li>
                  </>
                )}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CategoryAnalysisDetail;
