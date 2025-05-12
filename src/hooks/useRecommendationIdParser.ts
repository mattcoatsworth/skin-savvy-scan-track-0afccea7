
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
   * - /testai suffix
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
      // First strip out any /testai suffix - this is just a route modifier
      const idWithoutTestAi = fullId.replace('/testai', '');
      
      // Handle URL encoded slashes (convert to standard format)
      const normalizedId = idWithoutTestAi.replace(/%2F/g, '/');
      
      // For URLs like /recommendations-detail/ai-timeline-1
      if (normalizedId.startsWith("ai-")) {
        const parts = normalizedId.substring(3).split('-');
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
      else if (normalizedId.includes('-')) {
        const parts = normalizedId.split('-');
        recommendationType = parts[0];
        recommendationNumber = parts.slice(1).join('-');
      } 
      // For URLs like /recommendations-detail/timeline/1
      else if (normalizedId.includes('/')) {
        const parts = normalizedId.split('/');
        recommendationType = parts[0];
        recommendationNumber = parts[1] || "1";
      }
      // Handle case where the URL is just "ai"
      else if (normalizedId === "ai") {
        recommendationType = "ai";
        recommendationNumber = "1";
      }
      // For any other format, treat the whole ID as the type with default number
      else {
        recommendationType = normalizedId;
        recommendationNumber = "1";
      }
      
      // Log the parsed values
      console.log(`Parsed recommendation: type=${recommendationType}, number=${recommendationNumber}, from fullId=${fullId}`);
    } catch (error) {
      console.error("Error parsing recommendation ID:", error, fullId);
      // Use defaults if parsing fails
    }
    
    return { recommendationType, recommendationNumber };
  };
  
  /**
   * Generate more comprehensive variants of a recommendation ID to maximize chance of finding content
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
    console.log(`Generating variants for: type=${recommendationType}, number=${recommendationNumber}, fullId=${fullId}`);
    
    // Create more comprehensive variants to maximize chances of finding content
    const variants = [
      // Original format
      { type: recommendationType, id: recommendationNumber },
      
      // With "ai-" prefix for type
      { type: `ai-${recommendationType}`, id: recommendationNumber },
      { type: "ai", id: `${recommendationType}-${recommendationNumber}` },
      
      // Without "ai-" prefix if it exists
      recommendationType.startsWith('ai-') 
        ? { type: recommendationType.substring(3), id: recommendationNumber } 
        : null,
      
      // Handle potential alternative formats
      { type: "ai", id: recommendationType }, // For cases where the type itself is the ID
      { type: recommendationType, id: "1" }, // Default ID if missing
      
      // Try the full ID as a last resort (with different splits)
      { type: fullId.split('-')[0] || 'recommendation', id: fullId.split('-').slice(1).join('-') || recommendationNumber },
      { type: fullId, id: "1" } // Use full ID as type with default number
    ].filter(Boolean); // Filter out nulls
    
    // Filter out invalid variants and log
    const validVariants = variants.filter(variant => variant && variant.type && variant.id);
    console.log("Generated variants for lookup:", validVariants);
    
    return validVariants;
  };
  
  return {
    parseRecommendationId,
    getRecommendationIdVariants
  };
};

export default useRecommendationIdParser;
