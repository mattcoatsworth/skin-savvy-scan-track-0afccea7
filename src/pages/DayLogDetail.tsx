
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, Droplet, Minus, Plus } from "lucide-react";
import { format, subDays, isValid } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import AppNavigation from "@/components/AppNavigation";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Slider } from "@/components/ui/slider";
import ViewScoringMethod from "@/components/ViewScoringMethod";
import BackButton from "@/components/BackButton";
import useScrollToTop from "@/hooks/useScrollToTop";
import SelfieCarousel from "@/components/SelfieCarousel";
import { getRatingColor, getRatingBgColor, getRatingLabel } from "@/utils/skin-utils";

// Define types for the page
type Factor = {
  name: string;
  impact: "positive" | "negative" | "neutral";
  description: string;
  rating?: number;
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

const DayLogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  useScrollToTop();
  
  // State for notes and water intake
  const [notes, setNotes] = useState("");
  const [waterIntake, setWaterIntake] = useState<number>(4);
  const [isEditingWater, setIsEditingWater] = useState(false);
  
  // Add state for selfie images
  const [selfieImages, setSelfieImages] = useState({
    am: [] as (string | null)[],
    pm: [] as (string | null)[]
  });
  
  // Handle special case for "today"
  const getCurrentDate = () => {
    if (id === "today") {
      return new Date();
    }
    
    // Parse the day number from the id (e.g., "day-3" => 3)
    const dayIndex = parseInt(id?.replace('day-', '') || '0', 10);
    // Only proceed if we got a valid number
    if (!isNaN(dayIndex)) {
      return subDays(new Date(), dayIndex);
    }
    
    // Fallback to current date if id is invalid
    return new Date();
  };
  
  const date = getCurrentDate();
  const rating = Math.floor(Math.random() * 100) + 1;
  
  // Load notes, water intake, and selfies from localStorage on component mount
  useEffect(() => {
    if (id) {
      const savedNotes = localStorage.getItem(`skin-notes-${id}`);
      if (savedNotes) {
        setNotes(savedNotes);
      }
      
      const savedWaterIntake = localStorage.getItem(`water-intake-${id}`);
      if (savedWaterIntake) {
        setWaterIntake(Number(savedWaterIntake));
      }
      
      // Load selfies from localStorage
      const savedAmSelfies = localStorage.getItem(`am-selfies-${id}`);
      const savedPmSelfies = localStorage.getItem(`pm-selfies-${id}`);
      
      if (savedAmSelfies) {
        setSelfieImages(prev => ({
          ...prev,
          am: JSON.parse(savedAmSelfies)
        }));
      }
      
      if (savedPmSelfies) {
        setSelfieImages(prev => ({
          ...prev,
          pm: JSON.parse(savedPmSelfies)
        }));
      }
    }
  }, [id]);
  
  // Save notes to localStorage
  const handleSaveNotes = () => {
    if (id) {
      localStorage.setItem(`skin-notes-${id}`, notes);
      toast({
        title: "Notes saved",
        description: "Your notes have been saved successfully.",
        duration: 3000
      });
    }
  };
  
  // Save water intake to localStorage
  const handleSaveWaterIntake = () => {
    if (id) {
      localStorage.setItem(`water-intake-${id}`, waterIntake.toString());
      setIsEditingWater(false);
      toast({
        title: "Water intake updated",
        description: `You've logged ${waterIntake} cups of water for today.`,
        duration: 3000
      });
    }
  };
  
  // Handle adding a selfie image
  const handleAddSelfie = (type: "am" | "pm", index: number) => {
    // In a real app, this would open the camera or file selector
    // For demo, we'll use placeholder images
    const placeholderImages = [
      "https://source.unsplash.com/random/300x300/?face&sig=1",
      "https://source.unsplash.com/random/300x300/?face&sig=2",
      "https://source.unsplash.com/random/300x300/?face&sig=3",
      "https://source.unsplash.com/random/300x300/?face&sig=4"
    ];
    
    const newImages = [...(selfieImages[type] || [])];
    newImages[index] = placeholderImages[index % placeholderImages.length];
    
    setSelfieImages(prev => ({
      ...prev,
      [type]: newImages
    }));
    
    // Save to localStorage
    if (id) {
      localStorage.setItem(`${type}-selfies-${id}`, JSON.stringify(newImages));
      
      toast({
        title: "Photo added",
        description: `Your ${type === 'am' ? 'morning' : 'evening'} photo has been saved.`,
        duration: 3000
      });
    }
  };
  
  // Increment or decrement water intake
  const adjustWaterIntake = (amount: number) => {
    const newValue = Math.max(0, Math.min(12, waterIntake + amount));
    setWaterIntake(newValue);
  };
  
  // Handle water intake slider change
  const handleWaterIntakeChange = (value: number[]) => {
    setWaterIntake(value[0]);
  };
  
  const waterRating = getWaterIntakeRating(waterIntake);
  
  // Mock data for the day details
  const foodFactors: Factor[] = [
    { 
      name: "Avocado", 
      impact: "positive", 
      description: "Rich in healthy fats",
      rating: 85
    },
    { 
      name: "Green Tea", 
      impact: "positive", 
      description: "Antioxidants improved skin",
      rating: 78
    },
    { 
      name: "Dairy", 
      impact: "negative", 
      description: "Possibly triggered inflammation",
      rating: 35
    }
  ];
  
  const productFactors: Factor[] = [
    { 
      name: "Vitamin C Serum", 
      impact: "positive", 
      description: "Brightened skin",
      rating: 90
    },
    { 
      name: "New Moisturizer", 
      impact: "neutral", 
      description: "No noticeable effect",
      rating: 60
    }
  ];
  
  const environmentalFactors: Factor[] = [
    { 
      name: "Humidity", 
      impact: "negative", 
      description: "Caused excessive oiliness",
      rating: 30
    },
    { 
      name: "Sleep Quality", 
      impact: "positive", 
      description: "8+ hours improved skin",
      rating: 95
    },
    { 
      name: "Water Intake", 
      impact: waterIntake >= 6 ? "positive" : (waterIntake >= 4 ? "neutral" : "negative"), 
      description: `${waterIntake} cups - ${waterRating.label} hydration`,
      rating: waterIntake * 8.3 // Convert to a rating out of 100
    }
  ];
  
  const summary = rating >= 70 
    ? "Your skin looked great today. Sleep and diet contributed positively." 
    : rating >= 40 
      ? "Some minor issues today, possibly related to diet." 
      : "Rough skin day. Environmental factors and diet may have contributed.";

  // Only format the date if it's valid
  const formattedDay = isValid(date) ? format(date, "EEEE") : "Today";
  const formattedDate = isValid(date) ? format(date, "MMMM d, yyyy") : "Invalid date";

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6 flex items-center">
          <BackButton />
          <div>
            <h1 className="text-2xl font-bold">{formattedDay}</h1>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{formattedDate}</span>
            </div>
          </div>
        </header>
        
        {/* Overall Summary Card */}
        <Card className="ios-card mb-6">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold mb-2">Daily Summary</h2>
                <p className="text-sm">{summary}</p>
              </div>
              
              <div className="flex flex-col items-center">
                {/* Updated Rating Circle to match Weekly Skin Report */}
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: getRatingBgColor(rating) }}
                >
                  <span 
                    className="text-lg font-semibold"
                    style={{ color: getRatingColor(rating) }}
                  >
                    {rating}
                  </span>
                </div>
                <span 
                  className="text-xs mt-1 font-medium"
                  style={{ color: getRatingColor(rating) }}
                >
                  {getRatingLabel(rating)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Water Intake Card - Enhanced to allow updating */}
        <Card className="ios-card mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Droplet className="h-5 w-5 mr-2" />
                <h3 className="font-medium">Water Intake</h3>
              </div>
              <span className="text-sm px-2 py-0.5 rounded" style={{ backgroundColor: `${waterRating.color}20`, color: waterRating.color }}>
                {waterRating.label}
              </span>
            </div>
            
            {isEditingWater ? (
              <>
                <div className="mt-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Update your water intake:</span>
                    <div className="flex items-center">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="h-8 w-8 p-0 rounded-full"
                        onClick={() => adjustWaterIntake(-1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="mx-3 font-medium">{waterIntake} cups</span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="h-8 w-8 p-0 rounded-full"
                        onClick={() => adjustWaterIntake(1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
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
                    <span>0 cups</span>
                    <span className="font-medium">{waterIntake} cups</span>
                    <span>12 cups</span>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => setIsEditingWater(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      className="flex-1"
                      onClick={handleSaveWaterIntake}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Did you reach your water intake goal today?</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full" 
                      style={{ 
                        width: `${Math.min(waterIntake * 100 / 12, 100)}%`, 
                        backgroundColor: waterRating.color 
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span>0 cups</span>
                    <span className="font-medium">{waterIntake} cups</span>
                    <span>12 cups (ideal)</span>
                  </div>
                  <Button 
                    variant="outline"
                    size="sm"
                    className="w-full mt-3"
                    onClick={() => setIsEditingWater(true)}
                  >
                    Update Water Intake
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
        
        {/* Self Photos Section - Updated to use SelfieCarousel */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Selfies</h2>
          <Card className="ios-card">
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-4">
                {/* AM Selfies Carousel */}
                <SelfieCarousel
                  type="am"
                  images={selfieImages.am}
                  onAddImage={handleAddSelfie}
                />
                
                {/* PM Selfies Carousel */}
                <SelfieCarousel
                  type="pm" 
                  images={selfieImages.pm}
                  onAddImage={handleAddSelfie}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Food Section - Scrollable section instead of tab */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Food</h2>
          <div className="space-y-3">
            {foodFactors.map((factor, index) => (
              <Card key={index} className="ios-card">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{factor.name}</h3>
                      <p className="text-sm text-muted-foreground mb-1">
                        {factor.description}
                      </p>
                    </div>
                    
                    {factor.rating !== undefined && (
                      <div className="flex flex-col items-center">
                        {/* Updated Rating Circle to match Weekly Skin Report */}
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: getRatingBgColor(factor.rating) }}
                        >
                          <span 
                            className="text-lg font-semibold"
                            style={{ color: getRatingColor(factor.rating) }}
                          >
                            {factor.rating}
                          </span>
                        </div>
                        <span 
                          className="text-xs mt-1 font-medium"
                          style={{ color: getRatingColor(factor.rating) }}
                        >
                          {getRatingLabel(factor.rating)}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Products Section - Scrollable section instead of tab */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Products</h2>
          <div className="space-y-3">
            {productFactors.map((factor, index) => (
              <Card key={index} className="ios-card">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{factor.name}</h3>
                      <p className="text-sm text-muted-foreground mb-1">
                        {factor.description}
                      </p>
                    </div>
                    
                    {factor.rating !== undefined && (
                      <div className="flex flex-col items-center">
                        {/* Updated Rating Circle to match Weekly Skin Report */}
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: getRatingBgColor(factor.rating) }}
                        >
                          <span 
                            className="text-lg font-semibold"
                            style={{ color: getRatingColor(factor.rating) }}
                          >
                            {factor.rating}
                          </span>
                        </div>
                        <span 
                          className="text-xs mt-1 font-medium"
                          style={{ color: getRatingColor(factor.rating) }}
                        >
                          {getRatingLabel(factor.rating)}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Environmental Section - Scrollable section instead of tab */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Environmental</h2>
          <div className="space-y-3">
            {environmentalFactors.map((factor, index) => (
              <Card key={index} className="ios-card">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{factor.name}</h3>
                      <p className="text-sm text-muted-foreground mb-1">
                        {factor.description}
                      </p>
                    </div>
                    
                    {factor.rating !== undefined && (
                      <div className="flex flex-col items-center">
                        {/* Updated Rating Circle to match Weekly Skin Report */}
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: getRatingBgColor(factor.rating) }}
                        >
                          <span 
                            className="text-lg font-semibold"
                            style={{ color: getRatingColor(factor.rating) }}
                          >
                            {factor.rating}
                          </span>
                        </div>
                        <span 
                          className="text-xs mt-1 font-medium"
                          style={{ color: getRatingColor(factor.rating) }}
                        >
                          {getRatingLabel(factor.rating)}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Notes Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Notes</h2>
          <Card className="ios-card">
            <CardContent className="p-4">
              <Textarea 
                placeholder="Add your notes about this day..." 
                className="min-h-[120px] rounded-md border border-input"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              <Button 
                onClick={handleSaveNotes} 
                className="mt-3 w-full"
              >
                Save Notes
              </Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Add View Scoring Method component at the bottom */}
        <ViewScoringMethod />
      </div>
      
      <AppNavigation />
    </div>
  );
};

export default DayLogDetail;
