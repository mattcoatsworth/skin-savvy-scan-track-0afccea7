
import React from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ShoppingCart } from "lucide-react";

interface MealPlanPreferencesProps {
  preferredFood: string;
  setPreferredFood: (value: string) => void;
  excludedFood: string;
  setExcludedFood: (value: string) => void;
  weeklyBudget: number | undefined;
  setWeeklyBudget: (value: number | undefined) => void;
  includeGroceryList: boolean;
  setIncludeGroceryList: (value: boolean) => void;
}

const MealPlanPreferences: React.FC<MealPlanPreferencesProps> = ({
  preferredFood,
  setPreferredFood,
  excludedFood,
  setExcludedFood,
  weeklyBudget,
  setWeeklyBudget,
  includeGroceryList,
  setIncludeGroceryList
}) => {
  return (
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
              type="number"
              placeholder="e.g., 100"
              value={weeklyBudget === undefined ? '' : weeklyBudget}
              onChange={(e) => {
                const value = e.target.value === '' ? undefined : Number(e.target.value);
                setWeeklyBudget(value);
              }}
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
          className="text-sm cursor-pointer flex items-center gap-1"
        >
          <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          Generate a grocery list for the week
        </label>
      </div>
    </div>
  );
};

export default MealPlanPreferences;
