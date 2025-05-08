
import React from "react";
import AppNavigation from "@/components/AppNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type LogType = {
  title: string;
  status: "positive" | "negative" | "neutral";
  description: string;
  date: string;
  details?: string;
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

const RecentLogs = () => {
  // Sample data
  const recentLogs: LogType[] = [
    { 
      title: "Retinol Cream", 
      status: "positive", 
      description: "No reaction after 3 days",
      date: "Today",
      details: "Applied a pea-sized amount before bed. Skin feels smoother in the morning with no irritation."
    },
    { 
      title: "Whey Protein", 
      status: "negative", 
      description: "Possible acne trigger",
      date: "Yesterday",
      details: "Noticed small breakouts along jawline 24 hours after consuming whey protein shake."
    },
    { 
      title: "Avocado", 
      status: "positive", 
      description: "Skin hydration improved",
      date: "2 days ago",
      details: "Ate half an avocado with lunch. Noticed skin felt more hydrated by evening."
    },
    { 
      title: "New Foundation", 
      status: "neutral", 
      description: "No noticeable change",
      date: "3 days ago",
      details: "Tried new mineral foundation. Coverage is good, no reaction but no improvement either."
    },
    { 
      title: "Vitamin C Serum", 
      status: "positive", 
      description: "Brightening effect",
      date: "4 days ago",
      details: "Morning application of vitamin C serum. Noticed skin looks brighter after consistent use."
    },
    { 
      title: "Late Night", 
      status: "negative", 
      description: "Skin looks tired",
      date: "5 days ago",
      details: "Only got 5 hours of sleep. Under-eye circles more prominent and skin looks dull."
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6 flex items-center">
          <Link to="/" className="mr-4">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold">Recent Logs & Scans</h1>
        </header>
        
        <Tabs defaultValue="all" className="w-full mb-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="daily">Daily</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="space-y-4">
          {recentLogs.map((log, index) => (
            <Card key={index} className="ios-card">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">{log.title}</h3>
                    <p className="text-sm text-muted-foreground mb-1">
                      {getStatusIndicator(log.status)} {log.description}
                    </p>
                    <p className="text-xs text-muted-foreground">{log.date}</p>
                  </div>
                </div>
                
                {log.details && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-sm">{log.details}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <AppNavigation />
    </div>
  );
};

export default RecentLogs;
