import React, { useState, useEffect } from "react";
import { ArrowLeft, Camera, Plus, Search, Utensils, Pill, Palette, CloudSun, Heart, Smile, Frown, Droplet, Droplets, Thermometer, Bandage, Sun, Clock, FileText, ScanBarcode, Brain } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import AppNavigation from "@/components/AppNavigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';

const LogSkinCondition = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedFactors, setSelectedFactors] = useState<Record<string, string[]>>({
    food: [],
    supplements: [],
    makeup: [],
    weather: [],
    menstrualCycle: [],
    stressors: [] // Add stressors to the state
  });
  
  // Add state for personalized skin plan
  const [wantsPersonalizedPlan, setWantsPersonalizedPlan] = useState<string>("yes");
  
  const [sleepHours, setSleepHours] = useState<number>(7);
  const [stressLevel, setStressLevel] = useState<number>(3);
  const [notes, setNotes] = useState("");
  const [waterIntake, setWaterIntake] = useState<number>(4);
  
  // Add state for user gender
  const [userGender, setUserGender] = useState<string | null>(null);
  
  // Add state for search inputs
  const [searchInputs, setSearchInputs] = useState({
    food: "",
    supplements: "",
    makeup: "",
    stressors: ""
  });
  
  // Add state for search popover visibility
  const [searchOpen, setSearchOpen] = useState({
    food: false,
    supplements: false,
    makeup: false,
    stressors: false
  });

  // Add state for scan dialog
  const [scanDialogOpen, setScanDialogOpen] = useState(false);
  const [scanningCategory, setScanningCategory] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<string | null>(null);
  
  // Load notes from localStorage on component mount
  useEffect(() => {
    // Get the user's gender from localStorage
    const gender = localStorage.getItem("userGender");
    setUserGender(gender);
    
    const currentDate = new Date().toISOString().split('T')[0];
    const savedNotes = localStorage.getItem(`skin-notes-${currentDate}`);
    if (savedNotes) {
      setNotes(savedNotes);
    }
    
    // Load water intake if saved
    const savedWaterIntake = localStorage.getItem(`water-intake-${currentDate}`);
    if (savedWaterIntake) {
      setWaterIntake(Number(savedWaterIntake));
    }
    
    // Load personalized plan preference if saved
    const savedPersonalizedPlan = localStorage.getItem(`personalized-plan-${currentDate}`);
    if (savedPersonalizedPlan) {
      setWantsPersonalizedPlan(savedPersonalizedPlan);
    }
  }, []);

  // Save notes to localStorage
  const handleSaveNotes = () => {
    const currentDate = new Date().toISOString().split('T')[0];
    localStorage.setItem(`skin-notes-${currentDate}`, notes);
    toast({
      title: "Notes saved",
      description: "Your notes have been saved successfully.",
      duration: 3000
    });
  };
  
  // Save water intake to localStorage
  const handleWaterIntakeChange = (value: number[]) => {
    const intake = value[0];
    setWaterIntake(intake);
    const currentDate = new Date().toISOString().split('T')[0];
    localStorage.setItem(`water-intake-${currentDate}`, intake.toString());
  };
  
  // Save personalized plan preference to localStorage
  const handlePersonalizedPlanChange = (value: string) => {
    setWantsPersonalizedPlan(value);
    const currentDate = new Date().toISOString().split('T')[0];
    localStorage.setItem(`personalized-plan-${currentDate}`, value);
  };
  
  // Get water intake rating feedback
  const getWaterIntakeRating = (cups: number): {label: string; color: string} => {
    if (cups >= 8) {
      return { label: "Excellent", color: "#4ADE80" }; // Green
    } else if (cups >= 6) {
      return { label: "Good", color: "#FACC15" }; // Yellow
    } else if (cups >= 4) {
      return { label: "Adequate", color: "#FFA500" }; // Orange
    } else {
      return { label: "Low", color: "#F87171" }; // Red
    }
  };
  
  // Get sleep hours rating feedback
  const getSleepRating = (hours: number): {label: string; color: string} => {
    if (hours >= 8) {
      return { label: "Excellent", color: "#4ADE80" }; // Green
    } else if (hours >= 6.5) {
      return { label: "Good", color: "#FACC15" }; // Yellow
    } else if (hours >= 5) {
      return { label: "Adequate", color: "#FFA500" }; // Orange
    } else {
      return { label: "Low", color: "#F87171" }; // Red
    }
  };
  
  // Get stress level rating feedback
  const getStressRating = (level: number): {label: string; color: string} => {
    if (level <= 2) {
      return { label: "Low", color: "#4ADE80" }; // Green - low stress is good
    } else if (level <= 5) {
      return { label: "Moderate", color: "#FACC15" }; // Yellow
    } else if (level <= 8) {
      return { label: "High", color: "#FFA500" }; // Orange
    } else {
      return { label: "Severe", color: "#F87171" }; // Red
    }
  };
  
  const waterRating = getWaterIntakeRating(waterIntake);
  const sleepRating = getSleepRating(sleepHours);
  const stressRating = getStressRating(stressLevel);

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
  
  // Handle scanning functionality
  const handleStartScan = (category: string) => {
    setScanningCategory(category);
    setScanDialogOpen(true);
    
    // Simulate scanning process (in a real app, this would activate a camera)
    setTimeout(() => {
      // Simulate a scan result based on the category
      let result = '';
      switch(category) {
        case 'food':
          result = ['Avocado', 'Green Tea', 'Salmon', 'Sweet Potato', 'Blueberries'][Math.floor(Math.random() * 5)];
          break;
        case 'supplements':
          result = ['Vitamin C', 'Zinc', 'Collagen', 'Biotin', 'Omega-3'][Math.floor(Math.random() * 5)];
          break;
        case 'makeup':
          result = ['Foundation XYZ', 'Concealer ABC', 'Mascara 123', 'Blush Pink', 'Eyeshadow Gold'][Math.floor(Math.random() * 5)];
          break;
        case 'stressors':
          result = ['Work', 'Family', 'Financial', 'Health', 'Relationships', 'Social Media', 'News', 'Travel'][Math.floor(Math.random() * 8)];
          break;
        default:
          result = 'Unknown Item';
      }
      
      setScanResult(result);
    }, 1500); // Simulate 1.5 seconds of scanning
  };
  
  // Handle adding scanned item to the factor list
  const handleAddScannedItem = () => {
    if (scanningCategory && scanResult) {
      handleFactorSelect(scanningCategory, scanResult);
      toast({
        title: "Item added",
        description: `Added ${scanResult} to your ${scanningCategory} list.`,
        duration: 3000
      });
      
      // Close dialog and reset scan states
      setScanDialogOpen(false);
      setScanningCategory(null);
      setScanResult(null);
    }
  };
  
  // Handle saving the entire log, now including personalized plan preference to Supabase
  const handleSaveLog = async () => {
    try {
      // Generate UUID for the skin log
      const skinLogId = uuidv4();
      const currentDate = new Date().toISOString().split('T')[0];
      
      // Save skin log to Supabase
      const { error: skinLogError } = await supabase
        .from('skin_logs')
        .insert({
          id: skinLogId,
          user_id: '00000000-0000-0000-0000-000000000000', // Replace with actual user id when auth is implemented
          overall_condition: selectedMood || 'Normal',
          log_date: currentDate,
          notes: notes,
          personalized_plan_preference: wantsPersonalizedPlan
        });
      
      if (skinLogError) {
        console.error('Error saving skin log:', skinLogError);
        toast({
          title: "Error saving log",
          description: "There was a problem saving your skin condition log.",
          duration: 3000
        });
        return;
      }
      
      // Save daily factors to Supabase
      const { error: factorsError } = await supabase
        .from('daily_factors')
        .insert({
          skin_log_id: skinLogId,
          sleep_hours: sleepHours,
          water_intake_ml: waterIntake * 250, // Convert cups to ml
          stress_level: stressLevel
        });
      
      if (factorsError) {
        console.error('Error saving daily factors:', factorsError);
        // Continue as we've already saved the main log
      }
      
      // Save factors locally 
      Object.entries(selectedFactors).forEach(([category, items]) => {
        localStorage.setItem(`skin-${category}-${currentDate}`, JSON.stringify(items));
      });
      
      // Save other data locally
      localStorage.setItem(`skin-mood-${currentDate}`, selectedMood || '');
      localStorage.setItem(`skin-sleep-${currentDate}`, sleepHours.toString());
      localStorage.setItem(`skin-stress-${currentDate}`, stressLevel.toString());
      localStorage.setItem(`personalized-plan-${currentDate}`, wantsPersonalizedPlan);
      
      toast({
        title: "Log saved",
        description: "Your skin condition log has been saved successfully.",
        duration: 3000
      });
      
      // Navigate to today's detail page
      navigate("/day-log/today");
    } catch (error) {
      console.error('Error in save log function:', error);
      toast({
        title: "Error saving log",
        description: "There was a problem saving your skin condition log.",
        duration: 3000
      });
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
      case 'stressors':
        return ["Work", "Family", "Financial", "Health", "Relationships", "Social Media", "News", "Travel"];
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
  
  // Get the appropriate icon for the category
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'food':
        return <Utensils className="h-6 w-6 text-white" />;
      case 'supplements':
        return <Pill className="h-6 w-6 text-white" />;
      case 'makeup':
        return <Palette className="h-6 w-6 text-white" />;
      case 'stressors':
        return <Brain className="h-6 w-6 text-white" />;
      default:
        return <Camera className="h-6 w-6 text-white" />;
    }
  };
  
  // Get the color for the scanning category
  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'food':
        return "bg-green-600";
      case 'supplements':
        return "bg-blue-600";
      case 'makeup':
        return "bg-pink-600";
      case 'stressors':
        return "bg-purple-600";
      default:
        return "bg-gray-600";
    }
  };

  // Render a category section with search box
  const renderCategoryWithSearch = (category: string, icon: React.ReactNode, title: string) => {
    // Skip rendering if user is male and category is makeup
    if (category === 'makeup' && userGender === 'male') {
      return null;
    }
    
    const categoryKey = category as keyof typeof searchInputs;
    const defaultOptions = getDefaultOptions(category);
    const inputValue = searchInputs[categoryKey];
    
    return (
      <Card className="ios-card">
        <CardContent className="p-4">
          <h3 className="font-medium mb-2 text-skin-black flex items-center justify-between">
            <div className="flex items-center">
              <span className="mr-2">{icon}</span> {title}
            </div>
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1 text-xs"
              onClick={() => handleStartScan(category)}
            >
              <ScanBarcode className="h-3.5 w-3.5" />
              Scan
            </Button>
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
                className="bg-skin-black text-white rounded-xl"
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
          
          {/* Personalized Skin Plan Section - Updated message text */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-skin-black">Do you want a personalized skin plan?</h2>
            <Card className="ios-card">
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant={wantsPersonalizedPlan === "yes" ? "default" : "outline"} 
                    size="sm" 
                    className={`rounded-xl ${wantsPersonalizedPlan === "yes" ? 'bg-skin-black text-white' : 'text-skin-black border-skin-black/20 hover:bg-gray-50'}`}
                    onClick={() => handlePersonalizedPlanChange("yes")}
                  >
                    Yes
                  </Button>
                  <Button 
                    variant={wantsPersonalizedPlan === "no" ? "default" : "outline"} 
                    size="sm" 
                    className={`rounded-xl ${wantsPersonalizedPlan === "no" ? 'bg-skin-black text-white' : 'text-skin-black border-skin-black/20 hover:bg-gray-50'}`}
                    onClick={() => handlePersonalizedPlanChange("no")}
                  >
                    No
                  </Button>
                </div>
                
                {wantsPersonalizedPlan === "yes" && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
                    Complete 7 straight days of skin logs so we can understand enough about your skin and routine to help you.
                    <br /><br />
                    We will provide skincare information along the way.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4 text-skin-black">Additional factors</h2>
            <div className="space-y-3">
              {/* Water Intake Card - Updated layout */}
              <Card className="ios-card">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-skin-black flex items-center">
                      <Droplet className="h-5 w-5 mr-2 text-skin-black" /> Water Intake
                    </h3>
                    <Badge className="text-xs px-2" style={{ backgroundColor: `${waterRating.color}20`, color: waterRating.color }}>
                      {waterRating.label}
                    </Badge>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-skin-black">How many cups of water did you drink today?</span>
                      <span className="text-sm font-medium text-skin-black">{waterIntake} cups</span>
                    </div>
                    <Slider 
                      value={[waterIntake]} 
                      min={0} 
                      max={12} 
                      step={1} 
                      onValueChange={handleWaterIntakeChange}
                      className="cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0</span>
                      <span>12 cups</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Sleep Card - Updated with rating badge */}
              <Card className="ios-card">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-skin-black flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-skin-black" /> Sleep
                    </h3>
                    <Badge className="text-xs px-2" style={{ backgroundColor: `${sleepRating.color}20`, color: sleepRating.color }}>
                      {sleepRating.label}
                    </Badge>
                  </div>
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
              {userGender !== 'male' && renderCategoryWithSearch('makeup', <Palette className="h-5 w-5 text-skin-black" />, 'Makeup')}
              
              {/* Stress Level Card - Updated with rating badge */}
              <Card className="ios-card">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-skin-black flex items-center">
                      <Thermometer className="h-5 w-5 mr-2 text-skin-black" /> Stress Level
                    </h3>
                    <Badge className="text-xs px-2" style={{ backgroundColor: `${stressRating.color}20`, color: stressRating.color }}>
                      {stressRating.label}
                    </Badge>
                  </div>
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
              
              {/* Stressors Card */}
              <Card className="ios-card">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2 text-skin-black flex items-center justify-between">
                    <div className="flex items-center">
                      <Brain className="h-5 w-5 mr-2 text-skin-black" /> Stressors
                    </div>
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">What's causing your stress today?</p>
                  <div className="flex flex-wrap gap-2">
                    {getDefaultOptions('stressors').map(factor => (
                      <Button 
                        key={factor}
                        variant={selectedFactors.stressors.includes(factor) ? "default" : "outline"} 
                        size="sm" 
                        className={`rounded-xl ${selectedFactors.stressors.includes(factor) ? 'bg-skin-black text-white' : 'text-skin-black border-skin-black/20'}`}
                        onClick={() => handleFactorSelect('stressors', factor)}
                      >
                        {factor}
                      </Button>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="relative">
                      <Input
                        placeholder="Add other stressor..."
                        value={searchInputs.stressors || ''}
                        onChange={(e) => handleSearchChange('stressors', e.target.value)}
                        className="text-sm h-9 pr-10"
                      />
                      <button 
                        onClick={() => handleAddCustomFactor('stressors')}
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 flex items-center justify-center rounded-full bg-skin-black text-white disabled:opacity-50 disabled:bg-gray-400"
                        disabled={!searchInputs.stressors}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
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
                        className={`rounded-xl ${selectedFactors.weather.includes(factor) ? 'bg-skin-black text-white' : 'text-skin-black border-skin-black/20'}`}
                        onClick={() => handleFactorSelect('weather', factor)}
                      >
                        {factor}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Menstrual Cycle Card - Only show for female users */}
              {userGender !== 'male' && (
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
                          className={`rounded-xl ${selectedFactors.menstrualCycle.includes(factor) ? 'bg-skin-black text-white' : 'text-skin-black border-skin-black/20'}`}
                          onClick={() => handleFactorSelect('menstrualCycle', factor)}
                        >
                          {factor}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {/* Notes Section */}
              <Card className="ios-card">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2 text-skin-black flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-skin-black" /> Notes
                  </h3>
                  <Textarea 
                    placeholder="Add your notes about today..." 
                    className="min-h-[120px] rounded-md border border-input"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                  <Button 
                    onClick={handleSaveNotes} 
                    className="mt-3 w-full bg-skin-black text-white rounded-xl"
                  >
                    Save Notes
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="pt-4">
            <Button 
              className="w-full bg-skin-black text-white h-12 rounded-xl"
              onClick={handleSaveLog}
            >
              Save Today's Log
            </Button>
          </div>
        </main>
      </div>
      
      {/* Scanning Dialog */}
      <Dialog open={scanDialogOpen} onOpenChange={setScanDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center">
              {scanningCategory && (
                <span className="mr-2">Scanning {scanningCategory}</span>
              )}
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col items-center justify-center py-8 space-y-6">
            {!scanResult ? (
              <>
                <div className={`rounded-full p-6 ${scanningCategory ? getCategoryColor(scanningCategory) : 'bg-skin-black'}`}>
                  {scanningCategory ? getCategoryIcon(scanningCategory) : <Camera className="h-6 w-6 text-white" />}
                </div>
                <div className="text-center">
                  <p className="text-lg font-medium">Scanning...</p>
                  <p className="text-sm text-muted-foreground">Hold the product barcode in front of the camera</p>
                </div>
              </>
            ) : (
              <>
                <div className="rounded-full p-6 bg-green-600">
                  <Camera className="h-6 w-6 text-white" />
                </div>
                <div className="text-center">
                  <p className="text-lg font-medium">Scanned Successfully!</p>
                  <p className="text-xl font-bold my-2">{scanResult}</p>
                </div>
                <Button 
                  className="w-full bg-skin-black text-white"
                  onClick={handleAddScannedItem}
                >
                  Add to {scanningCategory} List
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
      
      <AppNavigation />
    </div>
  );
};

export default LogSkinCondition;
