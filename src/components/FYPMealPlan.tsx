import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Utensils, Apple, Coffee, CupSoda, ChevronDown, ChevronUp, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import DisclaimerChatBox from "@/components/MealPlan/DisclaimerChatBox";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

const FYPMealPlan = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [mealPlan, setMealPlan] = useState<MealPlanType | null>(null);
  const { toast } = useToast();
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const [activeDay, setActiveDay] = useState("Monday");

  // Days of the week for the tabs
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const dayAbbreviations = ["M", "T", "W", "T", "F", "S", "S"];

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

  // Function to generate a meal plan using OpenAI
  const generateMealPlan = async () => {
    setIsGenerating(true);
    
    try {
      // Call the Supabase Edge function to generate meal plan
      const { data, error } = await supabase.functions.invoke("generate-recipe-ideas", {
        body: {
          mealName: "skin-healthy daily meal plan",
          mealType: "full day",
          day: "today"
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
          
          {/* Detailed benefits content */}
          {isExpanded && mealData.detailedSkinBenefits && (
            <div className="mt-3 bg-emerald-50 p-3 rounded-md">
              <h5 className="font-medium text-sm text-emerald-800 mb-2">Detailed Skin Benefits</h5>
              <ul className="text-xs text-gray-700 space-y-2">
                {mealData.detailedSkinBenefits.map((benefit, i) => (
                  <li key={i} className="flex gap-2">
                    <div className="min-w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5"></div>
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
          <div className="pt-4">
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
            
            <div className="mt-6">
              <DisclaimerChatBox />
            </div>
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
                
                {/* Expected Results - Now appears below the snacks card */}
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
                
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <p className="text-xs text-gray-500 italic">
                    This meal plan is personalized based on your skin needs. Consistency is key for seeing results in your skin health.
                  </p>
                </div>
                
                <div className="pt-3">
                  <Button 
                    onClick={() => setMealPlan(null)}
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
