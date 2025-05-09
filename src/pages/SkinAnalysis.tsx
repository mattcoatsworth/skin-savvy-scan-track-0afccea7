import React from "react";
import AppNavigation from "@/components/AppNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import BackButton from "@/components/BackButton";

const SkinAnalysis = () => {
  // Sample data
  const skinFactors = [
    { type: "Food" as const, status: "Hydrating", icon: "🥗", details: "Increased water-rich foods and avoided dairy this week" },
    { type: "Supplement" as const, status: "New", icon: "💊", details: "Started collagen supplement 3 days ago" },
    { type: "Makeup" as const, status: "Same as usual", icon: "💄", details: "Using the same foundation and concealer" },
    { type: "Weather" as const, status: "Dry + Cold", icon: "🌡️", details: "Low humidity affecting skin hydration" },
    { type: "Sleep" as const, status: "Improved", icon: "😴", details: "Getting 7+ hours consistently this week" },
    { type: "Stress" as const, status: "Moderate", icon: "🧘", details: "Work deadline approaching" },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6 flex items-center">
          <BackButton />
          <h1 className="text-2xl font-bold">Full Skin Analysis</h1>
        </header>
        
        <div className="space-y-6">
          <Card className="ios-card">
            <CardContent className="p-4">
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-3">😊</span>
                <div>
                  <h2 className="font-medium text-lg">Today's Skin</h2>
                  <p className="text-xl font-semibold">Balanced</p>
                </div>
              </div>
              
              <div className="mb-3">
                <p className="text-sm font-medium mb-2">Detailed Analysis:</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Your skin appears balanced today with good hydration levels. Inflammation is minimal and there's
                  an improvement in overall tone compared to yesterday.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <div>
            <h2 className="text-xl font-semibold mb-3">Contributing Factors</h2>
            <div className="space-y-3">
              {skinFactors.map((factor, index) => (
                <Card key={index} className="ios-card">
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      <span className="text-2xl mr-3">{factor.icon}</span>
                      <div>
                        <h3 className="font-medium">{factor.type}: {factor.status}</h3>
                        <p className="text-sm text-muted-foreground">{factor.details}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-3">Weekly Trend</h2>
            <Card className="ios-card">
              <CardContent className="p-4">
                <p className="text-muted-foreground mb-2">Your skin has been gradually improving this week</p>
                <div className="flex justify-between items-center">
                  <div className="flex flex-col items-center">
                    <span>😣</span>
                    <span className="text-xs">Mon</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span>😣</span>
                    <span className="text-xs">Tue</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span>😐</span>
                    <span className="text-xs">Wed</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span>😐</span>
                    <span className="text-xs">Thu</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span>🙂</span>
                    <span className="text-xs">Fri</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span>😊</span>
                    <span className="text-xs">Sat</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span>😊</span>
                    <span className="text-xs">Sun</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <AppNavigation />
    </div>
  );
};

export default SkinAnalysis;
