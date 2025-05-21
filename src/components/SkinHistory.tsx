
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getRatingColor, getRatingBgColor, getRatingLabel } from "@/utils/skin-utils";

type DayRating = {
  day: string;
  rating: number;
  date: string;
};

type SkinHistoryProps = {
  ratings: DayRating[];
  className?: string;
};

const SkinHistory: React.FC<SkinHistoryProps> = ({ ratings, className }) => {
  const navigate = useNavigate();
  
  // Function to handle navigation to skin page with weekly tab selected
  const navigateToWeeklyAnalysis = (event: React.MouseEvent) => {
    // Prevent default link behavior
    event.preventDefault();
    
    // First scroll to top
    window.scrollTo(0, 0);
    
    // Navigate to the skin page with tab=weekly query parameter
    navigate('/skin?tab=weekly');
  };
  
  return (
    <div className={cn("ios-section block", className)}>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold">Weekly Skin Report</h2>
        <Link 
          to="/skin?tab=weekly" 
          className="text-skin-black text-sm font-medium flex items-center"
          onClick={navigateToWeeklyAnalysis}
        >
          View Report <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
      
      <Card 
        className="ios-card hover:shadow-md transition-all cursor-pointer" 
        onClick={navigateToWeeklyAnalysis}
      >
        <CardContent className="p-4">
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
        </CardContent>
      </Card>
    </div>
  );
};

export default SkinHistory;
