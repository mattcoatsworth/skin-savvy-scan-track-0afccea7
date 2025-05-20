
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RefreshCw, ChefHat } from "lucide-react";
import DisclaimerChatBox from "@/components/MealPlan/DisclaimerChatBox";
import MealPlanPreferences from "@/components/MealPlanPreferences";

const FYPMealPlan = () => {
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [preferredFood, setPreferredFood] = useState('');
  const [excludedFood, setExcludedFood] = useState('');
  const [weeklyBudget, setWeeklyBudget] = useState<number | undefined>(undefined);
  const [includeGroceryList, setIncludeGroceryList] = useState(false);
  
  const handleGenerateMealPlan = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setGenerated(true);
    }, 1500);
  };
  
  return (
    <div>
      {/* Introduction Card */}
      <Card className="mb-6">
        <CardContent className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <ChefHat className="h-6 w-6 text-skin-flame" />
            <h2 className="text-lg font-semibold">Personalized Nutrition</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            This meal plan is designed specifically for your skin concerns and goals.
            Proper nutrition is key to radiant skin and addressing specific skin issues.
          </p>
          
          {!generated ? (
            <>
              <MealPlanPreferences 
                preferredFood={preferredFood}
                setPreferredFood={setPreferredFood}
                excludedFood={excludedFood}
                setExcludedFood={setExcludedFood}
                weeklyBudget={weeklyBudget}
                setWeeklyBudget={setWeeklyBudget}
                includeGroceryList={includeGroceryList}
                setIncludeGroceryList={setIncludeGroceryList}
              />
              
              <Button 
                onClick={handleGenerateMealPlan} 
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
            </>
          ) : (
            <div>
              <p className="text-sm font-medium text-emerald-700">
                Your personalized 7-day meal plan is ready!
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                This plan includes meals designed to support your skin health goals
                and addresses your specific dietary preferences.
              </p>
              
              {/* View sample meals button would go here in a real implementation */}
              <Button variant="outline" className="w-full mt-4">
                View Sample Meals
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Show the disclaimer and chat box only after generation */}
      {generated && <DisclaimerChatBox />}
    </div>
  );
};

export default FYPMealPlan;
