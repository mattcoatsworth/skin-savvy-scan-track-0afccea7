
import { RecommendationType } from "./SkinRecommendation";
import { FactorType } from "./SkinFactor";

export const getFactorColor = (type: FactorType) => {
  const theme = document.body.getAttribute('data-theme') || 'default';
  
  if (theme === 'summer') {
    switch (type) {
      case "Food":
        return "bg-emerald-50 text-emerald-800"; // Soft green
      case "Supplement":
        return "bg-sky-50 text-sky-800"; // Soft blue
      case "Makeup":
        return "bg-violet-50 text-violet-800"; // Soft purple
      case "Weather":
        return "bg-amber-50 text-amber-800"; // Soft amber
      default:
        return "bg-gray-100 text-gray-800";
    }
  } else if (theme === 'spring') {
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
  } else {
    // Default theme
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
  }
};

export const getRecommendationColor = (type: RecommendationType) => {
  const theme = document.body.getAttribute('data-theme') || 'default';
  
  if (theme === 'summer') {
    switch (type) {
      case "skincare":
        return "bg-sky-50 text-sky-800"; // Soft blue
      case "food":
        return "bg-emerald-50 text-emerald-800"; // Soft green
      case "supplements":
        return "bg-slate-50 text-slate-800"; // Soft slate
      case "makeup":
        return "bg-violet-50 text-violet-800"; // Soft purple
      case "lifestyle":
        return "bg-stone-50 text-stone-800"; // Soft stone
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
