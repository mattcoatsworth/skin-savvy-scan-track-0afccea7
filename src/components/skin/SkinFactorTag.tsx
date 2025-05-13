
import React from "react";

type FactorType = "Food" | "Supplement" | "Makeup" | "Weather";

type SkinFactorTagProps = {
  type: FactorType;
  status: string;
  icon: React.ReactNode;
};

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

const SkinFactorTag: React.FC<SkinFactorTagProps> = ({ type, status, icon }) => {
  return (
    <span className={`${getFactorColor(type)} flex items-center px-3 py-1.5 rounded-full text-sm`}>
      <span className="mr-1.5">{icon}</span> {status}
    </span>
  );
};

export default SkinFactorTag;
