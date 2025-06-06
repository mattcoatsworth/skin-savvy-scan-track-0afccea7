import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, RefreshCw, ChefHat, Utensils, Apple, ShoppingCart, List, ListCheck, AlertTriangle, DollarSign, BookOpen, Plus, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import TestAIChatBox from '@/components/TestAIChatBox';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { supabase } from '@/integrations/supabase/client';

// Storage key for meal plan data
const MEAL_PLAN_STORAGE_KEY = "meal_plan_data";

const MealPlan = () => {
  const [loading, setLoading] = useState(false);
  const [mealPlan, setMealPlan] = useState<any>(null);
  const [activeDay, setActiveDay] = useState("Monday");
  const [includeGroceryList, setIncludeGroceryList] = useState(false);
  const [preferredFood, setPreferredFood] = useState('');
  const [excludedFood, setExcludedFood] = useState('');
  const [weeklyBudget, setWeeklyBudget] = useState<number | undefined>(undefined);
  const [loadingBenefits, setLoadingBenefits] = useState<{[key: string]: boolean}>({});
  const [foodBenefits, setFoodBenefits] = useState<{[key: string]: string[]}>({});
  const { toast } = useToast();
  
  // Generate a unique key for storing benefits data
  const getBenefitsKey = (day: string, mealType: string) => {
    return `${day}-${mealType}`;
  };
  
  // Function to get skin benefits for specific foods
  const getFoodSkinBenefits = async (day: string, mealType: string, foods: string) => {
    const benefitsKey = getBenefitsKey(day, mealType);
    
    // If already loading benefits for this meal, don't start another request
    if (loadingBenefits[benefitsKey]) return;
    
    // If we already have benefits for this meal, don't fetch again
    if (foodBenefits[benefitsKey]) return;
    
    // Start loading state
    setLoadingBenefits(prev => ({ ...prev, [benefitsKey]: true }));
    
    try {
      // In a real implementation, call your Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('generate-recipe-ideas', {
        body: {
          mealName: foods,
          mealType: mealType,
          day: day,
          onlyBenefits: true // Special flag to request only benefits
        }
      });
      
      if (error) throw new Error(error.message);
      
      // For now, we'll simulate the response with sample data
      setTimeout(() => {
        // Sample food benefits (in production, this would come from the API)
        const sampleBenefits: {[key: string]: string[]} = {
          breakfast: [
            "Greek yogurt: Rich in probiotics that support gut health, which connects directly to clear skin",
            "Berries: High in antioxidants that protect skin cells from damage and reduce inflammation",
            "Honey: Natural antibacterial properties can help prevent breakouts",
            "Chia seeds: Omega-3 fatty acids help maintain skin's lipid barrier and reduce inflammation",
            "Whole grains: Complex carbohydrates with low glycemic index help regulate insulin levels"
          ],
          lunch: [
            "Salmon: Omega-3 fatty acids strengthen skin cell membranes and reduce inflammation",
            "Avocado: Vitamin E protects against oxidative damage and supports skin moisture",
            "Leafy greens: Rich in vitamins A and K, important for cell regeneration and reducing dark circles",
            "Olive oil: Polyphenols have anti-aging benefits and reduce inflammation",
            "Quinoa: Complete protein supporting collagen production and skin repair"
          ],
          dinner: [
            "Turmeric: Curcumin has powerful anti-inflammatory properties to calm skin irritation",
            "Sweet potatoes: Beta-carotene supports skin cell turnover and protects against sun damage",
            "Broccoli: Vitamin C is essential for collagen production and antioxidant protection",
            "Wild-caught fish: Source of selenium and zinc that support skin healing",
            "Plant proteins: Help repair tissue damage and support elasticity without triggering inflammation"
          ],
          snacks: [
            "Almonds: Vitamin E and healthy fats support skin barrier function",
            "Cucumber: High water content helps maintain hydration and flush toxins",
            "Hummus: Chickpeas contain zinc and protein for tissue repair",
            "Blueberries: Anthocyanins protect collagen from degradation",
            "Greek yogurt: Probiotics reduce inflammatory skin conditions"
          ],
          hydration: [
            "Green tea: Catechins have anti-inflammatory and antioxidant benefits for clear skin",
            "Water: Essential for skin cell turnover, hydration, and toxin elimination",
            "Herbal tea: Anti-inflammatory compounds support skin healing",
            "Lemon water: Vitamin C supports collagen production and detoxification pathways",
            "Coconut water: Electrolytes help maintain cellular hydration"
          ]
        };
        
        // Get the right benefits based on meal type
        const benefits = sampleBenefits[mealType] || [
          "This food is high in antioxidants that protect skin from damage",
          "Contains essential vitamins that support skin cell renewal",
          "Provides hydration and nutrients that maintain skin elasticity"
        ];
        
        // Store the benefits
        setFoodBenefits(prev => ({
          ...prev,
          [benefitsKey]: benefits
        }));
        
        // End loading state
        setLoadingBenefits(prev => ({ ...prev, [benefitsKey]: false }));
      }, 1000);
      
    } catch (error) {
      console.error('Error fetching food benefits:', error);
      toast({
        title: "Couldn't load skin benefits",
        description: "There was an error loading the skin benefits. Please try again.",
        variant: "destructive"
      });
      
      // End loading state
      setLoadingBenefits(prev => ({ ...prev, [benefitsKey]: false }));
    }
  };

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
        
        // Store the meal plan in localStorage
        localStorage.setItem(MEAL_PLAN_STORAGE_KEY, JSON.stringify(dummyData));
        // Also store it for the RecipeIdeas page (keep this line for compatibility)
        localStorage.setItem('mealPlan', JSON.stringify(dummyData));
        
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

  // Recipe ideas button component
  const RecipeIdeasButton = ({ mealType, day }: { mealType: string; day: string }) => (
    <Link to={`/recipe-ideas/${day}/${mealType}`}>
      <Button 
        variant="outline" 
        size="sm" 
        className="text-xs bg-emerald-50 border-emerald-100 text-emerald-700 hover:bg-emerald-100"
      >
        <BookOpen className="h-3 w-3 mr-1" />
        Recipe Ideas
      </Button>
    </Link>
  );

  // Benefits Section component
  const SkinBenefitsButton = ({ day, mealType, foods }: { day: string, mealType: string, foods: string }) => {
    const benefitsKey = getBenefitsKey(day, mealType);
    const isLoading = loadingBenefits[benefitsKey];
    const benefits = foodBenefits[benefitsKey];
    
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="border-none">
          <AccordionTrigger 
            onClick={() => !benefits && getFoodSkinBenefits(day, mealType, foods)}
            className="py-1 px-0 text-xs font-medium text-emerald-600 hover:text-emerald-800 hover:no-underline"
          >
            {isLoading ? (
              <span className="flex items-center">
                <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                Loading benefits...
              </span>
            ) : (
              <span className="flex items-center">
                <Plus className="h-3 w-3 mr-1" />
                See Skin Benefits
              </span>
            )}
          </AccordionTrigger>
          <AccordionContent className="pb-1 pt-2">
            {benefits ? (
              <ul className="text-xs text-muted-foreground space-y-1.5 pl-2">
                {benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-500 text-xs mt-0.5">•</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-xs text-muted-foreground italic">
                Click to load skin benefits for these foods.
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
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
                  
                  {/* Budget input field */}
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
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="bg-amber-100 p-2 rounded-full">
                  <Apple className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Breakfast</p>
                  <p className="font-medium">{getActiveDayData().breakfast.meal}</p>
                </div>
              </div>
              <RecipeIdeasButton mealType="breakfast" day={activeDay} />
            </div>
            <p className="text-xs text-muted-foreground ml-12 mb-1.5">{getActiveDayData().breakfast.benefits}</p>
            <div className="ml-12">
              <SkinBenefitsButton 
                day={activeDay} 
                mealType="breakfast" 
                foods={getActiveDayData().breakfast.meal} 
              />
            </div>
          </div>
          
          {/* Lunch */}
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Utensils className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Lunch</p>
                  <p className="font-medium">{getActiveDayData().lunch.meal}</p>
                </div>
              </div>
              <RecipeIdeasButton mealType="lunch" day={activeDay} />
            </div>
            <p className="text-xs text-muted-foreground ml-12 mb-1.5">{getActiveDayData().lunch.benefits}</p>
            <div className="ml-12">
              <SkinBenefitsButton 
                day={activeDay} 
                mealType="lunch" 
                foods={getActiveDayData().lunch.meal} 
              />
            </div>
          </div>
          
          {/* Dinner */}
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-full">
                  <ChefHat className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Dinner</p>
                  <p className="font-medium">{getActiveDayData().dinner.meal}</p>
                </div>
              </div>
              <RecipeIdeasButton mealType="dinner" day={activeDay} />
            </div>
            <p className="text-xs text-muted-foreground ml-12 mb-1.5">{getActiveDayData().dinner.benefits}</p>
            <div className="ml-12">
              <SkinBenefitsButton 
                day={activeDay} 
                mealType="dinner" 
                foods={getActiveDayData().dinner.meal} 
              />
            </div>
          </div>
          
          {/* Snacks & Hydration */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium">Snacks & Hydration</p>
              <div className="flex gap-2">
                <RecipeIdeasButton mealType="snacks" day={activeDay} />
                <RecipeIdeasButton mealType="hydration" day={activeDay} />
              </div>
            </div>
            <ul className="list-disc list-inside text-sm text-muted-foreground pl-2 mb-3">
              {getActiveDayData().snacks.map((snack: string, i: number) => (
                <li key={i}>{snack}</li>
              ))}
            </ul>
            <div className="mb-3">
              <SkinBenefitsButton 
                day={activeDay} 
                mealType="snacks" 
                foods={getActiveDayData().snacks.join(", ")} 
              />
            </div>
            <p className="text-xs bg-blue-50 p-2 rounded-md mb-1">
              <span className="font-medium">Hydration:</span> {getActiveDayData().hydration}
            </p>
            <div className="ml-1">
              <SkinBenefitsButton 
                day={activeDay} 
                mealType="hydration" 
                foods={getActiveDayData().hydration} 
              />
            </div>
          </div>
        </div>
      )}
      
      {/* Expected Results Section - shows right after daily meal */}
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
      
      {/* Grocery List Section - below Expected Results */}
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
      
      {/* Nutrition Tips Card - Moved below Grocery List */}
      {mealPlan && (
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
      
      {/* Weekly Budget Section */}
      {mealPlan && weeklyBudget !== undefined && (
        <div className="bg-white rounded-xl p-5 mb-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <DollarSign className="h-4 w-4 text-blue-600" />
            </div>
            <h2 className="text-lg font-semibold">Weekly Budget</h2>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Your weekly grocery budget:</span>
              <span className="text-lg font-semibold">${weeklyBudget.toFixed(2)}</span>
            </div>
            
            <div className="h-2 bg-blue-100 rounded-full mb-2">
              <div 
                className="h-full bg-blue-500 rounded-full" 
                style={{ width: '75%' }}
              />
            </div>
            
            <p className="text-xs text-muted-foreground">
              This meal plan is designed to be budget-friendly and should stay within your specified budget range. Prices may vary based on your location and where you shop.
            </p>
          </div>
          
          <div className="mt-3">
            <h3 className="text-sm font-medium mb-2">Budget-saving tips:</h3>
            <ul className="text-xs text-muted-foreground space-y-1 pl-5 list-disc">
              <li>Buy seasonal produce for maximum nutrition at lower cost</li>
              <li>Purchase items in bulk when appropriate (grains, nuts, frozen berries)</li>
              <li>Shop at local farmers markets for fresh ingredients at better prices</li>
              <li>Prep meals in advance to avoid food waste</li>
            </ul>
          </div>
        </div>
      )}
      
      {/* Chat box */}
      {mealPlan && (
        <TestAIChatBox productTitle="Skin-Focused Meal Plan" />
      )}
      
      {/* Disclaimer */}
      {mealPlan && (
        <div className="mt-0 mb-6">
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
    </div>
  );
};

export default MealPlan;
