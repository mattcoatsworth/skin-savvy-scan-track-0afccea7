
import React from "react";
import { Link } from "react-router-dom";
import { getRecommendationColor } from "./theme-utils";

export type RecommendationType = "skincare" | "food" | "supplements" | "makeup" | "lifestyle";

export type Recommendation = {
  type: RecommendationType;
  text: string;
  icon: React.ReactNode;
  linkTo: string;
};

type SkinRecommendationProps = {
  recommendation: Recommendation;
};

export const SkinRecommendation: React.FC<SkinRecommendationProps> = ({ recommendation }) => {
  return (
    <Link 
      to={recommendation.linkTo}
      className={`${getRecommendationColor(recommendation.type)} flex items-center px-3 py-1.5 rounded-full text-sm cursor-pointer hover:opacity-80 transition-opacity`}
      onClick={(e) => {
        // Prevent parent link navigation when clicking on a recommendation
        e.stopPropagation();
      }}
    >
      <span className="mr-1.5">{recommendation.icon}</span> {recommendation.text}
    </Link>
  );
};
