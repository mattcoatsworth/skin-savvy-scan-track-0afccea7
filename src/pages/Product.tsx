
import React from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import BackButton from "@/components/BackButton";

const Product = () => {
  const { productType, productId } = useParams();
  
  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <header className="flex items-center mb-6">
        <BackButton />
        <h1 className="text-2xl font-bold">Product Details</h1>
      </header>
      
      <Card>
        <CardContent className="p-6">
          <p>Product type: {productType}</p>
          <p>Product ID: {productId}</p>
          <p className="text-sm text-gray-500 mt-4">
            This is a placeholder for the Product page.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Product;
