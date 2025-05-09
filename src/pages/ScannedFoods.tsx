
import React from "react";
import { foodItems } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import BackButton from "@/components/BackButton";

const ScannedFoods = () => {
  return (
    <div className="pb-24">
      <header className="mb-6 flex items-center">
        <BackButton />
        <h1 className="text-2xl font-bold">Scanned Foods</h1>
      </header>
      
      <div className="space-y-3">
        {foodItems.map((food) => (
          <ProductCard key={food.id} product={food} type="food" />
        ))}
      </div>
    </div>
  );
};

export default ScannedFoods;
