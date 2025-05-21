
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "./types";
import { getRatingColor, getRatingBgColor, getRatingLabel } from "./utils";

interface FoodCardProps {
  food: Product;
  personalizedRating?: number | null;
}

const FoodCard: React.FC<FoodCardProps> = ({ food, personalizedRating = null }) => {
  const location = useLocation();
  
  // Get the rating to display (use personalized if available)
  const displayRating = personalizedRating !== null ? personalizedRating : food.rating;

  return (
    <Link 
      to={`/product/food/${food.id}`} 
      state={{ product: food, type: "food", from: location.pathname, personalizedRating }} 
      className="block"
    >
      <Card className="mb-4 hover:shadow-md transition-shadow ios-card">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center">
            {food.image ? (
              <div className="w-16 h-16 mr-4 rounded-md overflow-hidden bg-slate-100 flex items-center justify-center">
                <img src={food.image} alt={food.name} className="object-cover w-full h-full" />
              </div>
            ) : (
              <div className="w-16 h-16 mr-4 rounded-md bg-slate-100 flex items-center justify-center">
                <span className="text-2xl">🍽️</span>
              </div>
            )}
            
            <div>
              <h3 className="font-medium text-base">{food.name}</h3>
              <p className="text-sm text-muted-foreground">{food.brand}</p>
              <p className="text-xs text-muted-foreground mt-1">{food.description}</p>
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            {/* Updated Rating Circle to match Weekly Skin Report */}
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: getRatingBgColor(displayRating) }}
            >
              <span 
                className="text-lg font-semibold"
                style={{ color: getRatingColor(displayRating) }}
              >
                {displayRating}
              </span>
            </div>
            <span 
              className="text-xs mt-1 font-medium"
              style={{ color: getRatingColor(displayRating) }}
            >
              {personalizedRating !== null ? "For You" : getRatingLabel(displayRating)}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default FoodCard;
