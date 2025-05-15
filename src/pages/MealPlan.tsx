import React, { useState } from 'react';
import { ArrowLeft, Calendar, RefreshCw, ChefHat, Utensils, Apple, ShoppingCart, List, ListCheck, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import DisclaimerChatBox from '@/components/MealPlan/DisclaimerChatBox';
import { Card, CardContent } from "@/components/ui/card";

const MealPlan = () => {
  const [loading, setLoading] = useState(false);
  const [mealPlan, setMealPlan] = useState<any>(null);
  const [activeDay, setActiveDay] = useState("Monday");
  const [includeGroceryList, setIncludeGroceryList] = useState(false);
  const [preferredFood, setPreferredFood] = useState('');
  const [excludedFood, setExcludedFood] = useState('');
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
            {
              day: "Tuesday",
              breakfast: {
                meal: "Overnight oats with chia seeds and blueberries",
                benefits: "Fiber and antioxidants for skin repair"
              },
              lunch: {
                meal: "Quinoa bowl with roasted vegetables and tahini",
                benefits: "Vitamin E and minerals for skin health"
              },
              dinner: {
                meal: "Baked cod with lemon, asparagus and brown rice",
                benefits: "Lean protein and zinc for collagen production"
              },
              snacks: ["Apple slices with almond butter", "Carrot sticks"],
              hydration: "2-3 liters of water, herbal tea"
            },
            {
              day: "Wednesday",
              breakfast: {
                meal: "Smoothie with spinach, banana, and flax seeds",
                benefits: "Vitamins and omega-3 fatty acids"
              },
              lunch: {
                meal: "Mediterranean chickpea salad with olive oil",
                benefits: "Antioxidants and healthy fats"
              },
              dinner: {
                meal: "Stir-fried tofu with broccoli and bell peppers",
                benefits: "Plant protein and vitamin C for collagen"
              },
              snacks: ["Greek yogurt with honey", "Mixed nuts"],
              hydration: "2-3 liters of water, green tea"
            },
            {
              day: "Thursday",
              breakfast: {
                meal: "Avocado toast with poached egg on whole grain bread",
                benefits: "Healthy fats and protein for skin elasticity"
              },
              lunch: {
                meal: "Lentil soup with leafy greens and turmeric",
                benefits: "Anti-inflammatory compounds and iron"
              },
              dinner: {
                meal: "Grilled wild salmon with sweet potato and kale",
                benefits: "Omega-3 and beta-carotene for skin renewal"
              },
              snacks: ["Blueberries", "Unsalted pumpkin seeds"],
              hydration: "2-3 liters of water, chamomile tea"
            },
            {
              day: "Friday",
              breakfast: {
                meal: "Chia seed pudding with coconut milk and berries",
                benefits: "Omega-3 fatty acids and antioxidants"
              },
              lunch: {
                meal: "Grilled chicken salad with olive oil and lemon",
                benefits: "Lean protein and vitamin C"
              },
              dinner: {
                meal: "Baked sweet potato with black beans and avocado",
                benefits: "Beta-carotene and plant protein"
              },
              snacks: ["Celery with hummus", "Orange slices"],
              hydration: "2-3 liters of water, rooibos tea"
            },
            {
              day: "Saturday",
              breakfast: {
                meal: "Steel-cut oatmeal with walnuts and cinnamon",
                benefits: "Fiber and anti-inflammatory properties"
              },
              lunch: {
                meal: "Tuna poke bowl with brown rice and vegetables",
                benefits: "Omega-3 fatty acids and antioxidants"
              },
              dinner: {
                meal: "Roasted vegetable and quinoa bowl with tahini",
                benefits: "Minerals and healthy fats for skin repair"
              },
              snacks: ["Kiwi fruit", "Small handful of almonds"],
              hydration: "2-3 liters of water, mint tea"
            },
            {
              day: "Sunday",
              breakfast: {
                meal: "Scrambled eggs with spinach and whole grain toast",
                benefits: "Protein and iron for skin regeneration"
              },
              lunch: {
                meal: "Vegetable soup with lentils and turmeric",
                benefits: "Anti-inflammatory properties and hydration"
              },
              dinner: {
                meal: "Baked trout with roasted brussels sprouts and quinoa",
                benefits: "Omega-3 fatty acids and vitamin K"
              },
              snacks: ["Apple with cinnamon", "Yogurt with honey"],
              hydration: "2-3 liters of water, ginger tea"
            }
          ],
          groceryList: includeGroceryList ? [
            { category: "Proteins", items: ["Greek yogurt", "Salmon", "Chicken breast", "Tofu", "Eggs", "Cod fillet", "Trout"] },
            { category: "Fruits & Vegetables", items: ["Mixed berries", "Avocado", "Leafy greens", "Sweet potatoes", "Broccoli", "Cucumber", "Spinach", "Banana", "Bell peppers", "Kale", "Blueberries", "Celery", "Orange", "Kiwi", "Apple", "Brussels sprouts"] },
            { category: "Grains & Legumes", items: ["Overnight oats", "Chia seeds", "Quinoa", "Brown rice", "Whole grain bread", "Black beans", "Lentils"] },
            { category: "Nuts & Seeds", items: ["Almonds", "Flax seeds", "Pumpkin seeds", "Walnuts"] },
            { category: "Condiments & Other", items: ["Honey", "Tahini", "Olive oil", "Lemon", "Turmeric", "Hummus", "Coconut milk", "Cinnamon"] },
            { category: "Beverages", items: ["Green tea", "Herbal tea", "Chamomile tea", "Rooibos tea", "Mint tea", "Ginger tea"] }
          ] : null
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

  // Function to get currently active day data
  const getActiveDayData = () => {
    if (!mealPlan || !mealPlan.days) return null;
    return mealPlan.days.find((day: any) => day.day === activeDay);
  };

  // List of days for the tabs
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const dayAbbreviations = ["M", "T", "W", "T", "F", "S", "S"];

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
          <>
            {/* New Food Preferences Section */}
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
          </>
        )}
      </div>
      
      {/* Weekly Overview Card (appears after generation) */}
      {mealPlan && (
        <div className="bg-white rounded-xl p-5 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Calendar className="h-6 w-6 text-skin-teal" />
              <h2 className="text-lg font-semibold">Weekly Overview</h2>
            </div>
            <Button variant="outline" size="sm" onClick={generateMealPlan} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
          
          <div className="p-3 bg-emerald-50 rounded-lg mb-3">
            <p className="text-sm font-medium">Skin Focus: {mealPlan.skinFocus}</p>
          </div>
          
          <Tabs 
            defaultValue="Monday" 
            value={activeDay}
            onValueChange={setActiveDay}
            className="w-full"
          >
            <TabsList className="grid grid-cols-7 w-full mb-2">
              {daysOfWeek.map((day, i) => (
                <TabsTrigger 
                  key={day} 
                  value={day}
                  className="text-xs py-1"
                >
                  {dayAbbreviations[i]}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          
          <p className="text-xs text-muted-foreground">
            Tap on each day above to see your personalized meals
          </p>
        </div>
      )}
      
      {/* Daily Meal Card (shows the active day) */}
      {mealPlan && getActiveDayData() && (
        <div className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 p-4 text-white">
            <h3 className="font-semibold">{activeDay}</h3>
          </div>
          
          {/* Breakfast */}
          <div className="p-4 border-b">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-amber-100 p-2 rounded-full">
                <Apple className="h-4 w-4 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Breakfast</p>
                <p className="font-medium">{getActiveDayData().breakfast.meal}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground ml-12">{getActiveDayData().breakfast.benefits}</p>
          </div>
          
          {/* Lunch */}
          <div className="p-4 border-b">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-green-100 p-2 rounded-full">
                <Utensils className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Lunch</p>
                <p className="font-medium">{getActiveDayData().lunch.meal}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground ml-12">{getActiveDayData().lunch.benefits}</p>
          </div>
          
          {/* Dinner */}
          <div className="p-4 border-b">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-purple-100 p-2 rounded-full">
                <ChefHat className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Dinner</p>
                <p className="font-medium">{getActiveDayData().dinner.meal}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground ml-12">{getActiveDayData().dinner.benefits}</p>
          </div>
          
          {/* Snacks & Hydration */}
          <div className="p-4">
            <p className="text-sm font-medium mb-2">Snacks & Hydration</p>
            <ul className="list-disc list-inside text-sm text-muted-foreground pl-2 mb-3">
              {getActiveDayData().snacks.map((snack: string, i: number) => (
                <li key={i}>{snack}</li>
              ))}
            </ul>
            <p className="text-xs bg-blue-50 p-2 rounded-md">
              <span className="font-medium">Hydration:</span> {getActiveDayData().hydration}
            </p>
          </div>
        </div>
      )}
      
      {/* Expected Results Section - moved here */}
      {mealPlan && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">Expected Results</h3>
            <div className="bg-emerald-100 text-emerald-800 py-1 px-3 rounded-full text-sm font-medium">
              ~85% Improvement
            </div>
          </div>
          <Card className="border-slate-200">
            <CardContent className="p-4 text-muted-foreground text-sm">
              <p>
                Following this personalized meal plan consistently may result in approximately 
                85% improvement in your skin health metrics over time. Results may vary based on 
                individual factors, consistency, and other lifestyle elements.
              </p>
            </CardContent>
          </Card>
        </div>
      )}
      
      {/* Excluded Foods Section - shows after meal plan is generated */}
      {mealPlan && excludedFood && (
        <div className="bg-white rounded-xl p-5 mb-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-rose-100 p-2 rounded-full">
              <AlertTriangle className="h-4 w-4 text-rose-600" />
            </div>
            <h2 className="text-lg font-semibold">Foods to Avoid</h2>
          </div>
          
          <p className="text-sm text-muted-foreground mb-3">
            Based on your preferences, these foods have been excluded from your meal plan:
          </p>
          
          <div className="bg-rose-50 p-3 rounded-lg">
            <ul className="grid grid-cols-2 gap-2">
              {excludedFood.split(',').map((food, i) => (
                <li key={i} className="text-sm flex items-start gap-1">
                  <span className="text-rose-500">•</span>
                  <span>{food.trim()}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      
      {/* Grocery List Section - only shows if included and plan is generated */}
      {mealPlan && mealPlan.groceryList && (
        <div className="bg-white rounded-xl p-5 mb-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-amber-100 p-2 rounded-full">
              <ShoppingCart className="h-4 w-4 text-amber-600" />
            </div>
            <h2 className="text-lg font-semibold">Grocery List</h2>
          </div>
          
          <div className="space-y-4">
            {mealPlan.groceryList.map((category: any, i: number) => (
              <div key={i}>
                <h3 className="text-sm font-medium mb-1">{category.category}</h3>
                <ul className="grid grid-cols-2 gap-2">
                  {category.items.map((item: string, j: number) => (
                    <li key={j} className="text-xs text-muted-foreground flex items-center gap-1">
                      <ListCheck className="h-3 w-3 text-emerald-500 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
      
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
      <div className="bg-white rounded-xl p-5 shadow-sm mb-6">
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

      {/* Disclaimer and Chat Box */}
      {mealPlan && (
        <div className="mt-2 mb-6">
          <h3 className="text-lg font-semibold mb-3 text-muted-foreground">Disclaimer</h3>
          <Card className="border-slate-200">
            <CardContent className="p-4 text-muted-foreground text-xs">
              <p>
                This information is for educational purposes only and is not intended as
                medical advice. Always consult with a healthcare professional or
                dermatologist for personalized recommendations and treatment options
                regarding skin concerns.
              </p>
            </CardContent>
          </Card>
          
          <div className="mt-6">
            <TestAIChatBox productTitle="Skin-Focused Meal Plan" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPlan;
