
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSkinAdvice } from "@/hooks/useSkinAdvice";
import { toast } from "sonner";
import { Json } from "@/integrations/supabase/types";

// Define proper types for our content structure
interface DetailContent {
  title: string;
  overview: string;
  details: string;
  disclaimer: string;
  recommendations: string[];
}

/**
 * Hook that handles caching and pre-generating AI detail content for recommendation cards
 * IMPORTANT: This hook is designed to pre-generate detailed content as soon as cards are created
 * in the skin analysis page, rather than waiting until the user clicks on them
 */
export const useAIDetailCache = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { getAdvice } = useSkinAdvice({ 
    adviceType: "general", 
    model: "gpt-4o-mini" 
  });

  /**
   * Stores a generated content object in Supabase for fast retrieval later
   */
  const cacheDetailContent = async (
    type: string,
    id: string, 
    content: DetailContent
  ): Promise<boolean> => {
    try {
      // Format the cache key
      const productId = `${type}-${id}`;
      const productType = "ai-recommendation";
      const contentType = "detail";
      
      // Convert DetailContent to a plain object that matches Json type
      const jsonContent = content as unknown as Json;
      
      // Insert or update the content in Supabase
      const { error } = await supabase
        .from('ai_generated_content')
        .upsert({
          product_id: productId,
          product_type: productType,
          content_type: contentType,
          content: jsonContent,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'product_id, product_type, content_type'
        });
      
      if (error) {
        console.error("Error caching AI detail content:", error);
        return false;
      }
      
      console.log(`Successfully cached detail content for ${productId}`);
      return true;
    } catch (error) {
      console.error("Failed to cache detail content:", error);
      return false;
    }
  };

  /**
   * Fetches cached AI detail content from Supabase
   */
  const getCachedDetail = async (type: string, id: string): Promise<DetailContent | null> => {
    try {
      const productId = `${type}-${id}`;
      const productType = "ai-recommendation";
      const contentType = "detail";
      
      const { data, error } = await supabase
        .from('ai_generated_content')
        .select('content')
        .eq('product_id', productId)
        .eq('product_type', productType)
        .eq('content_type', contentType)
        .maybeSingle();
      
      if (error) {
        console.error("Error fetching cached detail content:", error);
        return null;
      }
      
      // Ensure content has all expected fields by properly type checking
      if (data?.content && typeof data.content === 'object' && data.content !== null) {
        const content = data.content as any;
        
        // Type-safely extract content fields
        return {
          title: typeof content.title === 'string' ? content.title : "",
          overview: typeof content.overview === 'string' ? content.overview : "",
          details: typeof content.details === 'string' ? content.details : "",
          disclaimer: typeof content.disclaimer === 'string' ? content.disclaimer : "",
          recommendations: Array.isArray(content.recommendations) ? content.recommendations : []
        };
      }
      
      return null;
    } catch (error) {
      console.error("Failed to fetch cached detail content:", error);
      return null;
    }
  };

  /**
   * Pre-generates and caches detailed content for a recommendation item
   * This should be called as soon as new AI analysis cards are created in the skin analysis
   */
  const preGenerateDetailContent = async (
    type: string, 
    id: string, 
    text: string,
    contextData: any = {}
  ): Promise<DetailContent | null> => {
    try {
      setIsGenerating(true);
      
      // Check if we already have cached content
      const cachedContent = await getCachedDetail(type, id);
      if (cachedContent) {
        console.log(`Detail content for ${type}-${id} already exists, skipping generation`);
        return cachedContent;
      }
      
      // Build a detailed prompt based on the recommendation text
      const detailPrompt = `
        Create detailed information about this skin care recommendation: "${text}"
        
        Please provide:
        1. A clear title for this recommendation (just the key concept, 2-5 words)
        2. A concise overview paragraph explaining the concept
        3. Detailed information including benefits, how to implement, and expected results
        4. 3-5 specific recommendations related to this topic
        5. A brief medical disclaimer appropriate for skin care advice
        
        Format your response with the following sections:
        ### Title: [Your Title]
        ### Overview: [Single paragraph overview]
        ### Details: [Several paragraphs of detailed information]
        ### Recommendations: [Bulleted list of specific recommendations]
        ### Disclaimer: [Brief appropriate medical disclaimer]
      `;
      
      // Generate the detailed content using AI
      const response = await getAdvice(detailPrompt, contextData);
      
      if (response && response.sections) {
        // Parse the response sections
        const detailContent: DetailContent = {
          title: response.sections["Title"] as string || text.split(':')[0],
          overview: response.sections["Overview"] as string || "",
          details: response.sections["Details"] as string || "",
          disclaimer: response.sections["Disclaimer"] as string || "",
          recommendations: Array.isArray(response.sections["Recommendations"]) 
            ? response.sections["Recommendations"] as string[] 
            : []
        };
        
        // Cache the content in Supabase
        await cacheDetailContent(type, id, detailContent);
        
        return detailContent;
      }
      
      console.error("Failed to generate detail content");
      return null;
    } catch (error) {
      console.error("Error pre-generating detail content:", error);
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  /**
   * Pre-generates detail content for multiple recommendation items in batch
   */
  const preGenerateMultipleDetails = async (items: Array<{
    type: string;
    id: string;
    text: string;
    contextData?: any;
  }>) => {
    let generatedCount = 0;
    let skippedCount = 0;
    
    // Process in batches to avoid rate limiting
    const batchSize = 3;
    
    for (let i = 0; i < items.length; i += batchSize) {
      const batch = items.slice(i, i + batchSize);
      
      // Process each batch in parallel
      await Promise.all(batch.map(async (item) => {
        // Check if already cached
        const cached = await getCachedDetail(item.type, item.id);
        if (cached) {
          skippedCount++;
          return;
        }
        
        // Generate and cache
        const result = await preGenerateDetailContent(
          item.type, 
          item.id, 
          item.text,
          item.contextData
        );
        
        if (result) {
          generatedCount++;
        }
      }));
      
      // Add a small delay between batches to avoid rate limiting
      if (i + batchSize < items.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    console.log(`Pre-generation complete: ${generatedCount} generated, ${skippedCount} already existed`);
    return { generatedCount, skippedCount };
  };

  return {
    isGenerating,
    preGenerateDetailContent,
    preGenerateMultipleDetails,
    getCachedDetail,
    cacheDetailContent
  };
};
