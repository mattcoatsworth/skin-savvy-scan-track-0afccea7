/**
 * Product service
 * Handles product-related API calls in a platform-agnostic way
 */
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export const productService = {
  /**
   * Get personalized product insights for user
   */
  getProductForUserInsights: async (product: any, type: string, productId: string) => {
    try {
      // Get user's data
      const { data: skinLogs, error: skinLogsError } = await supabase
        .from('skin_logs')
        .select('*')
        .order('log_date', { ascending: false })
        .limit(10);

      if (skinLogsError) throw skinLogsError;
      
      if (skinLogs.length === 0) {
        return {
          recommendation: "We don't have enough data from your skin logs to provide a personalized recommendation.",
          reasoning: "Start logging your skin condition daily for personalized insights.",
          rating: 50 // Default to middle rating when no data
        };
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

      return data;
    } catch (error) {
      console.error("Error generating product insights:", error);
      throw error;
    }
  },

  /**
   * Get product details
   */
  getProductDetails: async (type: string, productId: string) => {
    try {
      // Instead of directly querying tables that don't exist in our database types,
      // use an RPC call to get the products
      const { data, error } = await supabase.functions.invoke('get-product-details', {
        body: {
          product_type: type,
          product_id: productId
        }
      });
      
      if (error) {
        console.error("Function error:", error);
        // Fallback for development: mock data when the function doesn't exist yet
        if (type === "food") {
          return { id: productId, name: "Food Item " + productId, type: "food" };
        } else {
          return { id: productId, name: "Product Item " + productId, type: "product" };
        }
      }
      
      return data;
    } catch (error) {
      console.error("Error fetching product details:", error);
      throw error;
    }
  }
};
