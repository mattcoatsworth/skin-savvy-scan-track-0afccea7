
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Zap } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getRatingColor, getRatingBgColor, getRatingLabel } from "@/utils/skin-utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type DayRating = {
  day: string;
  rating: number;
  date: string;
};

interface HeroSectionProps {
  ratings: DayRating[];
  streak: number;
  lastLog?: string;
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  ratings, 
  streak, 
  lastLog = "Today",
  className 
}) => {
  const navigate = useNavigate();

  // Get appropriate message based on streak count
  const getStreakMessage = (count: number) => {
    if (count === 0) return "Start your streak today!";
    if (count === 1) return "First day logged!";
    if (count < 5) return "You're building consistency!";
    if (count < 10) return "Great consistency!";
    if (count < 30) return "Impressive dedication!";
    return "Outstanding commitment!";
  };

  // Function to handle navigation to skin page with weekly tab selected
  const navigateToWeeklyAnalysis = (event: React.MouseEvent) => {
    event.preventDefault();
    window.scrollTo(0, 0);
    navigate('/skin?tab=weekly');
  };

  return (
    <div className="mb-6">
      <Card className="overflow-hidden border-none shadow-sm bg-gradient-to-b from-slate-50 to-white">
        <CardContent className="p-6">
          {/* Header with Profile and Title */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8 border-2 border-white shadow-sm">
                <AvatarImage src="https://images.unsplash.com/photo-1535268647677-300dbf3d78d1" />
                <AvatarFallback>SK</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-lg font-semibold">Welcome back</h2>
                <p className="text-sm text-muted-foreground">Let's check your skin today</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" asChild>
              <Link to="/profile">
                <Calendar className="h-5 w-5" />
              </Link>
            </Button>
          </div>
          
          {/* Weekly Skin Calendar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-base font-semibold">This Week</h3>
              <Link 
                to="/skin?tab=weekly" 
                className="text-skin-black text-sm font-medium flex items-center"
                onClick={navigateToWeeklyAnalysis}
              >
                View Report <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="flex justify-between items-center">
              {ratings.map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <span className="text-xs font-medium">{item.day}</span>
                  <span className="text-[10px] text-muted-foreground">{item.date}</span>
                  
                  <div className="mt-2 mb-1">
                    {/* Rating circle with updated design */}
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: getRatingBgColor(item.rating) }}
                    >
                      {/* Rating number */}
                      <div 
                        className="text-sm font-semibold"
                        style={{ color: getRatingColor(item.rating) }}
                      >
                        {item.rating}
                      </div>
                    </div>
                    
                    {/* Rating label below the circle */}
                    <div className="text-center mt-1">
                      <span 
                        className="text-[10px] font-medium"
                        style={{ color: getRatingColor(item.rating) }}
                      >
                        {getRatingLabel(item.rating)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Skin Care Streak Section - Updated layout */}
          <div className="pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-violet-600" />
                <h3 className="font-medium text-base">Skin Care Streak</h3>
              </div>
              <Link to="/skin">
                <Button variant="ghost" size="sm" className="text-xs">
                  View History
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center mt-2">
              <div className="flex-shrink-0 bg-gradient-to-br from-violet-100 to-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mr-3">
                <span className="text-xl font-bold text-violet-600">{streak}</span>
              </div>
              <div>
                <p className="text-sm font-medium">{getStreakMessage(streak)}</p>
                <p className="text-xs text-muted-foreground">Last log: {lastLog}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HeroSection;
