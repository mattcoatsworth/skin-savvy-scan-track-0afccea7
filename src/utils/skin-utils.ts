
// Helper functions for rating styling
export const getRatingLabel = (rating: number) => {
  if (rating >= 80) return "Great";
  if (rating >= 60) return "Good";
  if (rating >= 40) return "OK";
  if (rating >= 20) return "Fair";
  return "Poor";
};

export const getRatingColor = (rating: number) => {
  if (rating >= 80) return "#4ADE80"; // Green for good ratings
  if (rating >= 60) return "#22C55E"; // Lower green
  if (rating >= 40) return "#FACC15"; // Yellow for medium ratings
  if (rating >= 20) return "#FB923C"; // Orange for fair
  return "#F87171"; // Red for poor ratings
};

export const getRatingBgColor = (rating: number) => {
  if (rating >= 80) return "#ECFDF5"; // Light green bg
  if (rating >= 60) return "#F0FDF4"; // Lower light green bg
  if (rating >= 40) return "#FEFCE8"; // Light yellow bg
  if (rating >= 20) return "#FFF7ED"; // Light orange bg
  return "#FEF2F2"; // Light red bg
};

export const getFactorColor = (type: string) => {
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

export const getRecommendationColor = (type: string) => {
  const theme = document.body.getAttribute('data-theme') || 'default';
  
  if (theme === 'summer') {
    switch (type) {
      case "skincare":
        return "bg-sky-100 text-sky-800";
      case "food":
        return "bg-emerald-100 text-emerald-800";
      case "supplements":
        return "bg-slate-100 text-slate-800";
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
      case "lifestyle":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }
};

// Date utility functions
export const getDayName = (date: Date) => {
  return date.toLocaleDateString('en-US', { weekday: 'short' });
};

export const getDateString = (date: Date) => {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

// Function to generate sample skin history data
export const generateSkinHistoryData = () => {
  const today = new Date();
  return Array(7).fill(null).map((_, i) => {
    const date = new Date();
    date.setDate(today.getDate() - (6 - i));
    // Generate a random rating between 50 and 95 for demo purposes
    const rating = Math.floor(Math.random() * (95 - 50 + 1)) + 50;
    return {
      day: getDayName(date),
      date: getDateString(date),
      rating: rating
    };
  });
};
