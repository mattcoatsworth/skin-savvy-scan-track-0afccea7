
import React from "react";

interface ProductBenefitsListProps {
  benefits: string[];
  iconColor?: string;
}

const ProductBenefitsList: React.FC<ProductBenefitsListProps> = ({ 
  benefits,
  iconColor = "text-green-500"
}) => {
  return (
    <div className="space-y-2">
      {benefits.map((benefit, index) => (
        <div key={index} className="flex">
          <div className={`mr-2 ${iconColor}`}>✓</div>
          <p className="text-sm">{benefit}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductBenefitsList;
