
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import EnergyAnalysis from "@/components/EnergyAnalysis";
import BackButton from "@/components/BackButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FYPMealPlan from "@/components/FYPMealPlan";
import { StyledBadge } from "@/components/ui/styled/Badge";

const FYP = () => {
  // Add scroll to top functionality
  useScrollToTop();
  
  // State to track the active tab
  const [activeTab, setActiveTab] = useState<string>("skin-energy");
  
  return (
    <div>
      <header className="mb-6 flex items-center">
        <BackButton />
        <div>
          <h1 className="text-2xl font-bold">For You</h1>
          <p className="text-muted-foreground">Personalized recommendations</p>
        </div>
      </header>
      
      <main className="space-y-6">
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-2">Your FYP</h2>
            <p className="text-sm text-muted-foreground">
              This is your personalized "For You Page" with content tailored to your preferences 
              and skin health goals. Check back regularly for updates!
            </p>
          </CardContent>
        </Card>
        
        {/* Tab Navigation */}
        <Tabs 
          defaultValue="skin-energy" 
          className="w-full"
          onValueChange={(value) => setActiveTab(value)}
        >
          <TabsList className="grid grid-cols-2 w-full mb-4 rounded-xl overflow-hidden bg-gray-100">
            <TabsTrigger 
              value="skin-energy" 
              className="rounded-lg flex items-center justify-center h-10 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Skin Energy
            </TabsTrigger>
            <TabsTrigger 
              value="meal-plan" 
              className="rounded-lg flex items-center justify-center h-10 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Meal Plan
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="skin-energy" className="mt-0">
            <EnergyAnalysis />
          </TabsContent>
          
          <TabsContent value="meal-plan" className="mt-0">
            <FYPMealPlan />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default FYP;
