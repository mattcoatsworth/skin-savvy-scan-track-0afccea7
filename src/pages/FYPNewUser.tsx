
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Salad, Activity, CloudSun, Info, Clock } from "lucide-react";
import BackButton from "@/components/BackButton";
import BottomTemplate from "@/components/BottomTemplate";
import { useScrollToTop } from "@/hooks/useScrollToTop";

const FYPNewUser = () => {
  // Add scroll to top functionality
  useScrollToTop();
  
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
        {/* Empty Skin Energy Card */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Skin Energy</h2>
          <Card className="overflow-hidden border-l-4 border-l-blue-400">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-500" />
                  <h3 className="font-medium text-base">Skin Energy</h3>
                </div>
              </div>
              
              <div className="flex flex-col items-center justify-center py-6">
                <CloudSun className="h-10 w-10 text-gray-300 mb-2" />
                <p className="text-sm text-center text-muted-foreground mb-2">
                  Your skin energy analysis will appear here after tracking your skin for a few days
                </p>
                <Button size="sm" className="mt-2" asChild>
                  <Link to="/log-skin-condition">Start Tracking</Link>
                </Button>
              </div>
              
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-center">
                  <p className="text-xs text-blue-600">Track daily for personalized insights</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Empty Meal Plan Card */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Meal Plan</h2>
          <Card className="overflow-hidden border-l-4 border-l-emerald-400">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <Salad className="h-5 w-5 text-emerald-500" />
                  <h3 className="font-medium text-base">Meal Plan</h3>
                </div>
              </div>
              
              <div className="flex flex-col items-center justify-center py-6">
                <Clock className="h-10 w-10 text-gray-300 mb-2" />
                <p className="text-sm text-center text-muted-foreground mb-2">
                  Your personalized meal plan will appear here after tracking your skin for a few days
                </p>
                <Button size="sm" className="mt-2" asChild>
                  <Link to="/log-skin-condition">Start Tracking</Link>
                </Button>
              </div>
              
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-center">
                  <p className="text-xs text-emerald-600">Receive nutrition recommendations based on your skin needs</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Recommendations Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Recommendations</h2>
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-purple-500" />
                  <h3 className="font-medium text-base">Skin Recommendations</h3>
                </div>
              </div>
              
              <div className="flex flex-col items-center justify-center py-6">
                <Info className="h-10 w-10 text-gray-300 mb-2" />
                <p className="text-sm text-center text-muted-foreground mb-2">
                  No recommendations available yet
                </p>
                <p className="text-xs text-center text-muted-foreground mb-2">
                  Track your skin condition to receive personalized recommendations
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <BottomTemplate pageTitle="For You" />
    </div>
  );
};

export default FYPNewUser;
