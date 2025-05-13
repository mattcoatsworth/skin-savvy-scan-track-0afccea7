
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useSkinAdvice } from "@/hooks/useSkinAdvice";
import { useAIDetailCache } from "@/hooks/useAIDetailCache";
import { toast } from "@/hooks/use-toast";

// Import our new smaller components
import SkinStatusHeader from "./skin/SkinStatusHeader";
import FactorsList from "./skin/FactorsList";
import RecommendationList from "./skin/RecommendationList";
import { Recommendation, getRecommendationIcon } from "./skin/RecommendationTag";

type FactorType = "Food" | "Supplement" | "Makeup" | "Weather";

type Factor = {
  type: FactorType;
  status: string;
  icon: React.ReactNode;
};

type SkinSnapshotProps = {
  emoji: string;
  status: string;
  factors: Factor[];
  recommendations?: Recommendation[];
  className?: string;
};

const DailySkinSnapshot: React.FC<SkinSnapshotProps> = ({
  emoji,
  status,
  factors,
  recommendations = [],
  className,
}) => {
  // State for AI-generated recommendations
  const [aiRecommendations, setAiRecommendations] = useState<Recommendation[]>([]);
  const { getAdvice, isLoading } = useSkinAdvice({ adviceType: "recommendation" });
  const { preGenerateMultipleDetails } = useAIDetailCache();
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(true);
  const [hasAttemptedFetch, setHasAttemptedFetch] = useState(false);
  
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
              icon: getRecommendationIcon("skincare"),
              linkTo: "/recommendations-detail/action-1"
            });
          }
          
          console.log(`Processed ${processedRecommendations.length} recommendations`);
          
          // Save processed recommendations in state
          setAiRecommendations(processedRecommendations);
          
          // Pre-generate detail pages for all recommendations in the background
          const detailsToGenerate = processedRecommendations.map((rec, index) => ({
            type: "action",
            id: `${index + 1}`,
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
        setAiRecommendations(recommendations);
        
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
  }, [hasAttemptedFetch, preGenerateMultipleDetails]); 
  
  // Use AI recommendations if available, otherwise fall back to static recommendations
  const displayRecommendations = aiRecommendations.length > 0 ? aiRecommendations : recommendations;
  
  // Get the current theme for conditional styling
  const currentTheme = document.body.getAttribute('data-theme') || 'default';
  
  // Define the text color class for the "View Full Analysis" text based on theme
  const viewAnalysisTextClass = currentTheme === 'summer' ? 'text-black' : 'text-skin-teal';
  
  return (
    <Link to="/skin">
      <Card className={cn("ios-card hover:shadow-lg transition-shadow", className)}>
        <CardContent className="p-4">
          <SkinStatusHeader status={status} />
          
          <FactorsList factors={factors} />
          
          {(displayRecommendations.length > 0 || isLoadingRecommendations) && (
            <div className="mb-3 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">For You Recommendations:</p>
                {isLoadingRecommendations && (
                  <div className="animate-spin h-4 w-4 border-2 border-skin-teal border-t-transparent rounded-full"></div>
                )}
              </div>
              
              <RecommendationList 
                recommendations={displayRecommendations}
                isLoading={isLoadingRecommendations}
                maxInitialDisplay={8}
              />
            </div>
          )}
          
          <div className="text-center mt-4 flex items-center justify-center">
            <span className={`${viewAnalysisTextClass} font-medium`}>
              View Full Analysis <ChevronRight className="h-4 w-4 ml-1 inline-block" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default DailySkinSnapshot;
