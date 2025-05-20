
import React, { useState } from "react";
import BackButton from "@/components/BackButton";
import ProductCard from "./ProductCard";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { filterProductsBySearch } from "./utils";

// Mock trending product data
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
  },
  { 
    id: "retinol", 
    name: "Retinol Treatment", 
    brand: "Paula's Choice",
    rating: 91, 
    impact: "Positive" as const, 
    description: "Promotes cell turnover and reduces fine lines"
  },
  { 
    id: "vitamin-c", 
    name: "Vitamin C Serum", 
    brand: "SkinCeuticals",
    rating: 93, 
    impact: "Positive" as const, 
    description: "Brightens and protects from free radicals"
  },
  { 
    id: "hyaluronic", 
    name: "Hyaluronic Acid", 
    brand: "La Roche-Posay",
    rating: 88, 
    impact: "Positive" as const, 
    description: "Deep hydration and plumping effect"
  }
];

const TrendingProducts = () => {
  // Add scroll to top functionality
  useScrollToTop();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Filter products by search term
  const filteredProducts = filterProductsBySearch(trendingProductItems, searchTerm);
  
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6 flex items-center">
          <BackButton />
          <div>
            <h1 className="text-2xl font-bold">Trending Products</h1>
            <p className="text-muted-foreground">Popular skincare products</p>
          </div>
        </header>
        
        <div className="mb-4 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Search trending products..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white"
          />
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="flex space-x-2">
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '600ms' }}></div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} type="skincare" />
              ))
            ) : (
              <div className="text-center py-10 text-muted-foreground">
                No trending products found matching your search.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendingProducts;
