
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type DayRating = {
  day: string;
  rating: number;
  date: string;
};

type SkinHistoryProps = {
  ratings: DayRating[];
  className?: string;
};

const getRatingColor = (rating: number) => {
  if (rating >= 80) return "bg-green-500";
  if (rating >= 60) return "bg-green-300";
  if (rating >= 40) return "bg-yellow-300";
  if (rating >= 20) return "bg-orange-300";
  return "bg-red-400";
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
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${getRatingColor(item.rating)} text-white font-medium text-sm`}
                  >
                    {item.rating}
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
