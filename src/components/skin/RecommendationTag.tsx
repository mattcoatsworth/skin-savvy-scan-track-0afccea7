
import React from "react";
import { Link } from "react-router-dom";
import { Droplet, Utensils, Pill, Circle, Activity } from "lucide-react";

export type RecommendationType = "skincare" | "food" | "supplements" | "makeup" | "lifestyle";

export type Recommendation = {
  type: RecommendationType;
  text: string;
  icon: React.ReactNode;
  linkTo: string;
};

export const getRecommendationColor = (type: RecommendationType) => {
  const theme = document.body.getAttribute('data-theme') || 'default';
  
  if (theme === 'summer') {
    switch (type) {
      case "skincare":
        return "bg-sky-100 text-sky-800"; 
      case "food":
        return "bg-emerald-100 text-emerald-800"; 
      case "supplements":
        return "bg-slate-100 text-slate-800"; 
      case "makeup":
        return "bg-violet-100 text-violet-800"; 
      case "lifestyle":
        return "bg-stone-100 text-stone-800"; 
      default:
        return "bg-gray-100 text-gray-800";
    }
  } else if (theme === 'spring') {
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
  } else {
    // Default theme
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
  }
};

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

interface RecommendationTagProps {
  recommendation: Recommendation;
  onClick?: (e: React.MouseEvent) => void;
}

const RecommendationTag: React.FC<RecommendationTagProps> = ({ recommendation, onClick }) => {
  return (
    <Link 
      to={recommendation.linkTo}
      className={`${getRecommendationColor(recommendation.type)} flex items-center px-3 py-1.5 rounded-full text-sm cursor-pointer hover:opacity-80 transition-opacity`}
      onClick={(e) => {
        // Prevent parent link navigation when clicking on a recommendation
        e.stopPropagation();
        onClick?.(e);
      }}
    >
      <span className="mr-1.5">{recommendation.icon}</span> {recommendation.text}
    </Link>
  );
};

export default RecommendationTag;
