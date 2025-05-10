import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import BackButton from "@/components/BackButton";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ViewScoringMethod from "@/components/ViewScoringMethod";

type LogType = {
  id: string;
  title: string;
  status: "positive" | "negative" | "neutral";
  description: string;
  date: string;
  details?: string;
  rating?: number;
  category: "product" | "daily" | "other";
};

const getStatusIndicator = (status: LogType['status']) => {
  switch (status) {
    case "positive":
      return "🟢";
    case "negative":
      return "🔴";
    case "neutral":
      return "🟡";
  }
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

const RecentLogs = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  
  // Sample data
  const recentLogs: LogType[] = [
    { 
      id: "retinol-cream",
      title: "Retinol Cream", 
      status: "positive", 
      description: "No reaction after 3 days",
      date: "Today",
      details: "Applied a pea-sized amount before bed. Skin feels smoother in the morning with no irritation.",
      rating: 85,
      category: "product"
    },
    { 
      id: "whey-protein",
      title: "Whey Protein", 
      status: "negative", 
      description: "Possible acne trigger",
      date: "Yesterday",
      details: "Noticed small breakouts along jawline 24 hours after consuming whey protein shake.",
      rating: 30,
      category: "daily"
    },
    { 
      id: "avocado",
      title: "Avocado", 
      status: "positive", 
      description: "Skin hydration improved",
      date: "2 days ago",
      details: "Ate half an avocado with lunch. Noticed skin felt more hydrated by evening.",
      rating: 92,
      category: "daily"
    },
    { 
      id: "new-foundation",
      title: "New Foundation", 
      status: "neutral", 
      description: "No noticeable change",
      date: "3 days ago",
      details: "Tried new mineral foundation. Coverage is good, no reaction but no improvement either.",
      rating: 65,
      category: "product"
    },
    { 
      id: "vitamin-c-serum",
      title: "Vitamin C Serum", 
      status: "positive", 
      description: "Brightening effect",
      date: "4 days ago",
      details: "Morning application of vitamin C serum. Noticed skin looks brighter after consistent use.",
      rating: 78,
      category: "product"
    },
    { 
      id: "late-night",
      title: "Late Night", 
      status: "negative", 
      description: "Skin looks tired",
      date: "5 days ago",
      details: "Only got 5 hours of sleep. Under-eye circles more prominent and skin looks dull.",
      rating: 40,
      category: "daily"
    },
  ];

  // Filter logs based on active tab
  const filteredLogs = recentLogs.filter(log => {
    if (activeTab === "all") return true;
    if (activeTab === "products" && log.category === "product") return true;
    if (activeTab === "daily" && log.category === "daily") return true;
    return false;
  });

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6 flex items-center">
          <BackButton />
          <h1 className="text-2xl font-bold">Recent Logs & Scans</h1>
        </header>
        
        <Tabs defaultValue="all" className="w-full mb-6" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="daily">Daily</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="space-y-4">
          {filteredLogs.map((log, index) => (
            <Link
              key={index}
              to={`/recent-logs/${log.id}`}
              state={{ log }}
              className="block"
            >
              <Card className="ios-card hover:shadow-md transition-all">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{log.title}</h3>
                      <p className="text-sm text-muted-foreground mb-1">
                        {log.description}
                      </p>
                      <p className="text-xs text-muted-foreground">{log.date}</p>
                    </div>
                    
                    {log.rating !== undefined && (
                      <div className="flex flex-col items-center">
                        <div className="relative w-12 h-12 flex items-center justify-center">
                          {/* Background circle */}
                          <svg className="w-12 h-12 absolute" viewBox="0 0 36 36">
                            <path
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke={getBackgroundColor(log.rating)}
                              strokeWidth="4"
                              strokeLinecap="round"
                            />
                          </svg>
                          
                          {/* Foreground circle - the actual progress */}
                          <svg className="w-12 h-12 absolute" viewBox="0 0 36 36">
                            <path
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke={getProgressColor(log.rating)}
                              strokeWidth="4"
                              strokeDasharray={`${log.rating}, 100`}
                              strokeLinecap="round"
                            />
                          </svg>
                          
                          {/* Rating number in the center */}
                          <div className="text-base font-semibold">
                            {log.rating}
                          </div>
                        </div>
                        <span className="text-xs mt-1 text-muted-foreground">
                          {getRatingLabel(log.rating)}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {log.details && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-sm">{log.details}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        
        {/* Add View Scoring Method component at the bottom */}
        <ViewScoringMethod />
      </div>
    </div>
  );
};

export default RecentLogs;
