import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Droplet } from "lucide-react";
import { format, subDays } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppNavigation from "@/components/AppNavigation";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

// Define types for the page
type Factor = {
  name: string;
  impact: "positive" | "negative" | "neutral";
  description: string;
  rating?: number;
};

// Determine progress color based on rating
const getProgressColor = (rating: number) => {
  if (rating >= 70) return "#4ADE80"; // Green for good ratings
  if (rating >= 40) return "#FACC15"; // Yellow for medium ratings
  return "#F87171"; // Red for poor ratings
};

// Get the lighter background color for the circle
const getBackgroundColor = (rating: number) => {
  if (rating >= 70) return "#E6F8EA"; // Light green
  if (rating >= 40) return "#FEF7CD"; // Light yellow
  return "#FFDEE2"; // Light red
};

// Determine label based on rating
const getRatingLabel = (rating: number) => {
  if (rating >= 80) return "Great";
  if (rating >= 60) return "Good";
  if (rating >= 40) return "OK";
  if (rating >= 20) return "Fair";
  return "Poor";
};

const getImpactIndicator = (impact: Factor['impact']) => {
  switch (impact) {
    case "positive":
      return "🟢";
    case "negative":
      return "🔴";
    case "neutral":
      return "🟡";
  }
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
  
  // State for notes and water intake
  const [notes, setNotes] = useState("");
  const [waterIntake, setWaterIntake] = useState<number>(4);
  
  // In a real app, this would fetch data from an API based on the ID
  // For this demo, we'll generate mock data
  const dayIndex = parseInt(id?.replace('day-', '') || '0');
  const date = subDays(new Date(), dayIndex);
  const rating = Math.floor(Math.random() * 100) + 1;
  
  // Load notes and water intake from localStorage on component mount
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

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6 flex items-center">
          <Link to="/history" className="mr-4">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">{format(date, "EEEE")}</h1>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{format(date, "MMMM d, yyyy")}</span>
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
                <div className="relative w-14 h-14 flex items-center justify-center">
                  {/* Background circle */}
                  <svg className="w-14 h-14 absolute" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke={getBackgroundColor(rating)}
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                  
                  {/* Foreground circle - the actual progress */}
                  <svg className="w-14 h-14 absolute" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke={getProgressColor(rating)}
                      strokeWidth="4"
                      strokeDasharray={`${rating}, 100`}
                      strokeLinecap="round"
                    />
                  </svg>
                  
                  {/* Rating number in the center */}
                  <div className="text-base font-semibold">
                    {rating}
                  </div>
                </div>
                <span className="text-xs mt-1 text-muted-foreground">
                  {getRatingLabel(rating)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Water Intake Card - New Addition */}
        <Card className="ios-card mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Droplet className="h-5 w-5 mr-2" />
                <h3 className="font-medium">Water Intake</h3>
              </div>
              <span className="text-sm px-2 py-0.5 rounded" style={{ backgroundColor: `${waterRating.color}20`, color: waterRating.color }}>
                {waterRating.label}
              </span>
            </div>
            <div className="mt-2 flex items-center">
              <div className="flex-1">
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
                  <span>12 cups</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Tabs for different factor categories */}
        <Tabs defaultValue="food" className="w-full mb-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="food">Food</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="environmental">Environmental</TabsTrigger>
          </TabsList>
          
          <TabsContent value="food" className="mt-4 space-y-3">
            {foodFactors.map((factor, index) => (
              <Card key={index} className="ios-card">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{factor.name}</h3>
                      <p className="text-sm text-muted-foreground mb-1">
                        {getImpactIndicator(factor.impact)} {factor.description}
                      </p>
                    </div>
                    
                    {factor.rating !== undefined && (
                      <div className="flex flex-col items-center">
                        <div className="relative w-12 h-12 flex items-center justify-center">
                          {/* Background circle */}
                          <svg className="w-12 h-12 absolute" viewBox="0 0 36 36">
                            <path
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke={getBackgroundColor(factor.rating)}
                              strokeWidth="4"
                              strokeLinecap="round"
                            />
                          </svg>
                          
                          {/* Foreground circle - the actual progress */}
                          <svg className="w-12 h-12 absolute" viewBox="0 0 36 36">
                            <path
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke={getProgressColor(factor.rating)}
                              strokeWidth="4"
                              strokeDasharray={`${factor.rating}, 100`}
                              strokeLinecap="round"
                            />
                          </svg>
                          
                          {/* Rating number in the center */}
                          <div className="text-sm font-semibold">
                            {factor.rating}
                          </div>
                        </div>
                        <span className="text-xs mt-1 text-muted-foreground">
                          {getRatingLabel(factor.rating)}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="products" className="mt-4 space-y-3">
            {productFactors.map((factor, index) => (
              <Card key={index} className="ios-card">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{factor.name}</h3>
                      <p className="text-sm text-muted-foreground mb-1">
                        {getImpactIndicator(factor.impact)} {factor.description}
                      </p>
                    </div>
                    
                    {factor.rating !== undefined && (
                      <div className="flex flex-col items-center">
                        <div className="relative w-12 h-12 flex items-center justify-center">
                          {/* Background circle */}
                          <svg className="w-12 h-12 absolute" viewBox="0 0 36 36">
                            <path
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke={getBackgroundColor(factor.rating)}
                              strokeWidth="4"
                              strokeLinecap="round"
                            />
                          </svg>
                          
                          {/* Foreground circle - the actual progress */}
                          <svg className="w-12 h-12 absolute" viewBox="0 0 36 36">
                            <path
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke={getProgressColor(factor.rating)}
                              strokeWidth="4"
                              strokeDasharray={`${factor.rating}, 100`}
                              strokeLinecap="round"
                            />
                          </svg>
                          
                          {/* Rating number in the center */}
                          <div className="text-sm font-semibold">
                            {factor.rating}
                          </div>
                        </div>
                        <span className="text-xs mt-1 text-muted-foreground">
                          {getRatingLabel(factor.rating)}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="environmental" className="mt-4 space-y-3">
            {environmentalFactors.map((factor, index) => (
              <Card key={index} className="ios-card">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{factor.name}</h3>
                      <p className="text-sm text-muted-foreground mb-1">
                        {getImpactIndicator(factor.impact)} {factor.description}
                      </p>
                    </div>
                    
                    {factor.rating !== undefined && (
                      <div className="flex flex-col items-center">
                        <div className="relative w-12 h-12 flex items-center justify-center">
                          {/* Background circle */}
                          <svg className="w-12 h-12 absolute" viewBox="0 0 36 36">
                            <path
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke={getBackgroundColor(factor.rating)}
                              strokeWidth="4"
                              strokeLinecap="round"
                            />
                          </svg>
                          
                          {/* Foreground circle - the actual progress */}
                          <svg className="w-12 h-12 absolute" viewBox="0 0 36 36">
                            <path
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke={getProgressColor(factor.rating)}
                              strokeWidth="4"
                              strokeDasharray={`${factor.rating}, 100`}
                              strokeLinecap="round"
                            />
                          </svg>
                          
                          {/* Rating number in the center */}
                          <div className="text-sm font-semibold">
                            {factor.rating}
                          </div>
                        </div>
                        <span className="text-xs mt-1 text-muted-foreground">
                          {getRatingLabel(factor.rating)}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
        
        {/* Self Photos Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Selfies</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">AM Photo</span>
            </div>
            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">PM Photo</span>
            </div>
          </div>
        </div>
        
        {/* Notes Section - New Addition */}
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
      </div>
      
      <AppNavigation />
    </div>
  );
};

export default DayLogDetail;
