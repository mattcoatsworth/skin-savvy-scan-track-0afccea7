
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import LoadingIndicator from "./LoadingIndicator";
import { productService } from "@/services/api/productService";

interface ProductForYouProps {
  isLoading: boolean;
  product: any;
  type: string;
  productId: string;
}

const ProductForYou = ({ isLoading, product, type, productId }: ProductForYouProps) => {
  const [personalInsight, setPersonalInsight] = useState<{
    recommendation: string;
    reasoning: string;
    rating: number;
  } | null>(null);
  const [loadingInsight, setLoadingInsight] = useState(false);

  // Generate personalized insights using our API service
  const generatePersonalizedInsights = async () => {
    try {
      setLoadingInsight(true);

      const insightData = await productService.getProductForUserInsights(product, type, productId);
      setPersonalInsight(insightData);
      
    } catch (error) {
      console.error("Error generating insights:", error);
      toast.error("Failed to generate personal insights");
      setPersonalInsight({
        recommendation: "Unable to analyze this product for your skin profile at the moment.",
        reasoning: "We encountered an issue when generating your personalized recommendation.",
        rating: 50 // Default to middle rating on error
      });
    } finally {
      setLoadingInsight(false);
    }
  };

  // Generate insights when component mounts
  useEffect(() => {
    if (product && !isLoading) {
      generatePersonalizedInsights();
    }
  }, [product, isLoading]);

  // Helper function to get color based on rating
  const getRatingColor = (rating: number) => {
    if (rating >= 70) return "bg-green-500";
    if (rating >= 40) return "bg-amber-500";
    return "bg-red-500";
  };

  const getRatingLabel = (rating: number) => {
    if (rating >= 80) return "Great match";
    if (rating >= 60) return "Good match";
    if (rating >= 40) return "Moderate match";
    if (rating >= 20) return "Poor match";
    return "Not recommended";
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">For You</h2>
      </div>
      
      <Card>
        <CardContent className="p-6">
          {isLoading || loadingInsight ? (
            <LoadingIndicator />
          ) : personalInsight ? (
            <div>
              <div className="mb-4">
                <p className="font-medium mb-1">Personal Match Rating</p>
                <div className="flex items-center">
                  <div className="flex-1 mr-4">
                    <Progress 
                      value={personalInsight.rating} 
                      className="h-3 bg-gray-100" 
                      indicatorClassName={getRatingColor(personalInsight.rating)} 
                    />
                  </div>
                  <div className="text-base font-semibold">{personalInsight.rating}/100</div>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{getRatingLabel(personalInsight.rating)}</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">Recommendation</h3>
                  <p className="text-sm">{personalInsight.recommendation}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">Why This Works For You</h3>
                  <p className="text-sm text-gray-600">{personalInsight.reasoning}</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-600">Unable to generate personalized insights.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductForYou;
