
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import BackButton from "@/components/BackButton";
import DailySkinLog from "@/components/DailySkinLog";
import ViewScoringMethod from "@/components/ViewScoringMethod";
import Disclaimer from "@/components/Disclaimer";
import { useLocation, Link } from "react-router-dom";

// Define a separate component for the Daily Analysis tab content
const DailyAnalysisTab = () => (
  <TabsContent value="daily" className="space-y-2">
    <Card className="ios-card">
      <DailySkinLog />
    </Card>
    
    <Card className="ios-card">
      <ViewScoringMethod />
    </Card>
    
    <Card className="ios-card">
      <Disclaimer />
    </Card>
  </TabsContent>
);

// Define a separate component for the Weekly Analysis tab content
const WeeklyAnalysisTab = () => (
  <TabsContent value="weekly" className="space-y-2">
    <Card className="ios-card p-4">
      <h2 className="text-xl font-semibold mb-4">Weekly Skin Health Overview</h2>
      <div className="space-y-4">
        {/* Weekly skin health content based on WeeklySkinAnalysis page */}
        <div className="bg-white rounded-lg p-4 border">
          <h3 className="font-medium text-lg">Your skin is improving</h3>
          <p className="text-muted-foreground text-sm mt-1">
            Your overall skin health has improved by 15% this week compared to last week.
          </p>
        </div>

        <div className="mt-4">
          <h3 className="font-medium mb-2">Daily Scores</h3>
          <div className="grid grid-cols-7 gap-2">
            {[
              { day: "Mon", score: 82 },
              { day: "Tue", score: 75 },
              { day: "Wed", score: 79 },
              { day: "Thu", score: 83 },
              { day: "Fri", score: 88 },
              { day: "Sat", score: 85 },
              { day: "Sun", score: 90 },
            ].map((day, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-xs text-muted-foreground">{day.day}</span>
                <div className="w-8 h-8 rounded-full bg-green-100 border-2 border-green-500 flex items-center justify-center text-xs font-medium">
                  {day.score}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
    
    <Card className="ios-card p-4">
      <h3 className="font-medium mb-3">AI Analysis</h3>
      <p className="text-sm text-muted-foreground">
        Based on your skin data, your skincare routine is working well. Continue with your current regimen, but consider adding more hydration during the evening.
      </p>
      
      <div className="mt-4">
        <h4 className="font-medium text-sm">Key Skin Parameters</h4>
        <div className="grid grid-cols-2 gap-3 mt-2">
          <div className="border rounded-md p-2">
            <span className="text-xs text-muted-foreground">Hydration</span>
            <div className="flex items-center justify-between">
              <span className="font-medium">Good</span>
              <span className="text-green-600 text-sm">↑ 12%</span>
            </div>
          </div>
          <div className="border rounded-md p-2">
            <span className="text-xs text-muted-foreground">Sensitivity</span>
            <div className="flex items-center justify-between">
              <span className="font-medium">Low</span>
              <span className="text-green-600 text-sm">↓ 8%</span>
            </div>
          </div>
          <div className="border rounded-md p-2">
            <span className="text-xs text-muted-foreground">Oiliness</span>
            <div className="flex items-center justify-between">
              <span className="font-medium">Normal</span>
              <span className="text-amber-600 text-sm">↑ 3%</span>
            </div>
          </div>
          <div className="border rounded-md p-2">
            <span className="text-xs text-muted-foreground">Redness</span>
            <div className="flex items-center justify-between">
              <span className="font-medium">Low</span>
              <span className="text-green-600 text-sm">↓ 15%</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <h4 className="font-medium text-sm mb-2">Influential Factors</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-green-600">✓</span>
            <span>Consistent cleanser use</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-green-600">✓</span>
            <span>Regular moisturizing</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-amber-600">!</span>
            <span>Increased stress levels</span>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <Link to="/monthly-analysis" className="text-sm text-blue-600 flex items-center">
          View Monthly Analysis
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </Card>
    
    <Card className="ios-card">
      <ViewScoringMethod />
    </Card>
    
    <Card className="ios-card">
      <Disclaimer />
    </Card>
  </TabsContent>
);

const History = () => {
  const location = useLocation();
  // Parse the query parameters to check if tab=weekly is present
  const queryParams = new URLSearchParams(location.search);
  const tabParam = queryParams.get('tab');
  
  // Set the initial tab based on the query parameter
  const [activeTab, setActiveTab] = useState(tabParam === 'weekly' ? "weekly" : "daily");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-start">
        <BackButton />
        <h1 className="text-2xl font-bold">Skin Analysis</h1>
      </div>

      <Tabs 
        defaultValue={activeTab} 
        value={activeTab}
        onValueChange={setActiveTab} 
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="daily">Daily Analysis</TabsTrigger>
          <TabsTrigger value="weekly">Weekly Analysis</TabsTrigger>
        </TabsList>

        <DailyAnalysisTab />
        <WeeklyAnalysisTab />
      </Tabs>
    </div>
  );
};

export default History;
