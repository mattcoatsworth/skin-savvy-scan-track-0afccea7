
import React from "react";
import { Badge } from "@/components/ui/badge";
import BackButton from "@/components/BackButton";

interface ProductHeaderProps {
  productName: string;
}

const ProductHeader = ({ productName }: ProductHeaderProps) => {
  return (
    <header className="mb-6 flex items-center">
      <BackButton />
      <div>
        <h1 className="text-2xl font-bold">{productName}</h1>
        <Badge variant="outline" className="mt-1">AI Generated Content</Badge>
      </div>
    </header>
  );
};

export default ProductHeader;
