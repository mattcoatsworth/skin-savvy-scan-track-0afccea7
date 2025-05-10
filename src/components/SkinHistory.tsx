
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
                    <div className="text-base font-semibold">
                      {item.rating}
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
    </div>
  );
};

export default SkinHistory;
