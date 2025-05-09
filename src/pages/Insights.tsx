
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import InsightsTrends from "@/components/InsightsTrends";
import { Link } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import { foodItems, productItems } from "@/data/products";
import BackButton from "@/components/BackButton";

// Mock data for insights
const insightData = [
  {
    title: "Hydration Effect",
    description: "Drinking 8+ glasses of water improved skin moisture by 30%",
    iconName: "droplet"
  },
  {
    title: "Vitamin C Serum",
    description: "Regular use has helped with brightening and texture",
    iconName: "star"
  },
  {
    title: "Sleep Quality",
    description: "Nights with 7+ hours sleep show 40% better skin clarity",
    iconName: "activity"
  }
];

const Insights = () => {
  return (
    <>
      <header className="mb-6 flex items-center">
        <BackButton />
        <h1 className="text-2xl font-bold">Products</h1>
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
    </>
  );
};

export default Insights;
