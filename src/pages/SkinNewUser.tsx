
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { History, TrendingUp, Calendar, Plus } from "lucide-react";
import BackButton from "@/components/BackButton";
import BottomTemplate from "@/components/BottomTemplate";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useScrollToTop } from "@/hooks/useScrollToTop";

const SkinNewUser = () => {
  // Add scroll to top functionality
  useScrollToTop();
  
  return (
    <div className="bg-slate-50 pb-20">
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
        >
          <TabsList className="grid grid-cols-3 w-full mb-6">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          
          <TabsContent value="daily" className="mt-0">
            {/* Empty Daily View */}
            <Card className="mb-4">
              <CardContent className="p-4 flex flex-col items-center justify-center py-8">
                <History className="h-10 w-10 text-gray-300 mb-2" />
                <p className="text-sm text-center text-muted-foreground">No daily skin data available yet</p>
                <p className="text-xs text-center text-muted-foreground mb-4">
                  Start logging your daily skin condition to see your progress
                </p>
                <Button size="sm" asChild>
                  <Link to="/log-skin-condition">
                    <Plus className="h-4 w-4 mr-1" />
                    Log First Entry
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="weekly" className="mt-0">
            {/* Empty Weekly View */}
            <Card className="mb-4">
              <CardContent className="p-4 flex flex-col items-center justify-center py-8">
                <Calendar className="h-10 w-10 text-gray-300 mb-2" />
                <p className="text-sm text-center text-muted-foreground">No weekly skin data available yet</p>
                <p className="text-xs text-center text-muted-foreground mb-4">
                  Log at least one week of skin data to see weekly insights
                </p>
                <Button size="sm" variant="outline" asChild>
                  <Link to="/log-skin-condition">Start Logging</Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="monthly" className="mt-0">
            {/* Empty Monthly View */}
            <Card className="mb-4">
              <CardContent className="p-4 flex flex-col items-center justify-center py-8">
                <TrendingUp className="h-10 w-10 text-gray-300 mb-2" />
                <p className="text-sm text-center text-muted-foreground">No monthly skin data available yet</p>
                <p className="text-xs text-center text-muted-foreground mb-4">
                  Track your skin regularly to generate monthly trends and insights
                </p>
                <Button size="sm" variant="outline" asChild>
                  <Link to="/log-skin-condition">Start Tracking</Link>
                </Button>
              </CardContent>
            </Card>
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
      
      <BottomTemplate pageTitle="Skin" />
    </div>
  );
};

export default SkinNewUser;
