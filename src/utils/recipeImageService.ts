
/**
 * Recipe Image Service
 * Helps find relevant images for recipes based on their ingredients and names
 */

// Base URL for food image search
const FOOD_IMAGE_BASE_URL = "https://source.unsplash.com/featured/?food,";

/**
 * Gets a relevant image for a recipe based on its name and main ingredients
 * @param recipe Recipe object containing name and ingredients
 * @returns URL for a relevant image
 */
export const getRelevantRecipeImage = (recipe: any): string => {
  if (!recipe) return getDefaultFoodImage();
  
  try {
    // Extract keywords from recipe name and first 3 ingredients
    const nameKeywords = extractKeywords(recipe.name, 2);
    const ingredientKeywords = recipe.ingredients 
      ? extractKeywords(recipe.ingredients.slice(0, 3).join(' '), 3) 
      : [];
    
    // Combine keywords and remove duplicates
    const allKeywords = [...new Set([...nameKeywords, ...ingredientKeywords])];
    
    // Select the most relevant keywords (max 3)
    const relevantKeywords = selectRelevantKeywords(allKeywords, 3);
    
    // Create search query
    const query = relevantKeywords.join(',');
    
    // Add a cache-busting parameter to ensure we get different images
    // for similar recipes
    const cacheBuster = `&cb=${recipe.name.length}${recipe.ingredients?.[0]?.length || 0}`;
    
    // Return the image URL with the query
    return `${FOOD_IMAGE_BASE_URL}${query}${cacheBuster}`;
  } catch (error) {
    console.error("Error getting recipe image:", error);
    return getDefaultFoodImage();
  }
};

/**
 * Get a random fallback food image
 */
export const getDefaultFoodImage = (): string => {
  // Collection of high-quality food images
  const fallbackImages = [
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop&q=80",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop&q=80",
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop&q=80",
    "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&h=400&fit=crop&q=80"
  ];
  
  // Return a random image from the collection
  return fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
};

/**
 * Extract relevant keywords from a string
 * @param text Text to extract keywords from
 * @param maxKeywords Maximum number of keywords to extract
 * @returns Array of keywords
 */
const extractKeywords = (text: string, maxKeywords: number): string[] => {
  if (!text) return [];
  
  // Remove special characters and split into words
  const words = text.toLowerCase()
    .replace(/[^\w\s]/gi, '')
    .split(/\s+/);
  
  // Filter out common words, articles, etc.
  const stopWords = ['and', 'the', 'with', 'a', 'an', 'of', 'for', 'in', 'on', 'to', 'recipe'];
  const filteredWords = words.filter(word => 
    word.length > 2 && !stopWords.includes(word)
  );
  
  // Return the top N keywords
  return filteredWords.slice(0, maxKeywords);
};

/**
 * Select the most relevant keywords for food image search
 * @param keywords Array of keywords
 * @param maxKeywords Maximum number of keywords to select
 * @returns Array of selected keywords
 */
const selectRelevantKeywords = (keywords: string[], maxKeywords: number): string[] => {
  // List of food categories and ingredients that make good search terms
  const relevantFoodTerms = [
    'chicken', 'beef', 'fish', 'salmon', 'pasta', 'rice', 'potato', 
    'vegetable', 'salad', 'soup', 'stew', 'curry', 'breakfast',
    'dinner', 'lunch', 'dessert', 'cake', 'fruit', 'bread'
  ];
  
  // Prioritize keywords that match relevant food terms
  const prioritizedKeywords = keywords.sort((a, b) => {
    const aIsRelevant = relevantFoodTerms.includes(a);
    const bIsRelevant = relevantFoodTerms.includes(b);
    
    if (aIsRelevant && !bIsRelevant) return -1;
    if (!aIsRelevant && bIsRelevant) return 1;
    return 0;
  });
  
  return prioritizedKeywords.slice(0, maxKeywords);
};
