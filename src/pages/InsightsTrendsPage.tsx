
import React, { useState, useEffect } from "react";
import AppNavigation from "@/components/AppNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useParams, useLocation } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BackButton from "@/components/BackButton";
import { ChevronRight, TrendingUp, TrendingDown, BarChart } from "lucide-react";

type InsightType = {
  title: string;
  description: string;
  icon?: string;
  category: "positive" | "negative" | "neutral";
  timeframe: string;
  id?: string;
  detailedAnalysis?: string;
  relatedFactors?: string[];
  impactScore?: number;
  historicalData?: {
    date: string;
    value: number;
  }[];
};

const InsightsTrendsPage = () => {
  const { insightId } = useParams();
  const location = useLocation();
  const [selectedInsight, setSelectedInsight] = useState<InsightType | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  // Sample data
  const insights: InsightType[] = [
    {
      id: "collagen-supplements",
      title: "Collagen supplements",
      description: "Improved skin elasticity after 2 weeks of daily use",
      icon: "✨",
      category: "positive",
      timeframe: "This month",
      detailedAnalysis: "Your skin showed a 27% improvement in elasticity measurements after consistent use of collagen supplements for 14 days. The most noticeable changes were in the cheek and forehead areas.",
      relatedFactors: ["Hydration", "Vitamin C intake", "Sleep quality"],
      impactScore: 78,
      historicalData: [
        { date: "Week 1", value: 52 },
        { date: "Week 2", value: 65 },
        { date: "Week 3", value: 78 }
      ]
    },
    {
      id: "alcohol-consumption",
      title: "Alcohol consumption",
      description: "Correlates with next-day puffiness 3 times this month",
      icon: "🍷",
      category: "negative",
      timeframe: "This month",
      detailedAnalysis: "We've detected a pattern where alcohol consumption is followed by increased facial puffiness and dehydration within 24 hours. Your skin moisture levels dropped by an average of 15% after consuming alcoholic beverages.",
      relatedFactors: ["Dehydration", "Sleep disruption", "Inflammation"],
      impactScore: 32,
      historicalData: [
        { date: "Week 1", value: 65 },
        { date: "Week 2", value: 42 },
        { date: "Week 3", value: 32 }
      ]
    },
    {
      id: "vitamin-c",
      title: "Vitamin C serum",
      description: "Brightening effect noted after regular use",
      icon: "🍊",
      category: "positive",
      timeframe: "Last 3 weeks",
      detailedAnalysis: "Your skin tone has shown significant improvement with consistent use of Vitamin C serum. After 3 weeks of daily application, we've measured a 22% improvement in overall brightness and a reduction in dark spots.",
      relatedFactors: ["Sun exposure", "Antioxidant intake", "Exfoliation routine"],
      impactScore: 85,
      historicalData: [
        { date: "Week 1", value: 58 },
        { date: "Week 2", value: 72 },
        { date: "Week 3", value: 85 }
      ]
    },
    {
      id: "dairy",
      title: "Dairy products",
      description: "Possible link to mild breakouts along jawline",
      icon: "🥛",
      category: "negative",
      timeframe: "Ongoing pattern",
      detailedAnalysis: "We've observed a correlation between dairy consumption and mild acne breakouts, particularly along the jawline. When you consumed dairy products 3+ days in a row, breakouts increased by approximately 40% compared to dairy-free periods.",
      relatedFactors: ["Hormonal changes", "Sugar intake", "Gut health"],
      impactScore: 45,
      historicalData: [
        { date: "Week 1", value: 72 },
        { date: "Week 2", value: 58 },
        { date: "Week 3", value: 45 }
      ]
    },
    {
      id: "hyaluronic-acid",
      title: "Hyaluronic acid",
      description: "Significant improvement in skin hydration when used daily",
      icon: "💧",
      category: "positive",
      timeframe: "Last month",
      detailedAnalysis: "Hyaluronic acid has been remarkably effective for your skin's hydration levels. Daily use has increased moisture retention by 35% and improved the appearance of fine lines in the under-eye and forehead areas.",
      relatedFactors: ["Water intake", "Humidifier use", "Environmental factors"],
      impactScore: 92,
      historicalData: [
        { date: "Week 1", value: 65 },
        { date: "Week 2", value: 78 },
        { date: "Week 3", value: 92 }
      ]
    },
    {
      id: "sleep-quality",
      title: "Sleep quality",
      description: "Better skin clarity on days following 7+ hours of sleep",
      icon: "😴",
      category: "positive",
      timeframe: "Consistent pattern",
      detailedAnalysis: "There's a strong correlation between nights with 7+ hours of quality sleep and improved skin appearance the following day. Your skin barrier function is 28% stronger and inflammation markers are lower after good sleep nights.",
      relatedFactors: ["Stress levels", "Screen time before bed", "Evening skincare routine"],
      impactScore: 88,
      historicalData: [
        { date: "Week 1", value: 70 },
        { date: "Week 2", value: 82 },
        { date: "Week 3", value: 88 }
      ]
    },
  ];

  // Filter insights based on active tab
  const filteredInsights = insights.filter(insight => {
    if (activeTab === "all") return true;
    return insight.category === activeTab;
  });

  useEffect(() => {
    // Check if we have an insight from the state
    if (location.state && location.state.insight) {
      const stateInsight = location.state.insight;
      // Find the full insight data with all details
      const fullInsight = insights.find(i => 
        i.id === stateInsight.id || i.title === stateInsight.title
      );
      setSelectedInsight(fullInsight || null);
    } 
    // If we have an insightId from URL params
    else if (insightId) {
      const foundInsight = insights.find(i => i.id === insightId);
      setSelectedInsight(foundInsight || null);
    } else {
      setSelectedInsight(null);
    }
  }, [location, insightId]);

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6 flex items-center">
          <BackButton />
          <h1 className="text-2xl font-bold">Insights & Trends</h1>
        </header>
        
        {selectedInsight ? (
          <div>
            <Card className="mb-6 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {selectedInsight.icon && <span className="text-3xl mr-3">{selectedInsight.icon}</span>}
                  <div>
                    <h2 className="text-xl font-semibold">{selectedInsight.title}</h2>
                    <p className="text-muted-foreground text-sm">{selectedInsight.timeframe}</p>
                  </div>
                </div>
                
                <div className="mt-4 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Impact Score</span>
                    <span className={`font-semibold ${
                      selectedInsight.impactScore && selectedInsight.impactScore >= 70 ? 'text-green-500' : 
                      selectedInsight.impactScore && selectedInsight.impactScore >= 40 ? 'text-amber-500' : 'text-red-500'
                    }`}>
                      {selectedInsight.impactScore}/100
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${
                        selectedInsight.impactScore && selectedInsight.impactScore >= 70 ? 'bg-green-500' : 
                        selectedInsight.impactScore && selectedInsight.impactScore >= 40 ? 'bg-amber-500' : 'bg-red-500'
                      }`} 
                      style={{ width: `${selectedInsight.impactScore}%` }}>
                    </div>
                  </div>
                </div>
                
                <h3 className="font-semibold text-lg mb-2">Analysis</h3>
                <p className="mb-4">{selectedInsight.detailedAnalysis}</p>
                
                {selectedInsight.relatedFactors && selectedInsight.relatedFactors.length > 0 && (
                  <>
                    <h3 className="font-semibold text-lg mb-2">Related Factors</h3>
                    <ul className="mb-4 list-disc pl-5">
                      {selectedInsight.relatedFactors.map((factor, index) => (
                        <li key={index}>{factor}</li>
                      ))}
                    </ul>
                  </>
                )}
                
                <h3 className="font-semibold text-lg mb-2">Trend Over Time</h3>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Week 1</span>
                  <span>Week 2</span>
                  <span>Week 3</span>
                </div>
                <div className="relative h-10 bg-gray-100 rounded-lg mb-6">
                  {selectedInsight.historicalData && selectedInsight.historicalData.map((data, index, arr) => {
                    const prevValue = index > 0 ? arr[index - 1].value : data.value;
                    const trend = data.value > prevValue ? 'up' : data.value < prevValue ? 'down' : 'flat';
                    
                    return (
                      <div 
                        key={index}
                        className="absolute flex flex-col items-center justify-center"
                        style={{
                          left: `${(index / (arr.length - 1)) * 100}%`,
                          bottom: '0',
                          transform: 'translateX(-50%)'
                        }}
                      >
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                          data.value >= 70 ? 'bg-green-100' : 
                          data.value >= 40 ? 'bg-amber-100' : 'bg-red-100'
                        }`}>
                          <div className={`w-2.5 h-2.5 rounded-full ${
                            data.value >= 70 ? 'bg-green-500' : 
                            data.value >= 40 ? 'bg-amber-500' : 'bg-red-500'
                          }`}></div>
                        </div>
                        
                        <span className="text-xs mt-1 font-medium">
                          {trend === 'up' && <TrendingUp className="h-3 w-3 text-green-500 inline" />}
                          {trend === 'down' && <TrendingDown className="h-3 w-3 text-red-500 inline" />}
                          {data.value}
                        </span>
                      </div>
                    );
                  })}
                  
                  {selectedInsight.historicalData && selectedInsight.historicalData.length > 1 && 
                    selectedInsight.historicalData.map((data, index, arr) => {
                      if (index === 0) return null;
                      const prevData = arr[index - 1];
                      
                      // Calculate positions for the line
                      const startX = ((index - 1) / (arr.length - 1)) * 100;
                      const endX = (index / (arr.length - 1)) * 100;
                      
                      return (
                        <div 
                          key={`line-${index}`}
                          className={`absolute h-0.5 ${
                            data.value >= prevData.value ? 'bg-green-400' : 'bg-red-400'
                          }`}
                          style={{
                            left: `${startX}%`,
                            width: `${endX - startX}%`,
                            bottom: '7px'
                          }}
                        ></div>
                      );
                  })}
                </div>
                
                <h3 className="font-semibold text-lg mb-2">Recommendations</h3>
                <ul className="list-disc pl-5">
                  {selectedInsight.category === "positive" ? (
                    <>
                      <li>Continue incorporating {selectedInsight.title.toLowerCase()} into your routine</li>
                      <li>Track consistency to maintain the positive effects</li>
                      <li>Consider pairing with complementary factors for enhanced results</li>
                    </>
                  ) : (
                    <>
                      <li>Consider reducing {selectedInsight.title.toLowerCase()} to observe changes</li>
                      <li>Try alternatives that may have less impact on your skin</li>
                      <li>Monitor closely to confirm the correlation</li>
                    </>
                  )}
                </ul>
              </CardContent>
            </Card>
            
            <div className="flex justify-between">
              <BackButton />
              <Link
                to="/insights-trends"
                className="text-skin-teal font-medium"
                onClick={() => setSelectedInsight(null)}
              >
                View All Insights
              </Link>
            </div>
          </div>
        ) : (
          <>
            <Tabs defaultValue={activeTab} className="w-full mb-6" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="positive">Positive</TabsTrigger>
                <TabsTrigger value="negative">Negative</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">What's Affecting Your Skin</h2>
              
              <div className="space-y-4">
                {filteredInsights.map((insight, index) => (
                  <Link
                    key={index}
                    to={`/insights-trends/${insight.id}`}
                    state={{ insight }}
                    className="block"
                  >
                    <Card className="ios-card cursor-pointer hover:shadow-md transition-all">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start">
                            {insight.icon && <span className="text-2xl mr-3">{insight.icon}</span>}
                            <div>
                              <h3 className="font-medium">{insight.title}</h3>
                              <p className="text-sm">{insight.description}</p>
                              <p className="text-xs text-muted-foreground mt-1">{insight.timeframe}</p>
                            </div>
                          </div>
                          <ChevronRight className="text-muted-foreground h-5 w-5 mt-1" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-3">Monthly Analysis</h2>
              <Card className="ios-card">
                <CardContent className="p-4">
                  <p className="font-medium mb-2">Top Positive Factors</p>
                  <ul className="list-disc pl-5 mb-4 text-sm">
                    <li>Regular hydration (8+ glasses daily)</li>
                    <li>Consistent SPF usage</li>
                    <li>Vitamin C serum application</li>
                  </ul>
                  
                  <p className="font-medium mb-2">Top Negative Factors</p>
                  <ul className="list-disc pl-5 text-sm">
                    <li>Processed sugar consumption</li>
                    <li>Less than 6 hours of sleep</li>
                    <li>Forgetting evening cleansing routine</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
      
      <AppNavigation />
    </div>
  );
};

export default InsightsTrendsPage;
