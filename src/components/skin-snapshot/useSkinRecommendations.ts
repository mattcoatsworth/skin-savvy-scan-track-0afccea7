
import { useState, useEffect } from 'react';
import { useSkinAdvice } from "@/hooks/useSkinAdvice";
import { useAIDetailCache } from "@/hooks/useAIDetailCache";
import { toast } from "@/hooks/use-toast";
import { Droplet, Utensils, Pill, Circle, Activity } from "lucide-react";
import { Factor } from './SkinFactor';
import { Recommendation, RecommendationType } from './SkinRecommendation';

// Icon mapping function to get the right icon for each recommendation
export const getRecommendationIcon = (type: RecommendationType): React.ReactNode => {
  switch (type) {
    case "skincare":
      return <Droplet className="h-4 w-4" />;
    case "food":
      return <Utensils className="h-4 w-4" />;
    case "supplements":
      return <Pill className="h-4 w-4" />;
    case "makeup":
      return <Circle className="h-4 w-4" />;
    case "lifestyle":
      return <Activity className="h-4 w-4" />;
    default:
      return <Circle className="h-4 w-4" />;
  }
};

export function useSkinRecommendations(
  factors: Factor[],
  fallbackRecommendations: Recommendation[]
) {
  // State for AI-generated recommendations
  const [aiRecommendations, setAiRecommendations] = useState<Recommendation[]>([]);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(true);
  const [hasAttemptedFetch, setHasAttemptedFetch] = useState(false);
  
  const { getAdvice } = useSkinAdvice({ adviceType: "recommendation" });
  const { preGenerateMultipleDetails } = useAIDetailCache();
  
  // Fetch AI recommendations on component mount
  useEffect(() => {
    // Only run once to prevent infinite loop
    if (hasAttemptedFetch) return;
    
    const fetchRecommendations = async () => {
      try {
        setIsLoadingRecommendations(true);
        setHasAttemptedFetch(true);
        
        // Try to get cached recommendations from localStorage first
        const today = new Date().toISOString().split('T')[0];
        const cacheKey = `home-recommendations-${today}`;
        const cachedRecommendations = localStorage.getItem(cacheKey);
        
        if (cachedRecommendations) {
          const parsed = JSON.parse(cachedRecommendations);
          setAiRecommendations(parsed);
          setIsLoadingRecommendations(false);
          return;
        }
        
        // If no cache, fetch from AI
        const aiResponse = await getAdvice(
          "Based on my recent skin logs, provide personalized recommendations for improving my skin health. Focus on actionable suggestions spanning skincare products, diet, supplements, and lifestyle changes. PROVIDE AT LEAST 8 distinct recommendations.",
          { factors }
        );
        
        if (aiResponse) {
          // Extract recommended actions from AI response
          const recommendedActions = aiResponse.sections["Recommended Actions"];
          
          // Process recommendations based on the format they come in (string or string[])
          const processedRecommendations: Recommendation[] = [];
          
          if (Array.isArray(recommendedActions)) {
            // Process array of recommendations
            recommendedActions.forEach((action, index) => {
              // Check if the action contains classification hints
              const typeMatches = {
                "skincare": ["serum", "cleanser", "moisturizer", "exfoliant", "spf", "sunscreen", "face", "skin"],
                "food": ["food", "diet", "eat", "dairy", "meal", "nutrition", "fruit", "vegetable", "omega", "antioxidant"],
                "supplements": ["supplement", "vitamin", "mineral", "zinc", "collagen", "primrose"],
                "makeup": ["makeup", "foundation", "concealer", "cosmetic"],
                "lifestyle": ["sleep", "stress", "hydration", "water", "exercise", "routine", "habit"]
              };
              
              // Determine the type based on keywords in the action
              let determinedType: RecommendationType = "skincare"; // Default
              for (const [type, keywords] of Object.entries(typeMatches)) {
                if (keywords.some(keyword => action.toLowerCase().includes(keyword))) {
                  determinedType = type as RecommendationType;
                  break;
                }
              }
              
              // Clean up the recommendation text (extract only the key part)
              const cleanText = action.replace(/^(Try|Use|Add|Increase|Consider|Limit|Avoid|Switch to|Incorporate)\s+/i, "");
              
              // Create ID with consistent format that matches our router paths
              const recId = `${index + 1}`;
              
              // Create a sanitized recommendation object
              processedRecommendations.push({
                type: determinedType,
                text: cleanText,
                icon: getRecommendationIcon(determinedType),
                // Use consistent URL path format /recommendations-detail/action-1 for all recommendations
                linkTo: `/recommendations-detail/action-${recId}`
              });
            });
          } else if (typeof recommendedActions === 'string') {
            // If it's just a single string, add it as one recommendation
            processedRecommendations.push({
              type: "skincare", 
              text: recommendedActions,
              icon: <Droplet className="h-4 w-4" />,
              linkTo: "/recommendations-detail/action-1"
            });
          }
          
          console.log(`Processed ${processedRecommendations.length} recommendations`);
          
          // Save processed recommendations in state
          setAiRecommendations(processedRecommendations);
          
          // Pre-generate detail pages for all recommendations in the background
          // IMPORTANT: This ensures detail pages are created as soon as recommendations are generated
          const detailsToGenerate = processedRecommendations.map((rec, index) => ({
            type: "action",  // Use consistent "action" type
            id: `${index + 1}`, // Use numeric IDs
            text: rec.text,
            contextData: { factors }
          }));
          
          // Run in the background without awaiting
          preGenerateMultipleDetails(detailsToGenerate).then(({ generatedCount }) => {
            console.log(`Pre-generated ${generatedCount} new recommendation details`);
          });
          
          // Cache the recommendations in localStorage
          try {
            localStorage.setItem(cacheKey, JSON.stringify(processedRecommendations));
          } catch (error) {
            console.error("Failed to cache recommendations:", error);
          }
        }
      } catch (error) {
        console.error("Error fetching AI recommendations:", error);
        // Fallback to provided static recommendations if AI fetch fails
        setAiRecommendations(fallbackRecommendations);
        
        toast({
          title: "Error",
          description: "Could not load personalized recommendations",
          variant: "destructive"
        });
      } finally {
        setIsLoadingRecommendations(false);
      }
    };
    
    fetchRecommendations();
  }, [factors, fallbackRecommendations, getAdvice, preGenerateMultipleDetails, hasAttemptedFetch]);
  
  // Use AI recommendations if available, otherwise fall back to static recommendations
  const displayRecommendations = aiRecommendations.length > 0 ? aiRecommendations : fallbackRecommendations;
  
  return {
    recommendations: displayRecommendations,
    isLoading: isLoadingRecommendations
  };
}
