
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
      return { recommendationType, recommendationNumber };
    }
    
    // For URLs like /recommendations-detail/ai-timeline-1
    if (fullId.startsWith("ai-")) {
      const parts = fullId.substring(3).split('-');
      if (parts.length >= 2) {
        recommendationType = parts[0];
        recommendationNumber = parts.slice(1).join('-');
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
      recommendationNumber = parts[1];
    }
    // For any other format, treat the whole ID as the number with default type
    
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
    return [
      { type: recommendationType, id: recommendationNumber }, 
      { type: `ai-${recommendationType}`, id: recommendationNumber },
      { type: "ai", id: `${recommendationType}-${recommendationNumber}` },
      // Try the full ID as a last resort
      { type: fullId.split('-')[0] || 'recommendation', id: fullId.split('-').slice(1).join('-') || recommendationNumber }
    ].filter(variant => variant.type && variant.id);
  };
  
  return {
    parseRecommendationId,
    getRecommendationIdVariants
  };
};

export default useRecommendationIdParser;
