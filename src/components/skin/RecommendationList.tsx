
import React, { useState } from "react";
import RecommendationTag, { Recommendation } from "./RecommendationTag";

interface RecommendationListProps {
  recommendations: Recommendation[];
  isLoading: boolean;
  maxInitialDisplay?: number;
}

const RecommendationList: React.FC<RecommendationListProps> = ({ 
  recommendations, 
  isLoading,
  maxInitialDisplay = 8
}) => {
  const [showAllRecommendations, setShowAllRecommendations] = useState(false);
  
  // Show maxInitialDisplay recommendations by default
  const displayedRecommendations = showAllRecommendations 
    ? recommendations 
    : recommendations.slice(0, maxInitialDisplay);

  if (isLoading) {
    return (
      <div className="animate-spin h-4 w-4 border-2 border-skin-teal border-t-transparent rounded-full"></div>
    );
  }

  if (!recommendations.length) {
    return <p className="text-sm text-muted-foreground italic">No recommendations available</p>;
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {displayedRecommendations.map((recommendation, index) => (
          <RecommendationTag key={index} recommendation={recommendation} />
        ))}
      </div>
      
      {recommendations.length > maxInitialDisplay && (
        <button 
          onClick={(e) => {
            e.preventDefault();
            setShowAllRecommendations(!showAllRecommendations);
          }}
          className="mt-2 text-skin-teal text-sm font-medium flex items-center"
        >
          {showAllRecommendations ? 
            "Show less" : 
            `Show ${recommendations.length - maxInitialDisplay} more recommendations`}
        </button>
      )}
    </div>
  );
};

export default RecommendationList;
