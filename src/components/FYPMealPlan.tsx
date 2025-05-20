
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RefreshCw, Search, Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const FYPMealPlan = () => {
  const [loading, setLoading] = useState(false);
  const [mealPlan, setMealPlan] = useState<any>(null);
  const [includeFoods, setIncludeFoods] = useState<string[]>([]);
  const [avoidFoods, setAvoidFoods] = useState<string[]>([]);
  const [includeSearchValue, setIncludeSearchValue] = useState("");
  const [avoidSearchValue, setAvoidSearchValue] = useState("");
  const [weeklyBudget, setWeeklyBudget] = useState<number | undefined>(undefined);
  const { toast } = useToast();
  
  // Load meal plan data from localStorage on component mount
  useEffect(() => {
    const savedMealPlan = localStorage.getItem("meal_plan_data");
    if (savedMealPlan) {
      try {
        setMealPlan(JSON.parse(savedMealPlan));
      } catch (error) {
        console.error("Error parsing saved meal plan:", error);
      }
    }
  }, []);
  
  // Add a food to include
  const handleAddIncludeFood = () => {
    if (includeSearchValue.trim() && !includeFoods.includes(includeSearchValue.trim())) {
      setIncludeFoods([...includeFoods, includeSearchValue.trim()]);
      setIncludeSearchValue("");
    }
  };
  
  // Add a food to avoid
  const handleAddAvoidFood = () => {
    if (avoidSearchValue.trim() && !avoidFoods.includes(avoidSearchValue.trim())) {
      setAvoidFoods([...avoidFoods, avoidSearchValue.trim()]);
      setAvoidSearchValue("");
    }
  };
  
  // Remove a food from include list
  const handleRemoveIncludeFood = (food: string) => {
    setIncludeFoods(includeFoods.filter(f => f !== food));
  };
  
  // Remove a food from avoid list
  const handleRemoveAvoidFood = (food: string) => {
    setAvoidFoods(avoidFoods.filter(f => f !== food));
  };
  
  // Generate the meal plan
  const generateMealPlan = async () => {
    setLoading(true);
    
    try {
      // Prepare food preferences object
      const preferences = {
        includeFoods: includeFoods.join(", "),
        avoidFoods: avoidFoods.join(", "),
        weeklyBudget: weeklyBudget?.toString() || ""
      };
      
      // Call edge function
      const { data, error } = await supabase.functions.invoke("generate-recipe-ideas", {
        body: {
          generateMealPlan: true,
          preferences: preferences
        }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      // In this case, we're just storing dummy data for now while the edge function is updated
      const mealPlanData = data || {
        skinFocus: "Hydration and anti-inflammation",
        days: [
          {
            day: "Monday",
            breakfast: {
              meal: "Greek yogurt with berries and honey",
              benefits: "Rich in probiotics and antioxidants"
            },
            lunch: {
              meal: "Salmon salad with avocado and leafy greens",
              benefits: "Omega-3 fatty acids and healthy fats"
            },
            dinner: {
              meal: "Turmeric chicken with sweet potatoes and broccoli",
              benefits: "Anti-inflammatory properties and vitamin A"
            },
            snacks: ["Handful of almonds", "Sliced cucumber with hummus"],
            hydration: "2-3 liters of water, green tea"
          },
          // ...more days would be here
        ]
      };
      
      // Store the meal plan in localStorage
      localStorage.setItem("meal_plan_data", JSON.stringify(mealPlanData));
      // Also store it for compatibility with other components
      localStorage.setItem("mealPlan", JSON.stringify(mealPlanData));
      
      setMealPlan(mealPlanData);
      toast({
        title: "Success",
        description: "Your meal plan has been generated!",
      });
      
    } catch (error) {
      console.error("Error generating meal plan:", error);
      toast({
        title: "Error",
        description: "Failed to generate meal plan. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card className="border-emerald-100">
        <CardContent className="p-4">
          <h3 className="font-semibold mb-4">Food Preferences</h3>
          
          <div className="space-y-4">
            {/* Include Foods Section */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Include these foods if possible (optional):
              </p>
              <div className="flex flex-wrap gap-2 mb-2">
                {includeFoods.map((food, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 flex items-center gap-1 px-3 py-1"
                  >
                    {food}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => handleRemoveIncludeFood(food)}
                    />
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <div className="relative flex-grow">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Add foods you want to include"
                    className="pl-8"
                    value={includeSearchValue}
                    onChange={(e) => setIncludeSearchValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddIncludeFood()}
                  />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleAddIncludeFood}
                  className="rounded-full"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Avoid Foods Section */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Foods to avoid (optional):
              </p>
              <div className="flex flex-wrap gap-2 mb-2">
                {avoidFoods.map((food, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="bg-red-50 text-red-600 hover:bg-red-100 flex items-center gap-1 px-3 py-1"
                  >
                    {food}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => handleRemoveAvoidFood(food)}
                    />
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <div className="relative flex-grow">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Add foods you want to avoid"
                    className="pl-8"
                    value={avoidSearchValue}
                    onChange={(e) => setAvoidSearchValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddAvoidFood()}
                  />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleAddAvoidFood}
                  className="rounded-full"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Weekly Budget */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Weekly budget (optional):
              </p>
              <Input
                type="number"
                placeholder="e.g., 100"
                value={weeklyBudget === undefined ? '' : weeklyBudget}
                onChange={(e) => {
                  const value = e.target.value === '' ? undefined : Number(e.target.value);
                  setWeeklyBudget(value);
                }}
              />
            </div>
          </div>
          
          <Button 
            onClick={generateMealPlan}
            disabled={loading}
            className="w-full mt-4"
          >
            {loading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Meal Plan"
            )}
          </Button>
        </CardContent>
      </Card>
      
      {mealPlan && (
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Your Meal Plan</h3>
            <p className="text-sm text-muted-foreground">
              Your personalized meal plan is ready! Visit the Meal Plan page for the full details.
            </p>
            <Button
              variant="outline"
              className="w-full mt-3"
              asChild
            >
              <a href="/meal-plan">View Full Plan</a>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FYPMealPlan;
