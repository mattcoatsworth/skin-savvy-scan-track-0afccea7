
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import SkinIndexComparison from '@/components/SkinIndexComparison';

interface ProductsAnalysisProps {
  className?: string;
}

const ProductsAnalysis: React.FC<ProductsAnalysisProps> = ({ className }) => {
  return (
    <div className={className}>
      <h2 className="text-xl font-semibold mb-4">Product Impact Analysis</h2>
      <Card className="mb-6">
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground mb-4">
            See how your skin health has changed since incorporating new products into your routine.
          </p>
          <SkinIndexComparison age={25} gender="female" />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductsAnalysis;
