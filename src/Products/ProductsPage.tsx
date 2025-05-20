import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import ProductsAnalysis from './ProductsAnalysis';

interface ProductsPageProps {
  className?: string;
}

const ProductsPage = () => {
  return (
    <div>
      <ProductsAnalysis className="mb-6" />
    </div>
  );
};

export default ProductsPage;
