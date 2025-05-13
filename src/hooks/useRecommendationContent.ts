
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAIDetailCache } from "@/hooks/useAIDetailCache";
import { toast } from "sonner";

interface RecommendationContent {
  title: string;
  subtitle: string;
  emoji: string;
  impactType: "positive" | "negative";
  impactLabel: string;
  impactScore: number;
  overview: string;
  sections: Array<{
    title: string;
    content: React.ReactNode;
  }>;
}

export const useRecommendationContent = (type: string, id: string) => {
  const [content, setContent] = useState<RecommendationContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getCachedDetail, preGenerateDetailContent } = useAIDetailCache();

  const parseAIContent = (detailContent: any): RecommendationContent | null => {
    if (!detailContent) return null;

    try {
      // Determine impact type based on title/content (simple heuristic)
      const isPositive = !detailContent.title.toLowerCase().includes("limit") && 
                         !detailContent.title.toLowerCase().includes("avoid") &&
                         !detailContent.title.toLowerCase().includes("reduce");
      
      // Determine appropriate emoji
      const emoji = isPositive ? "🟢" : "🔴";
      
      // Base score (could be refined with more complex logic)
      const impactScore = isPositive ? 78 : 92;
      
      // Create section content components from the raw text
      const parsedSections = [];
      
      // Always add a detailed analysis section
      if (detailContent.details) {
        parsedSections.push({
          title: "Detailed Analysis",
          content: (
            <div className="space-y-4">
              {detailContent.details.split('\n\n').map((paragraph: string, i: number) => (
                <p key={`details-${i}`} className="text-sm text-gray-600">{paragraph}</p>
              ))}
            </div>
          )
        });
      }
      
      // Add recommendations section if available
      if (detailContent.recommendations && detailContent.recommendations.length > 0) {
        parsedSections.push({
          title: "Recommendations",
          content: (
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
              {detailContent.recommendations.map((rec: string, i: number) => (
                <li key={`rec-${i}`}>{rec}</li>
              ))}
            </ul>
          )
        });
      }
      
      // Add disclaimer section if available
      if (detailContent.disclaimer) {
        parsedSections.push({
          title: "Important Information",
          content: (
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Info className="h-4 w-4 text-blue-500" />
              </div>
              <p className="text-sm text-gray-600">{detailContent.disclaimer}</p>
            </div>
          )
        });
      }
      
      return {
        title: detailContent.title || `${type} Recommendation`,
        subtitle: `Personalized ${type} recommendation`,
        emoji,
        impactType: isPositive ? "positive" : "negative",
        impactLabel: detailContent.overview?.split('.')[0] || "Based on your data",
        impactScore,
        overview: detailContent.overview || "",
        sections: parsedSections
      };
    } catch (error) {
      console.error("Error parsing AI content:", error);
      return null;
    }
  };
  
  useEffect(() => {
    const fetchRecommendationContent = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // First try to get cached content
        const cachedContent = await getCachedDetail(type, id);
        
        if (cachedContent) {
          // Parse the cached content into our format
          const parsedContent = parseAIContent(cachedContent);
          if (parsedContent) {
            setContent(parsedContent);
            setLoading(false);
            return;
          }
        }
        
        // If no cached content or parsing failed, generate new content
        const recommendationText = `${type}: ${id.split('-').join(' ')}`;
        
        // Generate content using the edge function
        const generatedContent = await preGenerateDetailContent(
          type,
          id,
          recommendationText
        );
        
        if (generatedContent) {
          const parsedContent = parseAIContent(generatedContent);
          if (parsedContent) {
            setContent(parsedContent);
          } else {
            setError("Could not parse generated content");
          }
        } else {
          setError("Failed to generate content");
        }
      } catch (error) {
        console.error("Error in useRecommendationContent:", error);
        setError("An error occurred while generating content");
        toast.error("Failed to load recommendation details");
      } finally {
        setLoading(false);
      }
    };
    
    if (type && id) {
      fetchRecommendationContent();
    }
  }, [type, id]);
  
  return { content, loading, error };
};
