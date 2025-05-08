
import React, { useState } from "react";
import { ArrowLeft, Camera } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AppNavigation from "@/components/AppNavigation";

const LogSkinCondition = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedFactors, setSelectedFactors] = useState<Record<string, string[]>>({
    food: [],
    supplements: [],
    makeup: [],
    weather: []
  });

  const moodOptions = [
    { emoji: "😊", label: "Balanced" },
    { emoji: "😣", label: "Dry & Sensitive" },
    { emoji: "😓", label: "Oily" },
    { emoji: "😖", label: "Irritated" },
    { emoji: "😔", label: "Tired" },
    { emoji: "🙂", label: "Normal" },
  ];

  const handleMoodSelect = (label: string) => {
    setSelectedMood(label);
  };

  const handleFactorSelect = (category: string, factor: string) => {
    setSelectedFactors(prev => {
      const updatedFactors = { ...prev };
      if (updatedFactors[category].includes(factor)) {
        updatedFactors[category] = updatedFactors[category].filter(item => item !== factor);
      } else {
        updatedFactors[category] = [...updatedFactors[category], factor];
      }
      return updatedFactors;
    });
  };

  return (
    <div className="bg-skin-gray min-h-screen pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6 flex items-center">
          <Link to="/" className="mr-4">
            <ArrowLeft className="h-5 w-5 text-skin-black" />
          </Link>
          <h1 className="text-2xl font-bold text-skin-black">Log Skin Condition</h1>
        </header>
        
        <main className="space-y-8">
          {/* Upload Selfie Button */}
          <div className="flex justify-center">
            <Button 
              className="bg-skin-black text-white flex items-center gap-2 px-6 py-5 h-auto rounded-full"
              onClick={() => console.log("Upload selfie initiated")}
            >
              <Camera className="h-5 w-5" />
              Get Started by Uploading Selfie
            </Button>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4 text-skin-black">How does your skin feel today?</h2>
            <div className="grid grid-cols-2 gap-3">
              {moodOptions.map((option) => (
                <Card 
                  key={option.label} 
                  className={`ios-card border-0 cursor-pointer hover:bg-skin-lightgray transition-colors ${selectedMood === option.label ? 'bg-skin-lightgray ring-1 ring-skin-black' : ''}`}
                  onClick={() => handleMoodSelect(option.label)}
                >
                  <CardContent className="flex flex-col items-center justify-center p-4">
                    <span className="text-4xl mb-2">{option.emoji}</span>
                    <span className="font-medium text-skin-black">{option.label}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4 text-skin-black">Additional factors</h2>
            <div className="space-y-3">
              <Card className="ios-card">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2 text-skin-black">🥗 Food</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Hydrating", "Dehydrating", "High Sugar", "Dairy"].map(factor => (
                      <Button 
                        key={factor}
                        variant={selectedFactors.food.includes(factor) ? "default" : "outline"} 
                        size="sm" 
                        className={`rounded-full ${selectedFactors.food.includes(factor) ? 'bg-skin-black text-white' : 'text-skin-black border-skin-black/20'}`}
                        onClick={() => handleFactorSelect('food', factor)}
                      >
                        {factor}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="ios-card">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2 text-skin-black">💊 Supplements</h3>
                  <div className="flex flex-wrap gap-2">
                    {["New", "Regular", "Skipped"].map(factor => (
                      <Button 
                        key={factor}
                        variant={selectedFactors.supplements.includes(factor) ? "default" : "outline"} 
                        size="sm" 
                        className={`rounded-full ${selectedFactors.supplements.includes(factor) ? 'bg-skin-black text-white' : 'text-skin-black border-skin-black/20'}`}
                        onClick={() => handleFactorSelect('supplements', factor)}
                      >
                        {factor}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="ios-card">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2 text-skin-black">💄 Makeup</h3>
                  <div className="flex flex-wrap gap-2">
                    {["None", "Light", "Full", "Same as usual"].map(factor => (
                      <Button 
                        key={factor}
                        variant={selectedFactors.makeup.includes(factor) ? "default" : "outline"} 
                        size="sm" 
                        className={`rounded-full ${selectedFactors.makeup.includes(factor) ? 'bg-skin-black text-white' : 'text-skin-black border-skin-black/20'}`}
                        onClick={() => handleFactorSelect('makeup', factor)}
                      >
                        {factor}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="ios-card">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2 text-skin-black">🌡️ Weather</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Dry + Cold", "Humid + Hot", "Moderate", "Windy"].map(factor => (
                      <Button 
                        key={factor}
                        variant={selectedFactors.weather.includes(factor) ? "default" : "outline"} 
                        size="sm" 
                        className={`rounded-full ${selectedFactors.weather.includes(factor) ? 'bg-skin-black text-white' : 'text-skin-black border-skin-black/20'}`}
                        onClick={() => handleFactorSelect('weather', factor)}
                      >
                        {factor}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="pt-4">
            <Button className="w-full bg-skin-black text-white rounded-full h-12">
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
