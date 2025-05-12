
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { format, subDays } from "date-fns";
import SkinHistory from "@/components/SkinHistory";
import BackButton from "@/components/BackButton";
import { 
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Camera, Image } from "lucide-react";
import SkinIndexComparison from "@/components/SkinIndexComparison";
import InsightsTrends from "@/components/InsightsTrends";

// Generate data for the past 7 days for skin history chart
const generatePastWeekData = () => {
  const today = new Date();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  return Array(7).fill(null).map((_, index) => {
    const date = subDays(today, 6 - index);
    const dayName = days[date.getDay()];
    const dateStr = format(date, "M/d");
    // Generate a random rating between 40 and 95 for demo purposes
    const rating = Math.floor(Math.random() * (95 - 40 + 1)) + 40;
    
    return {
      day: dayName,
      date: dateStr,
      rating
    };
  });
};

// Data for skin history chart
const skinRatings = generatePastWeekData();

// Mock data for insights
const insightData = [
  {
    title: "Hydration Effect",
    description: "Drinking 8+ glasses of water improved skin moisture by 30%",
    iconName: "droplet"
  },
  {
    title: "Vitamin C Serum",
    description: "Regular use has helped with brightening and texture",
    iconName: "star"
  },
  {
    title: "Sleep Quality",
    description: "Nights with 7+ hours sleep show 40% better skin clarity",
    iconName: "activity"
  }
];

// Define the type for a day log
type DayLogType = {
  id: string;
  date: Date;
  rating: number;
  summary: string;
  factors: {
    food: string[];
    products: string[];
    skin: string[];
  };
  amSelfie?: string | null;
  pmSelfie?: string | null;
};

// Determine label based on rating
const getRatingLabel = (rating: number) => {
  if (rating >= 80) return "Great";
  if (rating >= 60) return "Good";
  if (rating >= 40) return "OK";
  if (rating >= 20) return "Fair";
  return "Poor";
};

