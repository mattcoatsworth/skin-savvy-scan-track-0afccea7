
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Json } from "@/integrations/supabase/types";

interface ContentOptions {
  productId: string;
  productType: string;
  contentType: string;
}

export const useAIContentCache = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [cacheStatus, setCacheStatus] = useState<"idle" | "fetching" | "caching" | "error">("idle");

  // Get cached content or return null if not found
  const getCachedContent = async ({ productId, productType, contentType }: ContentOptions) => {
    try {
      setCacheStatus("fetching");
      const { data, error } = await supabase
        .from('ai_generated_content')
        .select('content, updated_at')
        .eq('product_id', productId)
        .eq('product_type', productType)
        .eq('content_type', contentType)
        .maybeSingle();
      
      if (error) {
        console.error("Error fetching cached content:", error);
        setCacheStatus("error");
        return null;
      }

      // If data exists, log when it was last updated
      if (data) {
        console.log(`Found cached ${contentType} from ${new Date(data.updated_at).toLocaleString()}`);
      }
      
      setCacheStatus("idle");
      return data?.content || null;
    } catch (error) {
      console.error("Exception fetching cached content:", error);
      setCacheStatus("error");
      return null;
    }
  };

  // Cache content in the database
  const cacheContent = async ({ 
    productId, 
    productType, 
    contentType 
  }: ContentOptions, content: any): Promise<boolean> => {
    try {
      setCacheStatus("caching");
      
      // Ensure content is JSON-serializable
      const jsonContent = JSON.parse(JSON.stringify(content));
      
      const { error } = await supabase
        .from('ai_generated_content')
        .upsert({
          product_id: productId,
          product_type: productType,
          content_type: contentType,
          content: jsonContent as Json,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'product_id, product_type, content_type'
        });
      
      if (error) {
        console.error("Error caching content:", error);
        setCacheStatus("error");
        toast.error("Failed to cache AI content");
        return false;
      }
      
      console.log(`Successfully cached ${contentType} for ${productType}/${productId}`);
      setCacheStatus("idle");
      return true;
    } catch (error) {
      console.error("Exception caching content:", error);
      setCacheStatus("error");
      return false;
    }
  };

  // Get content from cache or generate it with the provided function
  const getOrGenerate = async ({ 
    productId, 
    productType, 
    contentType 
  }: ContentOptions, generateFn: () => Promise<any>): Promise<any> => {
    setIsLoading(true);
    
    try {
      // Try to get from cache first
      const cachedContent = await getCachedContent({ 
        productId, 
        productType, 
        contentType 
      });
      
      if (cachedContent) {
        console.log(`Using cached ${contentType} for ${productType}/${productId}`);
        setIsLoading(false);
        return cachedContent;
      }
      
      // Generate new content if not in cache
      console.log(`Generating new ${contentType} for ${productType}/${productId}`);
      const generatedContent = await generateFn();
      
      // Cache the generated content
      await cacheContent({ 
        productId, 
        productType, 
        contentType 
      }, generatedContent);
      
      setIsLoading(false);
      return generatedContent;
    } catch (error) {
      console.error("Error in getOrGenerate:", error);
      toast.error(`Failed to generate ${contentType}`);
      setIsLoading(false);
      return null;
    }
  };

  // Force refresh the content by regenerating and updating the cache
  const forceRefresh = async ({
    productId,
    productType,
    contentType
  }: ContentOptions, generateFn: () => Promise<any>): Promise<any> => {
    setIsLoading(true);
    
    try {
      console.log(`Force refreshing ${contentType} for ${productType}/${productId}`);
      const generatedContent = await generateFn();
      
      await cacheContent({
        productId,
        productType,
        contentType
      }, generatedContent);
      
      setIsLoading(false);
      toast.success(`Refreshed ${contentType} content`);
      return generatedContent;
    } catch (error) {
      console.error("Error in forceRefresh:", error);
      toast.error(`Failed to refresh ${contentType}`);
      setIsLoading(false);
      return null;
    }
  };

  return {
    isLoading,
    cacheStatus,
    getCachedContent,
    cacheContent,
    getOrGenerate,
    forceRefresh
  };
};
