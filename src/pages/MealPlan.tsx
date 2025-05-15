import React, { useState } from 'react';
import { ArrowLeft, Calendar, RefreshCw, ChefHat, Utensils, Apple } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

const MealPlan = () => {
  const [loading, setLoading] = useState(false);
  const [mealPlan, setMealPlan] = useState<any>(null);
  const { toast } = useToast();
  
  const generateMealPlan = async () => {
    setLoading(true);
    
    try {
      // Placeholder for the actual API call to generate a meal plan
      // In a real implementation, this would call your Supabase Edge Function
      setTimeout(() => {
        const dummyData = {
          skinFocus: "Hydration and anti-inflammation",
          weekStartDate: new Date().toISOString(),
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
            // Dummy data for other days would follow the same pattern
            // Only showing one day to keep the example concise
          ]
        };
        
        setMealPlan(dummyData);
        setLoading(false);
      }, 1500);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate meal plan. Please try again.",
        variant: "destructive"
      });
      setLoading(false);
    }
  };

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Link to="/home">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Skin-Focused Meal Plan</h1>
        </div>
      </div>
      
      {/* Introduction Card */}
      <div className="bg-white rounded-xl p-5 mb-6 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <ChefHat className="h-6 w-6 text-skin-flame" />
          <h2 className="text-lg font-semibold">Personalized Nutrition</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          This meal plan is designed specifically for your skin concerns and goals.
          Proper nutrition is key to radiant skin and addressing specific skin issues.
        </p>
        
        {!mealPlan && (
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
        )}
      </div>
      
      {/* Weekly Overview Card (appears after generation) */}
      {mealPlan && (
        <div className="bg-white rounded-xl p-5 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Calendar className="h-6 w-6 text-sky-500" />
              <h2 className="text-lg font-semibold">Weekly Overview</h2>
            </div>
            <Button variant="outline" size="sm" onClick={generateMealPlan} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
          
          <div className="p-3 bg-sky-50 rounded-lg mb-3">
            <p className="text-sm font-medium">Skin Focus: {mealPlan.skinFocus}</p>
          </div>
          
          <div className="grid grid-cols-7 gap-1 mb-3">
            {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
              <div key={i} className={`text-center py-1 rounded-md text-xs font-medium ${i === 0 ? 'bg-sky-100 text-sky-700' : ''}`}>
                {day}
              </div>
            ))}
          </div>
          
          <p className="text-xs text-muted-foreground">
            Tap on each day below to see your personalized meals
          </p>
        </div>
      )}
      
      {/* Daily Meal Cards (appear after generation) */}
      {mealPlan && mealPlan.days && mealPlan.days.map((day, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden">
          <div className="bg-gradient-to-r from-sky-500 to-sky-400 p-4 text-white">
            <h3 className="font-semibold">{day.day}</h3>
          </div>
          
          {/* Breakfast */}
          <div className="p-4 border-b">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-amber-100 p-2 rounded-full">
                <Apple className="h-4 w-4 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Breakfast</p>
                <p className="font-medium">{day.breakfast.meal}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground ml-12">{day.breakfast.benefits}</p>
          </div>
          
          {/* Lunch */}
          <div className="p-4 border-b">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-green-100 p-2 rounded-full">
                <Utensils className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Lunch</p>
                <p className="font-medium">{day.lunch.meal}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground ml-12">{day.lunch.benefits}</p>
          </div>
          
          {/* Dinner */}
          <div className="p-4 border-b">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-purple-100 p-2 rounded-full">
                <ChefHat className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Dinner</p>
                <p className="font-medium">{day.dinner.meal}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground ml-12">{day.dinner.benefits}</p>
          </div>
          
          {/* Snacks & Hydration */}
          <div className="p-4">
            <p className="text-sm font-medium mb-2">Snacks & Hydration</p>
            <ul className="list-disc list-inside text-sm text-muted-foreground pl-2 mb-3">
              {day.snacks.map((snack, i) => (
                <li key={i}>{snack}</li>
              ))}
            </ul>
            <p className="text-xs bg-blue-50 p-2 rounded-md">
              <span className="font-medium">Hydration:</span> {day.hydration}
            </p>
          </div>
        </div>
      ))}
      
      {/* Loading States */}
      {loading && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <Skeleton className="h-6 w-32 mb-3" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <Skeleton className="h-6 w-32 mb-3" />
            <div className="space-y-3">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
        </div>
      )}
      
      {/* Nutrition Tips Card (always visible) */}
      <div className="bg-white rounded-xl p-5 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-green-100 p-2 rounded-full">
            <Apple className="h-4 w-4 text-green-600" />
          </div>
          <h2 className="text-lg font-semibold">Skin Nutrition Tips</h2>
        </div>
        
        <div className="space-y-3">
          <div className="p-3 bg-slate-50 rounded-lg">
            <p className="text-sm font-medium mb-1">Stay Hydrated</p>
            <p className="text-xs text-muted-foreground">Drink plenty of water throughout the day to maintain skin elasticity and flush out toxins.</p>
          </div>
          
          <div className="p-3 bg-slate-50 rounded-lg">
            <p className="text-sm font-medium mb-1">Antioxidant-Rich Foods</p>
            <p className="text-xs text-muted-foreground">Berries, leafy greens, and colorful vegetables help combat free radicals that damage skin cells.</p>
          </div>
          
          <div className="p-3 bg-slate-50 rounded-lg">
            <p className="text-sm font-medium mb-1">Healthy Fats</p>
            <p className="text-xs text-muted-foreground">Avocados, nuts, and fatty fish provide essential fatty acids that support your skin's lipid barrier.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealPlan;
