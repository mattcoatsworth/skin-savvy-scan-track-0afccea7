
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { foodItems, productItems } from "@/data/products";
import BackButton from "@/components/BackButton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ScanButton from "@/components/ScanButton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { ProductViewType } from "./types";

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

const ProductsPage = () => {
  // Add scroll to top functionality
  useScrollToTop();
  
  const [activeTab, setActiveTab] = useState<ProductViewType>("used");
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6 flex items-center">
          <BackButton />
          <div>
            <h1 className="text-2xl font-bold">Products</h1>
            <p className="text-muted-foreground">Track products affecting your skin</p>
          </div>
        </header>
        
        <div className="mb-4 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Search products..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white"
          />
        </div>
        
        <ScanButton className="mb-4" />
        
        <Tabs defaultValue="used" className="w-full" onValueChange={(value) => setActiveTab(value as ProductViewType)}>
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="used" className="text-base">My Products</TabsTrigger>
            <TabsTrigger value="scanned" className="text-base">Scanned</TabsTrigger>
            <TabsTrigger value="trending" className="text-base">Trending</TabsTrigger>
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
                {productsUsedFoodItems
                  .filter(food => searchTerm ? food.name.toLowerCase().includes(searchTerm.toLowerCase()) : true)
                  .map((food) => (
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
                {productsUsedItems
                  .filter(product => searchTerm ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) : true)
                  .map((product) => (
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
                {foodItems
                  .filter(food => searchTerm ? food.name.toLowerCase().includes(searchTerm.toLowerCase()) : true)
                  .slice(0, 3)
                  .map((food) => (
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
                {productItems
                  .filter(product => searchTerm ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) : true)
                  .slice(0, 3)
                  .map((product) => (
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
                {trendingFoodItems
                  .filter(food => searchTerm ? food.name.toLowerCase().includes(searchTerm.toLowerCase()) : true)
                  .map((food) => (
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
                {trendingProductItems
                  .filter(product => searchTerm ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) : true)
                  .map((product) => (
                    <ProductCard key={product.id} product={product} type="skincare" />
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductsPage;
