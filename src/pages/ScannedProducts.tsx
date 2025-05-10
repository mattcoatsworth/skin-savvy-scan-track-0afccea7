
import React from "react";
import { productItems } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import BackButton from "@/components/BackButton";
import { useScrollToTop } from "@/hooks/useScrollToTop";

const ScannedProducts = () => {
  // Add scroll to top functionality
  useScrollToTop();
  
  return (
    <div className="pb-24">
      <header className="mb-6 flex items-center">
        <BackButton />
        <h1 className="text-2xl font-bold">Scanned Products</h1>
      </header>
      
      <div className="space-y-3">
        {productItems.map((product) => (
          <ProductCard key={product.id} product={product} type="skincare" />
        ))}
      </div>
    </div>
  );
};

export default ScannedProducts;
