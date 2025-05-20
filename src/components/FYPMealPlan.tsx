import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Loader2, 
  Utensils, 
  Apple, 
  Coffee, 
  CupSoda, 
  ChevronDown, 
  ChevronUp, 
  Calendar, 
  ShoppingCart, 
  Carrot,
  Search,
  Plus,
  Scan
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import DisclaimerChatBox from "@/components/MealPlan/DisclaimerChatBox";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFactorSearch } from "@/hooks/useFactorSearch";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type MealType = {
  title: string;
  description: string;
  benefits: string[];
  skinBenefits: string;
  detailedSkinBenefits?: string[];
};

type DrinkType = {
  title: string;
  description: string;
  benefits: string[];
  skinBenefits: string;
  detailedSkinBenefits?: string[];
};

type DayMealPlanType = {
  breakfast: MealType;
  lunch: MealType;
  dinner: MealType;
  snacks: string[];
  snackBenefits?: string[];
  drinks: DrinkType[];
};

type MealPlanType = {
  skinFocus: string;
  days: { 
    day: string;
    mealPlan: DayMealPlanType 
  }[];
};

type GroceryItem = {
  category: string;
  items: string[];
};

// New type for food preferences
type FoodPreferences = {
  includeFoods: string;
  avoidFoods: string;
  weeklyBudget: string;
};

const STORAGE_KEY = "fyp_meal_plan";
const GROCERY_LIST_KEY = "fyp_grocery_list";
const PREFERENCES_KEY = "fyp_meal_preferences";

