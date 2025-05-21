
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

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

// Get color based on rating
const getRatingColor = (rating: number) => {
  if (rating >= 80) return "#4ADE80"; // Green for good ratings
  if (rating >= 60) return "#22C55E"; // Lower green
  if (rating >= 40) return "#FACC15"; // Yellow for medium ratings
  if (rating >= 20) return "#FB923C"; // Orange for fair
  return "#F87171"; // Red for poor ratings
};

// Get background color for the rating
const getRatingBgColor = (rating: number) => {
  if (rating >= 80) return "#ECFDF5"; // Light green bg
  if (rating >= 60) return "#F0FDF4"; // Lower light green bg
  if (rating >= 40) return "#FEFCE8"; // Light yellow bg
  if (rating >= 20) return "#FFF7ED"; // Light orange bg
  return "#FEF2F2"; // Light red bg
};

// Get rating label based on rating
const getRatingLabel = (rating: number) => {
  if (rating >= 80) return "Great";
  if (rating >= 60) return "Good";
  if (rating >= 40) return "OK";
  if (rating >= 20) return "Fair";
  return "Poor";
};

const ProductCard = ({ product, type }: ProductCardProps) => {
  const location = useLocation();
  const [personalizedRating, setPersonalizedRating] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const fetchPersonalizedRating = async () => {
      try {
        setIsLoading(true);
        
        // Check if the user is authenticated
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.user) {
          // User not authenticated, use default rating
          return;
        }
        
        // Fetch user's product usage data - using cast to fix type errors
        const { data: usageData, error } = await supabase
          .from('product_usage')
          .select('rating')
          .eq('product_id', product.id as any) // Cast to any to bypass type issues
          .eq('product_type', type as any)     // Cast to any to bypass type issues
          .order('usage_date', { ascending: false })
          .limit(1);
        
        if (error) {
          console.error('Error fetching product usage:', error);
          return;
        }
        
        // If user has rated this product before, use their personalized rating
        if (usageData && usageData.length > 0) {
          const firstItem = usageData[0];
          // Use type guard to check for rating property
          if (firstItem && 'rating' in firstItem && typeof firstItem.rating === 'number') {
            // Convert the 1-10 scale to our 0-100 scale
            setPersonalizedRating(firstItem.rating * 10);
          }
        }
      } catch (err) {
        console.error('Error in personalized rating:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPersonalizedRating();
  }, [product.id, type]);
  
  // Get rating to display (use personalized if available)
  const displayRating = personalizedRating !== null ? personalizedRating : product.rating;

  return (
    <Link 
      to={`/product/${type}/${product.id}`} 
      state={{ product, type, from: location.pathname, personalizedRating }} 
      className="block"
    >
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
            {/* Updated Rating Circle to match Weekly Skin Report */}
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: getRatingBgColor(displayRating) }}
            >
              <span 
                className="text-lg font-semibold"
                style={{ color: getRatingColor(displayRating) }}
              >
                {isLoading ? "..." : displayRating}
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

export default ProductCard;
