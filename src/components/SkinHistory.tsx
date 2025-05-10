
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { CircleCheck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

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

const getRatingColor = (rating: number) => {
  if (rating >= 70) return "#4ADE80"; // Good - Green
  if (rating >= 40) return "#FACC15"; // OK - Yellow
  return "#F87171"; // Poor - Red
};

const getBackgroundColor = (rating: number) => {
  if (rating >= 70) return "#E6F8EA"; // Light green
  if (rating >= 40) return "#FEF7CD"; // Light yellow
  return "#FFDEE2"; // Light red
};

const SkinHistory: React.FC<SkinHistoryProps> = ({ ratings, className }) => {
  return (
    <div className={cn("ios-section block", className)}>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold">Weekly Skin Report</h2>
        <Link to="/weekly-skin-analysis" className="text-skin-teal text-sm font-medium flex items-center">
          View Report <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
      
      <Link to="/weekly-skin-analysis">
        <Card className="ios-card p-2 hover:shadow-md transition-all">
          <CardContent className="p-2">
            <div className="flex justify-between items-center">
              {ratings.map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <span className="text-sm font-medium">{item.day}</span>
                  <span className="text-xs text-muted-foreground">{item.date}</span>
                  <div className="mt-2 flex flex-col items-center justify-center">
                    <div className="relative w-10 h-10 flex items-center justify-center">
                      {/* Background circle */}
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
                          stroke={getRatingColor(item.rating)}
                          strokeWidth="4"
                          strokeDasharray={`${item.rating}, 100`}
                          strokeLinecap="round"
                        />
                      </svg>
                      
                      {/* Rating number in the center */}
                      <div className="text-xs font-semibold">
                        {item.rating}
                      </div>
                    </div>
                    <span className="text-xs mt-1 text-muted-foreground">
                      {getRatingLabel(item.rating)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </Link>
      
      {/* Removed the "Skin History" title that was here */}
    </div>
  );
};

export default SkinHistory;
