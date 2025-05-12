
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
  
  // Determine progress color based on rating
  const getProgressColor = (rating: number) => {
    if (rating >= 80) return "#4ADE80"; // Green for good ratings
    if (rating >= 60) return "#4ADE80"; // Also green for good ratings
    if (rating >= 40) return "#FACC15"; // Yellow for medium ratings
    if (rating >= 20) return "#FB923C"; // Orange for fair ratings
    return "#F87171"; // Red for poor ratings
  };
  
  // Get the lighter background color for the circle
  const getBackgroundColor = (rating: number) => {
    if (rating >= 80) return "#E6F8EA"; // Light green
    if (rating >= 60) return "#E6F8EA"; // Also light green
    if (rating >= 40) return "#FEF7CD"; // Light yellow
    if (rating >= 20) return "#FEF0E6"; // Light orange
    return "#FFDEE2"; // Light red
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
        className="ios-card p-1 hover:shadow-md transition-all cursor-pointer" 
        onClick={handleCardClick}
      >
        <CardContent className="p-1">
          <div className="flex justify-between items-center px-1">
            {ratings.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <span className="text-[10px] font-medium">{item.day}</span>
                <span className="text-[8px] text-muted-foreground">{item.date}</span>
                
                <div className="mt-1 mb-0.5 relative">
                  {/* Circular progress indicator styled to match the reference image */}
                  <div className="relative w-10 h-10 flex items-center justify-center">
                    {/* SVG-based circular progress to match the design */}
                    <svg className="w-10 h-10 absolute" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke={getBackgroundColor(item.rating)}
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                    </svg>
                    
                    {/* Foreground circle - the actual progress */}
                    <svg className="w-10 h-10 absolute" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke={getProgressColor(item.rating)}
                        strokeWidth="4"
                        strokeDasharray={`${item.rating}, 100`}
                        strokeLinecap="round"
                      />
                    </svg>
                    
                    {/* Rating number in the middle */}
                    <div className="text-base font-bold z-10">
                      {item.rating}
                    </div>
                  </div>
                  
                  {/* Rating label below the circle */}
                  <div className="text-center mt-0.5">
                    <span className="text-[10px] text-gray-500 font-medium">
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
