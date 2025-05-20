
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Search, RefreshCw, ShoppingCart } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Food suggestions
const foodSuggestions = [
  'Avocado', 'Berries', 'Salmon', 'Nuts', 'Sweet potato',
  'Leafy greens', 'Greek yogurt', 'Eggs', 'Olive oil', 'Turmeric',
  'Green tea', 'Dark chocolate', 'Quinoa', 'Lentils', 'Chia seeds'
];

// Allergy suggestions
const allergySuggestions = [
  'Dairy', 'Gluten', 'Nuts', 'Eggs', 'Soy',
  'Fish', 'Shellfish', 'Wheat', 'Peanuts', 'Tree nuts',
  'Sesame', 'Sulfites', 'Corn', 'Processed sugar', 'Artificial colors'
];

const FYPMealPlan = () => {
  const [loading, setLoading] = useState(false);
  const [mealPlan, setMealPlan] = useState<any>(null);
  const [includeGroceryList, setIncludeGroceryList] = useState(false);
  const [preferredFoods, setPreferredFoods] = useState<string[]>([]);
  const [excludedFoods, setExcludedFoods] = useState<string[]>([]);
  const [includeFoodInput, setIncludeFoodInput] = useState('');
  const [excludeFoodInput, setExcludeFoodInput] = useState('');
  const [weeklyBudget, setWeeklyBudget] = useState<number | undefined>(undefined);
  const [includeOpen, setIncludeOpen] = useState(false);
  const [excludeOpen, setExcludeOpen] = useState(false);
  const { toast } = useToast();

  // Filter suggestions based on input
  const filteredIncludeSuggestions = foodSuggestions.filter(food => 
    food.toLowerCase().includes(includeFoodInput.toLowerCase()) &&
    !preferredFoods.includes(food)
  );
  
  const filteredExcludeSuggestions = allergySuggestions.filter(allergy => 
    allergy.toLowerCase().includes(excludeFoodInput.toLowerCase()) &&
    !excludedFoods.includes(allergy)
  );

  // Add preferred food
  const addPreferredFood = (food: string) => {
    if (food && !preferredFoods.includes(food)) {
      setPreferredFoods([...preferredFoods, food]);
      setIncludeFoodInput('');
      setIncludeOpen(false);
    }
  };

  // Add excluded food
  const addExcludedFood = (food: string) => {
    if (food && !excludedFoods.includes(food)) {
      setExcludedFoods([...excludedFoods, food]);
      setExcludeFoodInput('');
      setExcludeOpen(false);
    }
  };

  // Remove preferred food
  const removePreferredFood = (food: string) => {
    setPreferredFoods(preferredFoods.filter(f => f !== food));
  };

  // Remove excluded food
  const removeExcludedFood = (food: string) => {
    setExcludedFoods(excludedFoods.filter(f => f !== food));
  };

  const generateMealPlan = async () => {
    setLoading(true);
    
    try {
      // Prepare preferences
      const preferences = {
        includeFoods: preferredFoods.join(', '),
        avoidFoods: excludedFoods.join(', '),
        weeklyBudget: weeklyBudget ? `$${weeklyBudget}` : ''
      };
      
      // Call the Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('generate-recipe-ideas', {
        body: {
          generateMealPlan: true,
          preferences,
          includeGroceryList
        }
      });
      
      if (error) throw new Error(error.message);
      
      // Store the meal plan in localStorage
      if (data?.mealPlan) {
        localStorage.setItem('mealPlan', JSON.stringify(data.mealPlan));
        setMealPlan(data.mealPlan);
      }
      
      setLoading(false);
      toast({
        title: "Meal plan generated!",
        description: "Your personalized meal plan is ready.",
      });
      
    } catch (error) {
      console.error('Error generating meal plan:', error);
      toast({
        title: "Error",
        description: "Failed to generate meal plan. Please try again.",
        variant: "destructive"
      });
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-2">Skin-Focused Meal Plan</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Get a personalized meal plan designed to support your skin health goals.
          </p>
          
          {/* Food Preferences Section */}
          <div className="mb-5 space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Food Preferences</h3>
              <div className="space-y-3">
                {/* Include Foods */}
                <div>
                  <label htmlFor="includeFoods" className="text-xs text-muted-foreground block mb-1">
                    Include these foods if possible <span className="text-muted-foreground">(optional)</span>:
                  </label>
                  <div className="flex gap-2 mb-2 flex-wrap">
                    {preferredFoods.map(food => (
                      <Badge key={food} variant="outline" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100">
                        {food}
                        <button 
                          className="ml-1 hover:text-red-500" 
                          onClick={() => removePreferredFood(food)}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex w-full items-center space-x-2">
                    <Popover open={includeOpen} onOpenChange={setIncludeOpen}>
                      <PopoverTrigger asChild>
                        <div className="flex-1 relative">
                          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Add foods you want to include..."
                            value={includeFoodInput}
                            onChange={(e) => setIncludeFoodInput(e.target.value)}
                            className="pl-8 pr-4"
                          />
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0" align="start">
                        <Command>
                          <CommandInput placeholder="Search foods..." />
                          <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup>
                              {filteredIncludeSuggestions.map((food) => (
                                <CommandItem
                                  key={food}
                                  onSelect={() => addPreferredFood(food)}
                                >
                                  {food}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      type="button" 
                      className="rounded-full h-10 w-10 bg-gray-100"
                      onClick={() => addPreferredFood(includeFoodInput)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {/* Exclude Foods */}
                <div>
                  <label htmlFor="excludeFoods" className="text-xs text-muted-foreground block mb-1">
                    Foods to avoid <span className="text-muted-foreground">(optional)</span>:
                  </label>
                  <div className="flex gap-2 mb-2 flex-wrap">
                    {excludedFoods.map(food => (
                      <Badge key={food} variant="outline" className="bg-red-50 text-red-700 hover:bg-red-100">
                        {food}
                        <button 
                          className="ml-1 hover:text-red-500" 
                          onClick={() => removeExcludedFood(food)}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex w-full items-center space-x-2">
                    <Popover open={excludeOpen} onOpenChange={setExcludeOpen}>
                      <PopoverTrigger asChild>
                        <div className="flex-1 relative">
                          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Add foods you want to avoid..."
                            value={excludeFoodInput}
                            onChange={(e) => setExcludeFoodInput(e.target.value)}
                            className="pl-8 pr-4"
                          />
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0" align="start">
                        <Command>
                          <CommandInput placeholder="Search allergies..." />
                          <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup>
                              {filteredExcludeSuggestions.map((food) => (
                                <CommandItem
                                  key={food}
                                  onSelect={() => addExcludedFood(food)}
                                >
                                  {food}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      type="button"
                      className="rounded-full h-10 w-10 bg-gray-100"
                      onClick={() => addExcludedFood(excludeFoodInput)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {/* Budget Input */}
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
            
            {/* Grocery List Option */}
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
          
          {/* Generate Button */}
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
                Generate Meal Plan
              </>
            )}
          </Button>
        </CardContent>
      </Card>
      
      {/* Meal Plan Display */}
      {mealPlan && (
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-2">Your Meal Plan</h2>
            <p className="text-sm text-muted-foreground">
              Visit the <a href="/meal-plan" className="text-emerald-600 hover:underline">Meal Plan page</a> to see your complete personalized meal plan.
            </p>
          </CardContent>
        </Card>
      )}
      
      {/* Loading State */}
      {loading && (
        <Card>
          <CardContent className="p-4 space-y-3">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FYPMealPlan;
