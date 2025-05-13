
/**
 * A simple hook for parsing recommendation IDs into human-readable text
 */

export const useRecommendationIdParser = () => {
  // Convert kebab-case id to title case text
  const idToTitle = (id: string): string => {
    return id
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Convert kebab-case id to sentence case text
  const idToSentence = (id: string): string => {
    const sentence = id.split('-').join(' ');
    return sentence.charAt(0).toUpperCase() + sentence.slice(1);
  };

  // Convert title to kebab-case id
  const titleToId = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  };

  return {
    idToTitle,
    idToSentence,
    titleToId
  };
};

export default useRecommendationIdParser;
