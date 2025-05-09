import React, { useState } from "react";
import { ArrowLeft, Camera, Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import AppNavigation from "@/components/AppNavigation";

const LogSkinCondition = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedFactors, setSelectedFactors] = useState<Record<string, string[]>>({
    food: [],
    supplements: [],
    makeup: [],
    weather: [],
    menstrualCycle: []
  });
  
  // Add state for search inputs
  const [searchInputs, setSearchInputs] = useState({
    food: "",
    supplements: "",
    makeup: ""
  });
  
  // Add state for search popover visibility
  const [searchOpen, setSearchOpen] = useState({
    food: false,
    supplements: false,
    makeup: false
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
  
  const handleSearchChange = (category: string, value: string) => {
    setSearchInputs(prev => ({
      ...prev,
      [category]: value
    }));
  };
  
  const handleAddCustomFactor = (category: string) => {
    const value = searchInputs[category as keyof typeof searchInputs];
    if (value && !selectedFactors[category].includes(value)) {
      handleFactorSelect(category, value);
      // Clear the search input after adding
      setSearchInputs(prev => ({
        ...prev,
        [category]: ""
      }));
      // Close the popover
      setSearchOpen(prev => ({
        ...prev,
        [category]: false
      }));
    }
  };
  
  const getDefaultOptions = (category: string) => {
    switch(category) {
      case 'food':
        return ["Hydrating", "Dehydrating", "High Sugar", "Dairy"];
      case 'supplements':
        return ["New", "Regular", "Skipped"];
      case 'makeup':
        return ["None", "Light", "Full", "Same as usual"];
      default:
        return [];
    }
  };

  // Render a category section with search box
  const renderCategoryWithSearch = (category: string, emoji: string, title: string) => {
    const categoryKey = category as keyof typeof searchInputs;
    const defaultOptions = getDefaultOptions(category);
    const inputValue = searchInputs[categoryKey];
    
    return (
      <Card className="ios-card">
        <CardContent className="p-4">
          <h3 className="font-medium mb-2 text-skin-black">{emoji} {title}</h3>
          
          <div className="relative mb-2">
            <div className="relative flex-grow">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={`Search or add ${category} items`}
                value={inputValue}
                onChange={(e) => {
                  handleSearchChange(category, e.target.value);
                  if (!searchOpen[categoryKey]) {
                    setSearchOpen(prev => ({ ...prev, [category]: true }));
                  }
                }}
                onClick={() => {
                  setSearchOpen(prev => ({ ...prev, [category]: !prev[category] }));
                }}
                className="pl-8 py-2 text-sm h-9 w-full pr-4 rounded-sm"
              />
            </div>
            
            {searchOpen[categoryKey] && (
              <div className="absolute z-50 mt-1 w-full bg-white rounded-sm border shadow-md">
                <Command className="rounded-sm">
                  <CommandList className="py-0">
                    {inputValue && (
                      <CommandItem 
                        onSelect={() => handleAddCustomFactor(category)}
                        className="flex items-center justify-center h-10"
                      >
                        <div className="flex items-center w-full">
                          <Plus className="h-4 w-4 mr-2" />
                          <span>Add "{inputValue}"</span>
                        </div>
                      </CommandItem>
                    )}
                    <CommandGroup>
                      {defaultOptions
                        .filter(option => option.toLowerCase().includes(inputValue.toLowerCase()))
                        .map(option => (
                          <CommandItem 
                            key={option} 
                            onSelect={() => {
                              handleFactorSelect(category, option);
                              setSearchInputs(prev => ({ ...prev, [category]: "" }));
                              setSearchOpen(prev => ({ ...prev, [category]: false }));
                            }}
                          >
                            {option}
                          </CommandItem>
                        ))
                      }
                    </CommandGroup>
                    {defaultOptions.filter(option => 
                      option.toLowerCase().includes(inputValue.toLowerCase())).length === 0 &&
                      !inputValue && (
                      <CommandEmpty>No options found</CommandEmpty>
                    )}
                  </CommandList>
                </Command>
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {selectedFactors[category].map(factor => (
              <Button 
                key={factor}
                variant="default" 
                size="sm" 
                className="rounded-sm bg-skin-black text-white"
                onClick={() => handleFactorSelect(category, factor)}
              >
                {factor}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    );
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
              className="bg-skin-black text-white flex items-center gap-2 px-6 py-5 h-auto rounded-sm"
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
              {/* Render sections with search */}
              {renderCategoryWithSearch('food', '🥗', 'Food')}
              {renderCategoryWithSearch('supplements', '💊', 'Supplements')}
              {renderCategoryWithSearch('makeup', '💄', 'Makeup')}
              
              {/* Weather Card - Updating button styling */}
              <Card className="ios-card">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2 text-skin-black">🌡️ Weather</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Dry + Cold", "Humid + Hot", "Moderate", "Windy"].map(factor => (
                      <Button 
                        key={factor}
                        variant={selectedFactors.weather.includes(factor) ? "default" : "outline"} 
                        size="sm" 
                        className={`rounded-sm ${selectedFactors.weather.includes(factor) ? 'bg-skin-black text-white' : 'text-skin-black border-skin-black/20'}`}
                        onClick={() => handleFactorSelect('weather', factor)}
                      >
                        {factor}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Menstrual Cycle Card */}
              <Card className="ios-card">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2 text-skin-black">🔴 Menstrual Cycle</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Not Menstruating", "Menstruating", "PMS", "Ovulation", "Spotting"].map(factor => (
                      <Button 
                        key={factor}
                        variant={selectedFactors.menstrualCycle.includes(factor) ? "default" : "outline"} 
                        size="sm" 
                        className={`rounded-sm ${selectedFactors.menstrualCycle.includes(factor) ? 'bg-skin-black text-white' : 'text-skin-black border-skin-black/20'}`}
                        onClick={() => handleFactorSelect('menstrualCycle', factor)}
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
            <Button className="w-full bg-skin-black text-white rounded-sm h-12">
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
