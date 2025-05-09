import React from "react";
import AppNavigation from "@/components/AppNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BackButton from "@/components/BackButton";

type InsightType = {
  title: string;
  description: string;
  icon?: string;
  category: "positive" | "negative" | "neutral";
  timeframe: string;
};

const InsightsTrendsPage = () => {
  // Sample data
  const insights: InsightType[] = [
    {
      title: "Collagen supplements",
      description: "Improved skin elasticity after 2 weeks of daily use",
      icon: "✨",
      category: "positive",
      timeframe: "This month"
    },
    {
      title: "Alcohol consumption",
      description: "Correlates with next-day puffiness 3 times this month",
      icon: "🍷",
      category: "negative",
      timeframe: "This month"
    },
    {
      title: "Vitamin C serum",
      description: "Brightening effect noted after regular use",
      icon: "🍊",
      category: "positive",
      timeframe: "Last 3 weeks"
    },
    {
      title: "Dairy products",
      description: "Possible link to mild breakouts along jawline",
      icon: "🥛",
      category: "negative",
      timeframe: "Ongoing pattern"
    },
    {
      title: "Hyaluronic acid",
      description: "Significant improvement in skin hydration when used daily",
      icon: "💧",
      category: "positive",
      timeframe: "Last month"
    },
    {
      title: "Sleep quality",
      description: "Better skin clarity on days following 7+ hours of sleep",
      icon: "😴",
      category: "positive",
      timeframe: "Consistent pattern"
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6 flex items-center">
          <BackButton />
          <h1 className="text-2xl font-bold">Insights & Trends</h1>
        </header>
        
        <Tabs defaultValue="all" className="w-full mb-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="positive">Positive</TabsTrigger>
            <TabsTrigger value="negative">Negative</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">What's Affecting Your Skin</h2>
          
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <Card key={index} className="ios-card">
                <CardContent className="p-4">
                  <div className="flex items-start">
                    {insight.icon && <span className="text-2xl mr-3">{insight.icon}</span>}
                    <div>
                      <h3 className="font-medium">{insight.title}</h3>
                      <p className="text-sm">{insight.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{insight.timeframe}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
      </div>
      
      <AppNavigation />
    </div>
  );
};

export default InsightsTrendsPage;
