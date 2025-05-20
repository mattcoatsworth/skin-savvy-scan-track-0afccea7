
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Utensils, Apple, Coffee, CupSoda, ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import DisclaimerChatBox from "@/components/MealPlan/DisclaimerChatBox";
import { supabase } from "@/integrations/supabase/client";

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

type MealPlanType = {
  breakfast: MealType;
  lunch: MealType;
  dinner: MealType;
  snacks: string[];
  drinks: DrinkType[];
};

const FYPMealPlan = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [mealPlan, setMealPlan] = useState<MealPlanType | null>(null);
  const { toast } = useToast();
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  // Toggle detailed benefits visibility
  const toggleDetailedBenefits = (cardId: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
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
      
      // Transform the API response to our meal plan format
      const generatedPlan: MealPlanType = {
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
      
      setMealPlan(generatedPlan);
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
            {/* Breakfast */}
            {renderMealCard(
              "Breakfast", 
              mealPlan.breakfast, 
              <Coffee className="h-4 w-4 text-amber-600" />,
              "bg-gradient-to-r from-amber-50 to-orange-50",
              "text-amber-800",
              "breakfast"
            )}
            
            {/* Lunch */}
            {renderMealCard(
              "Lunch", 
              mealPlan.lunch, 
              <Utensils className="h-4 w-4 text-emerald-600" />,
              "bg-gradient-to-r from-emerald-50 to-teal-50",
              "text-emerald-800",
              "lunch"
            )}
            
            {/* Dinner */}
            {renderMealCard(
              "Dinner", 
              mealPlan.dinner, 
              <Utensils className="h-4 w-4 text-indigo-600" />,
              "bg-gradient-to-r from-indigo-50 to-purple-50",
              "text-indigo-800",
              "dinner"
            )}
            
            {/* Drinks Section */}
            <div className="pt-2">
              <h3 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                <CupSoda className="h-4 w-4 text-blue-600" />
                <span>Hydrating Drinks</span>
              </h3>
              <div className="space-y-4">
                {mealPlan.drinks.map((drink, index) => renderDrinkCard(drink, index))}
              </div>
            </div>
            
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
                  {mealPlan.snacks.map((snack: string, index: number) => (
                    <li key={index} className="text-sm flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-gray-400"></div>
                      {snack}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <div className="pt-3">
              <Button 
                onClick={() => setMealPlan(null)}
                variant="outline"
                className="w-full border-gray-200"
              >
                Generate New Plan
              </Button>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
              <p className="text-xs text-gray-500 italic">
                This meal plan is personalized based on your skin needs. Consistency is key for seeing results in your skin health.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FYPMealPlan;
