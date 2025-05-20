
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import TestAIChatBox from "./TestAIChatBox";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Info } from "lucide-react";

type MealPlanProps = {
  className?: string;
};

const FYPMealPlan: React.FC<MealPlanProps> = ({ className }) => {
  // Mock data for meal plan
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const [selectedDay, setSelectedDay] = React.useState("Monday");
  
  // Mock meals for the selected day
  const meals = {
    breakfast: {
      name: "Avocado Toast with Poached Eggs",
      description: "Whole grain toast topped with mashed avocado, poached eggs, and a sprinkle of turmeric and black pepper."
    },
    lunch: {
      name: "Mediterranean Chickpea Salad",
      description: "Fresh salad with chickpeas, cucumber, tomatoes, feta cheese, olives, and lemon-olive oil dressing."
    },
    dinner: {
      name: "Baked Salmon with Roasted Vegetables",
      description: "Omega-3 rich salmon with roasted sweet potatoes, broccoli, and bell peppers."
    },
    snack: {
      name: "Berry and Nut Mix",
      description: "Assortment of blueberries, almonds, and walnuts for a skin-healthy snack."
    }
  };
  
  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">Personalized Meal Plan</h2>
        <Popover>
          <PopoverTrigger asChild>
            <button className="text-gray-500 hover:text-gray-700 transition-colors">
              <Info size={18} />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-2">
              <h3 className="font-medium">About your meal plan</h3>
              <p className="text-sm text-muted-foreground">
                This meal plan is personalized based on your skin health data and nutritional needs. 
                Foods are selected to promote hydration, reduce inflammation, and provide essential 
                nutrients for skin health.
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      
      {/* Day selector */}
      <div className="flex overflow-x-auto pb-2 -mx-1 scrollbar-hide">
        {daysOfWeek.map((day) => (
          <button
            key={day}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm whitespace-nowrap mx-1 min-w-fit",
              selectedDay === day 
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            )}
            onClick={() => setSelectedDay(day)}
          >
            {day}
          </button>
        ))}
      </div>
      
      {/* Meal cards for the selected day */}
      <div className="space-y-4">
        {/* Breakfast */}
        <Card className="overflow-hidden border-l-4 border-amber-400">
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-1">Breakfast</h3>
            <h4 className="text-base font-medium text-gray-800 mb-2">{meals.breakfast.name}</h4>
            <p className="text-sm text-gray-600">{meals.breakfast.description}</p>
          </CardContent>
        </Card>
        
        {/* Lunch */}
        <Card className="overflow-hidden border-l-4 border-green-400">
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-1">Lunch</h3>
            <h4 className="text-base font-medium text-gray-800 mb-2">{meals.lunch.name}</h4>
            <p className="text-sm text-gray-600">{meals.lunch.description}</p>
          </CardContent>
        </Card>
        
        {/* Dinner */}
        <Card className="overflow-hidden border-l-4 border-purple-400">
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-1">Dinner</h3>
            <h4 className="text-base font-medium text-gray-800 mb-2">{meals.dinner.name}</h4>
            <p className="text-sm text-gray-600">{meals.dinner.description}</p>
          </CardContent>
        </Card>
        
        {/* Snack */}
        <Card className="overflow-hidden border-l-4 border-blue-400">
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-1">Snack</h3>
            <h4 className="text-base font-medium text-gray-800 mb-2">{meals.snack.name}</h4>
            <p className="text-sm text-gray-600">{meals.snack.description}</p>
          </CardContent>
        </Card>
      </div>
      
      {/* AI Chat for meal plan suggestions */}
      <div className="mt-6">
        <TestAIChatBox 
          defaultMessages={[{
            role: "assistant",
            content: "Need help with your meal plan? Ask me about ingredient substitutions, nutritional benefits, or recipe ideas!"
          }]}
          assistantTyping={false}
        />
      </div>
    </div>
  );
};

export default FYPMealPlan;