const History = () => {
  // State for photo upload dialog
  const [isPhotoDialogOpen, setIsPhotoDialogOpen] = useState(false);
  const [currentPhotoType, setCurrentPhotoType] = useState<"am" | "pm" | null>(null);
  const [currentDayId, setCurrentDayId] = useState<string | null>(null);
  
  // Generate 7 days of mock data
  const dayLogs: DayLogType[] = Array.from({ length: 7 }).map((_, index) => {
    const date = subDays(new Date(), index);
    const rating = Math.floor(Math.random() * 100) + 1; // Random rating between 1-100
    
    // Randomly determine if this log has selfies (for demo purposes)
    // In a real app, this would come from user data
    const hasAmSelfie = Math.random() > 0.7;
    const hasPmSelfie = Math.random() > 0.7;
    
    return {
      id: `day-${index}`,
      date,
      rating,
      summary: rating >= 70 
        ? "Skin looking great today" 
        : rating >= 40 
          ? "Some minor issues" 
          : "Having a rough skin day",
      factors: {
        food: getRandomFactors(["Avocado", "Nuts", "Water", "Green Tea", "Dairy", "Sugar", "Processed Foods"], 2),
        products: getRandomFactors(["Retinol", "Vitamin C Serum", "Moisturizer", "Sunscreen", "Cleanser"], 2),
        skin: getRandomFactors(["Hydrated", "Dry", "Oily", "Irritated", "Calm", "Breakout"], 1),
      },
      amSelfie: hasAmSelfie ? null : undefined, // null means placeholder, undefined means no selfie block
      pmSelfie: hasPmSelfie ? null : undefined, // this is just for demo - in real app all would have placeholders
    };
  });

  function getRandomFactors(array: string[], count: number): string[] {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
  
  // Handle photo placeholder click
  const handlePhotoClick = (dayId: string, photoType: "am" | "pm", event: React.MouseEvent) => {
    // Stop event propagation to prevent navigation to day log detail
    event.preventDefault();
    event.stopPropagation();
    
    // Only open dialog if the photo is null or undefined (not uploaded yet)
    const dayLog = dayLogs.find(log => log.id === dayId);
    // Fix: changed the instanceof check to a more appropriate type check
    const photoExists = photoType === "am" 
      ? typeof dayLog?.amSelfie === 'string' && dayLog.amSelfie !== null
      : typeof dayLog?.pmSelfie === 'string' && dayLog.pmSelfie !== null;
    
    if (!photoExists) {
      setCurrentDayId(dayId);
      setCurrentPhotoType(photoType);
      setIsPhotoDialogOpen(true);
    }
  };
  
  // Handle taking a photo
  const handleTakePhoto = () => {
    // In a real app, this would open the camera
    console.log(`Taking photo for ${currentPhotoType} on day ${currentDayId}`);
    // Close the dialog after action
    setIsPhotoDialogOpen(false);
  };
  
  // Handle selecting from gallery
  const handleSelectFromGallery = () => {
    // In a real app, this would open the photo gallery
    console.log(`Selecting from gallery for ${currentPhotoType} on day ${currentDayId}`);
    // Close the dialog after action
    setIsPhotoDialogOpen(false);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-md mx-auto">
        <header className="mb-6 flex items-center">
          <BackButton />
          <h1 className="text-2xl font-bold">Skin</h1>
        </header>
        
        {/* Add SkinHistory at the top with moderate margin */}
        <SkinHistory ratings={skinRatings} className="mb-6" />
        
        {/* Add the SkinIndexComparison component */}
        <SkinIndexComparison className="mb-6" gender="female" age={25} />
        
        {/* Add the InsightsTrends component under SkinIndexComparison */}
        <InsightsTrends insights={insightData} className="mb-6" />
        
        {/* Use gap-y-6 for moderate spacing between cards to match scans page */}
        <div className="flex flex-col gap-y-6">
          {dayLogs.map((log) => (
            <Link key={log.id} to={`/day-log/${log.id}`}>
              <Card className="ios-card hover:shadow-md transition-all">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{format(log.date, "EEEE")}</h3>
                      <p className="text-sm text-muted-foreground">{format(log.date, "MMM d, yyyy")}</p>
                      <p className="text-sm mt-2">{log.summary}</p>
                      
                      <div className="flex flex-wrap gap-1 mt-2">
                        {log.factors.skin.map((factor, index) => (
                          <span key={index} className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full">
                            {factor}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <div className="text-lg font-semibold">
                        {log.rating}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {getRatingLabel(log.rating)}
                      </span>
                    </div>
                  </div>
                  
                  {/* Add Selfies section to each card */}
                  <div className="mt-4 pt-3 border-t border-gray-100">
                    <h4 className="text-sm font-medium mb-2">Selfies</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {/* AM Photo */}
                      <div 
                        className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs overflow-hidden cursor-pointer"
                        onClick={(e) => handlePhotoClick(log.id, "am", e)}
                      >
                        {log.amSelfie ? (
                          <img 
                            src={log.amSelfie} 
                            alt="AM Selfie" 
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <span>AM Photo</span>
                        )}
                      </div>
                      
                      {/* PM Photo */}
                      <div 
                        className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs overflow-hidden cursor-pointer"
                        onClick={(e) => handlePhotoClick(log.id, "pm", e)}
                      >
                        {log.pmSelfie ? (
                          <img 
                            src={log.pmSelfie} 
                            alt="PM Selfie" 
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <span>PM Photo</span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Photo selection dialog */}
      <Dialog open={isPhotoDialogOpen} onOpenChange={setIsPhotoDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle>Add {currentPhotoType?.toUpperCase()} Photo</DialogTitle>
          <DialogDescription>
            Choose how you want to add your photo
          </DialogDescription>
          
          <div className="grid grid-cols-2 gap-4 py-4">
            <Button 
              onClick={handleTakePhoto}
              className="flex flex-col items-center justify-center h-24 gap-2"
              variant="outline"
            >
              <Camera className="h-8 w-8" />
              <span>Take Picture</span>
            </Button>
            
            <Button 
              onClick={handleSelectFromGallery}
              className="flex flex-col items-center justify-center h-24 gap-2"
              variant="outline"
            >
              <Image className="h-8 w-8" />
              <span>Photo Gallery</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default History;
