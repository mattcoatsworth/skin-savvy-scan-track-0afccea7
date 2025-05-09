import React, { useState } from "react";
import { ArrowLeft, Camera, Plus, Search, Utensils, Pill, Palette, CloudSun, Heart, Smile, Frown, Droplet, Droplets, Thermometer, Bandage, Sun, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Slider } from "@/components/ui/slider";
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
  
  const [sleepHours, setSleepHours] = useState<number>(7);
  const [stressLevel, setStressLevel] = useState<number>(3);
  
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
    { icon: <Smile className="h-10 w-10" />, label: "Balanced" },
    { icon: <Frown className="h-10 w-10" />, label: "Sensitive" },
    { icon: <Droplets className="h-10 w-10" />, label: "Oily" },
    { icon: <Bandage className="h-10 w-10" />, label: "Irritated" },
    { icon: <Thermometer className="h-10 w-10" />, label: "Tired" },
    { icon: <Droplet className="h-10 w-10" />, label: "Normal" },
    { icon: <Sun className="h-10 w-10" />, label: "Glowing" },
    { icon: <CloudSun className="h-10 w-10" />, label: "Dry" },
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

  const getHoursLabel = (hours: number) => {
    if (hours === 1) return "1 hour";
    return `${hours} hours`;
  };

  const getStressLabel = (level: number) => {
    if (level <= 2) return "Low";
    if (level <= 6) return "Moderate";
    return "High";
  };

  // Render a category section with search box
  const renderCategoryWithSearch = (category: string, icon: React.ReactNode, title: string) => {
    const categoryKey = category as keyof typeof searchInputs;
    const defaultOptions = getDefaultOptions(category);
    const inputValue = searchInputs[categoryKey];
    
    return (
      <Card className="ios-card">
        <CardContent className="p-4">
          <h3 className="font-medium mb-2 text-skin-black flex items-center">
            <span className="mr-2">{icon}</span> {title}
          </h3>
          
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
                className="pl-8 py-2 text-sm h-9 w-full pr-4"
              />
            </div>
            
            {searchOpen[categoryKey] && (
              <div className="absolute z-50 mt-1 w-full bg-white border shadow-md">
                <Command>
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
                className="bg-skin-black text-white rounded-full"
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
              className="bg-skin-black text-white flex items-center gap-2 px-6 py-5 h-auto rounded-xl"
              onClick={() => console.log("Upload selfie initiated")}
            >
              <Camera className="h-5 w-5" />
              Get Started by Uploading Selfie
            </Button>
          </div>
          
          {/* Mood Section */}
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
                    <span className="mb-2">{option.icon}</span>
                    <span className="font-medium text-skin-black">{option.label}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4 text-skin-black">Additional factors</h2>
            <div className="space-y-3">
              {/* Sleep Card */}
              <Card className="ios-card">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2 text-skin-black flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-skin-black" /> Sleep
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-skin-black">Hours slept:</span>
                      <span className="text-sm font-medium text-skin-black">{getHoursLabel(sleepHours)}</span>
                    </div>
                    <Slider 
                      value={[sleepHours]} 
                      min={0} 
                      max={12} 
                      step={0.5} 
                      onValueChange={(values) => setSleepHours(values[0])}
                      className="cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0</span>
                      <span>12 hours</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Render sections with search */}
              {renderCategoryWithSearch('food', <Utensils className="h-5 w-5 text-skin-black" />, 'Food')}
              {renderCategoryWithSearch('supplements', <Pill className="h-5 w-5 text-skin-black" />, 'Supplements')}
              {renderCategoryWithSearch('makeup', <Palette className="h-5 w-5 text-skin-black" />, 'Makeup')}
              
              {/* Stress Level Card */}
              <Card className="ios-card">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2 text-skin-black flex items-center">
                    <Thermometer className="h-5 w-5 mr-2 text-skin-black" /> Stress Level
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-skin-black">Level:</span>
                      <span className="text-sm font-medium text-skin-black">{getStressLabel(stressLevel)} ({stressLevel}/10)</span>
                    </div>
                    <Slider 
                      value={[stressLevel]} 
                      min={0} 
                      max={10} 
                      step={1} 
                      onValueChange={(values) => setStressLevel(values[0])}
                      className="cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Low</span>
                      <span>High</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Weather Card */}
              <Card className="ios-card">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2 text-skin-black flex items-center">
                    <CloudSun className="h-5 w-5 mr-2 text-skin-black" /> Weather
                  </h3>
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
              
              {/* Menstrual Cycle Card */}
              <Card className="ios-card">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2 text-skin-black flex items-center">
                    <Heart className="h-5 w-5 mr-2 text-skin-black" /> Menstrual Cycle
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {["Not Menstruating", "Menstruating", "PMS", "Ovulation", "Spotting"].map(factor => (
                      <Button 
                        key={factor}
                        variant={selectedFactors.menstrualCycle.includes(factor) ? "default" : "outline"} 
                        size="sm" 
                        className={`rounded-full ${selectedFactors.menstrualCycle.includes(factor) ? 'bg-skin-black text-white' : 'text-skin-black border-skin-black/20'}`}
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
            <Button className="w-full bg-skin-black text-white h-12 rounded-xl">
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
