
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Utensils, Apple, Coffee } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import DisclaimerChatBox from "@/components/MealPlan/DisclaimerChatBox";

const FYPMealPlan = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [mealPlan, setMealPlan] = useState<any>(null);
  const { toast } = useToast();

  // Function to generate a meal plan
  const generateMealPlan = () => {
    setIsGenerating(true);
    
    // Simulating API call delay
    setTimeout(() => {
      // Sample meal plan data
      const sampleMealPlan = {
        breakfast: {
          title: "Antioxidant Breakfast Bowl",
          description: "Greek yogurt with fresh berries, honey, and chia seeds",
          benefits: ["Rich in probiotics", "Antioxidant-rich berries", "Omega-3 from chia"],
          skinBenefits: "Supports gut health which reduces inflammation in skin"
        },
        lunch: {
          title: "Mediterranean Quinoa Bowl",
          description: "Quinoa with cucumber, tomatoes, olives, feta and lemon-olive oil dressing",
          benefits: ["Balanced protein", "Healthy fats", "Anti-inflammatory"],
          skinBenefits: "Olive oil provides essential fatty acids for skin barrier"
        },
        dinner: {
          title: "Baked Salmon with Roasted Vegetables",
          description: "Wild-caught salmon with roasted sweet potatoes, broccoli and garlic",
          benefits: ["Omega-3 rich", "Vitamin A from sweet potatoes", "Sulfur compounds from garlic"],
          skinBenefits: "Omega-3s help reduce acne and provide deep hydration"
        },
        snacks: ["Green tea with lemon", "Handful of walnuts", "Sliced cucumber with hummus"]
      };
      
      setMealPlan(sampleMealPlan);
      setIsGenerating(false);
      
      toast({
        title: "Meal Plan Generated",
        description: "Your personalized skin-health meal plan is ready",
      });
    }, 2500);
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
            
            <DisclaimerChatBox className="mt-6" />
          </div>
        ) : (
          <div className="space-y-6 pt-2">
            {/* Breakfast */}
            <Card className="overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-4 py-3">
                <div className="flex items-center gap-2">
                  <Coffee className="h-4 w-4 text-amber-600" />
                  <h3 className="font-medium text-amber-800">Breakfast</h3>
                </div>
              </div>
              <CardContent className="p-4">
                <h4 className="font-semibold text-gray-800">{mealPlan.breakfast.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{mealPlan.breakfast.description}</p>
                
                <div className="mt-3">
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                    Skin-Healthy
                  </Badge>
                </div>
                
                <div className="mt-3 text-xs text-gray-700 italic">
                  {mealPlan.breakfast.skinBenefits}
                </div>
              </CardContent>
            </Card>
            
            {/* Lunch */}
            <Card className="overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-4 py-3">
                <div className="flex items-center gap-2">
                  <Utensils className="h-4 w-4 text-emerald-600" />
                  <h3 className="font-medium text-emerald-800">Lunch</h3>
                </div>
              </div>
              <CardContent className="p-4">
                <h4 className="font-semibold text-gray-800">{mealPlan.lunch.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{mealPlan.lunch.description}</p>
                
                <div className="mt-3">
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                    Anti-Inflammatory
                  </Badge>
                </div>
                
                <div className="mt-3 text-xs text-gray-700 italic">
                  {mealPlan.lunch.skinBenefits}
                </div>
              </CardContent>
            </Card>
            
            {/* Dinner */}
            <Card className="overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-3">
                <div className="flex items-center gap-2">
                  <Utensils className="h-4 w-4 text-indigo-600" />
                  <h3 className="font-medium text-indigo-800">Dinner</h3>
                </div>
              </div>
              <CardContent className="p-4">
                <h4 className="font-semibold text-gray-800">{mealPlan.dinner.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{mealPlan.dinner.description}</p>
                
                <div className="mt-3">
                  <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                    Omega-3 Rich
                  </Badge>
                </div>
                
                <div className="mt-3 text-xs text-gray-700 italic">
                  {mealPlan.dinner.skinBenefits}
                </div>
              </CardContent>
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
