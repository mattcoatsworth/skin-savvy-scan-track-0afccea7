
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ChefHat, RefreshCw, Plus, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const FYPMealPlan = () => {
  // State for meal plan generation
  const [loading, setLoading] = useState(false);
  const [generateComplete, setGenerateComplete] = useState(false);
  const { toast } = useToast();
  
  // Food preferences states
  const [includeFood, setIncludeFood] = useState("");
  const [avoidFood, setAvoidFood] = useState("");
  const [includedFoods, setIncludedFoods] = useState<string[]>([]);
  const [avoidedFoods, setAvoidedFoods] = useState<string[]>([]);
  const [includeGroceryList, setIncludeGroceryList] = useState(false);

  // Check if a meal plan already exists in localStorage
  useEffect(() => {
    const savedMealPlan = localStorage.getItem("meal_plan_data");
    if (savedMealPlan) {
      setGenerateComplete(true);
    }
  }, []);

  const handleAddIncludeFood = () => {
    if (includeFood.trim() !== "" && !includedFoods.includes(includeFood.trim())) {
      setIncludedFoods([...includedFoods, includeFood.trim()]);
      setIncludeFood("");
    }
  };

  const handleAddAvoidFood = () => {
    if (avoidFood.trim() !== "" && !avoidedFoods.includes(avoidFood.trim())) {
      setAvoidedFoods([...avoidedFoods, avoidFood.trim()]);
      setAvoidFood("");
    }
  };

  const handleRemoveIncludedFood = (food: string) => {
    setIncludedFoods(includedFoods.filter((item) => item !== food));
  };

  const handleRemoveAvoidedFood = (food: string) => {
    setAvoidedFoods(avoidedFoods.filter((item) => item !== food));
  };

  const generateMealPlan = async () => {
    setLoading(true);
    
    try {
      // In a real implementation, this would call your Supabase Edge Function
      // const { data, error } = await supabase.functions.invoke('generate-meal-plan', {
      //   body: {
      //     preferences: {
      //       includeFoods: includedFoods.join(', '),
      //       avoidFoods: avoidedFoods.join(', '),
      //       includeGroceryList
      //     }
      //   }
      // });
      
      // if (error) throw new Error(error.message);
      
      // For now, simulate API call with timeout
      setTimeout(() => {
        // Simulate successful generation
        setGenerateComplete(true);
        
        // Show toast notification
        toast({
          title: "Meal Plan Generated!",
          description: "Your personalized meal plan is ready to view.",
        });
        
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Error generating meal plan:", error);
      toast({
        title: "Error",
        description: "Failed to generate meal plan. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-none border-none">
      <CardContent className="p-0">
        {!generateComplete ? (
          <>
            <div className="space-y-4 mb-4">
              <div>
                <label htmlFor="includeFoods" className="text-sm font-medium block mb-2">
                  Include these foods if possible:
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    id="includeFoods"
                    placeholder="e.g., avocado, berries"
                    value={includeFood}
                    onChange={(e) => setIncludeFood(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    className="h-10 px-2"
                    onClick={handleAddIncludeFood}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {includedFoods.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {includedFoods.map((food, index) => (
                      <Badge 
                        key={index}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {food}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => handleRemoveIncludedFood(food)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              
              <div>
                <label htmlFor="avoidFoods" className="text-sm font-medium block mb-2">
                  Foods to avoid:
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    id="avoidFoods"
                    placeholder="e.g., dairy, gluten"
                    value={avoidFood}
                    onChange={(e) => setAvoidFood(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    className="h-10 px-2"
                    onClick={handleAddAvoidFood}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {avoidedFoods.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {avoidedFoods.map((food, index) => (
                      <Badge 
                        key={index}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {food}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => handleRemoveAvoidedFood(food)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
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
                <label htmlFor="groceryList" className="text-sm">
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
                  Generating...
                </>
              ) : (
                <>
                  <ChefHat className="mr-2 h-4 w-4" />
                  Generate Meal Plan
                </>
              )}
            </Button>
          </>
        ) : (
          <div className="text-center">
            <p className="text-sm">Your meal plan is ready! Visit the Meal Plan page to see it.</p>
            <Button 
              variant="outline" 
              className="mt-2" 
              onClick={() => setGenerateComplete(false)}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Generate Another
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FYPMealPlan;
