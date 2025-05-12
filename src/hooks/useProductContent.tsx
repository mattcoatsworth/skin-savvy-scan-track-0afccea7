
import { useState, useEffect } from "react";
import { useSkinAdvice } from "@/hooks/useSkinAdvice";
import { useAIContentCache } from "@/hooks/useAIContentCache";
import { toast } from "sonner";

export const useProductContent = (product: any, type: string, id: string) => {
  // States for AI-generated content
  const [aiContent, setAiContent] = useState<Record<string, {
    formattedHtml: string;
    sections: Record<string, string | string[]>;
  }>>({
    overview: { formattedHtml: "", sections: {} },
    details: { formattedHtml: "", sections: {} },
    disclaimer: { formattedHtml: "", sections: {} }
  });
  
  const [isLoading, setIsLoading] = useState({
    overview: true,
    details: true,
    disclaimer: true
  });
  
  // Initialize the skin advice hook for different content types
  const { getAdvice: getOverviewAdvice } = useSkinAdvice({ adviceType: "general" });
  const { getAdvice: getDetailsAdvice } = useSkinAdvice({ adviceType: "product" });
  const { getAdvice: getDisclaimerAdvice } = useSkinAdvice({ adviceType: "general" });
  
  // Initialize content cache hook
  const { getOrGenerate, forceRefresh, cacheStatus } = useAIContentCache();

  // Process AI sections
  const processAIResponse = (sectionName: string, sections: Record<string, string | string[]>) => {
    const result = [];
    
    // Process only the first instance of each section type
    const processedSectionTypes = new Set<string>();
    
    for (const [key, content] of Object.entries(sections)) {
      if (processedSectionTypes.has(key)) continue;
      processedSectionTypes.add(key);
      
      if (Array.isArray(content)) {
        result.push({
          title: key,
          items: content.map((item, index) => ({
            text: item,
            type: sectionName,
            category: key,
            linkTo: `/recommendations-detail/ai-${sectionName}-${index + 1}`,
            productName: product?.name
          }))
        });
      } else if (typeof content === 'string') {
        result.push({
          title: key,
          items: [{
            text: content,
            type: sectionName,
            category: key,
            linkTo: `/recommendations-detail/ai-${sectionName}`,
            productName: product?.name
          }]
        });
      }
    }
    
    return result;
  };

  // Handle refresh of content
  const handleRefreshContent = async (contentType: 'overview' | 'details' | 'disclaimer') => {
    if (!product) return;
    
    setIsLoading(prev => ({ ...prev, [contentType]: true }));
    
    try {
      let newContent;
      
      if (contentType === 'overview') {
        const overviewPrompt = `Write a detailed overview about ${product.name} as a ${type} product and its effects on skin health. 
                              Include information about its impact (${product.impact}), what it does, and a brief description. 
                              Write this as if it's for a skincare app product detail page. Keep it under 200 words.`;
        
        newContent = await forceRefresh({
          productId: id,
          productType: type,
          contentType: 'overview'
        }, () => getOverviewAdvice(overviewPrompt, { 
          productType: type, 
          productName: product.name,
          productImpact: product.impact
        }));
      } 
      else if (contentType === 'details') {
        const detailsPrompt = `Create a detailed list of benefits and concerns for ${product.name} as a ${type} product.
                            Format your response with clear bullet points for both benefits and concerns.
                            Include at least 4 potential benefits and 3 potential concerns based on scientific research.
                            Make it specific to skin health.`;
        
        newContent = await forceRefresh({
          productId: id,
          productType: type,
          contentType: 'details'
        }, () => getDetailsAdvice(detailsPrompt, {
          productType: type,
          productName: product.name
        }));
      }
      else if (contentType === 'disclaimer') {
        const disclaimerPrompt = `Create a brief medical disclaimer about ${product.name} and skin health. Keep it under 50 words.
                               Only include the essential disclaimer text - no analysis or other sections.`;
        
        newContent = await forceRefresh({
          productId: id,
          productType: type,
          contentType: 'disclaimer'
        }, () => getDisclaimerAdvice(disclaimerPrompt, {
          productType: type,
          productName: product.name
        }));
      }
      
      if (newContent) {
        setAiContent(prev => ({
          ...prev,
          [contentType]: newContent
        }));
      }
    } catch (error) {
      console.error(`Error refreshing ${contentType}:`, error);
      toast.error(`Failed to refresh ${contentType}`);
    } finally {
      setIsLoading(prev => ({ ...prev, [contentType]: false }));
    }
  };

  useEffect(() => {
    // Get AI content for each section when product changes
    const fetchAIContent = async () => {
      if (!product) return;
      
      try {
        // Generate Overview content
        setIsLoading(prev => ({ ...prev, overview: true }));
        const overviewPrompt = `Write a detailed overview about ${product.name} as a ${type} product and its effects on skin health. 
                                Include information about its impact (${product.impact}), what it does, and a brief description. 
                                Write this as if it's for a skincare app product detail page. Keep it under 200 words.`;
        
        const overview = await getOrGenerate({
          productId: id,
          productType: type,
          contentType: 'overview'
        }, () => getOverviewAdvice(overviewPrompt, { 
          productType: type, 
          productName: product.name,
          productImpact: product.impact
        }));
        
        if (overview) {
          setAiContent(prev => ({
            ...prev, 
            overview: overview as { formattedHtml: string; sections: Record<string, string | string[]> }
          }));
        }
        setIsLoading(prev => ({ ...prev, overview: false }));
        
        // Generate Details content
        setIsLoading(prev => ({ ...prev, details: true }));
        const detailsPrompt = `Create a detailed list of benefits and concerns for ${product.name} as a ${type} product.
                              Format your response with clear bullet points for both benefits and concerns.
                              Include at least 4 potential benefits and 3 potential concerns based on scientific research.
                              Make it specific to skin health.`;
        
        const details = await getOrGenerate({
          productId: id,
          productType: type,
          contentType: 'details'
        }, () => getDetailsAdvice(detailsPrompt, {
          productType: type,
          productName: product.name
        }));
        
        if (details) {
          setAiContent(prev => ({
            ...prev, 
            details: details as { formattedHtml: string; sections: Record<string, string | string[]> }
          }));
        }
        setIsLoading(prev => ({ ...prev, details: false }));
        
        // Generate shorter Disclaimer content
        setIsLoading(prev => ({ ...prev, disclaimer: true }));
        const disclaimerPrompt = `Create a brief medical disclaimer about ${product.name} and skin health. Keep it under 50 words.
                                 Only include the essential disclaimer text - no analysis or other sections.`;
        
        const disclaimer = await getOrGenerate({
          productId: id,
          productType: type,
          contentType: 'disclaimer'
        }, () => getDisclaimerAdvice(disclaimerPrompt, {
          productType: type,
          productName: product.name
        }));
        
        if (disclaimer) {
          setAiContent(prev => ({
            ...prev, 
            disclaimer: disclaimer as { formattedHtml: string; sections: Record<string, string | string[]> }
          }));
        }
        setIsLoading(prev => ({ ...prev, disclaimer: false }));
        
      } catch (error) {
        console.error("Error generating AI content:", error);
        toast.error("There was a problem loading AI content. Please try again.");
      }
    };
    
    fetchAIContent();
  }, [product, type, id]);

  // Navigate to the chat page with initial product question
  const askAiAboutProduct = () => {
    if (!product) return;
    const initialMessage = `Can you tell me more about ${product.name} by ${product.brand || 'this brand'} and how it might affect my skin?`;
    window.location.href = `/chat?initial=${encodeURIComponent(initialMessage)}`;
  };

  return {
    aiContent,
    isLoading,
    handleRefreshContent,
    askAiAboutProduct,
    processAIResponse,
  };
};