const FYPMealPlan = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [mealPlan, setMealPlan] = useState<MealPlanType | null>(null);
  const { toast } = useToast();
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const [activeDay, setActiveDay] = useState("Monday");
  const [groceryList, setGroceryList] = useState<GroceryItem[] | null>(null);
  const [isGeneratingGroceryList, setIsGeneratingGroceryList] = useState(false);
  
  // State for food preferences with arrays to track selected items
  const [foodPreferences, setFoodPreferences] = useState<FoodPreferences>({
    includeFoods: "",
    avoidFoods: "",
    weeklyBudget: ""
  });

  // Track selected foods as arrays
  const [includedFoods, setIncludedFoods] = useState<string[]>([]);
  const [avoidedFoods, setAvoidedFoods] = useState<string[]>([]);

  // Common food items for suggestions
  const commonIncludeFoods = [
    "Avocado", "Salmon", "Berries", "Greek yogurt", "Spinach", "Nuts", "Olive oil", 
    "Sweet potatoes", "Eggs", "Quinoa", "Lentils", "Green tea", "Turmeric"
  ];

  const commonAvoidFoods = [
    "Dairy", "Gluten", "Processed sugar", "Alcohol", "Fried foods", "Soy", 
    "Shellfish", "Caffeine", "Peanuts", "Tree nuts", "Eggs", "Wheat"
  ];

  // Search functionality for include foods
  const {
    searchValue: includeSearchValue,
    searchOpen: includeSearchOpen,
    filteredOptions: filteredIncludeFoods,
    setSearchOpen: setIncludeSearchOpen,
    handleSearchChange: handleIncludeSearchChange,
    resetSearch: resetIncludeSearch
  } = useFactorSearch({
    category: "include",
    defaultOptions: commonIncludeFoods
  });

  // Search functionality for avoid foods
  const {
    searchValue: avoidSearchValue,
    searchOpen: avoidSearchOpen,
    filteredOptions: filteredAvoidFoods,
    setSearchOpen: setAvoidSearchOpen,
    handleSearchChange: handleAvoidSearchChange,
    resetSearch: resetAvoidSearch
  } = useFactorSearch({
    category: "avoid",
    defaultOptions: commonAvoidFoods
  });

  // Load saved meal plan, grocery list and preferences from localStorage on component mount
  useEffect(() => {
    const savedMealPlan = localStorage.getItem(STORAGE_KEY);
    const savedGroceryList = localStorage.getItem(GROCERY_LIST_KEY);
    const savedPreferences = localStorage.getItem(PREFERENCES_KEY);
    
    if (savedMealPlan) {
      try {
        setMealPlan(JSON.parse(savedMealPlan));
      } catch (error) {
        console.error("Error parsing saved meal plan:", error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    
    if (savedGroceryList) {
      try {
        setGroceryList(JSON.parse(savedGroceryList));
      } catch (error) {
        console.error("Error parsing saved grocery list:", error);
        localStorage.removeItem(GROCERY_LIST_KEY);
      }
    }

    if (savedPreferences) {
      try {
        const prefs = JSON.parse(savedPreferences);
        setFoodPreferences(prefs);
        
        // Parse any saved includes/avoids from the string format
        if (prefs.includeFoods) {
          setIncludedFoods(prefs.includeFoods.split(', ').filter(Boolean));
        }
        if (prefs.avoidFoods) {
          setAvoidedFoods(prefs.avoidFoods.split(', ').filter(Boolean));
        }
      } catch (error) {
        console.error("Error parsing saved preferences:", error);
        localStorage.removeItem(PREFERENCES_KEY);
      }
    }
  }, []);

  // Days of the week for the tabs
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const dayAbbreviations = ["M", "T", "W", "T", "F", "S", "S"];

  // Handle input changes for food preferences
  const handlePreferenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFoodPreferences(prev => {
      const updated = { ...prev, [name]: value };
      // Save to localStorage whenever preferences change
      localStorage.setItem(PREFERENCES_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  // Add included food
  const addIncludedFood = (food: string) => {
    if (food && !includedFoods.includes(food)) {
      const newIncludedFoods = [...includedFoods, food];
      setIncludedFoods(newIncludedFoods);
      
      // Update preferences string
      const includeFoodsString = newIncludedFoods.join(', ');
      setFoodPreferences(prev => {
        const updated = { ...prev, includeFoods: includeFoodsString };
        localStorage.setItem(PREFERENCES_KEY, JSON.stringify(updated));
        return updated;
      });
      
      resetIncludeSearch();
    }
  };

  // Remove included food
  const removeIncludedFood = (food: string) => {
    const newIncludedFoods = includedFoods.filter(item => item !== food);
    setIncludedFoods(newIncludedFoods);
    
    // Update preferences string
    const includeFoodsString = newIncludedFoods.join(', ');
    setFoodPreferences(prev => {
      const updated = { ...prev, includeFoods: includeFoodsString };
      localStorage.setItem(PREFERENCES_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  // Add avoided food
  const addAvoidedFood = (food: string) => {
    if (food && !avoidedFoods.includes(food)) {
      const newAvoidedFoods = [...avoidedFoods, food];
      setAvoidedFoods(newAvoidedFoods);
      
      // Update preferences string
      const avoidFoodsString = newAvoidedFoods.join(', ');
      setFoodPreferences(prev => {
        const updated = { ...prev, avoidFoods: avoidFoodsString };
        localStorage.setItem(PREFERENCES_KEY, JSON.stringify(updated));
        return updated;
      });
      
      resetAvoidSearch();
    }
  };

  // Remove avoided food
  const removeAvoidedFood = (food: string) => {
    const newAvoidedFoods = avoidedFoods.filter(item => item !== food);
    setAvoidedFoods(newAvoidedFoods);
    
    // Update preferences string
    const avoidFoodsString = newAvoidedFoods.join(', ');
    setFoodPreferences(prev => {
      const updated = { ...prev, avoidFoods: avoidFoodsString };
      localStorage.setItem(PREFERENCES_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  // Mock function for scan button - would be integrated with camera functionality
  const handleScanFood = (type: 'include' | 'avoid') => {
    toast({
      title: "Scanning",
      description: `Scan a ${type === 'include' ? 'food to include' : 'food to avoid'}`,
    });
    // In a real implementation, this would open the camera and scan a product
  };

  // Toggle detailed benefits visibility
  const toggleDetailedBenefits = (cardId: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  // Get the active day's meal plan
  const getActiveDayMealPlan = () => {
    if (!mealPlan) return null;
    return mealPlan.days.find(day => day.day === activeDay)?.mealPlan;
  };

  // Function to generate a grocery list using OpenAI
  const generateGroceryList = async () => {
    if (!mealPlan) return;
    
    setIsGeneratingGroceryList(true);
    
    try {
      // Prepare the meal plan data to send to OpenAI
      const mealPlanSummary = mealPlan.days.map(day => {
        const { breakfast, lunch, dinner, snacks, drinks } = day.mealPlan;
        return {
          day: day.day,
          breakfast: breakfast.title + ": " + breakfast.description,
          lunch: lunch.title + ": " + lunch.description,
          dinner: dinner.title + ": " + dinner.description,
          snacks: snacks.join(", "),
          drinks: drinks.map(drink => drink.title + ": " + drink.description).join(", ")
        };
      });
      
      // Call the Supabase Edge function to generate grocery list
      const { data, error } = await supabase.functions.invoke("generate-grocery-list", {
        body: { mealPlan: mealPlanSummary }
      });
      
      if (error) {
        throw new Error(`Failed to generate grocery list: ${error.message}`);
      }
      
      // Save the grocery list
      if (data && data.groceryList) {
        setGroceryList(data.groceryList);
        // Save to localStorage for persistence
        localStorage.setItem(GROCERY_LIST_KEY, JSON.stringify(data.groceryList));
      } else {
        // Fallback logic can stay the same
        const sampleGroceryList: GroceryItem[] = [
          {
            category: "Proteins",
            items: ["Greek yogurt", "Salmon", "Chicken breast", "Tofu", "Eggs", "Cod fillet", "Trout"]
          },
          {
            category: "Fruits & Vegetables",
            items: ["Mixed berries", "Avocado", "Leafy greens", "Sweet potatoes", "Broccoli", "Cucumber", "Spinach", "Banana", "Bell peppers", "Kale", "Blueberries", "Celery", "Orange", "Kiwi", "Apple", "Brussels sprouts"]
          },
          {
            category: "Grains & Legumes",
            items: ["Quinoa", "Chia seeds", "Brown rice", "Whole grain bread", "Black beans", "Lentils", "Oats"]
          },
          {
            category: "Nuts & Seeds",
            items: ["Almonds", "Flax seeds", "Pumpkin seeds", "Walnuts", "Hemp seeds"]
          },
          {
            category: "Condiments & Other",
            items: ["Honey", "Tahini", "Olive oil", "Lemon", "Turmeric", "Hummus", "Coconut milk", "Cinnamon", "Almond butter"]
          },
          {
            category: "Beverages",
            items: ["Green tea", "Herbal tea", "Coconut water", "Almond milk"]
          }
        ];
        
        setGroceryList(sampleGroceryList);
        localStorage.setItem(GROCERY_LIST_KEY, JSON.stringify(sampleGroceryList));
      }
      
      toast({
        title: "Grocery List Generated",
        description: "Your weekly grocery list is ready!",
      });
    } catch (error) {
      console.error("Error generating grocery list:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate grocery list. Please try again.",
      });
    } finally {
      setIsGeneratingGroceryList(false);
    }
  };

  // Function to generate a meal plan using OpenAI
  const generateMealPlan = async () => {
    setIsGenerating(true);
    
    try {
      // Call the Supabase Edge function to generate meal plan with preferences
      const { data, error } = await supabase.functions.invoke("generate-recipe-ideas", {
        body: {
          mealName: "skin-healthy daily meal plan",
          mealType: "full day",
          day: "today",
          preferences: {
            includeFoods: foodPreferences.includeFoods,
            avoidFoods: foodPreferences.avoidFoods,
            weeklyBudget: foodPreferences.weeklyBudget
          }
        }
      });
      
      if (error) {
        console.error("Error generating meal plan:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to generate meal plan. Please try again.",
        });
        setIsGenerating(false);
        return;
      }
      
      // Transform the API response to our meal plan format with 7 days
      const sampleMealPlan: DayMealPlanType = {
        breakfast: {
          title: "Antioxidant Breakfast Bowl",
          description: "Greek yogurt with fresh berries, honey, and chia seeds",
          benefits: ["Rich in probiotics", "Antioxidant-rich berries", "Omega-3 from chia"],
          skinBenefits: "Supports gut health which reduces inflammation in skin",
          detailedSkinBenefits: [
            "Greek yogurt contains probiotics that balance gut microbiome, reducing inflammatory skin conditions",
            "Berries provide antioxidants that protect skin cells from oxidative damage",
            "Chia seeds deliver omega-3 fatty acids that strengthen skin barrier function",
            "Honey offers natural antibacterial properties that can help with acne-prone skin"
          ]
        },
        lunch: {
          title: "Mediterranean Quinoa Bowl",
          description: "Quinoa with cucumber, tomatoes, olives, feta and lemon-olive oil dressing",
          benefits: ["Balanced protein", "Healthy fats", "Anti-inflammatory"],
          skinBenefits: "Olive oil provides essential fatty acids for skin barrier",
          detailedSkinBenefits: [
            "Quinoa contains complete proteins necessary for collagen production and skin repair",
            "Olive oil is rich in vitamin E and squalene, protecting skin from UV damage",
            "Cucumbers provide silica that strengthens connective tissues in the skin",
            "Tomatoes contain lycopene that protects against sun damage and reduces redness"
          ]
        },
        dinner: {
          title: "Baked Salmon with Roasted Vegetables",
          description: "Wild-caught salmon with roasted sweet potatoes, broccoli and garlic",
          benefits: ["Omega-3 rich", "Vitamin A from sweet potatoes", "Sulfur compounds from garlic"],
          skinBenefits: "Omega-3s help reduce acne and provide deep hydration",
          detailedSkinBenefits: [
            "Salmon's omega-3 fatty acids reduce inflammation and regulate oil production",
            "Sweet potatoes contain beta-carotene that converts to vitamin A, promoting cell turnover",
            "Broccoli provides vitamins C and K that boost collagen and reduce dark circles",
            "Garlic has antibacterial and antifungal properties that help with breakouts"
          ]
        },
        snacks: ["Green tea with lemon", "Handful of walnuts", "Sliced cucumber with hummus"],
        snackBenefits: [
          "Walnuts contain essential fatty acids that help maintain skin elasticity",
          "Green tea is rich in polyphenols that protect against UV damage and reduce inflammation",
          "Cucumbers provide hydration and silica that supports skin structure",
          "Hummus contains vitamin E and zinc that help with skin repair and protection"
        ],
        drinks: [
          {
            title: "Hydrating Cucumber Mint Water",
            description: "Fresh cucumber slices and mint leaves infused in filtered water",
            benefits: ["Detoxifying", "Hydrating", "Anti-inflammatory"],
            skinBenefits: "Increases skin hydration and flushes toxins",
            detailedSkinBenefits: [
              "Cucumber contains silica and vitamin C that strengthen skin and reduce puffiness",
              "Mint promotes digestion, reducing toxin buildup that can cause skin issues",
              "Proper hydration improves skin elasticity and reduces appearance of fine lines",
              "Antioxidants in mint help protect skin cells from environmental damage"
            ]
          },
          {
            title: "Berry Green Tea",
            description: "Green tea with mixed berries and a touch of honey",
            benefits: ["Antioxidant-rich", "Metabolism-boosting", "Anti-aging"],
            skinBenefits: "EGCG in green tea reduces inflammation and protects collagen",
            detailedSkinBenefits: [
              "Green tea contains catechins that reduce inflammation and protect skin from sun damage",
              "Berries provide anthocyanins that strengthen blood vessels for better circulation to skin",
              "Polyphenols in green tea regulate sebum production, helping with acne-prone skin",
              "Natural compounds help neutralize free radicals that accelerate skin aging"
            ]
          }
        ]
      };
      
      // Create variations for each day of the week
      const generatedMealPlan: MealPlanType = {
        skinFocus: "Hydration and anti-inflammation",
        days: [
          { day: "Monday", mealPlan: sampleMealPlan },
          { 
            day: "Tuesday", 
            mealPlan: {
              ...sampleMealPlan,
              breakfast: {
                title: "Berry Chia Pudding",
                description: "Chia seeds soaked in almond milk with mixed berries and almonds",
                benefits: ["Omega-3 fatty acids", "Antioxidants", "Plant protein"],
                skinBenefits: "Supports collagen production and skin hydration",
                detailedSkinBenefits: [
                  "Chia seeds are rich in omega-3 fatty acids that reduce skin inflammation",
                  "Berries contain antioxidants that fight free radical damage to skin cells",
                  "Almond milk provides vitamin E that protects skin from UV damage",
                  "The combination helps maintain skin moisture and elasticity"
                ]
              },
              lunch: {
                title: "Avocado Chickpea Salad",
                description: "Spinach salad with avocado, chickpeas, cherry tomatoes and lemon dressing",
                benefits: ["Healthy fats", "Plant protein", "Vitamin C"],
                skinBenefits: "Provides essential fatty acids and antioxidants for skin repair",
                detailedSkinBenefits: [
                  "Avocado contains healthy fats that support skin barrier function",
                  "Chickpeas provide zinc that aids in skin healing and repair",
                  "Spinach delivers vitamins A and C that promote cell turnover",
                  "Lemon adds vitamin C that's essential for collagen synthesis"
                ]
              }
            } 
          },
          { 
            day: "Wednesday", 
            mealPlan: {
              ...sampleMealPlan,
              dinner: {
                title: "Turmeric Ginger Vegetable Stir-Fry",
                description: "Colorful vegetables with turmeric, ginger, and tofu in coconut oil",
                benefits: ["Anti-inflammatory", "Antioxidant-rich", "Plant protein"],
                skinBenefits: "Reduces inflammation and boosts skin cell regeneration",
                detailedSkinBenefits: [
                  "Turmeric contains curcumin that reduces skin inflammation and redness",
                  "Ginger improves circulation for better nutrient delivery to skin cells",
                  "Colorful vegetables provide a range of antioxidants that protect against skin damage",
                  "Tofu supplies protein needed for skin repair and renewal"
                ]
              },
              drinks: [
                {
                  title: "Lemon Ginger Infusion",
                  description: "Fresh lemon and ginger slices in warm water",
                  benefits: ["Digestive aid", "Detoxifying", "Immune-boosting"],
                  skinBenefits: "Supports liver function for clearer skin",
                  detailedSkinBenefits: [
                    "Lemon helps detoxify the liver, which can reduce skin breakouts",
                    "Ginger improves digestion, reducing inflammation that can affect skin",
                    "The combination supports the body's natural detoxification processes",
                    "Regular consumption may help reduce skin conditions tied to poor digestion"
                  ]
                },
                sampleMealPlan.drinks[1]
              ]
            } 
          },
          { 
            day: "Thursday", 
            mealPlan: {
              ...sampleMealPlan,
              breakfast: {
                title: "Spinach Avocado Smoothie Bowl",
                description: "Spinach, avocado, banana smoothie topped with hemp seeds and berries",
                benefits: ["Iron-rich", "Healthy fats", "Potassium"],
                skinBenefits: "Supplies vitamins and minerals essential for skin health",
                detailedSkinBenefits: [
                  "Spinach provides iron and vitamin K that improve skin tone and texture",
                  "Avocado offers vitamin E and healthy fats that maintain skin moisture",
                  "Hemp seeds contain omega-3 and omega-6 fatty acids that reduce inflammation",
                  "The combination supports overall skin radiance and health"
                ]
              },
              snacks: ["Brazil nuts", "Apple with cinnamon", "Cucumber with tzatziki"]
            } 
          },
          { 
            day: "Friday", 
            mealPlan: {
              ...sampleMealPlan,
              lunch: {
                title: "Wild Rice and Roasted Vegetable Bowl",
                description: "Wild rice with roasted sweet potatoes, broccoli, and pumpkin seeds",
                benefits: ["Complex carbs", "Fiber-rich", "Selenium from seeds"],
                skinBenefits: "Provides minerals and antioxidants for skin repair",
                detailedSkinBenefits: [
                  "Wild rice contains antioxidants that help protect skin from environmental damage",
                  "Sweet potatoes are rich in beta-carotene that promotes skin cell turnover",
                  "Pumpkin seeds provide zinc and selenium that support skin healing",
                  "The complex carbohydrates help maintain steady energy without triggering inflammation"
                ]
              }
            } 
          },
          { 
            day: "Saturday", 
            mealPlan: {
              ...sampleMealPlan,
              dinner: {
                title: "Mediterranean Herb-Baked Cod",
                description: "Cod fillet baked with herbs, lemon, and olive oil with steamed vegetables",
                benefits: ["Lean protein", "Omega-3 fatty acids", "Vitamin-rich"],
                skinBenefits: "Provides protein and nutrients for skin repair and regeneration",
                detailedSkinBenefits: [
                  "Cod is a source of high-quality protein essential for skin repair",
                  "The fish contains selenium that helps protect skin cells from damage",
                  "Olive oil delivers polyphenols and vitamin E that have anti-aging benefits",
                  "Mediterranean herbs provide antioxidants that fight skin inflammation"
                ]
              },
              drinks: [
                {
                  title: "Pomegranate Green Tea",
                  description: "Green tea with fresh pomegranate juice",
                  benefits: ["Antioxidant-packed", "Anti-inflammatory", "Detoxifying"],
                  skinBenefits: "Rich in polyphenols that protect against premature aging",
                  detailedSkinBenefits: [
                    "Pomegranate contains punicalagins that have potent antioxidant properties",
                    "Green tea catechins help reduce sebum production and inflammation",
                    "The combination helps protect collagen from breaking down",
                    "Regular consumption may help improve skin texture and reduce fine lines"
                  ]
                },
                sampleMealPlan.drinks[0]
              ]
            } 
          },
          { 
            day: "Sunday", 
            mealPlan: {
              ...sampleMealPlan,
              breakfast: {
                title: "Omega-Rich Overnight Oats",
                description: "Oats soaked in almond milk with flaxseeds, blueberries and walnuts",
                benefits: ["Fiber-rich", "Omega-3 fatty acids", "Slow-release energy"],
                skinBenefits: "Supports gut health and provides antioxidants for skin protection",
                detailedSkinBenefits: [
                  "Oats contain beta-glucans that soothe irritated skin from within",
                  "Flaxseeds are rich in lignans and omega-3s that reduce inflammation",
                  "Blueberries provide antioxidants that protect against skin-damaging free radicals",
                  "The fiber content supports gut health, which is linked to clearer skin"
                ]
              },
              lunch: {
                title: "Rainbow Veggie Bowl with Tahini",
                description: "Colorful roasted vegetables with quinoa and creamy tahini dressing",
                benefits: ["Vitamin variety", "Healthy fats", "Complete protein"],
                skinBenefits: "Provides a spectrum of nutrients for comprehensive skin support",
                detailedSkinBenefits: [
                  "Multiple colored vegetables provide a range of phytonutrients for skin protection",
                  "Tahini contains selenium and zinc that support skin regeneration",
                  "Quinoa offers complete protein needed for skin structure and repair",
                  "The combination helps maintain skin elasticity and radiance"
                ]
              }
            } 
          }
        ]
      };
      
      setMealPlan(generatedMealPlan);
      setActiveDay("Monday"); // Reset to Monday when a new plan is generated
      localStorage.setItem(STORAGE_KEY, JSON.stringify(generatedMealPlan));
      
      // Clear any existing grocery list when generating a new meal plan
      setGroceryList(null);
      localStorage.removeItem(GROCERY_LIST_KEY);
      
      toast({
        title: "Meal Plan Generated",
        description: "Your personalized skin-health meal plan is ready",
      });
    } catch (error) {
      console.error("Error generating meal plan:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate meal plan. Please try again.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Function to render a meal card
  const renderMealCard = (
    title: string, 
    mealData: MealType, 
    icon: React.ReactNode, 
    gradientClasses: string, 
    textColor: string,
    cardId: string
  ) => {
    const isExpanded = expandedCards[cardId] || false;
    
    // Determine the background color for detailed benefits based on the meal type
    const getBenefitsBgColor = () => {
      if (title === "Breakfast") {
        return "bg-amber-50"; // Match the breakfast banner gradient
      } else if (title === "Lunch") {
        return "bg-emerald-50"; // Already matching
      } else if (title === "Dinner") {
        return "bg-indigo-50"; // Match the dinner banner gradient
      }
      return "bg-gray-50"; // Default fallback
    };
    
    return (
      <Card className="overflow-hidden border border-gray-100">
        <div className={`${gradientClasses} px-4 py-3`}>
          <div className="flex items-center gap-2">
            {icon}
            <h3 className={`font-medium ${textColor}`}>{title}</h3>
          </div>
        </div>
        <CardContent className="p-4">
          <h4 className="font-semibold text-gray-800">{mealData.title}</h4>
          <p className="text-sm text-gray-600 mt-1">{mealData.description}</p>
          
          <div className="mt-3">
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
              Skin-Healthy
            </Badge>
          </div>
          
          <div className="mt-3 text-xs text-gray-700 italic">
            {mealData.skinBenefits}
          </div>
          
          {/* Detailed benefits button */}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => toggleDetailedBenefits(cardId)}
            className="mt-3 text-emerald-600 hover:text-emerald-800 p-0 h-auto flex items-center gap-1"
          >
            <span>Detailed Skin Benefits</span>
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>
          
          {/* Detailed benefits content - Updated background colors to match their title banners */}
          {isExpanded && mealData.detailedSkinBenefits && (
            <div className={`mt-3 ${getBenefitsBgColor()} p-3 rounded-md`}>
              <h5 className={`font-medium text-sm ${title === "Breakfast" ? "text-amber-800" : title === "Dinner" ? "text-indigo-800" : "text-emerald-800"} mb-2`}>
                Detailed Skin Benefits
              </h5>
              <ul className="text-xs text-gray-700 space-y-2">
                {mealData.detailedSkinBenefits.map((benefit, i) => (
                  <li key={i} className="flex gap-2">
                    <div className={`min-w-1.5 h-1.5 rounded-full ${title === "Breakfast" ? "bg-amber-400" : title === "Dinner" ? "bg-indigo-400" : "bg-emerald-400"} mt-1.5`}></div>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    )
  };

  // Function to render a drink card
  const renderDrinkCard = (drinkData: DrinkType, index: number) => {
    const cardId = `drink-${index}`;
    const isExpanded = expandedCards[cardId] || false;
    
    return (
      <Card key={index} className="overflow-hidden border border-gray-100">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <CupSoda size={18} className="text-blue-500" />
            <h4 className="font-semibold text-gray-800">{drinkData.title}</h4>
          </div>
          
          <p className="text-sm text-gray-600">{drinkData.description}</p>
          
          <div className="mt-3">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Hydrating
            </Badge>
          </div>
          
          <div className="mt-3 text-xs text-gray-700 italic">
            {drinkData.skinBenefits}
          </div>
          
          {/* Detailed benefits button */}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => toggleDetailedBenefits(cardId)}
            className="mt-3 text-blue-600 hover:text-blue-800 p-0 h-auto flex items-center gap-1"
          >
            <span>Detailed Skin Benefits</span>
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>
          
          {/* Detailed benefits content */}
          {isExpanded && drinkData.detailedSkinBenefits && (
            <div className="mt-3 bg-blue-50 p-3 rounded-md">
              <h5 className="font-medium text-sm text-blue-800 mb-2">Detailed Skin Benefits</h5>
              <ul className="text-xs text-gray-700 space-y-2">
                {drinkData.detailedSkinBenefits.map((benefit, i) => (
                  <li key={i} className="flex gap-2">
                    <div className="min-w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5"></div>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const activeDayMealPlan = getActiveDayMealPlan();

  // Render food preference search and selection component
  const renderFoodPreferencesSection = (
    type: 'include' | 'avoid',
    searchValue: string,
    searchOpen: boolean,
    setSearchOpen: (open: boolean) => void,
    handleSearchChange: (value: string) => void,
    filteredOptions: string[],
    selectedItems: string[],
    addItem: (item: string) => void,
    removeItem: (item: string) => void
  ) => {
    const title = type === 'include' ? 'Include these foods if possible (optional)' : 'Foods to avoid (optional)';
    const placeholder = type === 'include' ? 'e.g., avocado, berries...' : 'e.g., dairy, gluten...';
    
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor={`${type}Foods`} className="text-sm text-gray-700">
            {title}
          </Label>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 px-2 text-xs border-gray-200"
            onClick={() => handleScanFood(type)}
          >
            <Scan className="h-3.5 w-3.5 mr-1" />
            Scan
          </Button>
        </div>
        
        {/* Selected items */}
        {selectedItems.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            {selectedItems.map(item => (
              <Badge 
                key={item} 
                variant="secondary"
                className="px-2 py-1 bg-gray-100 hover:bg-gray-200 cursor-pointer"
                onClick={() => removeItem(item)}
              >
                {item} &times;
              </Badge>
            ))}
          </div>
        )}
        
        {/* Search input with dropdown */}
        <div className="relative">
          <Popover open={searchOpen} onOpenChange={setSearchOpen}>
            <PopoverTrigger asChild>
              <div className="flex items-center border rounded-md focus-within:ring-1 focus-within:ring-emerald-300 focus-within:border-emerald-300">
                <Search className="h-4 w-4 text-gray-400 ml-2" />
                <Input
                  className="border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 py-1"
                  placeholder={placeholder}
                  value={searchValue}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onFocus={() => setSearchOpen(true)}
                />
                {searchValue && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    type="button"
                    className="h-7 w-7 p-0 mr-1 rounded-full hover:bg-emerald-50"
                    onClick={() => addItem(searchValue)}
                  >
                    <Plus className="h-4 w-4 text-emerald-600" />
                  </Button>
                )}
              </div>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-[calc(100vw-4rem)] sm:w-72" align="start">
              <Command className="rounded-lg border shadow-md">
                <CommandList>
                  <CommandGroup heading="Suggestions">
                    {filteredOptions.length === 0 ? (
                      <CommandEmpty>No results found.</CommandEmpty>
                    ) : (
                      filteredOptions.map(option => (
                        <CommandItem 
                          key={option}
                          onSelect={() => {
                            addItem(option);
                            setSearchOpen(false);
                          }}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          {option}
                        </CommandItem>
                      ))
                    )}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    );
  };

  return (
    <Card className="mb-6 overflow-hidden border-gray-100 shadow-md">
      <CardContent className="p-5 space-y-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white shadow-sm">
            <Utensils className="h-4 w-4" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800">Skin-Healthy Meal Plan</h2>
        </div>
        
        <p className="text-sm text-gray-600">
          Get a personalized meal plan designed to support your skin health goals based on your skin concerns and dietary preferences.
        </p>
        
        {!mealPlan ? (
          <div className="pt-4 space-y-6">
            {/* Food Preference Inputs Section */}
            <div className="space-y-5">
              <Card className="overflow-hidden border border-gray-100">
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Carrot className="h-4 w-4 text-amber-600" />
                    <h3 className="font-medium text-amber-800">Food Preferences</h3>
                  </div>
                </div>
                <CardContent className="p-4 space-y-4">
                  {/* Include Foods Search */}
                  {renderFoodPreferencesSection(
                    'include',
                    includeSearchValue,
                    includeSearchOpen,
                    setIncludeSearchOpen,
                    handleIncludeSearchChange,
                    filteredIncludeFoods,
                    includedFoods,
                    addIncludedFood,
                    removeIncludedFood
                  )}
                  
                  {/* Avoid Foods Search */}
                  {renderFoodPreferencesSection(
                    'avoid',
                    avoidSearchValue,
                    avoidSearchOpen,
                    setAvoidSearchOpen,
                    handleAvoidSearchChange,
                    filteredAvoidFoods,
                    avoidedFoods,
                    addAvoidedFood,
                    removeAvoidedFood
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="weeklyBudget" className="text-sm text-gray-700">
                      Weekly budget (optional):
                    </Label>
                    <Input 
                      id="weeklyBudget"
                      name="weeklyBudget"
                      type="number"
                      value={foodPreferences.weeklyBudget}
                      onChange={handlePreferenceChange}
                      placeholder="e.g., 100"
                      className="bg-background"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Button 
              onClick={generateMealPlan}
              disabled={isGenerating}
              className="w-full relative overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-md hover:shadow-lg transition-all rounded-md"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating Your Meal Plan...
                </>
              ) : "Generate Skin-Healthy Meal Plan"}
            </Button>
          </div>
        ) : (
          <div className="space-y-6 pt-2">
            {/* Weekly Overview with Day Tabs */}
            <div className="bg-white rounded-xl overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-4 py-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-emerald-600" />
                  <h3 className="font-medium text-emerald-800">Weekly Plan</h3>
                </div>
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-600 mb-3">
                  Select a day to view your personalized skin-healthy meals for each day of the week.
                </p>
                
                <Tabs 
                  defaultValue="Monday" 
                  value={activeDay}
                  onValueChange={setActiveDay}
                  className="w-full"
                >
                  <TabsList className="grid grid-cols-7 w-full mb-2 bg-gray-100 p-1 rounded-xl">
                    {daysOfWeek.map((day, i) => (
                      <TabsTrigger 
                        key={day} 
                        value={day}
                        className="text-xs py-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg"
                      >
                        {dayAbbreviations[i]}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
                
                <div className="mt-2 text-xs font-medium text-emerald-600">
                  {activeDay}
                </div>
              </div>
            </div>
            
            {activeDayMealPlan && (
              <>
                {/* Breakfast */}
                {renderMealCard(
                  "Breakfast", 
                  activeDayMealPlan.breakfast, 
                  <Coffee className="h-4 w-4 text-amber-600" />,
                  "bg-gradient-to-r from-amber-50 to-orange-50",
                  "text-amber-800",
                  `${activeDay}-breakfast`
                )}
                
                {/* Lunch */}
                {renderMealCard(
                  "Lunch", 
                  activeDayMealPlan.lunch, 
                  <Utensils className="h-4 w-4 text-emerald-600" />,
                  "bg-gradient-to-r from-emerald-50 to-teal-50",
                  "text-emerald-800",
                  `${activeDay}-lunch`
                )}
                
                {/* Dinner */}
                {renderMealCard(
                  "Dinner", 
                  activeDayMealPlan.dinner, 
                  <Utensils className="h-4 w-4 text-indigo-600" />,
                  "bg-gradient-to-r from-indigo-50 to-purple-50",
                  "text-indigo-800",
                  `${activeDay}-dinner`
                )}
                
                {/* Drinks Section */}
                <Card className="overflow-hidden border border-gray-100">
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <CupSoda className="h-4 w-4 text-blue-600" />
                      <h3 className="font-medium text-blue-800">Hydrating Drinks</h3>
                    </div>
                  </div>
                  <div className="p-4 space-y-4">
                    {activeDayMealPlan.drinks.map((drink, index) => {
                      const cardId = `${activeDay}-drink-${index}`;
                      const isExpanded = expandedCards[cardId] || false;
                      
                      return (
                        <Card key={index} className="overflow-hidden border border-gray-100">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <CupSoda size={18} className="text-blue-500" />
                              <h4 className="font-semibold text-gray-800">{drink.title}</h4>
                            </div>
                            
                            <p className="text-sm text-gray-600">{drink.description}</p>
                            
                            <div className="mt-3">
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                Hydrating
                              </Badge>
                            </div>
                            
                            <div className="mt-3 text-xs text-gray-700 italic">
                              {drink.skinBenefits}
                            </div>
                            
                            {/* Detailed benefits button */}
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => toggleDetailedBenefits(cardId)}
                              className="mt-3 text-blue-600 hover:text-blue-800 p-0 h-auto flex items-center gap-1"
                            >
                              <span>Detailed Skin Benefits</span>
                              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </Button>
                            
                            {/* Detailed benefits content */}
                            {isExpanded && drink.detailedSkinBenefits && (
                              <div className="mt-3 bg-blue-50 p-3 rounded-md">
                                <h5 className="font-medium text-sm text-blue-800 mb-2">Detailed Skin Benefits</h5>
                                <ul className="text-xs text-gray-700 space-y-2">
                                  {drink.detailedSkinBenefits.map((benefit, i) => (
                                    <li key={i} className="flex gap-2">
                                      <div className="min-w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5"></div>
                                      <span>{benefit}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </Card>
                
                {/* Snacks */}
                <Card className="overflow-hidden border border-gray-100">
                  <div className="bg-gradient-to-r from-rose-50 to-pink-50 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Apple className="h-4 w-4 text-rose-600" />
                      <h3 className="font-medium text-rose-800">Snacks</h3>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <ul className="space-y-2">
                      {activeDayMealPlan.snacks.map((snack: string, index: number) => (
                        <li key={index} className="text-sm flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-gray-400"></div>
                          {snack}
                        </li>
                      ))}
                    </ul>
                    
                    {/* Added Detailed Skin Benefits for Snacks */}
                    <div className="mt-3">
                      <Badge variant="outline" className="bg-rose-50 text-rose-700 border-rose-200">
                        Skin-Friendly
                      </Badge>
                    </div>
                    
                    <div className="mt-3 text-xs text-gray-700 italic">
                      Healthy snacks provide essential nutrients for skin throughout the day
                    </div>
                    
                    {/* Detailed benefits button */}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => toggleDetailedBenefits(`${activeDay}-snacks`)}
                      className="mt-3 text-rose-600 hover:text-rose-800 p-0 h-auto flex items-center gap-1"
                    >
                      <span>Detailed Skin Benefits</span>
                      {expandedCards[`${activeDay}-snacks`] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </Button>
                    
                    {/* Detailed benefits content */}
                    {expandedCards[`${activeDay}-snacks`] && activeDayMealPlan.snackBenefits && (
                      <div className="mt-3 bg-rose-50 p-3 rounded-md">
                        <h5 className="font-medium text-sm text-rose-800 mb-2">Detailed Skin Benefits</h5>
                        <ul className="text-xs text-gray-700 space-y-2">
                          {activeDayMealPlan.snackBenefits.map((benefit, i) => (
                            <li key={i} className="flex gap-2">
                              <div className="min-w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5"></div>
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                {/* Expected Results - Only showing when meal plan is generated */}
                <Card className="overflow-hidden border border-gray-100">
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-emerald-600" />
                      <h3 className="font-medium text-emerald-800">Expected Results</h3>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-medium">Consistency is key</h4>
                      <div className="bg-emerald-100 text-emerald-800 py-1 px-3 rounded-full text-xs font-medium">
                        ~85% Improvement
                      </div>
                    </div>
                    <p className="text-xs text-gray-600">
                      Following this personalized meal plan consistently may result in approximately 
                      85% improvement in your skin health metrics over time. Results may vary based on 
                      individual factors, consistency, and other lifestyle elements.
                    </p>
                  </CardContent>
                </Card>
                
                {/* Get Grocery List Button */}
                <Button 
                  onClick={generateGroceryList}
                  disabled={isGeneratingGroceryList}
                  className="w-full relative bg-amber-500 hover:bg-amber-600 text-white shadow-md hover:shadow-lg transition-all rounded-md"
                >
                  {isGeneratingGroceryList ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating Grocery List...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Get Grocery List
                    </>
                  )}
                </Button>
                
                {/* Grocery List Section - Show when generated */}
                {groceryList && (
                  <Card className="overflow-hidden border border-gray-100">
                    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 px-4 py-3">
                      <div className="flex items-center gap-2">
                        <ShoppingCart className="h-4 w-4 text-amber-600" />
                        <h3 className="font-medium text-amber-800">Weekly Grocery List</h3>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <p className="text-xs text-gray-600 mb-4">
                        Here's a complete grocery list for your weekly meal plan. Adjust quantities based on your household size.
                      </p>
                      
                      <div className="space-y-4">
                        {groceryList.map((category, index) => (
                          <div key={index}>
                            <h4 className="text-sm font-medium text-gray-800 mb-2">{category.category}</h4>
                            <ul className="grid grid-cols-2 gap-2">
                              {category.items.map((item, itemIndex) => (
                                <li key={itemIndex} className="text-xs text-gray-600 flex items-center gap-1.5">
                                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400"></div>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <p className="text-xs text-gray-500 italic">
                    This meal plan is personalized based on your skin needs. Consistency is key for seeing results in your skin health.
                  </p>
                </div>
                
                {/* Now showing DisclaimerChatBox only after meal plan is generated */}
                <DisclaimerChatBox />
                
                <div className="pt-3">
                  <Button 
                    onClick={() => {
                      setMealPlan(null);
                      setGroceryList(null);
                    }}
                    variant="outline"
                    className="w-full border-gray-200"
                  >
                    Generate New Plan
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FYPMealPlan;
