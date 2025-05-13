
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

type RecommendationSection = {
  title: string;
  content: string;
  subsections?: Array<{
    title: string;
    content: string | string[];
  }>;
};

type Recommendation = {
  overview: RecommendationSection;
  analysis: RecommendationSection;
  benefits: RecommendationSection;
  implementation: RecommendationSection;
  scienceResearch: RecommendationSection;
  additionalResources: RecommendationSection;
  metadata: {
    type: string;
    generatedAt: string;
    dataPoints: {
      skinLogsCount: number;
      productsCount: number;
    };
  };
};

interface UsePersonalizedRecommendationProps {
  recommendationType: string;
  useCache?: boolean;
}

export const usePersonalizedRecommendation = ({
  recommendationType,
  useCache = true
}: UsePersonalizedRecommendationProps) => {
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch user's skin logs
  const fetchUserData = async () => {
    try {
      // Get user profile
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      
      // Get user skin logs
      const { data: skinLogs, error: skinLogsError } = await supabase
        .from('skin_logs')
        .select('*')
        .order('log_date', { ascending: false })
        .limit(10);
      if (skinLogsError) throw skinLogsError;
      
      // Get user's product usage
      const { data: productUsage, error: productError } = await supabase
        .from('product_usage')
        .select('*')
        .order('usage_date', { ascending: false })
        .limit(10);
      if (productError) throw productError;

      return { userData: userData.user, skinLogs, products: productUsage };
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };

  // Check if we have a cached recommendation
  const getCachedRecommendation = async () => {
    if (!useCache) return null;

    try {
      const { data, error } = await supabase
        .from('ai_generated_content')
        .select('content')
        .eq('content_type', `recommendation_${recommendationType}`)
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      
      // If we found cached content and it's less than 24 hours old
      if (data) {
        const content = data.content as any;
        const generatedAt = new Date(content.metadata?.generatedAt || Date.now());
        const now = new Date();
        const hoursDiff = (now.getTime() - generatedAt.getTime()) / (1000 * 60 * 60);
        
        // Return cached content if it's less than 24 hours old
        if (hoursDiff < 24) {
          return content;
        }
      }
      
      return null;
    } catch (error) {
      console.error("Error fetching cached recommendation:", error);
      return null;
    }
  };

  // Cache a recommendation
  const cacheRecommendation = async (recommendation: Recommendation) => {
    try {
      const { error } = await supabase
        .from('ai_generated_content')
        .insert({
          content_type: `recommendation_${recommendationType}`,
          content: recommendation,
          product_id: 'n/a', // These fields are required by the table schema
          product_type: 'n/a'
        });

      if (error) throw error;
    } catch (error) {
      console.error("Error caching recommendation:", error);
    }
  };

  // Get a personalized recommendation
  const getRecommendation = async (forceRefresh = false) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Check cache first if not forcing a refresh
      if (!forceRefresh) {
        const cachedRecommendation = await getCachedRecommendation();
        if (cachedRecommendation) {
          setRecommendation(cachedRecommendation);
          setIsLoading(false);
          return;
        }
      }
      
      // If no cached recommendation or forcing refresh, get user data
      const userData = await fetchUserData();
      
      // Call the Edge Function to generate a recommendation
      const { data, error } = await supabase.functions.invoke('generate-recommendation', {
        body: {
          recommendationType,
          ...userData
        }
      });

      if (error) throw new Error(error.message);
      
      // Set the recommendation
      setRecommendation(data);
      
      // Cache the recommendation
      await cacheRecommendation(data);
      
    } catch (error: any) {
      console.error("Error getting personalized recommendation:", error);
      setError(error.message || "Failed to get personalized recommendation");
      toast({
        title: "Error",
        description: "Failed to generate your personalized recommendation. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Load the recommendation when the component mounts
  useEffect(() => {
    getRecommendation();
  }, [recommendationType]);

  return { 
    recommendation, 
    isLoading, 
    error,
    refreshRecommendation: () => getRecommendation(true)
  };
};
