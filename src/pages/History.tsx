
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import BackButton from "@/components/BackButton";
import ViewScoringMethod from "@/components/ViewScoringMethod";
import Disclaimer from "@/components/Disclaimer";
import { useLocation } from "react-router-dom";
import SkinHistory from "@/components/SkinHistory";

// Sample data for the weekly skin report
const weeklyRatings = [
  { day: "Mon", rating: 40, date: "05/06" },
  { day: "Tue", rating: 55, date: "05/07" },
  { day: "Wed", rating: 70, date: "05/08" },
  { day: "Thu", rating: 65, date: "05/09" },
  { day: "Fri", rating: 85, date: "05/10" },
  { day: "Sat", rating: 80, date: "05/11" },
  { day: "Sun", rating: 75, date: "05/12" },
];

// Define a separate component for the Daily Analysis tab content
const DailyAnalysisTab = () => (
  <TabsContent value="daily" className="space-y-2">
    <Card className="ios-card">
      {/* Daily skin content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-3">Today's Skin Status</h3>
        <p className="text-muted-foreground">
          Track your daily skin condition and see how it changes over time.
        </p>
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

// Define a separate component for the Weekly Analysis tab content
const WeeklyAnalysisTab = () => (
  <TabsContent value="weekly" className="space-y-2">
    <Card className="ios-card p-4">
      <h3 className="text-lg font-semibold mb-3">Weekly Skin Analysis</h3>
      <p className="text-muted-foreground mb-4">
        Your skin has been improving steadily over the past week.
      </p>
      <SkinHistory ratings={weeklyRatings} />
    </Card>
    
    <Card className="ios-card p-4">
      <h3 className="text-lg font-semibold mb-3">Contributing Factors</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>Consistent hydration throughout the week</li>
        <li>Reduced dairy consumption</li>
        <li>Regular use of recommended skincare products</li>
        <li>Improved sleep patterns</li>
      </ul>
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
  
  // Add an effect to update the active tab when the URL changes
  useEffect(() => {
    if (tabParam === 'weekly') {
      setActiveTab('weekly');
    } else if (tabParam === 'daily') {
      setActiveTab('daily');
    }
  }, [tabParam, location.search]);

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
