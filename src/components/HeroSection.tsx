
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CalendarDays, FlameIcon, ChevronRight, CalendarIcon } from "lucide-react";

interface DayRating {
  day: string;
  rating: number;
}

interface HeroSectionProps {
  skinHistory: DayRating[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ skinHistory }) => {
  // Calculate streak from skin history (for demo purposes)
  const currentStreak = skinHistory.filter(day => day.rating > 0).length;
  
  // Get appropriate message based on streak count
  const getStreakMessage = (count: number) => {
    if (count === 0) return "Start your streak today!";
    if (count === 1) return "First day logged!";
    if (count < 5) return "Building consistency!";
    if (count < 10) return "Great consistency!";
    if (count < 30) return "Impressive dedication!";
    return "Outstanding commitment!";
  };

  return (
    <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-b from-blue-50 to-white">
      <CardContent className="p-0">
        {/* Calendar Week View */}
        <div className="p-4 pb-2">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-base text-gray-700">Weekly Report</h3>
            <Link to="/skin?tab=weekly">
              <Button variant="ghost" size="sm" className="text-xs p-0 h-auto flex items-center">
                View Full Report
                <ChevronRight className="h-3 w-3 ml-0.5" />
              </Button>
            </Link>
          </div>
          
          <div className="flex justify-between mb-4">
            <div className="grid grid-cols-7 gap-1 w-full">
              {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                <div key={i} className="text-center text-xs text-gray-500">
                  {day}
                </div>
              ))}
              {skinHistory.map((day, i) => {
                const isToday = i === skinHistory.length - 1;
                const hasRating = day.rating > 0;
                
                let bgColorClass = "bg-gray-200";
                if (hasRating) {
                  if (day.rating >= 80) bgColorClass = "bg-green-500";
                  else if (day.rating >= 60) bgColorClass = "bg-blue-500";
                  else if (day.rating >= 40) bgColorClass = "bg-amber-400";
                  else bgColorClass = "bg-red-500";
                }
                
                return (
                  <div 
                    key={`rating-${i}`} 
                    className="flex justify-center"
                  >
                    <div className={`w-8 h-8 rounded-full ${bgColorClass} flex items-center justify-center ${
                      isToday ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                    }`}
                    >
                      <span className="text-xs text-white font-medium">
                        {i + 15}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="h-px bg-gray-100 mx-4"></div>
        
        {/* Skin Care Streak Section */}
        <div className="p-4 pt-3">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 bg-gradient-to-br from-violet-100 to-indigo-100 w-16 h-16 rounded-full flex items-center justify-center">
              <div className="relative">
                <FlameIcon className="h-5 w-5 text-amber-500 absolute -top-2 -right-2" />
                <span className="text-2xl font-bold text-violet-600">{currentStreak}</span>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-base">Skin Care Streak</h3>
              <p className="text-sm text-muted-foreground">{getStreakMessage(currentStreak)}</p>
              
              <div className="mt-1 flex items-center text-xs text-violet-600">
                <p>Keep your streak going!</p>
                <CalendarDays className="h-3 w-3 ml-1 text-muted-foreground" />
              </div>
            </div>
            
            <div className="ml-auto">
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-violet-500 to-purple-500 text-white"
                asChild
              >
                <Link to="/log-skin-condition">
                  Log Today
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HeroSection;
