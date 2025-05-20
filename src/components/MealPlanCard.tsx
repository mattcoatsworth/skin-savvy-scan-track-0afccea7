
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Salad, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

type MealPlanCardProps = {
  mealPlanToday: {
    breakfast: string;
    lunch: string;
    dinner: string;
    snacks: string[];
    hydration: string;
  };
};

const MealPlanCard: React.FC<MealPlanCardProps> = ({ mealPlanToday }) => {
  return (
    <Card className="overflow-hidden border-l-4 border-l-emerald-400">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <Salad className="h-5 w-5 text-emerald-500" />
            <h3 className="font-medium text-base">Today's Meal Plan</h3>
          </div>
          <Link to="/fyp">
            <Button variant="ghost" size="sm" className="text-xs">
              View Full Plan
            </Button>
          </Link>
        </div>
        
        <div className="space-y-2">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Breakfast</p>
            <p className="text-sm">{mealPlanToday.breakfast}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Lunch</p>
            <p className="text-sm">{mealPlanToday.lunch}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Dinner</p>
            <p className="text-sm">{mealPlanToday.dinner}</p>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <p className="text-xs text-emerald-600">Optimized for skin health</p>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MealPlanCard;
