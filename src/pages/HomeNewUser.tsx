
import React from "react";
import BottomTemplate from "@/components/BottomTemplate";
import ScanButton from "@/components/ScanButton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Salad, Activity, Camera, CloudSun, Info, Clock, Sparkles, FlameIcon } from "lucide-react";
import EmptySkinHistory from "@/components/EmptySkinHistory";
import EmptyRecentLogsCarousel from "@/components/EmptyRecentLogsCarousel";
import EmptyInsightsTrends from "@/components/EmptyInsightsTrends";
import EmptySuggestedActions from "@/components/EmptySuggestedActions";
import EmptyExploreSection from "@/components/EmptyExploreSection";

const HomeNewUser = () => {
  return (
    <div>
      {/* Simple header */}
      <header className="mb-4">
        <h1 className="text-xl font-bold">Skin Savvy</h1>
      </header>
      
      <main>
        {/* Empty Skin History */}
        <div className="mb-6">
          <EmptySkinHistory />
        </div>
        
        {/* Empty Streak Card */}
        <Card className="overflow-hidden border-l-4 border-l-violet-400 mb-6">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <FlameIcon className="h-5 w-5 text-amber-500" />
                <h3 className="font-medium text-base">Skin Log Streak</h3>
              </div>
              <Link to="/skin">
                <Button variant="ghost" size="sm" className="text-xs">
                  View History
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 bg-gradient-to-br from-violet-100 to-indigo-100 w-16 h-16 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-violet-600">0</span>
              </div>
              <div>
                <p className="text-sm font-medium">Start your streak today!</p>
                <p className="text-xs text-muted-foreground mt-1">No logs yet</p>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <p className="text-xs text-violet-600">Log your skin condition to start your streak!</p>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* ScanButton */}
        <div className="mb-6">
          <ScanButton />
        </div>
        
        <div className="space-y-6">
          {/* Daily Skin Snapshot - First Time View */}
          <Card className="border-l-4 border-l-blue-400">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-blue-500" />
                  <h3 className="font-medium text-base">Daily Skin Snapshot</h3>
                </div>
              </div>
              
              <p className="text-sm mb-4">Welcome! Track your daily skin condition to get personalized recommendations.</p>
              
              <div className="flex flex-col items-center justify-center py-4">
                <Camera className="h-10 w-10 text-gray-300 mb-2" />
                <p className="text-sm text-center text-muted-foreground mb-2">No skin data yet</p>
                <Button size="sm" className="mt-2" asChild>
                  <Link to="/log-skin-condition">Log Today's Skin</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Empty Meal Plan Card */}
          <Card className="overflow-hidden border-l-4 border-l-emerald-400">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <Salad className="h-5 w-5 text-emerald-500" />
                  <h3 className="font-medium text-base">Meal Plan</h3>
                </div>
                <Link to="/fyp">
                  <Button variant="ghost" size="sm" className="text-xs">
                    View Full Plan
                  </Button>
                </Link>
              </div>
              
              <div className="flex flex-col items-center justify-center py-6">
                <Clock className="h-10 w-10 text-gray-300 mb-2" />
                <p className="text-sm text-center text-muted-foreground mb-2">
                  Your personalized meal plan will appear here after tracking your skin for a few days
                </p>
              </div>
            </CardContent>
          </Card>
          
          {/* Empty Skin Energy Card */}
          <Card className="overflow-hidden border-l-4 border-l-blue-400">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-500" />
                  <h3 className="font-medium text-base">Skin Energy</h3>
                </div>
                <Link to="/fyp">
                  <Button variant="ghost" size="sm" className="text-xs">
                    View Details
                  </Button>
                </Link>
              </div>
              
              <div className="flex flex-col items-center justify-center py-6">
                <CloudSun className="h-10 w-10 text-gray-300 mb-2" />
                <p className="text-sm text-center text-muted-foreground mb-2">
                  Track your skin to see energy levels and recommendations
                </p>
              </div>
              
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-center">
                  <p className="text-xs text-blue-600">Start logging for personalized insights</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Empty Recent Logs Carousel */}
          <EmptyRecentLogsCarousel />
          
          {/* Empty Insights & Trends */}
          <EmptyInsightsTrends />
          
          {/* Empty Suggested Actions */}
          <EmptySuggestedActions />
          
          {/* Empty Explore Section */}
          <EmptyExploreSection />
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomTemplate pageTitle="Skin Savvy" />
    </div>
  );
};

export default HomeNewUser;
