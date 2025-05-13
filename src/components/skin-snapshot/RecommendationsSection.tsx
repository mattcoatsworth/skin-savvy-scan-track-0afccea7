
import React, { useState } from "react";
import { SkinRecommendation, Recommendation } from "./SkinRecommendation";

type RecommendationsSectionProps = {
  recommendations: Recommendation[];
  isLoading: boolean;
};

export const RecommendationsSection: React.FC<RecommendationsSectionProps> = ({ 
  recommendations,
  isLoading
}) => {
  const [showAllRecommendations, setShowAllRecommendations] = useState(false);
  
  // Show 8 recommendations by default instead of 5
  const displayedRecommendations = showAllRecommendations 
    ? recommendations 
    : recommendations.slice(0, 8);
    
  return (
    <div className="mb-3 pt-3 border-t border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-muted-foreground">For You Recommendations:</p>
        {isLoading && (
          <div className="animate-spin h-4 w-4 border-2 border-skin-teal border-t-transparent rounded-full"></div>
        )}
      </div>
      {!isLoading && displayedRecommendations.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {displayedRecommendations.map((recommendation, index) => (
            <SkinRecommendation
              key={index}
              recommendation={recommendation}
            />
          ))}
        </div>
      ) : (
        !isLoading && (
          <p className="text-sm text-muted-foreground italic">No recommendations available</p>
        )
      )}
      
      {recommendations.length > 8 && (
        <button 
          onClick={(e) => {
            e.preventDefault();
            setShowAllRecommendations(!showAllRecommendations);
          }}
          className="mt-2 text-skin-teal text-sm font-medium flex items-center"
        >
          {showAllRecommendations ? "Show less" : `Show ${recommendations.length - 8} more recommendations`}
        </button>
      )}
    </div>
  );
};
