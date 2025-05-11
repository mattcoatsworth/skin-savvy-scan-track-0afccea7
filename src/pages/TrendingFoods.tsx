
import React, { useEffect, useState } from "react";
import BackButton from "@/components/BackButton";
import ProductCard from "@/components/ProductCard";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { supabase } from "@/integrations/supabase/client";
import { Loader } from "lucide-react";

// Mock trending food data as fallback
const trendingFoodItems = [
  { 
    id: "green-tea", 
    name: "Green Tea", 
    brand: "Organic Teas",
    rating: 88, 
    impact: "Positive" as const, 
    description: "Antioxidants help reduce inflammation"
  },
  { 
    id: "berries", 
    name: "Mixed Berries", 
    brand: "Berry Farms",
    rating: 92, 
    impact: "Positive" as const, 
    description: "Rich in vitamins and antioxidants"
  },
  { 
    id: "avocado", 
    name: "Avocado", 
    brand: "Fresh Produce",
    rating: 85, 
    impact: "Positive" as const, 
    description: "Healthy fats support skin barrier"
  },
  { 
    id: "salmon", 
    name: "Wild Salmon", 
    brand: "Ocean Fresh",
    rating: 90, 
    impact: "Positive" as const, 
    description: "Omega-3s reduce inflammation"
  },
  { 
    id: "nuts", 
    name: "Mixed Nuts", 
    brand: "Nature's Best",
    rating: 87, 
    impact: "Positive" as const, 
    description: "Vitamin E protects from oxidative damage"
  }
];

const TrendingFoods = () => {
  // Add scroll to top functionality
  useScrollToTop();
  
  const [foods, setFoods] = useState(trendingFoodItems);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchPersonalizedFoods = async () => {
      try {
        setLoading(true);
        
        // Check if user is authenticated
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          // Fetch user insights for foods
          const { data: insights, error } = await supabase
            .from('user_insights')
            .select('*')
            .eq('user_id', session.user.id)
            .eq('insight_type', 'food')
            .is('is_active', true)
            .order('confidence_level', { ascending: false })
            .limit(5);
          
          if (error) {
            console.error('Error fetching food insights:', error);
            return;
          }
          
          // If we have personalized insights, use them
          if (insights && insights.length > 0) {
            const personalizedFoods = insights.map(insight => ({
              id: insight.related_food_id || 'unknown',
              name: insight.related_food_id || 'Personalized Food',
              brand: 'Recommended for You',
              rating: insight.confidence_level || 80,
              impact: "Positive" as const,
              description: insight.insight_text
            }));
            
            // If we don't have enough personalized foods, mix with trending
            if (personalizedFoods.length < 5) {
              setFoods([
                ...personalizedFoods,
                ...trendingFoodItems.slice(0, 5 - personalizedFoods.length)
              ]);
            } else {
              setFoods(personalizedFoods);
            }
          }
        }
      } catch (err) {
        console.error('Error fetching personalized foods:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPersonalizedFoods();
  }, []);
  
  return (
    <div className="pb-24">
      <header className="mb-6 flex items-center">
        <BackButton />
        <h1 className="text-2xl font-bold">Trending Foods</h1>
      </header>
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      ) : (
        <div className="space-y-3">
          {foods.map((food) => (
            <ProductCard key={food.id} product={food} type="food" />
          ))}
        </div>
      )}
    </div>
  );
};

export default TrendingFoods;
