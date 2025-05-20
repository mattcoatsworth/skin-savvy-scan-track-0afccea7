
import React, { useState } from "react";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BackButton from "@/components/BackButton";
import AppNavigation from "@/components/AppNavigation";
import { Link } from "react-router-dom";
import DailySkinView from "./DailySkinView";
import WeeklySkinView from "./WeeklySkinView";
import MonthlySkinView from "./MonthlySkinView";
import { SkinViewType } from "./types";

/**
 * Main Skin Page component
 * This page provides tracking and analysis of the user's skin condition
 */
const SkinPage: React.FC = () => {
  // Add scroll to top functionality
  useScrollToTop();
  
  // State to track the active tab
  const [activeView, setActiveView] = useState<SkinViewType>("daily");
  
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6 flex items-center">
          <BackButton />
          <div>
            <h1 className="text-2xl font-bold">Skin</h1>
            <p className="text-muted-foreground">Track your skin condition</p>
          </div>
        </header>
        
        <main>
          {/* Tab Navigation */}
          <Tabs 
            defaultValue="daily" 
            className="w-full"
            onValueChange={(value) => setActiveView(value as SkinViewType)}
          >
            <TabsList className="grid grid-cols-3 w-full mb-6">
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
            
            <TabsContent value="daily" className="mt-0">
              <DailySkinView />
            </TabsContent>
            
            <TabsContent value="weekly" className="mt-0">
              <WeeklySkinView />
            </TabsContent>
            
            <TabsContent value="monthly" className="mt-0">
              <MonthlySkinView />
            </TabsContent>
          </Tabs>
          
          {/* Log New Entry Button */}
          <div className="fixed bottom-24 inset-x-0 flex justify-center z-10">
            <Link 
              to="/log-skin-condition"
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 
                         text-white font-medium rounded-full shadow-lg 
                         hover:shadow-xl transition-all duration-200"
            >
              Log New Entry
            </Link>
          </div>
        </main>
      </div>
      
      <AppNavigation />
    </div>
  );
};

export default SkinPage;
