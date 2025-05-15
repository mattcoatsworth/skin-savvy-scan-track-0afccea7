
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ChefHat, Loader2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';

const RecipeIdeas = () => {
  const { day, mealType } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recipe, setRecipe] = useState<any>(null);
  const [savedRecipes, setSavedRecipes] = useState<string[]>([]);
  const { toast } = useToast();

  // Format meal type for display
  const formatMealType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  // Get the meal data from localStorage
  const getMealData = () => {
    try {
      const mealPlan = localStorage.getItem('mealPlan');
      if (!mealPlan) return null;
      
      const parsedMealPlan = JSON.parse(mealPlan);
      const dayData = parsedMealPlan.days.find((d: any) => d.day === day);
      
      if (!dayData) return null;
      
      if (mealType === 'snacks') {
        return {
          meal: dayData.snacks.join(', '),
          benefits: "Healthy snacking options"
        };
      } else if (mealType === 'hydration') {
        return {
          meal: dayData.hydration,
          benefits: "Hydration recommendations"
        };
      } else {
        return dayData[mealType];
      }
    } catch (error) {
      console.error("Error getting meal data:", error);
      return null;
    }
  };

  // Save recipe to user's saved recipes in localStorage
  const saveRecipe = (recipeName: string) => {
    try {
      // Get existing saved recipes or initialize empty array
      const savedRecipesStr = localStorage.getItem('savedRecipes');
      let savedRecipesArray: string[] = savedRecipesStr ? JSON.parse(savedRecipesStr) : [];
      
      // Check if recipe is already saved
      if (savedRecipesArray.includes(recipeName)) {
        toast({
          title: "Already saved",
          description: `"${recipeName}" is already in your saved recipes.`,
        });
        return;
      }
      
      // Add new recipe and save back to localStorage
      savedRecipesArray.push(recipeName);
      localStorage.setItem('savedRecipes', JSON.stringify(savedRecipesArray));
      setSavedRecipes(savedRecipesArray);
      
      toast({
        title: "Recipe saved!",
        description: `"${recipeName}" has been added to your saved recipes.`,
      });
    } catch (error) {
      console.error("Error saving recipe:", error);
      toast({
        title: "Error",
        description: "Could not save the recipe. Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    // Load saved recipes from localStorage
    const savedRecipesStr = localStorage.getItem('savedRecipes');
    if (savedRecipesStr) {
      setSavedRecipes(JSON.parse(savedRecipesStr));
    }
    
    const fetchRecipeIdeas = async () => {
      try {
        setLoading(true);
        const mealData = getMealData();
        
        if (!mealData) {
          setError("Could not find meal data. Please return to the meal plan.");
          setLoading(false);
          return;
        }

        // Use Supabase to invoke the edge function instead of direct fetch
        const { data, error: fnError } = await supabase.functions.invoke('generate-recipe-ideas', {
          body: {
            mealName: mealData.meal,
            mealType: mealType,
            day: day
          }
        });

        if (fnError) {
          throw new Error(fnError.message);
        }

        setRecipe(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recipe ideas:', error);
        setError('Failed to generate recipe ideas. Please try again.');
        toast({
          title: "Error",
          description: "Couldn't generate recipe ideas. Please try again later.",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    fetchRecipeIdeas();
  }, [day, mealType, toast]);

  const mealData = getMealData();

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Link to="/meal-plan">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Recipe Ideas</h1>
        </div>
      </div>

      {/* Meal Info */}
      <Card className="mb-6 border-emerald-100">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <ChefHat className="h-5 w-5 text-emerald-500" />
            <h2 className="text-lg font-semibold">{formatMealType(mealType || '')} • {day}</h2>
          </div>
          <p className="text-sm font-medium mb-1">{mealData?.meal}</p>
          <p className="text-xs text-muted-foreground">{mealData?.benefits}</p>
        </CardContent>
      </Card>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-10">
          <Loader2 className="h-10 w-10 text-emerald-500 animate-spin mb-4" />
          <p className="text-sm text-muted-foreground">Generating tasty recipe ideas...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 p-4 rounded-lg mb-4">
          <p className="text-sm text-red-800">{error}</p>
          <Button 
            className="mt-2 w-full" 
            size="sm"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      )}

      {/* Recipe Content */}
      {!loading && recipe && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-3">Recipe Ideas</h2>
            {recipe.recipes.map((r: any, i: number) => (
              <Card key={i} className="mb-4">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-medium text-emerald-700">{r.name}</h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => saveRecipe(r.name)}
                      className="text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50"
                    >
                      <Save className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mb-3">
                    <p className="text-xs text-muted-foreground mb-1">Prep time: {r.prepTime} • Difficulty: {r.difficulty}</p>
                  </div>
                  <Separator className="my-3" />
                  <div className="mb-3">
                    <p className="text-sm font-medium mb-1">Ingredients:</p>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      {r.ingredients.map((ingredient: string, idx: number) => (
                        <li key={idx}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                  <Separator className="my-3" />
                  <div>
                    <p className="text-sm font-medium mb-1">Instructions:</p>
                    <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-2">
                      {r.instructions.map((step: string, idx: number) => (
                        <li key={idx} className="pl-1">
                          <span className="pl-2">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">Nutrition Benefits</h2>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm mb-3">{recipe.nutritionInfo.summary}</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
                  {recipe.nutritionInfo.benefits.map((benefit: string, idx: number) => (
                    <li key={idx}>{benefit}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="bg-emerald-50 p-4 rounded-lg text-xs text-muted-foreground">
            <p>These recipes are suggestions based on your meal plan. Feel free to adjust ingredients to match your dietary needs and preferences.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeIdeas;
