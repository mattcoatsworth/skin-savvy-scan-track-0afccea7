
import { SkinFactorType, ImpactFactor } from "./types";

/**
 * Get the appropriate icon name for a factor type
 */
export const getFactorIconName = (factorType: SkinFactorType): string => {
  switch (factorType) {
    case "Food":
      return "salad";
    case "Supplement":
      return "pill";
    case "Makeup":
      return "palette";
    case "Weather":
      return "cloud-sun";
    case "Lifestyle":
      return "activity";
    case "Environment":
      return "cloud";
    case "Skincare":
      return "droplet";
    case "Health":
      return "heart";
    case "Sleep":
      return "moon-star";
    case "Stress":
      return "activity";
    default:
      return "circle";
  }
};

/**
 * Format a date string
 */
export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

/**
 * Get the color for a skin rating
 */
export const getRatingColor = (rating: number): string => {
  if (rating >= 80) return "#4ADE80"; // Green for good ratings
  if (rating >= 60) return "#22C55E"; // Lower green
  if (rating >= 40) return "#FACC15"; // Yellow for medium ratings
  if (rating >= 20) return "#FB923C"; // Orange for fair
  return "#F87171"; // Red for poor ratings
};

/**
 * Get the background color for a skin rating
 */
export const getRatingBgColor = (rating: number): string => {
  if (rating >= 80) return "#ECFDF5"; // Light green bg
  if (rating >= 60) return "#F0FDF4"; // Lower light green bg
  if (rating >= 40) return "#FEFCE8"; // Light yellow bg
  if (rating >= 20) return "#FFF7ED"; // Light orange bg
  return "#FEF2F2"; // Light red bg
};

/**
 * Get a label for a skin rating
 */
export const getRatingLabel = (rating: number): string => {
  if (rating >= 80) return "Great";
  if (rating >= 60) return "Good";
  if (rating >= 40) return "OK";
  if (rating >= 20) return "Fair";
  return "Poor";
};

/**
 * Sort factors by impact (greatest impact first)
 */
export const sortFactorsByImpact = (factors: ImpactFactor[]): ImpactFactor[] => {
  return [...factors].sort((a, b) => {
    // Extract the numeric value from the impact string
    const aValue = parseFloat(a.impact.replace(/[^0-9.-]+/g, ""));
    const bValue = parseFloat(b.impact.replace(/[^0-9.-]+/g, ""));
    
    // Sort by absolute value (descending)
    return Math.abs(bValue) - Math.abs(aValue);
  });
};

/**
 * Get the badge class for a difficulty level
 */
export const getDifficultyBadgeClass = (difficulty: string): string => {
  switch(difficulty) {
    case 'easy':
      return 'inline bg-green-100 text-green-800 px-2 py-0.5 text-xs';
    case 'medium':
      return 'inline bg-yellow-100 text-yellow-800 px-2 py-0.5 text-xs';
    case 'hard':
      return 'inline bg-red-100 text-red-800 px-2 py-0.5 text-xs';
    default:
      return 'inline bg-slate-100 text-slate-800 px-2 py-0.5 text-xs';
  }
};

/**
 * Get the category badge class
 */
export const getCategoryBadgeClass = (): string => {
  return 'inline bg-slate-200 text-slate-700 px-2 py-0.5 text-xs';
};

/**
 * Group recommendations by category
 */
export const groupRecommendationsByCategory = (recommendations: any[]) => {
  return recommendations.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {} as Record<string, any[]>);
};

/**
 * Get categories in desired order
 */
export const getCategoryOrder = (): string[] => {
  return ["food", "drink", "supplements", "makeup", "lifestyle", "skincare"];
};
