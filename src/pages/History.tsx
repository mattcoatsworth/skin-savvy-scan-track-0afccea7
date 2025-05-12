import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import BackButton from "@/components/BackButton";
import DailySkinLog from "@/components/DailySkinLog";
import ViewScoringMethod from "@/components/ViewScoringMethod";
import Disclaimer from "@/components/Disclaimer";
import { useLocation } from "react-router-dom";

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
    <Card className="ios-card">
      {/* Weekly analysis content here */}
      Weekly analysis content coming soon!
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
