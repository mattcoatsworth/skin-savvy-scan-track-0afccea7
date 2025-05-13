
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";

type AdviceType = "general" | "product" | "recommendation" | "action" | "supplement" | "weekly-insight";

interface UseSkinAdviceProps {
  adviceType?: AdviceType;
  model?: string;
  structuredOutput?: boolean;
}

interface AIResponse {
  formattedHtml: string;
  sections: Record<string, string | string[]>;
  error?: string;
  rawContent?: string;
}

export const useSkinAdvice = ({
  adviceType = "general",
  model = "gpt-4o-mini",
  structuredOutput = false
}: UseSkinAdviceProps = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  // Scroll to top when location changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Parse the AI response to extract sections
  const parseAIResponse = (text: string): Record<string, string | string[]> => {
    if (!text) return {};
    
    const sections: Record<string, string | string[]> = {};
    
    // Extract sections using regex
    const sectionMatches = text.matchAll(/###\s+([^:]+):\s*\n([\s\S]*?)(?=###\s+[^:]+:|$)/g);
    
    // Track section types to prevent duplicates
    const processedSectionTypes = new Set<string>();
    
    for (const match of sectionMatches) {
      const sectionName = match[1].trim();
      
      // Skip duplicate section types (like "Brief Summary" or "Key Benefits")
      if (processedSectionTypes.has(sectionName)) continue;
      processedSectionTypes.add(sectionName);
      
      const sectionContent = match[2].trim();
      
      // Remove bold formatting
      const cleanContent = sectionContent.replace(/\*\*(.*?)\*\*/g, '$1');
      
      // For bullet points and numbered lists, convert to array
      if (cleanContent.match(/^[\s]*[-*•]\s+/m) || cleanContent.match(/^[\s]*\d+\.\s+/m)) {
        // Extract bullet points or numbered items
        const items = cleanContent
          .split(/\n+/)
          .filter(item => item.trim().match(/^[\s]*[-*•]\s+|^[\s]*\d+\.\s+/))
          .map(item => {
            // Clean the item text, removing formatting markers
            return item
              .replace(/^[\s]*[-*•]\s+|^[\s]*\d+\.\s+/, '')
              .trim();
          });
          
        // Log the number of items found for debugging (specifically for recommendations)
        if (sectionName === "Recommended Actions") {
          console.log(`Found ${items.length} recommendations in AI response`);
        }
          
        sections[sectionName] = items;
      } else {
        sections[sectionName] = cleanContent;
      }
    }
    
    return sections;
  };

  // Format raw text with bullet points and sections
  const formatTextContent = (text: string): string => {
    if (!text) return "";
    
    // Remove any bold formatting
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, '$1');
    
    // Add proper HTML for sections with headings
    formattedText = formattedText
      // Format main headings (e.g., "Key Observations:")
      .replace(/\n\s*([A-Z][A-Za-z\s]+):\s*\n/g, '<h3 class="text-lg font-medium mt-4 mb-2">$1</h3>\n')
      .replace(/^([A-Z][A-Za-z\s]+):\s*\n/gm, '<h3 class="text-lg font-medium mt-4 mb-2">$1</h3>\n')
      .replace(/###\s+([^:]+):\s*\n/g, '<h3 class="text-lg font-medium mt-4 mb-2">$1</h3>\n')
      // Format subheadings (e.g., "1. Something Important")
      .replace(/\n\s*(\d+\.\s+[A-Z][A-Za-z\s]+):\s*/g, '<h4 class="font-medium mt-3 mb-1">$1</h4>\n')
      // Add a container for section content
      .replace(/<h3 class="text-lg font-medium mt-4 mb-2">(.*?)<\/h3>/g, 
        '<div class="mt-4 mb-3"><h3 class="text-lg font-medium mb-2">$1</h3>');
    
    // Format lists
    formattedText = formattedText
      // Numbered lists
      .replace(/(?:\n|^)(?:\d+\.\s+(.*?)(?:\n|$))+/gs, function(match) {
        const items = match.trim().split(/\n\d+\.\s+/);
        const listItems = items.filter(item => item).map(item => `<li class="py-1">${item}</li>`).join('');
        return `\n<ol class="list-decimal pl-5 space-y-1 my-3">${listItems}</ol>\n`;
      })
      // Bullet lists with asterisks
      .replace(/(?:\n|^)(?:\*\s+(.*?)(?:\n|$))+/gs, function(match) {
        const items = match.trim().split(/\n\*\s+/);
        const listItems = items.filter(item => item).map(item => `<li class="py-1">${item}</li>`).join('');
        return `\n<ul class="list-disc pl-5 space-y-1 my-3">${listItems}</ul>\n`;
      })
      // Bullet lists with dashes
      .replace(/(?:\n|^)(?:-\s+(.*?)(?:\n|$))+/gs, function(match) {
        const items = match.trim().split(/\n-\s+/);
        const listItems = items.filter(item => item).map(item => `<li class="py-1">${item}</li>`).join('');
        return `\n<ul class="list-disc pl-5 space-y-1 my-3">${listItems}</ul>\n`;
      })
      // Bullet lists with bullets
      .replace(/(?:\n|^)(?:•\s+(.*?)(?:\n|$))+/gs, function(match) {
        const items = match.trim().split(/\n•\s+/);
        const listItems = items.filter(item => item).map(item => `<li class="py-1">${item}</li>`).join('');
        return `\n<ul class="list-disc pl-5 space-y-1 my-3">${listItems}</ul>\n`;
      });
    
    // Format key-value pairs (e.g., "Hydration: 85%")
    formattedText = formattedText
      .replace(/\n([A-Za-z\s]+):\s*([^\n]+)/g, '\n<div class="flex justify-between my-1"><span class="font-medium">$1:</span> <span>$2</span></div>');
    
    // Format paragraphs
    formattedText = formattedText
      .replace(/\n\n/g, '</div><div class="mt-4 mb-3">')
      .replace(/\n(?!\s*<)/g, '<br/>');
    
    // Wrap in a container
    return `<div class="my-2">${formattedText}</div>`;
  };

  // Helper method to extract text content from AIResponse for string states
  const getTextContent = (response: AIResponse | null): string => {
    if (!response) return "";
    if (response.error) return response.error;
    if (response.formattedHtml) {
      // Basic stripping of HTML tags for plain text
      return response.formattedHtml.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    }
    return "";
  };

  // Get AI advice based on provided context
  const getAdvice = async (
    question: string, 
    context: Record<string, any> = {}
  ): Promise<AIResponse | null> => {
    // Check if we have a cached response for this exact question in localStorage
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    const cacheKey = `ai-advice-${adviceType}-${today}-${JSON.stringify(question)}`;
    
    try {
      const cachedResponse = localStorage.getItem(cacheKey);
      
      if (cachedResponse) {
        const parsedCache = JSON.parse(cachedResponse);
        
        // FIXED: Improved cache validation - ensure we have exactly 8 or more recommendations
        if (parsedCache.sections && parsedCache.sections["Recommended Actions"]) {
          const recommendations = parsedCache.sections["Recommended Actions"];
          if (Array.isArray(recommendations) && recommendations.length >= 8) {
            console.log(`Using cached recommendations: found ${recommendations.length} items`);
            return parsedCache;
          } else {
            console.log(`Cache invalid: only ${Array.isArray(recommendations) ? recommendations.length : 0} recommendations found, need at least 8`);
            // Don't use the cache if it doesn't have at least 8 recommendations
          }
        } else {
          // For non-recommendation advice types, use cache as-is
          if (adviceType !== "recommendation") {
            return parsedCache;
          }
          console.log("Cache invalid: no Recommended Actions section found");
        }
      }
    } catch (cacheError) {
      console.error("Error reading from cache:", cacheError);
      // Continue with API call if cache read fails
    }
    
    try {
      setIsLoading(true);

      // Check for auth session first
      const { data: { session } } = await supabase.auth.getSession();
      
      // Add user context if available
      if (session?.user) {
        // Fetch recent skin logs - using type assertion to fix TypeScript errors
        const { data: recentLogs } = await supabase
          .from('skin_logs')
          .select('*, daily_factors(*)')
          .eq('user_id', session.user.id as any)
          .order('log_date', { ascending: false })
          .limit(7);
          
        // Fetch recent product usage
        const { data: recentProducts } = await supabase
          .from('product_usage')
          .select('*')
          .eq('user_id', session.user.id as any)
          .order('usage_date', { ascending: false })
          .limit(5);
          
        // Add to context
        context.userSkinLogs = recentLogs || [];
        context.userProductUsage = recentProducts || [];
      }

      // Add supplement-specific system guidance if this is supplement content
      let systemPrompt = "";
      
      if (adviceType === "supplement" || 
         (adviceType === "recommendation" && context.supplementName)) {
        systemPrompt = `
          When providing information about supplements:
          1. Always include proper medical disclaimers
          2. Avoid making direct dosage recommendations (instead say "commonly reported dosages include...")
          3. Emphasize consulting healthcare providers
          4. Discuss evidence levels objectively
          5. Mention potential side effects and interactions
          6. Clarify that individual responses may vary
          7. Do not use bold text formatting with asterisks (no ** formatting)
        `;
      } else if (adviceType === "weekly-insight" && structuredOutput) {
        systemPrompt = `
          You are a dermatological AI assistant specialized in analyzing skin health trends.
          
          For this weekly insight analysis, return a structured JSON response with these sections:
          
          1. "patternAnalysis": 2-3 paragraphs analyzing weekly skin patterns, connections between factors.
          2. "detectedPatterns": Array of 3-4 patterns with "category" (e.g. "Food & Hydration", "Sleep & Stress"), "title", "description", and "correlation" (percentage).
          3. "focusAreas": Array of 3 focus areas with "title", "description", "priority" (primary/secondary/tertiary), and "type" (product/habit/diet/lifestyle).
          4. "metrics": Object with numerical metric changes: {"overall": +/-%, "hydration": +/-%, "inflammation": +/-%, "breakouts": +/-%}.
          5. "challenges": Array of 2 recommended challenges with "title", "description", "difficulty" (easy/medium/hard).
          
          Be specific, actionable, and evidence-based. Format the response as valid parseable JSON without additional text.
          Do not use bold text formatting with asterisks (no ** formatting).
        `;
      } else {
        // For all pages, guide the AI to format content nicely with clear structure
        systemPrompt = `
          You are a dermatological AI assistant providing personalized skin advice.
          
          When formatting your response:
          - Use clear section headings with a title followed by colon (like "Key Benefits:", "Usage Instructions:")
          - Use '###' before each main section heading (like "### Key Benefits:")
          - Use numbered lists (1. First item) for step-by-step instructions or priorities
          - Use bullet points (- Item) for lists of features, benefits, or observations
          - Keep paragraphs short (2-3 sentences max)
          - Use key-value formatting for metrics or ratings (e.g., "Hydration: 85%")
          - Include specific data points when available
          - Be specific and actionable in your recommendations
          - DO NOT use bold text with asterisks (no ** formatting)
          - IMPORTANT: Ensure you provide only ONE of each section type (e.g., one "Brief Summary", one "Key Benefits", etc.)
          - CRUCIAL: You MUST provide EXACTLY 8 DISTINCT recommendations in a bullet list format under the "### Recommended Actions:" section
          - If asked for recommendations, you MUST ensure there are EXACTLY 8 distinct, specific recommendations
          
          Organize your analysis into these types of sections:
          1. "### Brief Summary:" (2-3 sentences overview)
          2. "### Key Benefits/Observations:" (bullet points)
          3. "### Contributing Factors:" (bullet points for skin analysis)
          4. "### Recommended Actions:" or "### Usage Instructions:" (EXACTLY 8 items in numbered list or bullet points)
          5. "### Potential Concerns:" or "### Expected Timeline:" (bullet points)
          
          Be evidence-based and specific to the user's situation.
        `;
      }

      // Create messages for the AI
      const messages = [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: `
            Context: ${JSON.stringify(context)}
            
            Question/Topic: ${question}
            
            Please provide personalized skin advice based on this information.
            ${adviceType === "recommendation" ? "IMPORTANT: Please provide EXACTLY 8 distinct, specific recommendations." : ""}
          `
        }
      ];

      // Call our Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('chat', {
        body: { 
          messages, 
          model, 
          adviceType,
          structuredOutput 
        }
      });

      if (error) {
        console.error("Error calling Edge Function:", error);
        toast.error("Failed to get AI skin advice. Please try again.");
        return {
          formattedHtml: "I'm having trouble analyzing this skin information right now. Please try again in a moment.",
          sections: {}
        };
      }

      // If structured output is requested, try to parse the content as JSON
      if (structuredOutput) {
        try {
          // If data.content is already an object, return it
          if (typeof data.content === 'object' && data.content !== null) {
            // Cache the result before returning
            try {
              localStorage.setItem(cacheKey, JSON.stringify(data.content));
            } catch (cacheError) {
              console.error("Failed to cache structured response:", cacheError);
            }
            return data.content;
          }
          
          // Otherwise try to parse it as JSON
          const parsedContent = JSON.parse(data.content);
          
          // Cache the result before returning
          try {
            localStorage.setItem(cacheKey, JSON.stringify(parsedContent));
          } catch (cacheError) {
            console.error("Failed to cache structured response:", cacheError);
          }
          
          return parsedContent;
        } catch (e) {
          console.error("Error parsing structured output:", e);
          return { 
            formattedHtml: "Failed to parse structured response", 
            sections: {},
            error: "Failed to parse structured response", 
            rawContent: data.content 
          };
        }
      }

      // Remove any bold formatting from the content
      const cleanedContent = data.content.replace(/\*\*(.*?)\*\*/g, '$1');
      
      // Parse AI response into sections
      const parsedResponse = parseAIResponse(cleanedContent);
      
      // Format the text for better readability
      const formattedResponse = {
        formattedHtml: formatTextContent(cleanedContent),
        sections: parsedResponse
      };
      
      // Log the recommendations count to help debug
      console.log("Parsed recommendations count:", 
        Array.isArray(parsedResponse["Recommended Actions"]) ? 
        parsedResponse["Recommended Actions"].length : 
        "Not an array");
      
      // FIXED: Always ensure we have exactly 8 recommendations
      if (!parsedResponse["Recommended Actions"] || 
          !Array.isArray(parsedResponse["Recommended Actions"]) || 
          parsedResponse["Recommended Actions"].length !== 8) {
        console.log(`Adding fallback recommendations as ${Array.isArray(parsedResponse["Recommended Actions"]) ? parsedResponse["Recommended Actions"].length : 0} were returned instead of 8`);
        
        // Create exactly 8 fallback recommendations
        const defaultRecommendations = [
          "Use a hydrating serum: Apply hyaluronic acid serum before moisturizer",
          "Try gentle exfoliation: Use a mild chemical exfoliant 2-3 times per week",
          "Increase water intake: Aim for at least 8 glasses daily",
          "Apply SPF daily: Even on cloudy days and when indoors",
          "Consider a humidifier: Add moisture to your living space",
          "Monitor the effects of supplements: Track any changes from recent additions",
          "Practice stress-reduction techniques: Try mindfulness or short breaks",
          "Use antioxidant-rich products: Look for vitamin C or E in formulations"
        ];
        
        // If no recommendations or not an array, use all defaults
        if (!parsedResponse["Recommended Actions"] || !Array.isArray(parsedResponse["Recommended Actions"])) {
          parsedResponse["Recommended Actions"] = [...defaultRecommendations];
        }
        // If too few, add from defaults to get to exactly 8
        else if (parsedResponse["Recommended Actions"].length < 8) {
          const missingCount = 8 - parsedResponse["Recommended Actions"].length;
          const additionalRecs = defaultRecommendations.slice(0, missingCount);
          parsedResponse["Recommended Actions"] = [
            ...parsedResponse["Recommended Actions"],
            ...additionalRecs
          ];
        }
        // If too many, truncate to exactly 8
        else if (parsedResponse["Recommended Actions"].length > 8) {
          parsedResponse["Recommended Actions"] = parsedResponse["Recommended Actions"].slice(0, 8);
        }
        
        // Update the response with our fixed recommendations
        formattedResponse.sections = parsedResponse;
      }
      
      // Log the final recommendations count after fixing
      console.log("Final recommendations count:", 
        Array.isArray(formattedResponse.sections["Recommended Actions"]) ? 
        formattedResponse.sections["Recommended Actions"].length : 
        "Not an array");
      
      // Cache the result before returning
      try {
        localStorage.setItem(cacheKey, JSON.stringify(formattedResponse));
      } catch (cacheError) {
        console.error("Failed to cache response:", cacheError);
      }

      return formattedResponse;
    } catch (error) {
      console.error("Error getting AI skin advice:", error);
      toast.error("Failed to get skin advice. Please try again.");
      return {
        formattedHtml: "I'm having trouble analyzing this skin information right now. Please try again in a moment.",
        sections: {}
      };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getAdvice,
    isLoading,
    getTextContent
  };
};
