
import React, { useState } from "react";
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

// Mock trending product data
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
  }
];

const trendingProductItems = [
  { 
    id: "niacinamide", 
    name: "Niacinamide Serum", 
    brand: "The Ordinary",
    rating: 87, 
    impact: "Positive" as const, 
    description: "Reduces pore appearance and improves texture"
  },
  { 
    id: "ceramide", 
    name: "Ceramide Moisturizer", 
    brand: "CeraVe",
    rating: 89, 
    impact: "Positive" as const, 
    description: "Strengthens skin barrier and improves hydration"
  }
];

const Insights = () => {
  const [activeTab, setActiveTab] = useState("scanned");
  
  return (
    <div className="pb-24">
      <header className="mb-6 flex items-center">
        <BackButton />
        <h1 className="text-2xl font-bold">Products</h1>
      </header>
      
      <InsightsTrends insights={insightData} className="mb-6" />
      
      {/* Tab navigation */}
      <div className="flex rounded-lg overflow-hidden border mb-6 shadow-sm">
        <button 
          className={`flex-1 py-3 text-center font-medium ${activeTab === "scanned" 
            ? "bg-white text-skin-black" 
            : "bg-gray-50 text-gray-500"}`}
          onClick={() => setActiveTab("scanned")}
        >
          Scanned Products
        </button>
        <button 
          className={`flex-1 py-3 text-center font-medium ${activeTab === "trending" 
            ? "bg-white text-skin-black" 
            : "bg-gray-50 text-gray-500"}`}
          onClick={() => setActiveTab("trending")}
        >
          Trending
        </button>
      </div>
      
      {/* Scanned products content */}
      {activeTab === "scanned" && (
        <>
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
      )}
      
      {/* Trending products content */}
      {activeTab === "trending" && (
        <>
          {/* Trending Food impacts section */}
          <div className="ios-section mb-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold">Food Impacts</h2>
              <Link to="/trending-foods" className="text-sm text-skin-teal flex items-center">
                View all <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="space-y-3">
              {trendingFoodItems.map((food) => (
                <ProductCard key={food.id} product={food} type="food" />
              ))}
            </div>
          </div>
          
          {/* Trending Products impact section */}
          <div className="ios-section mb-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold">Product Effects</h2>
              <Link to="/trending-products" className="text-sm text-skin-teal flex items-center">
                View all <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="space-y-3">
              {trendingProductItems.map((product) => (
                <ProductCard key={product.id} product={product} type="skincare" />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Insights;
