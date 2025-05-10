import React from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Calendar, Apple, Pill, Moon, Droplet, Activity, Thermometer, Eye, Sun } from "lucide-react";
import BackButton from "@/components/BackButton";
import TrendChart from "@/components/TrendChart";
import useScrollToTop from "@/hooks/useScrollToTop";

type Factor = {
  name: string;
  impact: "positive" | "negative" | "neutral";
  rating: number;
  details: string;
  trend?: { date: string; value: number }[];
};

const CategoryAnalysisDetail = () => {
  const { category } = useParams<{ category: string }>();
  // Apply the scroll to top hook
  useScrollToTop();

  // Get icon for category
  const getCategoryIcon = (category: string | undefined) => {
    switch (category?.toLowerCase()) {
      case "food":
        return <Apple className="h-6 w-6" />;
      case "products":
        return <Pill className="h-6 w-6" />;
      case "sleep":
        return <Moon className="h-6 w-6" />;
      case "stress":
        return <Activity className="h-6 w-6" />;
      case "hydration":
        return <Droplet className="h-6 w-6" />;
      case "environment":
        return <Thermometer className="h-6 w-6" />;
      case "skin":
        return <Eye className="h-6 w-6" />;
      default:
        return <Sun className="h-6 w-6" />;
    }
  };

  // Generate mock data for the category
  const generateMockData = () => {
    const score = Math.floor(Math.random() * (90 - 60 + 1)) + 60;
    const weeklyTrendData = [
      { date: "Mon", value: Math.floor(Math.random() * (90 - 50 + 1)) + 50 },
      { date: "Tue", value: Math.floor(Math.random() * (90 - 50 + 1)) + 50 },
      { date: "Wed", value: Math.floor(Math.random() * (90 - 50 + 1)) + 50 },
      { date: "Thu", value: Math.floor(Math.random() * (90 - 50 + 1)) + 50 },
      { date: "Fri", value: Math.floor(Math.random() * (90 - 50 + 1)) + 50 },
      { date: "Sat", value: Math.floor(Math.random() * (90 - 50 + 1)) + 50 },
      { date: "Sun", value: Math.floor(Math.random() * (90 - 50 + 1)) + 50 }
    ];
    
    let factors: Factor[] = [];
    
    switch(category?.toLowerCase()) {
      case "food":
        factors = [
          {
            name: "Hydration",
            impact: "positive",
            rating: 85,
            details: "Consistently drinking 8+ cups of water daily has significantly improved skin hydration levels.",
            trend: weeklyTrendData.map(item => ({ ...item, value: item.value + Math.floor(Math.random() * 10) }))
          },
          {
            name: "Dairy",
            impact: "negative",
            rating: 35,
            details: "Consumed dairy products on 4/7 days, showing strong correlation with inflammation and breakouts within 24-48 hours.",
            trend: weeklyTrendData.map(item => ({ ...item, value: Math.max(30, item.value - Math.floor(Math.random() * 20)) }))
          },
          {
            name: "Fruits & Vegetables",
            impact: "positive",
            rating: 78,
            details: "Averaged 5 servings daily, providing essential vitamins and antioxidants that support skin cell repair.",
            trend: weeklyTrendData.map(item => ({ ...item, value: item.value + Math.floor(Math.random() * 15) }))
          },
          {
            name: "Sugar",
            impact: "negative",
            rating: 45,
            details: "Moderate sugar intake, possible correlation with increased oil production and breakouts.",
            trend: weeklyTrendData.map(item => ({ ...item, value: Math.max(30, item.value - Math.floor(Math.random() * 15)) }))
          }
        ];
        break;
      case "products":
        factors = [
          {
            name: "Sunscreen",
            impact: "positive",
            rating: 95,
            details: "Daily application of SPF 50, effectively preventing UV damage and protecting the skin barrier.",
            trend: weeklyTrendData.map(item => ({ ...item, value: Math.min(95, item.value + Math.floor(Math.random() * 15)) }))
          },
          {
            name: "Retinol",
            impact: "positive",
            rating: 88,
            details: "Used 3 times this week, showing visible improvement in skin texture and reduction in fine lines.",
            trend: weeklyTrendData.map(item => ({ ...item, value: Math.min(90, item.value + Math.floor(Math.random() * 10)) }))
          },
          {
            name: "Moisturizer",
            impact: "neutral",
            rating: 60,
            details: "Started using new formula 3 days ago, no significant effect yet but no adverse reactions either.",
            trend: weeklyTrendData.map(item => ({ ...item, value: item.value + Math.floor(Math.random() * 5) - 2 }))
          }
        ];
        break;
      case "sleep":
        factors = [
          {
            name: "Sleep Duration",
            impact: "neutral",
            rating: 60,
            details: "Average of 6.5 hours nightly, slightly below the recommended 7-8 hours for optimal skin recovery.",
            trend: weeklyTrendData.map(item => ({ ...item, value: item.value - Math.floor(Math.random() * 10) + 5 }))
          },
          {
            name: "Sleep Quality",
            impact: "positive",
            rating: 75,
            details: "Few disruptions, generally restful sleep allowing for skin cell regeneration.",
            trend: weeklyTrendData.map(item => ({ ...item, value: item.value + Math.floor(Math.random() * 10) }))
          },
          {
            name: "Sleep Schedule",
            impact: "negative",
            rating: 40,
            details: "Inconsistent bedtimes, affecting cortisol levels which may contribute to skin inflammation.",
            trend: weeklyTrendData.map(item => ({ ...item, value: Math.max(30, item.value - Math.floor(Math.random() * 15)) }))
          }
        ];
        break;
      case "stress":
        factors = [
          {
            name: "Work Pressure",
            impact: "negative",
            rating: 40,
            details: "High stress levels on 3/7 days, correlating with increased skin inflammation and breakouts.",
            trend: weeklyTrendData.map(item => ({ ...item, value: Math.max(30, item.value - Math.floor(Math.random() * 20)) }))
          },
          {
            name: "Relaxation",
            impact: "positive",
            rating: 70,
            details: "Incorporated 15-minute meditation sessions on 4/7 days, showing improvement in overall skin tone.",
            trend: weeklyTrendData.map(item => ({ ...item, value: item.value + Math.floor(Math.random() * 15) }))
          },
          {
            name: "Physical Activity",
            impact: "positive",
            rating: 65,
            details: "Moderate exercise 3 times this week, increasing blood flow and helping to clear toxins.",
            trend: weeklyTrendData.map(item => ({ ...item, value: item.value + Math.floor(Math.random() * 10) }))
          }
        ];
        break;
      case "environment":
        factors = [
          {
            name: "Humidity",
            impact: "positive",
            rating: 85,
            details: "Optimal humidity levels (40-60%) maintaining skin hydration and preventing transepidermal water loss.",
            trend: weeklyTrendData.map(item => ({ ...item, value: Math.min(90, item.value + Math.floor(Math.random() * 10)) }))
          },
          {
            name: "Pollution",
            impact: "negative",
            rating: 60,
            details: "Moderate exposure to urban pollutants, potentially contributing to dullness and clogged pores.",
            trend: weeklyTrendData.map(item => ({ ...item, value: Math.max(40, item.value - Math.floor(Math.random() * 15)) }))
          },
          {
            name: "Temperature",
            impact: "neutral",
            rating: 70,
            details: "Mild temperatures throughout the week, no extreme conditions affecting skin barrier.",
            trend: weeklyTrendData.map(item => ({ ...item, value: item.value + Math.floor(Math.random() * 5) - 2 }))
          }
        ];
        break;
      default:
        factors = [
          {
            name: "General Factor",
            impact: "neutral",
            rating: 65,
            details: "This is a generic factor for this category.",
            trend: weeklyTrendData.map(item => ({ ...item, value: item.value + Math.floor(Math.random() * 10) - 5 }))
          }
        ];
    }
    
    return {
      categoryName: category ? category.charAt(0).toUpperCase() + category.slice(1) : "Unknown",
      score,
      weeklyTrend: weeklyTrendData,
      factors,
      tips: [
        "Tip 1 for improving this category",
        "Tip 2 with specific actions to take",
        "Tip 3 with product or lifestyle recommendations"
      ]
    };
  };

  const data = generateMockData();

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

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6">
          <BackButton />
          <div className="flex items-center mt-2">
            {getCategoryIcon(category)}
            <h1 className="text-2xl font-bold ml-2">{data.categoryName} Analysis</h1>
          </div>
          <div className="flex items-center text-sm text-muted-foreground mt-1">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Last 7 days</span>
          </div>
        </header>

        {/* Overall Score Card */}
        <Card className="ios-card mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">{data.categoryName} Score</h2>
                <p className="text-sm text-muted-foreground">Week Average</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="relative w-20 h-20 flex items-center justify-center">
                  {/* Background circle */}
                  <svg className="w-20 h-20 absolute" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke={getBackgroundColor(data.score)}
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                  
                  {/* Foreground circle - the actual progress */}
                  <svg className="w-20 h-20 absolute" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke={getProgressColor(data.score)}
                      strokeWidth="4"
                      strokeDasharray={`${data.score}, 100`}
                      strokeLinecap="round"
                    />
                  </svg>
                  
                  {/* Rating number in the center */}
                  <div className="text-xl font-semibold">
                    {data.score}
                  </div>
                </div>
                <span className="text-sm font-medium mt-1">
                  {getRatingLabel(data.score)}
                </span>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm font-medium mb-2">Weekly Trend:</p>
              <TrendChart 
                data={data.weeklyTrend} 
                height={80} 
                showLabels={false}
                className="mt-2"
              />
            </div>
          </CardContent>
        </Card>

        {/* Factors Analysis */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Key Factors</h2>
          <div className="space-y-4">
            {data.factors.map((factor, idx) => (
              <Card key={idx} className="ios-card">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{factor.name}</h3>
                      <div className="flex items-center mt-1">
                        <div className={`w-3 h-3 rounded-full mr-2 ${
                          factor.impact === 'positive' 
                            ? 'bg-green-500' 
                            : factor.impact === 'negative' 
                              ? 'bg-red-500' 
                              : 'bg-yellow-500'
                        }`}></div>
                        <span className="text-sm capitalize">{factor.impact} Impact</span>
                      </div>
                    </div>
                    <div className="relative w-12 h-12 flex items-center justify-center">
                      <svg className="w-12 h-12 absolute" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke={getBackgroundColor(factor.rating)}
                          strokeWidth="4"
                          strokeLinecap="round"
                        />
                      </svg>
                      <svg className="w-12 h-12 absolute" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke={getProgressColor(factor.rating)}
                          strokeWidth="4"
                          strokeDasharray={`${factor.rating}, 100`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="text-sm font-semibold">{factor.rating}</div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mt-3 mb-4">{factor.details}</p>
                  
                  {factor.trend && (
                    <div>
                      <p className="text-xs font-medium mb-1">7-Day Trend:</p>
                      <TrendChart 
                        data={factor.trend} 
                        height={40} 
                        showLabels={false}
                        className="mt-2" 
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tips & Recommendations */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Tips & Recommendations</h2>
          <Card className="ios-card">
            <CardContent className="p-4">
              <ul className="space-y-3">
                {data.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span className="text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Related Categories */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Related Categories</h2>
          <div className="grid grid-cols-2 gap-3">
            {['stress', 'sleep', 'food', 'products', 'environment']
              .filter(c => c !== category)
              .slice(0, 2)
              .map((relatedCategory, idx) => (
                <Link to={`/category-analysis/${relatedCategory}`} key={idx} className="block">
                  <Card className="ios-card hover:shadow-md transition-all">
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {getCategoryIcon(relatedCategory)}
                          <h3 className="text-sm font-medium ml-2 capitalize">{relatedCategory}</h3>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryAnalysisDetail;
