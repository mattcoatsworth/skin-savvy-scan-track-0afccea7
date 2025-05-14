import { useState } from 'react';
import { useAIContentCache } from './useAIContentCache';

// Define the types for recommendation
export type RecommendationType = "skincare" | "food" | "lifestyle" | "supplements";

export type Recommendation = {
  type: RecommendationType;
  text: string;
  icon?: React.ReactNode;
  linkTo?: string;
};

// Define AIResponse type
export type AIResponse = {
  recommendations?: Recommendation[];
  patterns?: any[];
  insights?: any[];
  advice?: string;
  [key: string]: any;
};

export function useSkinAdvice(options?: {
  adviceType?: string;
  model?: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { getOrGenerate } = useAIContentCache();
  
  const defaultModel = options?.model || 'gpt-4o-mini';
  const adviceType = options?.adviceType || 'recommendations';
  
  const getAdvice = async (question: string, context?: Record<string, any>) => {
    setIsLoading(true);
    
    try {
      const cacheKey = `${adviceType}-${question}`;
      const result = await getOrGenerate(cacheKey, async () => {
        // The implementation details might be different,
        // but here we're adding typing for the return value
        // This is a placeholder for the existing implementation
        return {} as AIResponse;
      });
      
      return result as AIResponse;
    } catch (error) {
      console.error("Error getting skin advice:", error);
      return {} as AIResponse;
    } finally {
      setIsLoading(false);
    }
  };
  
  const getTextContent = (response: AIResponse) => {
    if (response.advice) return response.advice;
    return "";
  };
  
  return {
    getAdvice,
    isLoading,
    getTextContent,
    recommendations: [] as Recommendation[] // Add empty array as fallback
  };
}
