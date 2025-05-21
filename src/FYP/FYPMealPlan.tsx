
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import TestAIChatBox from "./TestAIChatBox";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { supabase } from "@/integrations/supabase/client";
import { Info, RefreshCw, ChefHat, DollarSign, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { MealPlanType } from "@/types/skin-types";

type MealPlanProps = {
  className?: string;
};

// Storage key for meal plan data
const MEAL_PLAN_STORAGE_KEY = "meal_plan_data";

const FYPMealPlan: React.FC<MealPlanProps> = ({ className }) => {
  const [loading, setLoading] = useState(false);
  const [mealPlan, setMealPlan] = useState<any>(null);
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [includeGroceryList, setIncludeGroceryList] = useState(false);
  const [preferredFood, setPreferredFood] = useState('');
  const [excludedFood, setExcludedFood] = useState('');
  const [weeklyBudget, setWeeklyBudget] = useState<string>('');
  const { toast } = useToast();

  // Load meal plan from localStorage on component mount
  useEffect(() => {
    const savedMealPlan = localStorage.getItem(MEAL_PLAN_STORAGE_KEY);
    if (savedMealPlan) {
      try {
        setMealPlan(JSON.parse(savedMealPlan));
      } catch (error) {
        console.error('Error parsing saved meal plan:', error);
      }
    }
  }, []);

  // Function to get the user's ID if logged in
  const getUserId = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      return session?.user?.id || null;
    } catch (error) {
      console.error("Error getting user session:", error);
      return null;
    }
  };

  // Generate meal plan with real API call
  const generateMealPlan = async () => {
    setLoading(true);

    try {
      // Get the current user ID
      const userId = await getUserId();
      
      // Call the Supabase function to generate the meal plan
      const { data, error } = await supabase.functions.invoke('generate-meal-plan', {
        body: {
          userId: userId,
          preferredFoods: preferredFood,
          excludedFoods: excludedFood,
          weeklyBudget: weeklyBudget,
          includeGroceryList: includeGroceryList
        }
      });

      if (error) {
        throw new Error(error.message || "Failed to generate meal plan");
      }

      if (!data) {
        throw new Error("No data received from meal plan generation");
      }

      console.log("Generated meal plan data:", data);

      // Store the meal plan in localStorage
      localStorage.setItem(MEAL_PLAN_STORAGE_KEY, JSON.stringify(data));
      
      setMealPlan(data);
      toast({
        title: "Meal Plan Generated",
        description: "Your personalized skin-healthy meal plan is ready!",
      });
      
    } catch (error) {
      console.error("Error generating meal plan:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate meal plan. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Get currently active day data
  const getActiveDayData = () => {
    if (!mealPlan || !mealPlan.days) return null;
    return mealPlan.days.find((day: any) => day.day === selectedDay);
  };

  // Days of week for tabs
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

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
      
      {!mealPlan ? (
        <Card className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <ChefHat className="h-6 w-6 text-emerald-600" />
            <h2 className="text-lg font-semibold">Generate Your Plan</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Generate a personalized meal plan based on your skin logs and food preferences.
          </p>
          
          <div className="mb-5 space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Food Preferences</h3>
              <div className="space-y-3">
                <div>
                  <label htmlFor="includeFoods" className="text-xs text-muted-foreground block mb-1">
                    Include these foods if possible:
                  </label>
                  <Input 
                    id="includeFoods" 
                    placeholder="e.g., avocado, berries, salmon" 
                    value={preferredFood}
                    onChange={(e) => setPreferredFood(e.target.value)}
                    className="text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="excludeFoods" className="text-xs text-muted-foreground block mb-1">
                    Foods to avoid:
                  </label>
                  <Input 
                    id="excludeFoods" 
                    placeholder="e.g., dairy, gluten, nuts" 
                    value={excludedFood}
                    onChange={(e) => setExcludedFood(e.target.value)}
                    className="text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="weeklyBudget" className="text-xs text-muted-foreground block mb-1">
                    Weekly budget (optional):
                  </label>
                  <Input
                    id="weeklyBudget"
                    placeholder="e.g., $100"
                    value={weeklyBudget}
                    onChange={(e) => setWeeklyBudget(e.target.value)}
                    className="text-sm"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="groceryList" 
                checked={includeGroceryList}
                onCheckedChange={(checked) => {
                  if (typeof checked === 'boolean') {
                    setIncludeGroceryList(checked);
                  }
                }}
              />
              <label 
                htmlFor="groceryList" 
                className="text-sm cursor-pointer"
              >
                Generate a grocery list for the week
              </label>
            </div>
          </div>
          
          <Button 
            onClick={generateMealPlan} 
            className="w-full" 
            disabled={loading}
          >
            {loading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Generating your plan...
              </>
            ) : (
              <>
                <ChefHat className="mr-2 h-4 w-4" />
                Generate 7-Day Meal Plan
              </>
            )}
          </Button>
        </Card>
      ) : (
        <>
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
          {getActiveDayData() && (
            <div className="space-y-4">
              {/* Breakfast */}
              <Card className="overflow-hidden border-l-4 border-amber-400">
                <CardContent className="p-4">
                  <h3 className="text-lg font-medium mb-1">Breakfast</h3>
                  <h4 className="text-base font-medium text-gray-800 mb-2">{getActiveDayData().breakfast.meal}</h4>
                  <p className="text-xs text-emerald-600 italic mb-3">{getActiveDayData().breakfast.benefits}</p>
                </CardContent>
              </Card>
              
              {/* Lunch */}
              <Card className="overflow-hidden border-l-4 border-green-400">
                <CardContent className="p-4">
                  <h3 className="text-lg font-medium mb-1">Lunch</h3>
                  <h4 className="text-base font-medium text-gray-800 mb-2">{getActiveDayData().lunch.meal}</h4>
                  <p className="text-xs text-emerald-600 italic mb-3">{getActiveDayData().lunch.benefits}</p>
                </CardContent>
              </Card>
              
              {/* Dinner */}
              <Card className="overflow-hidden border-l-4 border-purple-400">
                <CardContent className="p-4">
                  <h3 className="text-lg font-medium mb-1">Dinner</h3>
                  <h4 className="text-base font-medium text-gray-800 mb-2">{getActiveDayData().dinner.meal}</h4>
                  <p className="text-xs text-emerald-600 italic mb-3">{getActiveDayData().dinner.benefits}</p>
                </CardContent>
              </Card>
              
              {/* Snack */}
              <Card className="overflow-hidden border-l-4 border-blue-400">
                <CardContent className="p-4">
                  <h3 className="text-lg font-medium mb-1">Snacks</h3>
                  <ul className="list-disc list-inside text-sm mb-3">
                    {getActiveDayData().snacks.map((snack: string, i: number) => (
                      <li key={i}>{snack}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              {/* Hydration */}
              <Card className="overflow-hidden border-l-4 border-cyan-400">
                <CardContent className="p-4">
                  <h3 className="text-lg font-medium mb-1">Hydration</h3>
                  <p className="text-sm">{getActiveDayData().hydration}</p>
                </CardContent>
              </Card>
            </div>
          )}
          
          {/* Grocery List */}
          {mealPlan.groceryList && (
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="grocery-list">
                <AccordionTrigger className="text-lg font-semibold">
                  Grocery List
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-2">
                    {mealPlan.groceryList.map((category: any, i: number) => (
                      <div key={i}>
                        <h3 className="text-sm font-medium mb-1">{category.category}</h3>
                        <ul className="grid grid-cols-2 gap-2">
                          {category.items.map((item: string, j: number) => (
                            <li key={j} className="text-xs text-muted-foreground flex items-start gap-1.5">
                              <span className="text-emerald-500 text-xs mt-0.5">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}

          {/* Dynamic Expected Results Card */}
          {mealPlan.expectedResults && (
            <Card className="overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-4 py-3">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-emerald-600" />
                  <h3 className="font-medium text-emerald-800">Expected Results</h3>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium">
                    {mealPlan.expectedResults.timeframe}
                  </h4>
                  <div className="bg-emerald-100 text-emerald-800 py-1 px-3 rounded-full text-xs font-medium">
                    ~{mealPlan.expectedResults.percentageImprovement} Improvement
                  </div>
                </div>
                <p className="text-xs text-gray-600 mb-2">
                  {mealPlan.expectedResults.improvements}
                </p>
                <div className="mt-3">
                  <h5 className="text-xs font-medium text-gray-700 mb-1">Enhancing factors:</h5>
                  <p className="text-xs text-gray-600">
                    {mealPlan.expectedResults.lifestyleFactors}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Budget info if provided */}
          {weeklyBudget && (
            <Card className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-4 w-4 text-blue-500" />
                  <h3 className="font-medium">Budget Consideration</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  This meal plan is designed with your ${weeklyBudget} weekly budget in mind.
                </p>
              </CardContent>
            </Card>
          )}
          
          {/* Excluded foods if provided */}
          {excludedFood && (
            <Card className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  <h3 className="font-medium">Foods Avoided</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  As requested, this meal plan excludes: {excludedFood}
                </p>
              </CardContent>
            </Card>
          )}
          
          {/* Actions row */}
          <div className="flex justify-end mt-4">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => {
                setMealPlan(null);
                localStorage.removeItem(MEAL_PLAN_STORAGE_KEY);
              }}
            >
              Create New Plan
            </Button>
          </div>
          
          {/* AI Chat for meal plan suggestions */}
          <div className="mt-6">
            <TestAIChatBox 
              initialMessages={[{
                role: "assistant",
                content: "Need help with your meal plan? Ask me about ingredient substitutions, nutritional benefits, or recipe ideas!"
              }]}
              productTitle="Skin-Focused Meal Plan"
            />
          </div>
          
          {/* Disclaimer */}
          <div className="mt-4 text-xs text-gray-400 italic">
            <p>This plan is designed for general wellness and not a medical treatment. Consult with healthcare providers for specific dietary needs.</p>
          </div>
        </>
      )}
      
      {/* Loading States */}
      {loading && (
        <div className="space-y-4">
          <Card className="p-5">
            <Skeleton className="h-6 w-32 mb-3" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </Card>
          <Card className="p-5">
            <Skeleton className="h-6 w-32 mb-3" />
            <div className="space-y-3">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default FYPMealPlan;
