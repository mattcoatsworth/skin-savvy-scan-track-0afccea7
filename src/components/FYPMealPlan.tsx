
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, X } from "lucide-react";
import FactorCard from "@/components/FactorCard";
import { useFactorSearch } from "@/hooks/useFactorSearch";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";

// Common food options for suggestions
const COMMON_FOODS = [
  "Avocado", "Berries", "Salmon", "Leafy greens", "Sweet potato", 
  "Nuts", "Greek yogurt", "Olive oil", "Turmeric", "Chia seeds",
  "Eggs", "Broccoli", "Bell peppers", "Quinoa", "Tomatoes"
];

// Common foods to avoid
const COMMON_AVOID_FOODS = [
  "Dairy", "Gluten", "Sugar", "Processed foods", "Fried foods",
  "Red meat", "Alcohol", "Caffeine", "Artificial sweeteners", "Soy"
];

const FYPMealPlan = () => {
  // State for food preferences
  const [includedFoods, setIncludedFoods] = useState<string[]>([]);
  const [avoidFoods, setAvoidFoods] = useState<string[]>([]);
  const [weeklyBudget, setWeeklyBudget] = useState<string>('');
  
  // Use the factor search hook for each input
  const includeSearch = useFactorSearch({ 
    category: "includedFoods", 
    defaultOptions: COMMON_FOODS 
  });
  
  const avoidSearch = useFactorSearch({ 
    category: "avoidFoods", 
    defaultOptions: COMMON_AVOID_FOODS 
  });
  
  // Handle adding included food
  const handleAddIncludedFood = () => {
    if (includeSearch.searchValue && !includedFoods.includes(includeSearch.searchValue)) {
      setIncludedFoods(prev => [...prev, includeSearch.searchValue]);
      includeSearch.resetSearch();
    }
  };
  
  // Handle adding food to avoid
  const handleAddAvoidFood = () => {
    if (avoidSearch.searchValue && !avoidFoods.includes(avoidSearch.searchValue)) {
      setAvoidFoods(prev => [...prev, avoidSearch.searchValue]);
      avoidSearch.resetSearch();
    }
  };
  
  // Handle removing included food
  const handleRemoveIncludedFood = (food: string) => {
    setIncludedFoods(prev => prev.filter(f => f !== food));
  };
  
  // Handle removing food to avoid
  const handleRemoveAvoidFood = (food: string) => {
    setAvoidFoods(prev => prev.filter(f => f !== food));
  };
  
  // Save preferences to localStorage when they change
  useEffect(() => {
    const preferences = {
      includeFoods: includedFoods,
      avoidFoods: avoidFoods,
      weeklyBudget
    };
    
    localStorage.setItem('mealPreferences', JSON.stringify(preferences));
  }, [includedFoods, avoidFoods, weeklyBudget]);
  
  // Load preferences from localStorage on component mount
  useEffect(() => {
    const savedPreferences = localStorage.getItem('mealPreferences');
    if (savedPreferences) {
      try {
        const { includeFoods, avoidFoods, weeklyBudget } = JSON.parse(savedPreferences);
        if (Array.isArray(includeFoods)) setIncludedFoods(includeFoods);
        if (Array.isArray(avoidFoods)) setAvoidFoods(avoidFoods);
        if (typeof weeklyBudget === 'string') setWeeklyBudget(weeklyBudget);
      } catch (error) {
        console.error('Error loading saved meal preferences:', error);
      }
    }
  }, []);

  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-2">Your Meal Plan</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Customize your meal plan to support your skin health goals.
          </p>
          
          {/* Include Foods Card */}
          <FactorCard
            title="Food Preferences"
            icon={<Search className="h-4 w-4" />}
            type="search"
            category="includedFoods"
            description="Select foods you'd like to include in your meal plan (optional)"
            searchProps={{
              placeholder: "Add foods to include...",
              value: includeSearch.searchValue,
              onChange: includeSearch.handleSearchChange,
              onAdd: handleAddIncludedFood,
              options: COMMON_FOODS
            }}
            onOptionSelect={(food) => {
              if (!includedFoods.includes(food)) {
                setIncludedFoods(prev => [...prev, food]);
              }
            }}
          >
            {includedFoods.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {includedFoods.map((food) => (
                  <Badge 
                    key={food} 
                    className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 px-2 py-1 flex items-center gap-1"
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
          </FactorCard>
          
          <div className="h-4" />
          
          {/* Avoid Foods Card */}
          <FactorCard
            title="Foods to Avoid"
            icon={<Search className="h-4 w-4" />}
            type="search"
            category="avoidFoods"
            description="Select foods you'd like to avoid in your meal plan (optional)"
            searchProps={{
              placeholder: "Add foods to avoid...",
              value: avoidSearch.searchValue,
              onChange: avoidSearch.handleSearchChange,
              onAdd: handleAddAvoidFood,
              options: COMMON_AVOID_FOODS
            }}
            onOptionSelect={(food) => {
              if (!avoidFoods.includes(food)) {
                setAvoidFoods(prev => [...prev, food]);
              }
            }}
          >
            {avoidFoods.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {avoidFoods.map((food) => (
                  <Badge 
                    key={food} 
                    className="bg-rose-100 text-rose-800 hover:bg-rose-200 px-2 py-1 flex items-center gap-1"
                  >
                    {food}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => handleRemoveAvoidFood(food)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </FactorCard>
          
          <div className="h-4" />
          
          {/* Weekly Budget */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Weekly Budget (optional)</label>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <Input 
                type="number"
                min="0"
                placeholder="Enter your weekly budget"
                value={weeklyBudget}
                onChange={(e) => setWeeklyBudget(e.target.value)}
                className="pl-7"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              This helps us tailor your meal plan to your budget constraints
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FYPMealPlan;
