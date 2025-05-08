
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { CircleCheck } from "lucide-react";

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
  return (
    <div className={cn("ios-section", className)}>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold">Skin History</h2>
      </div>
      
      <Card className="ios-card p-2">
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
                        stroke="#E6F8EA"
                        strokeWidth="3"
                        strokeDasharray="100, 100"
                      />
                    </svg>
                    
                    {/* Foreground circle - the actual progress */}
                    <svg className="w-10 h-10 absolute" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke={item.rating >= 60 ? "#4ADE80" : item.rating >= 40 ? "#FACC15" : "#F87171"}
                        strokeWidth="3"
                        strokeDasharray={`${item.rating}, 100`}
                      />
                    </svg>
                    
                    {/* Rating number in the center */}
                    <div className="text-sm font-semibold">
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
    </div>
  );
};

export default SkinHistory;
