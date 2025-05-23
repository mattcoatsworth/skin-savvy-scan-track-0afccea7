
// Get color based on rating
export const getRatingColor = (rating: number) => {
  if (rating >= 80) return "bg-green-500"; 
  if (rating >= 60) return "bg-amber-500"; 
  if (rating >= 40) return "bg-yellow-500";
  if (rating >= 20) return "bg-orange-500"; 
  return "bg-red-500"; 
};

// Get background color for the rating
export const getRatingBgColor = (rating: number) => {
  if (rating >= 80) return "bg-green-50"; 
  if (rating >= 60) return "bg-amber-50"; 
  if (rating >= 40) return "bg-yellow-50";
  if (rating >= 20) return "bg-orange-50"; 
  return "bg-red-50"; 
};

// Get text color for rating
export const getRatingTextColor = (rating: number) => {
  if (rating >= 80) return "text-green-600"; 
  if (rating >= 60) return "text-amber-600"; 
  if (rating >= 40) return "text-yellow-600";
  if (rating >= 20) return "text-orange-600"; 
  return "text-red-600"; 
};

// Get rating label based on rating
export const getRatingLabel = (rating: number) => {
  if (rating >= 80) return "Great";
  if (rating >= 60) return "Good";
  if (rating >= 40) return "OK";
  if (rating >= 20) return "Fair";
  return "Poor";
};

// Get match quality based on personalized rating
export const getMatchQuality = (rating: number) => {
  if (rating >= 90) return "Excellent match";
  if (rating >= 80) return "Great match";
  if (rating >= 60) return "Good match";
  if (rating >= 40) return "Fair match";
  return "Poor match";
};
