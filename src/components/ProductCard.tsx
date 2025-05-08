
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

export interface Product {
  id: string;
  name: string;
  brand: string;
  rating: number;
  impact: "Positive" | "Neutral" | "Negative";
  description: string;
  image?: string;
  benefits?: string[];
  concerns?: string[];
}

interface ProductCardProps {
  product: Product;
  type: "food" | "skincare";
}

const ProductCard = ({ product, type }: ProductCardProps) => {
  // Determine label based on rating
  const getRatingLabel = (rating: number) => {
    if (rating >= 70) return "Good";
    if (rating >= 40) return "Neutral";
    return "Poor";
  };
  
  // Determine progress color based on rating
  const getProgressColor = (rating: number) => {
    if (rating >= 70) return "#4ADE80";
    if (rating >= 40) return "#FACC15";
    return "#F87171";
  };

  // Get the lighter background color for the circle
  const getBackgroundColor = (rating: number) => {
    if (rating >= 70) return "#E6F8EA";
    if (rating >= 40) return "#FEF7CD";
    return "#FFDEE2";
  };

  return (
    <Link to={`/product/${type}/${product.id}`} className="block">
      <Card className="mb-4 hover:shadow-md transition-shadow ios-card">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center">
            {product.image ? (
              <div className="w-16 h-16 mr-4 rounded-md overflow-hidden bg-slate-100 flex items-center justify-center">
                <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
              </div>
            ) : (
              <div className="w-16 h-16 mr-4 rounded-md bg-slate-100 flex items-center justify-center">
                <span className="text-2xl">{type === "food" ? "🍽️" : "✨"}</span>
              </div>
            )}
            
            <div>
              <h3 className="font-medium text-base">{product.name}</h3>
              <p className="text-sm text-muted-foreground">{product.brand}</p>
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="relative h-14 w-14">
              <svg className="w-14 h-14" viewBox="0 0 36 36">
                {/* Light colored background circle */}
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke={getBackgroundColor(product.rating)}
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                
                {/* Foreground progress circle */}
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke={getProgressColor(product.rating)}
                  strokeWidth="4"
                  strokeDasharray={`${product.rating}, 100`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="font-semibold text-base">{product.rating}</div>
                <div className="text-xs text-muted-foreground">{getRatingLabel(product.rating)}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
