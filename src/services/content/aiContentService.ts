
/**
 * Platform-agnostic content service
 * This centralizes AI content generation and caching logic
 */
import { supabase } from "@/integrations/supabase/client";

export interface ContentOptions {
  productId: string;
  productType: string;
  contentType: string;
}

/**
 * Get cached content or return null if not found
 */
export const getCachedContent = async ({ productId, productType, contentType }: ContentOptions) => {
  try {
    // Using "as any" to bypass TypeScript type issues temporarily
    const { data, error } = await supabase
      .from('ai_generated_content')
      .select('content, updated_at')
      .eq('product_id', productId as any)
      .eq('product_type', productType as any)
      .eq('content_type', contentType as any)
      .maybeSingle();
    
    if (error) {
      console.error("Error fetching cached content:", error);
      return null;
    }

    // If data exists, log when it was last updated
    if (data && 'updated_at' in data && data.updated_at) {
      console.log(`Found cached ${contentType} from ${new Date(data.updated_at).toLocaleString()}`);
    }
    
    return data && 'content' in data ? data.content : null;
  } catch (error) {
    console.error("Exception fetching cached content:", error);
    return null;
  }
};

/**
 * Cache content in the database
 */
export const cacheContent = async ({ 
  productId, 
  productType, 
  contentType 
}: ContentOptions, content: any): Promise<boolean> => {
  try {
    // Ensure content is JSON-serializable
    const jsonContent = JSON.parse(JSON.stringify(content));
    
    const { error } = await supabase
      .from('ai_generated_content')
      .upsert({
        product_id: productId,
        product_type: productType,
        content_type: contentType,
        content: jsonContent,
        updated_at: new Date().toISOString()
      } as any, {
        onConflict: 'product_id, product_type, content_type'
      });
    
    if (error) {
      console.error("Error caching content:", error);
      return false;
    }
    
    console.log(`Successfully cached ${contentType} for ${productType}/${productId}`);
    return true;
  } catch (error) {
    console.error("Exception caching content:", error);
    return false;
  }
};

/**
 * Pre-generates and caches detailed content for a recommendation item
 */
export const preGenerateDetailContent = async (
  type: string, 
  id: string, 
  text: string,
  contextData: any = {},
  generateFunction: (prompt: string, context: any) => Promise<any>
): Promise<any | null> => {
  try {
    if (!type || !id) {
      console.error("Invalid type or id provided to preGenerateDetailContent");
      return null;
    }
    
    // Check if we already have cached content
    const cachedContent = await getCachedContent({
      productId: `${type}-${id}`,
      productType: "ai-recommendation",
      contentType: "detail"
    });
    
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
    
    // Generate the detailed content using provided function
    const response = await generateFunction(detailPrompt, contextData);
    
    if (response && response.sections) {
      // Parse the response sections
      const detailContent = {
        title: response.sections["Title"] || text.split(':')[0],
        overview: response.sections["Overview"] || "",
        details: response.sections["Details"] || "",
        disclaimer: response.sections["Disclaimer"] || "",
        recommendations: Array.isArray(response.sections["Recommendations"]) 
          ? response.sections["Recommendations"] 
          : []
      };
      
      // Cache the content
      await cacheContent({
        productId: `${type}-${id}`,
        productType: "ai-recommendation", 
        contentType: "detail"
      }, detailContent);
      
      // Also cache with alternative format for better findability
      if (!type.startsWith('ai-') && type !== 'ai') {
        await cacheContent({
          productId: `ai-${type}-${id}`,
          productType: "ai-recommendation",
          contentType: "detail"
        }, detailContent);
      }
      
      return detailContent;
    }
    
    console.error("Failed to generate detail content");
    return null;
  } catch (error) {
    console.error("Error pre-generating detail content:", error);
    return null;
  }
};
