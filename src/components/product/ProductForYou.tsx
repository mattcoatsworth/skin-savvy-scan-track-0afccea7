import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, StarHalf, StarOff } from "lucide-react";
import { toast } from "sonner";
import LoadingIndicator from "./LoadingIndicator";
import { supabase } from "@/integrations/supabase/client";
import { Progress } from "@/components/ui/progress";

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

  // Function to get user's skin logs
  const fetchUserData = async () => {
    try {
      // Get user skin logs
      const { data: skinLogs, error: skinLogsError } = await supabase
        .from('skin_logs')
        .select('*')
        .order('log_date', { ascending: false })
        .limit(10);

      if (skinLogsError) throw skinLogsError;
      return { skinLogs };
    } catch (error) {
      console.error("Error fetching user data:", error);
      return { skinLogs: [] };
    }
  };

  // Generate personalized insights using OpenAI
  const generatePersonalizedInsights = async () => {
    try {
      setLoadingInsight(true);

      // Get user's data
      const { skinLogs } = await fetchUserData();
      
      if (skinLogs.length === 0) {
        setPersonalInsight({
          recommendation: "We don't have enough data from your skin logs to provide a personalized recommendation.",
          reasoning: "Start logging your skin condition daily for personalized insights.",
          rating: 50 // Default to middle rating when no data
        });
        return;
      }

      // Call the OpenAI function through Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('analyze-product-for-user', {
        body: {
          product: {
            name: product.name,
            type: type,
            id: productId,
            impact: product.impact || 'neutral',
            brand: product.brand || 'unknown'
          },
          skinLogs
        }
      });

      if (error) throw error;

      // Convert the 1-5 scale rating to 1-100 scale if needed
      if (data && typeof data.rating === 'number') {
        // If the rating is already on a 1-100 scale, use it directly
        // Otherwise, convert from 1-5 scale to 1-100 scale
        if (data.rating <= 5) {
          data.rating = Math.round(data.rating * 20);
        }
      }

      setPersonalInsight(data);
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
