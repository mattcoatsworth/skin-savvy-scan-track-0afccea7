
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, FlameIcon, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface StreakCardProps {
  streak: number;
  lastLog?: string;
}

const StreakCard: React.FC<StreakCardProps> = ({ streak, lastLog = "Today" }) => {
  // Get appropriate message based on streak count
  const getStreakMessage = (count: number) => {
    if (count === 0) return "Start your streak today!";
    if (count === 1) return "First day logged!";
    if (count < 5) return "You're building consistency!";
    if (count < 10) return "Great consistency!";
    if (count < 30) return "Impressive dedication!";
    return "Outstanding commitment!";
  };

  // Get icon based on streak count
  const getStreakIcon = () => {
    if (streak < 3) return <FlameIcon className="h-5 w-5 text-amber-500" />;
    if (streak < 10) return <FlameIcon className="h-5 w-5 text-orange-500" />;
    return <Trophy className="h-5 w-5 text-yellow-500" />;
  };

  return (
    <Card className="overflow-hidden border-l-4 border-l-teal-400 mb-6">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            {getStreakIcon()}
            <h3 className="font-medium text-base">Skin Log Streak</h3>
          </div>
          <Link to="/skin">
            <Button variant="ghost" size="sm" className="text-xs">
              View History
            </Button>
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 bg-gradient-to-br from-teal-100 to-cyan-100 w-16 h-16 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-teal-600">{streak}</span>
          </div>
          <div>
            <p className="text-sm font-medium">{getStreakMessage(streak)}</p>
            <p className="text-xs text-muted-foreground mt-1">Last log: {lastLog}</p>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <p className="text-xs text-teal-600">Keep the streak going!</p>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StreakCard;
