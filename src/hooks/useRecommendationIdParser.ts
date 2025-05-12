
/**
 * Custom hook for parsing recommendation IDs from URLs
 * This centralizes the logic for extracting type and ID components from various URL formats
 */
export const useRecommendationIdParser = () => {
  /**
   * Parse a recommendation ID string into its type and number components
   * Handles multiple URL formats:
   * - ai-timeline-1
   * - timeline-1
   * - timeline/1
   * - ai/timeline/1
   * 
   * @param fullId The full ID string from the URL
   * @returns Object containing recommendationType and recommendationNumber
   */
  const parseRecommendationId = (fullId: string) => {
    console.log("Parsing recommendation ID:", fullId);
    
    // Default values
    let recommendationType = "recommendation";
    let recommendationNumber = "1";
    
    if (!fullId) {
      console.warn("Empty recommendation ID received");
      return { recommendationType, recommendationNumber };
    }
    
    try {
      // For URLs like /recommendations-detail/ai-timeline-1
      if (fullId.startsWith("ai-")) {
        const parts = fullId.substring(3).split('-');
        if (parts.length >= 2) {
          recommendationType = parts[0];
          recommendationNumber = parts.slice(1).join('-');
        } else if (parts.length === 1) {
          // Handle case like "ai-timeline" (no number)
          recommendationType = parts[0];
          recommendationNumber = "1"; // Default
        }
      } 
      // For URLs like /recommendations-detail/timeline-1
      else if (fullId.includes('-')) {
        const parts = fullId.split('-');
        recommendationType = parts[0];
        recommendationNumber = parts.slice(1).join('-');
      } 
      // For URLs like /recommendations-detail/timeline/1
      else if (fullId.includes('/')) {
        const parts = fullId.split('/');
        recommendationType = parts[0];
        recommendationNumber = parts[1] || "1";
      }
      // For any other format, treat the whole ID as the type with default number
      else {
        recommendationType = fullId;
        recommendationNumber = "1";
      }
    } catch (error) {
      console.error("Error parsing recommendation ID:", error, fullId);
      // Use defaults if parsing fails
    }
    
    console.log(`Parsed route: type=${recommendationType}, number=${recommendationNumber}, fullId=${fullId}`);
    
    return { recommendationType, recommendationNumber };
  };
  
  /**
   * Generate possible variants of a recommendation ID to maximize chance of finding content
   * 
   * @param recommendationType The type component of the ID
   * @param recommendationNumber The number component of the ID
   * @param fullId The full original ID string
   * @returns Array of variant objects with type and id properties
   */
  const getRecommendationIdVariants = (
    recommendationType: string, 
    recommendationNumber: string, 
    fullId: string
  ) => {
    // Create more comprehensive variants to maximize chances of finding content
    const variants = [
      // Standard formats
      { type: recommendationType, id: recommendationNumber },
      { type: `ai-${recommendationType}`, id: recommendationNumber },
      { type: "ai", id: `${recommendationType}-${recommendationNumber}` },
      
      // Handle potential alternative formats
      { type: "ai", id: recommendationType }, // For cases where the type itself is the ID
      { type: recommendationType, id: "1" }, // Default ID if missing
      
      // Try the full ID as a last resort (with different splits)
      { type: fullId.split('-')[0] || 'recommendation', id: fullId.split('-').slice(1).join('-') || recommendationNumber },
      { type: fullId, id: "1" } // Use full ID as type with default number
    ];
    
    // Filter out invalid variants and log
    const validVariants = variants.filter(variant => variant.type && variant.id);
    console.log("Generated variants for lookup:", validVariants);
    
    return validVariants;
  };
  
  return {
    parseRecommendationId,
    getRecommendationIdVariants
  };
};

export default useRecommendationIdParser;
