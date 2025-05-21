
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import BackButton from "@/components/BackButton";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ViewScoringMethod from "@/components/ViewScoringMethod";
import { getRatingColor, getRatingBgColor, getRatingLabel } from "@/utils/skin-utils";

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

const RecentLogs = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  
  // Updated sample data with more diverse scan types
  const recentLogs: LogType[] = [
    { 
      id: "face-scan-morning",
      title: "Morning Face Scan", 
      status: "positive", 
      description: "No irritation detected",
      date: "Today",
      details: "Morning scan showed reduced redness around nose and cheeks. Hydration levels improved from yesterday.",
      rating: 88,
      category: "daily"
    },
    { 
      id: "moisturizer-scan",
      title: "Moisturizer Ingredient Scan", 
      status: "negative", 
      description: "Found 2 potential irritants",
      date: "Yesterday",
      details: "Detected methylparaben and fragrance compounds that may cause sensitivity for your skin type.",
      rating: 35,
      category: "product"
    },
    { 
      id: "skin-barrier-scan",
      title: "Skin Barrier Analysis", 
      status: "positive", 
      description: "Barrier improving",
      date: "2 days ago",
      details: "Skin barrier analysis shows improvement in moisture retention and reduced TEWL.",
      rating: 82,
      category: "daily"
    },
    { 
      id: "sunscreen-scan",
      title: "Sunscreen SPF Scan", 
      status: "neutral", 
      description: "Adequate protection",
      date: "3 days ago",
      details: "SPF coverage is good but could be improved around the hairline and ears.",
      rating: 65,
      category: "product"
    },
    { 
      id: "evening-face-scan",
      title: "Evening Face Scan", 
      status: "positive", 
      description: "Reduced inflammation",
      date: "4 days ago",
      details: "Evening scan shows decrease in inflammation around chin area after new routine.",
      rating: 78,
      category: "daily"
    },
    { 
      id: "serum-compatibility",
      title: "Serum Compatibility Scan", 
      status: "negative", 
      description: "Poor match for skin type",
      date: "5 days ago",
      details: "This serum contains high concentration of niacinamide which conflicts with your existing routine.",
      rating: 40,
      category: "product"
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
          <h1 className="text-2xl font-bold">Recent Scans</h1>
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
                        {/* Updated Rating Circle to match Weekly Skin Report */}
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: getRatingBgColor(log.rating) }}
                        >
                          <span 
                            className="text-lg font-semibold"
                            style={{ color: getRatingColor(log.rating) }}
                          >
                            {log.rating}
                          </span>
                        </div>
                        <span 
                          className="text-xs mt-1 font-medium"
                          style={{ color: getRatingColor(log.rating) }}
                        >
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
