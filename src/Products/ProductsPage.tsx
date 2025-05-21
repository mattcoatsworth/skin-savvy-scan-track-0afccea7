
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import ProductsAnalysis from './ProductsAnalysis';

interface ProductsPageProps {
  className?: string;
}

const ProductsPage = () => {
  return (
    <div className="space-y-6">
      <header className="mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <p className="text-muted-foreground">Track your product usage and analyze their impact</p>
      </header>
      
      {/* Products Analysis Section */}
      <ProductsAnalysis className="mb-6" />
    </div>
  );
};

export default ProductsPage;
