import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Utensils, X, Search, MessageSquare, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import TestAIChatBox from './TestAIChatBox';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { MealPlanType } from './types';

/**
 * FYP Meal Plan component
 * Shows personalized meal plans optimized for skin health
 */
const FYPMealPlan: React.FC = () => {
  const navigate = useNavigate();
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [newPreference, setNewPreference] = useState<string>('');
  const [avoidItem, setAvoidItem] = useState<string>('');
  const [preferences, setPreferences] = useState<string[]>([]);
  const [avoidances, setAvoidances] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [mealPlan, setMealPlan] = useState<MealPlanType | null>(null);

  // Sample meal plan data (in a real app, this would come from an API)
  const sampleMealPlans: MealPlanType[] = [
    {
      breakfast: "Spinach and avocado smoothie with chia seeds",
      lunch: "Grilled salmon with quinoa and steamed broccoli",
      dinner: "Lentil soup with sweet potatoes and turmeric",
      snacks: ["Greek yogurt with berries", "Handful of almonds"],
      hydration: "Lemon water and green tea throughout the day"
    },
    {
      breakfast: "Overnight oats with blueberries and flaxseeds",
      lunch: "Mediterranean salad with olive oil and chickpeas",
      dinner: "Baked cod with roasted vegetables and brown rice",
      snacks: ["Carrot sticks with hummus", "Apple with almond butter"],
      hydration: "Cucumber infused water, 2-3 liters"
    },
    {
      breakfast: "Scrambled eggs with spinach and whole grain toast",
      lunch: "Turkey and avocado wrap with leafy greens",
      dinner: "Stir-fried vegetables with tofu and brown rice",
      snacks: ["Mixed nuts", "Kiwi fruit"],
      hydration: "Herbal teas and filtered water, 2-3 liters"
    },
    {
      breakfast: "Greek yogurt with honey, walnuts and berries",
      lunch: "Quinoa bowl with roasted vegetables and feta",
      dinner: "Grilled chicken with sweet potato and green beans",
      snacks: ["Pear slices", "Sunflower seeds"],
      hydration: "Hibiscus tea and water, 2-3 liters"
    },
    {
      breakfast: "Avocado toast on whole grain bread with poached egg",
      lunch: "Lentil salad with bell peppers and olive oil dressing",
      dinner: "Baked salmon with quinoa and asparagus",
      snacks: ["Cucumber slices with tzatziki", "Orange slices"],
      hydration: "Green tea and filtered water, 2-3 liters"
    },
    {
      breakfast: "Smoothie bowl with berries, banana and hemp seeds",
      lunch: "Grilled vegetable and hummus sandwich",
      dinner: "Bean and vegetable soup with a side salad",
      snacks: ["Rice cakes with almond butter", "Grapes"],
      hydration: "Coconut water and herbal tea, 2-3 liters"
    },
    {
      breakfast: "Whole grain cereal with almond milk and sliced banana",
      lunch: "Tuna salad with mixed greens and olive oil dressing",
      dinner: "Vegetable curry with brown rice",
      snacks: ["Edamame", "Peach"],
      hydration: "Chamomile tea and filtered water, 2-3 liters"
    }
  ];

  // Add a preference
  const addPreference = () => {
    if (newPreference.trim() && !preferences.includes(newPreference.trim())) {
      setPreferences([...preferences, newPreference.trim()]);
      setNewPreference('');
      toast.success("Food preference added");
    }
  };
  
  // Add an avoidance
  const addAvoidance = () => {
    if (avoidItem.trim() && !avoidances.includes(avoidItem.trim())) {
      setAvoidances([...avoidances, avoidItem.trim()]);
      setAvoidItem('');
      toast.success("Food avoidance added");
    }
  };

  // Remove a preference
  const removePreference = (item: string) => {
    setPreferences(preferences.filter(p => p !== item));
  };
  
  // Remove an avoidance
  const removeAvoidance = (item: string) => {
    setAvoidances(avoidances.filter(a => a !== item));
  };

  // Generate meal plan
  const generateMealPlan = () => {
    setIsGenerating(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      // In a real app, this would be an API call that considers preferences and avoidances
      setMealPlan(sampleMealPlans[selectedDay]);
      setIsGenerating(false);
      
      toast.success("Your skin-healthy meal plan is ready!");
    }, 1500);
  };

  // View recipe details (in a real app, this would navigate to a detailed recipe page)
  const viewRecipe = (mealType: string) => {
    toast.info(`Viewing ${mealType} recipe...`);
    // Example navigation to a recipe detail page
    navigate(`/recipe-ideas/${days[selectedDay].toLowerCase()}/${mealType.toLowerCase()}`);
  };

  // Generate grocery list
  const generateGroceryList = () => {
    toast({
      title: "Generating grocery list",
      description: "Your weekly grocery list is being prepared",
    });
    
    // This would link to a grocery list page in a real app
    navigate("/grocery-list");
  };

  return (
    <div className="space-y-6">
      {/* Day selector */}
      <Card className="border border-gray-100">
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-5 w-5 text-teal-500" />
            <h3 className="text-base font-medium">Weekly Meal Plan</h3>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {days.map((day, index) => (
              <Button
                key={day}
                variant={selectedDay === index ? "default" : "outline"}
                className={`flex-shrink-0 px-3 ${
                  selectedDay === index
                    ? "bg-teal-500 hover:bg-teal-600 text-white"
                    : "border-gray-200 text-gray-700"
                }`}
                onClick={() => setSelectedDay(index)}
              >
                {day}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Food preferences */}
      <Card className="border border-gray-100">
        <CardContent className="p-5">
          <h3 className="text-base font-medium mb-4">Food Preferences</h3>
          
          <div className="space-y-4">
            {/* Include these foods */}
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Include these foods</label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newPreference}
                  onChange={(e) => setNewPreference(e.target.value)}
                  placeholder="Add foods you prefer..."
                  className="flex-1"
                />
                <Button 
                  variant="outline"
                  onClick={addPreference}
                  className="border-teal-100 bg-teal-50 text-teal-600 hover:bg-teal-100"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-2">
                {preferences.map((item) => (
                  <div 
                    key={item} 
                    className="bg-teal-50 text-teal-700 text-sm px-3 py-1 rounded-full flex items-center"
                  >
                    {item}
                    <button 
                      onClick={() => removePreference(item)}
                      className="ml-2 text-teal-500 hover:text-teal-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Foods to avoid */}
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Foods to avoid</label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={avoidItem}
                  onChange={(e) => setAvoidItem(e.target.value)}
                  placeholder="Add foods to avoid..."
                  className="flex-1"
                />
                <Button 
                  variant="outline"
                  onClick={addAvoidance}
                  className="border-red-100 bg-red-50 text-red-600 hover:bg-red-100"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-2">
                {avoidances.map((item) => (
                  <div 
                    key={item} 
                    className="bg-red-50 text-red-700 text-sm px-3 py-1 rounded-full flex items-center"
                  >
                    {item}
                    <button 
                      onClick={() => removeAvoidance(item)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Button
            className="w-full mt-4 bg-teal-500 hover:bg-teal-600 text-white"
            onClick={generateMealPlan}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <span className="animate-spin mr-2">⏳</span> Generating...
              </>
            ) : mealPlan ? (
              "Regenerate Skin-Healthy Meal Plan"
            ) : (
              "Generate Skin-Healthy Meal Plan"
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Generated meal plan */}
      {mealPlan && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold pl-1 flex items-center gap-2">
            <Utensils className="h-5 w-5 text-teal-500" />
            <span>{days[selectedDay]}'s Meals</span>
          </h3>

          {/* Breakfast card */}
          <Card className="border-l-4 border-l-teal-400 shadow-sm">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">Breakfast</h4>
                  <p className="text-sm text-gray-600 mt-1">{mealPlan.breakfast}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-teal-100 hover:bg-teal-50 text-teal-600"
                  onClick={() => viewRecipe("Breakfast")}
                >
                  <Search className="h-3.5 w-3.5 mr-1" />
                  View Recipe
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Lunch card */}
          <Card className="border-l-4 border-l-amber-400 shadow-sm">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">Lunch</h4>
                  <p className="text-sm text-gray-600 mt-1">{mealPlan.lunch}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-amber-100 hover:bg-amber-50 text-amber-600"
                  onClick={() => viewRecipe("Lunch")}
                >
                  <Search className="h-3.5 w-3.5 mr-1" />
                  View Recipe
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Dinner card */}
          <Card className="border-l-4 border-l-purple-400 shadow-sm">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">Dinner</h4>
                  <p className="text-sm text-gray-600 mt-1">{mealPlan.dinner}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-purple-100 hover:bg-purple-50 text-purple-600"
                  onClick={() => viewRecipe("Dinner")}
                >
                  <Search className="h-3.5 w-3.5 mr-1" />
                  View Recipe
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Snacks card - Changed from red to teal color scheme */}
          <Card className="border-l-4 border-l-teal-400 shadow-sm">
            <CardContent className="p-4">
              <h4 className="font-medium">Snacks</h4>
              <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                {mealPlan.snacks.map((snack, index) => (
                  <li key={index}>{snack}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Hydration card */}
          <Card className="border-l-4 border-l-sky-400 shadow-sm">
            <CardContent className="p-4">
              <h4 className="font-medium">Hydration</h4>
              <p className="text-sm text-gray-600 mt-1">{mealPlan.hydration}</p>
            </CardContent>
          </Card>

          {/* Generate grocery list button */}
          <Button
            variant="outline"
            className="w-full mt-2 gap-2 border-teal-200 text-teal-700 hover:bg-teal-50"
            onClick={generateGroceryList}
          >
            <MessageSquare className="h-4 w-4" />
            Generate Grocery List
          </Button>
        </div>
      )}

      {/* AI Chat box */}
      <TestAIChatBox productTitle="Meal Plan" />
    </div>
  );
};

export default FYPMealPlan;
