
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import InsightsTrends from "@/components/InsightsTrends";
import { Link } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import { foodItems, productItems } from "@/data/products";
import BackButton from "@/components/BackButton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

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

// Mock products used data
const productsUsedFoodItems = [
  { 
    id: "avocado", 
    name: "Avocado", 
    brand: "Fresh Foods",
    rating: 91, 
    impact: "Positive" as const, 
    description: "Rich in healthy fats that improve skin elasticity"
  },
  { 
    id: "almonds", 
    name: "Almonds", 
    brand: "Nutty Farms",
    rating: 85, 
    impact: "Positive" as const, 
    description: "Contains vitamin E for skin repair"
  }
];

const productsUsedItems = [
  { 
    id: "moisturizer", 
    name: "Daily Moisturizer", 
    brand: "CeraVe",
    rating: 90, 
    impact: "Positive" as const, 
    description: "Provides 24-hour hydration and strengthens skin barrier"
  },
  { 
    id: "sunscreen", 
    name: "SPF 50 Sunscreen", 
    brand: "La Roche-Posay",
    rating: 94, 
    impact: "Positive" as const, 
    description: "Broad spectrum protection against UV damage"
  }
];

const Insights = () => {
  const [activeTab, setActiveTab] = useState("used");
  
  return (
    <div className="pb-24">
      <header className="mb-6 flex items-center">
        <BackButton />
        <h1 className="text-2xl font-bold">Products</h1>
      </header>
      
      <InsightsTrends insights={insightData} className="mb-6" />
      
      <Tabs defaultValue="used" className="mb-6" onValueChange={setActiveTab}>
        <TabsList className="w-full grid grid-cols-3 mb-4">
          <TabsTrigger value="used" className="px-4 py-2.5 text-base">Products Used</TabsTrigger>
          <TabsTrigger value="scanned" className="px-4 py-2.5 text-base">Scanned Products</TabsTrigger>
          <TabsTrigger value="trending" className="px-4 py-2.5 text-base">Trending</TabsTrigger>
        </TabsList>
        
        {/* Products Used content */}
        <TabsContent value="used">
          {/* Food impacts section */}
          <div className="ios-section mb-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold">Food Impacts</h2>
              <Link to="/used-foods" className="text-sm text-skin-teal flex items-center">
                View all <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="space-y-3">
              {productsUsedFoodItems.map((food) => (
                <ProductCard key={food.id} product={food} type="food" />
              ))}
            </div>
          </div>
          
          {/* Products impact section */}
          <div className="ios-section mb-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold">Product Effects</h2>
              <Link to="/used-products" className="text-sm text-skin-teal flex items-center">
                View all <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="space-y-3">
              {productsUsedItems.map((product) => (
                <ProductCard key={product.id} product={product} type="skincare" />
              ))}
            </div>
          </div>
        </TabsContent>
        
        {/* Scanned products content */}
        <TabsContent value="scanned">
          {/* Food impacts section */}
          <div className="ios-section mb-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold">Food Impacts</h2>
              <Link to="/scanned-foods" className="text-sm text-skin-teal flex items-center">
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
              <Link to="/scanned-products" className="text-sm text-skin-teal flex items-center">
                View all <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="space-y-3">
              {productItems.slice(0, 3).map((product) => (
                <ProductCard key={product.id} product={product} type="skincare" />
              ))}
            </div>
          </div>
        </TabsContent>
        
        {/* Trending products content */}
        <TabsContent value="trending">
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Insights;
