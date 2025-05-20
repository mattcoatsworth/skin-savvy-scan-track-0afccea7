import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { StyledBadge } from "@/components/ui/styled/Badge";

export interface Product {
  id: string;
  name: string;
  brand?: string;
  imageUrl?: string;
  rating?: number;
  tags?: string[];
}

interface ProductCardProps {
  product: Product;
  onClick?: (product: Product) => void;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onClick,
  className,
}) => {
  const handleProductClick = () => {
    if (onClick) {
      onClick(product);
    }
  };

  return (
    <div className={cn("product-card", className)} onClick={handleProductClick}>
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <div className="bg-slate-50 p-4 flex justify-center">
          <div className="w-20 h-20 relative">
            {/* Product image */}
            <img
              src={product.imageUrl || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-contain"
            />
            
            {/* Rating badge - updated to use StyledBadge */}
            <div className="absolute -bottom-2 -right-2">
              <StyledBadge 
                value={product.rating || 0}
                className="shadow-sm"
              />
            </div>
          </div>
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-medium text-sm line-clamp-1">{product.name}</h3>
          <p className="text-xs text-muted-foreground line-clamp-1">
            {product.brand}
          </p>
          
          {/* Tags - keep these as is */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {product.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-1.5 py-0.5 bg-blue-50 text-blue-800 rounded text-[10px]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductCard;
