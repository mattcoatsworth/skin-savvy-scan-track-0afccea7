
import React from "react";
import BackButton from "@/components/BackButton";
import ProductCard from "@/components/ProductCard";
import { useScrollToTop } from "@/hooks/useScrollToTop";

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
  
  return (
    <div className="pb-24">
      <header className="mb-6 flex items-center">
        <BackButton />
        <h1 className="text-2xl font-bold">Trending Products</h1>
      </header>
      
      <div className="space-y-3">
        {trendingProductItems.map((product) => (
          <ProductCard key={product.id} product={product} type="skincare" />
        ))}
      </div>
    </div>
  );
};

export default TrendingProducts;
