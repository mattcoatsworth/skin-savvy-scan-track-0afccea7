
import React from "react";
import AppNavigation from "@/components/AppNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import InsightsTrends from "@/components/InsightsTrends";
import { Link } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import { foodItems, productItems } from "@/data/products";

// Mock data for insights
const insightData = [
  {
    title: "Hydration Effect",
    description: "Drinking 8+ glasses of water improved skin moisture by 30%",
    icon: "💧"
  },
  {
    title: "Vitamin C Serum",
    description: "Regular use has helped with brightening and texture",
    icon: "✨"
  },
  {
    title: "Sleep Quality",
    description: "Nights with 7+ hours sleep show 40% better skin clarity",
    icon: "😴"
  }
];

const Insights = () => {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-center">Scans</h1>
        </header>
        
        <InsightsTrends insights={insightData} className="mb-6" />
        
        {/* Food impacts section */}
        <div className="ios-section mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold">Food Impacts</h2>
            <Link to="/food-impacts" className="text-sm text-skin-teal flex items-center">
              View all <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="space-y-3">
            {foodItems.slice(0, 3).map((food) => (
              <ProductCard key={food.id} product={food} type="food" />
            ))}
          </div>
        </div>
        
        {/* Products impact section */}
        <div className="ios-section mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold">Product Effects</h2>
            <Link to="/product-effects" className="text-sm text-skin-teal flex items-center">
              View all <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="space-y-3">
            {productItems.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} type="skincare" />
            ))}
          </div>
        </div>
      </div>
      
      <AppNavigation />
    </div>
  );
};

export default Insights;
