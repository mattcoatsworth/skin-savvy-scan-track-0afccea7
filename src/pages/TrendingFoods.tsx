
import React from "react";
import BackButton from "@/components/BackButton";
import ProductCard from "@/components/ProductCard";
import { useScrollToTop } from "@/hooks/useScrollToTop";

// Mock trending food data
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
  
  return (
    <div className="pb-24">
      <header className="mb-6 flex items-center">
        <BackButton />
        <h1 className="text-2xl font-bold">Trending Foods</h1>
      </header>
      
      <div className="space-y-3">
        {trendingFoodItems.map((food) => (
          <ProductCard key={food.id} product={food} type="food" />
        ))}
      </div>
    </div>
  );
};

export default TrendingFoods;
