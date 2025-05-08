
import React from "react";
import { ArrowLeft, Camera } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AppNavigation from "@/components/AppNavigation";

const LogSkinCondition = () => {
  const moodOptions = [
    { emoji: "😊", label: "Balanced" },
    { emoji: "😣", label: "Dry & Sensitive" },
    { emoji: "😓", label: "Oily" },
    { emoji: "😖", label: "Irritated" },
    { emoji: "😔", label: "Tired" },
    { emoji: "🙂", label: "Normal" },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6 flex items-center">
          <Link to="/" className="mr-4">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold">Log Skin Condition</h1>
        </header>
        
        <main className="space-y-8">
          {/* Upload Selfie Button */}
          <div className="flex justify-center">
            <Button 
              className="bg-skin-teal text-white flex items-center gap-2 px-6 py-5 h-auto"
              onClick={() => console.log("Upload selfie initiated")}
            >
              <Camera className="h-5 w-5" />
              Get Started by Uploading Selfie
            </Button>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">How does your skin feel today?</h2>
            <div className="grid grid-cols-2 gap-3">
              {moodOptions.map((option) => (
                <Card key={option.label} className="ios-card border cursor-pointer hover:bg-gray-50">
                  <CardContent className="flex flex-col items-center justify-center p-4">
                    <span className="text-4xl mb-2">{option.emoji}</span>
                    <span className="font-medium">{option.label}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Additional factors</h2>
            <div className="space-y-3">
              <Card className="ios-card">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2">🥗 Food</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" className="rounded-full">Hydrating</Button>
                    <Button variant="outline" size="sm" className="rounded-full">Dehydrating</Button>
                    <Button variant="outline" size="sm" className="rounded-full">High Sugar</Button>
                    <Button variant="outline" size="sm" className="rounded-full">Dairy</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="ios-card">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2">💊 Supplements</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" className="rounded-full">New</Button>
                    <Button variant="outline" size="sm" className="rounded-full">Regular</Button>
                    <Button variant="outline" size="sm" className="rounded-full">Skipped</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="ios-card">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2">💄 Makeup</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" className="rounded-full">None</Button>
                    <Button variant="outline" size="sm" className="rounded-full">Light</Button>
                    <Button variant="outline" size="sm" className="rounded-full">Full</Button>
                    <Button variant="outline" size="sm" className="rounded-full">Same as usual</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="ios-card">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2">🌡️ Weather</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" className="rounded-full">Dry + Cold</Button>
                    <Button variant="outline" size="sm" className="rounded-full">Humid + Hot</Button>
                    <Button variant="outline" size="sm" className="rounded-full">Moderate</Button>
                    <Button variant="outline" size="sm" className="rounded-full">Windy</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="pt-4">
            <Button className="ios-btn w-full bg-skin-teal">
              Save Today's Log
            </Button>
          </div>
        </main>
      </div>
      
      <AppNavigation />
    </div>
  );
};

export default LogSkinCondition;
