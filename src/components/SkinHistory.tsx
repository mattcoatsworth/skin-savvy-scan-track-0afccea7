
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { CircleCheck, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

type DayRating = {
  day: string;
  rating: number;
  date: string;
};

type SkinHistoryProps = {
  ratings: DayRating[];
  className?: string;
};

const getRatingLabel = (rating: number) => {
  if (rating >= 80) return "Great";
  if (rating >= 60) return "Good";
  if (rating >= 40) return "OK";
  if (rating >= 20) return "Fair";
  return "Poor";
};

const SkinHistory: React.FC<SkinHistoryProps> = ({ ratings, className }) => {
  const navigate = useNavigate();
  
  // Function to handle card click with manual scroll to top
  const handleCardClick = (event: React.MouseEvent) => {
    // Prevent default link behavior
    event.preventDefault();
    
    // First scroll to top
    window.scrollTo(0, 0);
    
    // Wait a tiny bit before navigation to allow the scroll to happen
    setTimeout(() => {
      navigate('/weekly-skin-analysis');
    }, 10);
  };
  
  // Helper function to get color based on rating
  const getRatingColor = (rating: number) => {
    if (rating >= 80) return "text-green-600";
    if (rating >= 60) return "text-emerald-600";
    if (rating >= 40) return "text-amber-500";
    if (rating >= 20) return "text-orange-500";
    return "text-red-500";
  };
  
  // Helper function to get progress color based on rating
  const getProgressColor = (rating: number) => {
    if (rating >= 80) return "bg-green-500";
    if (rating >= 60) return "bg-emerald-500";
    if (rating >= 40) return "bg-amber-500";
    if (rating >= 20) return "bg-orange-500";
    return "bg-red-500";
  };
  
  // Helper function to get track color based on rating (lighter version of progress color)
  const getTrackColor = (rating: number) => {
    if (rating >= 80) return "bg-green-100";
    if (rating >= 60) return "bg-emerald-100";
    if (rating >= 40) return "bg-amber-100";
    if (rating >= 20) return "bg-orange-100";
    return "bg-red-100";
  };
  
  return (
    <div className={cn("ios-section block", className)}>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold">Weekly Skin Report</h2>
        <Link 
          to="/weekly-skin-analysis" 
          className="text-skin-teal text-sm font-medium flex items-center"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo(0, 0);
            setTimeout(() => navigate('/weekly-skin-analysis'), 10);
          }}
        >
          View Report <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
      
      <Card 
        className="ios-card p-2 hover:shadow-md transition-all cursor-pointer" 
        onClick={handleCardClick}
      >
        <CardContent className="p-2">
          <div className="flex justify-between items-center">
            {ratings.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <span className="text-sm font-medium">{item.day}</span>
                <span className="text-xs text-muted-foreground">{item.date}</span>
                <div className="mt-2 relative flex items-center justify-center">
                  {/* Circular progress indicator */}
                  <div className="relative w-12 h-12 flex items-center justify-center">
                    {/* Background track (lighter color) */}
                    <Progress 
                      value={100}
                      className="w-12 h-12 rounded-full absolute -rotate-90"
                      indicatorClassName={cn(getTrackColor(item.rating))}
                    />
                    
                    {/* Foreground progress (actual rating) */}
                    <Progress 
                      value={item.rating}
                      className="w-12 h-12 rounded-full absolute -rotate-90"
                      indicatorClassName={cn(getProgressColor(item.rating))}
                    />
                    
                    {/* Rating number in the middle */}
                    <span className="text-base font-semibold z-10">
                      {item.rating}
                    </span>
                  </div>
                  
                  {/* Rating label below the circle */}
                  <span className="absolute -bottom-6 text-xs text-muted-foreground whitespace-nowrap">
                    {getRatingLabel(item.rating)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SkinHistory;
