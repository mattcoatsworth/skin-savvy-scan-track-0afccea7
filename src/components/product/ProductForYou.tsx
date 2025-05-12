
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, StarHalf, StarOff } from "lucide-react";
import { toast } from "sonner";
import LoadingIndicator from "./LoadingIndicator";
import { supabase } from "@/integrations/supabase/client";

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
          rating: 3
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

      setPersonalInsight(data);
    } catch (error) {
      console.error("Error generating insights:", error);
      toast.error("Failed to generate personal insights");
      setPersonalInsight({
        recommendation: "Unable to analyze this product for your skin profile at the moment.",
        reasoning: "We encountered an issue when generating your personalized recommendation.",
        rating: 3
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

  // Render stars based on rating
  const renderRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="h-5 w-5 fill-yellow-400 text-yellow-400" />);
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="h-5 w-5 fill-yellow-400 text-yellow-400" />);
    }
    
    // Add empty stars
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<StarOff key={`empty-${i}`} className="h-5 w-5 text-gray-400" />);
    }
    
    return stars;
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
              <div className="flex items-center mb-3">
                <p className="font-medium mr-2">Personal Match Rating:</p>
                <div className="flex items-center">
                  {renderRatingStars(personalInsight.rating)}
                </div>
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
