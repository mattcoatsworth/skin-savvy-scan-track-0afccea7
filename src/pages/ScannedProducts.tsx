
import React from "react";
import { productItems } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Screen from "@/components/Screen";

const ScannedProducts = () => {
  return (
    <Screen
      title="Scanned Products"
      showBack={true}
    >
      <div className="space-y-3">
        {productItems.map((product) => (
          <ProductCard key={product.id} product={product} type="skincare" />
        ))}
      </div>
    </Screen>
  );
};

export default ScannedProducts;
