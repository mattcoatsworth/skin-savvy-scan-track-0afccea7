
import React from "react";
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
      </div>
    </header>
  );
};

export default ProductHeader;
