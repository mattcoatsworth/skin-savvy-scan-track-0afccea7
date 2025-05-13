import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Smile, Droplet, Utensils, Pill, Circle, Activity, ChevronRight } from "lucide-react";
import { useSkinAdvice } from "@/hooks/useSkinAdvice";
import { useAIDetailCache } from "@/hooks/useAIDetailCache";
import { toast } from "@/hooks/use-toast";

type FactorType = "Food" | "Supplement" | "Makeup" | "Weather";

type Factor = {
  type: FactorType;
  status: string;
  icon: React.ReactNode;
};

type RecommendationType = "skincare" | "food" | "supplements" | "makeup" | "lifestyle";

type Recommendation = {
  type: RecommendationType;
  text: string;
  icon: React.ReactNode;
  linkTo: string;
};

type SkinSnapshotProps = {
  emoji: string;
  status: string;
  factors: Factor[];
  recommendations?: Recommendation[];
  className?: string;
};

const getFactorColor = (type: FactorType) => {
  switch (type) {
    case "Food":
      return "bg-green-100 text-green-800";
    case "Supplement":
      return "bg-blue-100 text-blue-800";
    case "Makeup":
      return "bg-purple-100 text-purple-800";
    case "Weather":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getRecommendationColor = (type: RecommendationType) => {
  switch (type) {
    case "skincare":
      return "bg-blue-100 text-blue-800";
    case "food":
      return "bg-green-100 text-green-800";
    case "supplements":
      return "bg-indigo-100 text-indigo-800";
    case "makeup":
      return "bg-purple-100 text-purple-800";
    case "lifestyle":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Icon mapping function to get the right icon for each recommendation
const getRecommendationIcon = (type: RecommendationType): React.ReactNode => {
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

const DailySkinSnapshot: React.FC<SkinSnapshotProps> = ({
  emoji,
  status,
  factors,
  recommendations = [],
  className,
}) => {
  // State for AI-generated recommendations
  const [aiRecommendations, setAiRecommendations] = useState<Recommendation[]>([]);
  const [showAllRecommendations, setShowAllRecommendations] = useState(false);
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
  }, [hasAttemptedFetch, preGenerateMultipleDetails]); // Only depend on hasAttemptedFetch to prevent infinite loop
  
  // Use AI recommendations if available, otherwise fall back to static recommendations
  const displayRecommendations = aiRecommendations.length > 0 ? aiRecommendations : recommendations;
  
  // Show 8 recommendations by default instead of 5
  const displayedRecommendations = showAllRecommendations 
    ? displayRecommendations 
    : displayRecommendations.slice(0, 8);
  
  return (
    <Link to="/skin">
      <Card className={cn("ios-card hover:shadow-lg transition-shadow", className)}>
        <CardContent className="p-4">
          <div className="flex items-center mb-4">
            <div className="text-4xl mr-3">
              <Smile className="h-8 w-8" />
            </div>
            <div>
              <h2 className="font-medium text-lg">Today's Skin</h2>
              <p className="text-xl font-semibold">{status}</p>
            </div>
          </div>
          
          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-2">Contributing Factors:</p>
            <div className="flex flex-wrap gap-2">
              {factors.map((factor, index) => (
                <span 
                  key={index} 
                  className={`${getFactorColor(factor.type)} flex items-center px-3 py-1.5 rounded-full text-sm`}
                >
                  <span className="mr-1.5">{factor.icon}</span> {factor.status}
                </span>
              ))}
            </div>
          </div>
          
          {(displayRecommendations.length > 0 || isLoadingRecommendations) && (
            <div className="mb-3 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">For You Recommendations:</p>
                {isLoadingRecommendations && (
                  <div className="animate-spin h-4 w-4 border-2 border-skin-teal border-t-transparent rounded-full"></div>
                )}
              </div>
              {!isLoadingRecommendations && displayedRecommendations.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {displayedRecommendations.map((recommendation, index) => (
                    <Link 
                      key={index} 
                      to={recommendation.linkTo}
                      className={`${getRecommendationColor(recommendation.type)} flex items-center px-3 py-1.5 rounded-full text-sm cursor-pointer hover:opacity-80 transition-opacity`}
                      onClick={(e) => {
                        // Prevent parent link navigation when clicking on a recommendation
                        e.stopPropagation();
                      }}
                    >
                      <span className="mr-1.5">{recommendation.icon}</span> {recommendation.text}
                    </Link>
                  ))}
                </div>
              ) : (
                !isLoadingRecommendations && (
                  <p className="text-sm text-muted-foreground italic">No recommendations available</p>
                )
              )}
              
              {displayRecommendations.length > 8 && (
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    setShowAllRecommendations(!showAllRecommendations);
                  }}
                  className="mt-2 text-skin-teal text-sm font-medium flex items-center"
                >
                  {showAllRecommendations ? "Show less" : `Show ${displayRecommendations.length - 8} more recommendations`}
                </button>
              )}
            </div>
          )}
          
          <div className="text-center mt-4 text-skin-teal flex items-center justify-center">
            View Full Analysis <ChevronRight className="h-4 w-4 ml-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default DailySkinSnapshot;
