
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export type Recommendation = {
  type: 'skincare' | 'food' | 'supplements' | 'makeup' | 'lifestyle';
  text: string;
  details: string;
  // We'll add these properties when mapping for display
  icon?: React.ReactNode;
  linkTo?: string;
};

// Type for the cached content structure
interface RecommendationsContent {
  recommendations: Recommendation[];
}

export const useRecommendations = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendations = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Check if user is authenticated
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData.session?.user;

      if (!user) {
        // Return sample recommendations if user is not authenticated
        return getSampleRecommendations();
      }

      // First, try to fetch recommendations from the database
      const { data: existingData, error: fetchError } = await supabase
        .from('ai_generated_content')
        .select('content, updated_at')
        .eq('product_type', 'skin_recommendations')
        .eq('product_id', user.id)
        .eq('content_type', 'recommendations')
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        console.error('Error fetching recommendations:', fetchError);
      }

      const ONE_DAY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

      // If recommendations exist and are less than 24 hours old, use them
      if (existingData && existingData.content) {
        const lastUpdated = new Date(existingData.updated_at).getTime();
        const now = new Date().getTime();
        
        // Cast content to our typed interface to access recommendations properly
        const typedContent = existingData.content as RecommendationsContent;
        
        if (now - lastUpdated < ONE_DAY && typedContent.recommendations) {
          setRecommendations(typedContent.recommendations);
          setIsLoading(false);
          return;
        }
      }

      // If we reach here, we need to generate new recommendations
      const { data, error } = await supabase.functions.invoke('generate-recommendations', {
        body: { user_id: user.id }
      });

      if (error) {
        throw new Error(`Error invoking function: ${error.message}`);
      }

      if (data?.recommendations && Array.isArray(data.recommendations)) {
        setRecommendations(data.recommendations);
      } else {
        // Fallback to sample recommendations if the function fails
        setRecommendations(getSampleRecommendations());
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch recommendations';
      console.error('Error in useRecommendations:', errorMessage);
      setError(errorMessage);
      toast.error('Could not load personalized recommendations');
      
      // Fallback to sample recommendations
      setRecommendations(getSampleRecommendations());
    } finally {
      setIsLoading(false);
    }
  };

  // Sample recommendations to use when API call fails or user is not authenticated
  const getSampleRecommendations = (): Recommendation[] => {
    return [
      { 
        type: 'skincare', 
        text: 'Try vitamin C serum', 
        details: 'Helps brighten skin and reduce visible inflammation' 
      },
      { 
        type: 'food', 
        text: 'Increase omega-3', 
        details: 'May reduce redness and support skin barrier function'
      },
      { 
        type: 'supplements', 
        text: 'Add zinc', 
        details: 'Could help regulate oil production based on your skin pattern'
      },
      { 
        type: 'makeup', 
        text: 'Switch foundation', 
        details: 'Current foundation may be contributing to clogged pores'
      },
      { 
        type: 'lifestyle', 
        text: 'Stress management', 
        details: 'Recent stress appears to be triggering breakouts on chin area'
      }
    ];
  };

  return {
    recommendations,
    isLoading,
    error,
    fetchRecommendations,
  };
};
