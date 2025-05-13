
import { useState } from "react";
import { toast } from "sonner";
import { getCachedContent, cacheContent } from "@/services/content/aiContentService";
import type { ContentOptions } from "@/services/content/aiContentService";

export const useAIContentCache = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [cacheStatus, setCacheStatus] = useState<"idle" | "fetching" | "caching" | "error">("idle");

  // Get cached content or return null if not found
  const getContent = async (options: ContentOptions) => {
    try {
      setCacheStatus("fetching");
      const content = await getCachedContent(options);
      setCacheStatus("idle");
      return content;
    } catch (error) {
      console.error("Exception fetching cached content:", error);
      setCacheStatus("error");
      return null;
    }
  };

  // Cache content in the database
  const saveContent = async (options: ContentOptions, content: any): Promise<boolean> => {
    try {
      setCacheStatus("caching");
      const result = await cacheContent(options, content);
      
      if (!result) {
        setCacheStatus("error");
        toast.error("Failed to cache AI content");
        return false;
      }
      
      setCacheStatus("idle");
      return true;
    } catch (error) {
      console.error("Exception caching content:", error);
      setCacheStatus("error");
      return false;
    }
  };

  // Get content from cache or generate it with the provided function
  const getOrGenerate = async (
    options: ContentOptions, 
    generateFn: () => Promise<any>
  ): Promise<any> => {
    setIsLoading(true);
    
    try {
      // Try to get from cache first
      const cachedContent = await getContent(options);
      
      if (cachedContent) {
        console.log(`Using cached ${options.contentType} for ${options.productType}/${options.productId}`);
        setIsLoading(false);
        return cachedContent;
      }
      
      // Generate new content if not in cache
      console.log(`Generating new ${options.contentType} for ${options.productType}/${options.productId}`);
      const generatedContent = await generateFn();
      
      // Cache the generated content
      await saveContent(options, generatedContent);
      
      setIsLoading(false);
      return generatedContent;
    } catch (error) {
      console.error("Error in getOrGenerate:", error);
      toast.error(`Failed to generate ${options.contentType}`);
      setIsLoading(false);
      return null;
    }
  };

  // Force refresh the content by regenerating and updating the cache
  const forceRefresh = async (
    options: ContentOptions, 
    generateFn: () => Promise<any>
  ): Promise<any> => {
    setIsLoading(true);
    
    try {
      console.log(`Force refreshing ${options.contentType} for ${options.productType}/${options.productId}`);
      const generatedContent = await generateFn();
      
      await saveContent(options, generatedContent);
      
      setIsLoading(false);
      toast.success(`Refreshed ${options.contentType} content`);
      return generatedContent;
    } catch (error) {
      console.error("Error in forceRefresh:", error);
      toast.error(`Failed to refresh ${options.contentType}`);
      setIsLoading(false);
      return null;
    }
  };

  return {
    isLoading,
    cacheStatus,
    getCachedContent: getContent,
    cacheContent: saveContent,
    getOrGenerate,
    forceRefresh
  };
};
