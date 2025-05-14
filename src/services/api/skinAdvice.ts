/**
 * Skin advice service abstraction
 * This separates the API logic from UI components
 */
import { supabase } from "@/integrations/supabase/client";
import { storage } from '@/utils/platform';

// Types for skin advice responses
export interface AIResponse {
  formattedHtml: string;
  sections: Record<string, string | string[]>;
  error?: string;
  rawContent?: string;
}

/**
 * Get cached response from storage
 */
const getCachedResponse = (cacheKey: string): AIResponse | null => {
  try {
    const cachedResponse = storage.get(cacheKey);
    if (cachedResponse) {
      return JSON.parse(cachedResponse);
    }
    return null;
  } catch (error) {
    console.error("Error reading from cache:", error);
    return null;
  }
};

/**
 * Parse AI response sections from raw text
 */
export const parseAIResponse = (text: string): Record<string, string | string[]> => {
  if (!text) return {};
  
  const sections: Record<string, string | string[]> = {};
  
  // Extract sections using regex
  const sectionMatches = text.matchAll(/###\s+([^:]+):\s*\n([\s\S]*?)(?=###\s+[^:]+:|$)/g);
  
  // Track section types to prevent duplicates
  const processedSectionTypes = new Set<string>();
  
  for (const match of Array.from(sectionMatches)) {
    const sectionName = match[1].trim();
    
    // Skip duplicate section types
    if (processedSectionTypes.has(sectionName)) continue;
    processedSectionTypes.add(sectionName);
    
    const sectionContent = match[2].trim();
    
    // Remove bold formatting
    const cleanContent = sectionContent.replace(/\*\*(.*?)\*\*/g, '$1');
    
    // For bullet points and numbered lists, convert to array
    if (cleanContent.match(/^[\s]*[-*•]\s+/m) || cleanContent.match(/^[\s]*\d+\.\s+/m)) {
      const items = cleanContent
        .split(/\n+/)
        .filter(item => item.trim().match(/^[\s]*[-*•]\s+|^[\s]*\d+\.\s+/))
        .map(item => item.replace(/^[\s]*[-*•]\s+|^[\s]*\d+\.\s+/, '').trim());
      
      sections[sectionName] = items;
    } else {
      sections[sectionName] = cleanContent;
    }
  }
  
  return sections;
};

/**
 * Format text content with proper HTML
 * This can be customized per platform in the UI layer
 */
export const formatTextContent = (text: string): string => {
  if (!text) return "";
  
  // Remove any bold formatting
  let formattedText = text.replace(/\*\*(.*?)\*\*/g, '$1');
  
  // Format headings, lists, etc.
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
  
  // Web-specific formatting (will be different in React Native)
  return `<div class="my-2">${formattedText}</div>`;
};

/**
 * Get AI advice based on provided context
 * This is the core API interaction that's platform-agnostic
 */
export const getSkinAdvice = async (
  question: string,
  context: Record<string, any> = {},
  options: {
    adviceType?: string;
    model?: string;
    structuredOutput?: boolean;
  } = {}
): Promise<AIResponse | null> => {
  const { adviceType = "general", model = "gpt-4o-mini", structuredOutput = false } = options;
  
  // Cache key generation
  const today = new Date().toISOString().split('T')[0];
  const cacheKey = `ai-advice-${adviceType}-${today}-${JSON.stringify(question)}`;
  
  // Check cache first
  const cachedResponse = getCachedResponse(cacheKey);
  if (cachedResponse) {
    // Validate cache for recommendation type
    if (adviceType === "recommendation" && 
        cachedResponse.sections && 
        cachedResponse.sections["Recommended Actions"]) {
      const recommendations = cachedResponse.sections["Recommended Actions"];
      if (Array.isArray(recommendations) && recommendations.length >= 8) {
        return cachedResponse;
      }
    } else if (adviceType !== "recommendation") {
      return cachedResponse;
    }
  }
  
  try {
    // Create system prompt based on advice type
    let systemPrompt = "";
    if (adviceType === "supplement") {
      systemPrompt = `
        When providing information about supplements:
        1. Always include proper medical disclaimers
        2. Avoid making direct dosage recommendations
        3. Emphasize consulting healthcare providers
        4. Discuss evidence levels objectively
        5. Mention potential side effects and interactions
        6. Clarify that individual responses may vary
      `;
    } else if (adviceType === "weekly-insight" && structuredOutput) {
      systemPrompt = `
        You are a dermatological AI assistant specialized in analyzing skin health trends.
        
        For this weekly insight analysis, return a structured JSON response with specific sections.
        Be specific, actionable, and evidence-based.
      `;
    } else {
      systemPrompt = `
        You are a dermatological AI assistant providing personalized skin advice.
        
        When formatting your response:
        - Use clear section headings
        - Use '###' before each main section heading
        - Use numbered lists for step-by-step instructions
        - Use bullet points for lists of features
        - Keep paragraphs short
        - Include specific data points when available
        - Be specific and actionable in your recommendations
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

    // Call Supabase Edge Function
    const { data, error } = await supabase.functions.invoke('chat', {
      body: { 
        messages, 
        model, 
        adviceType,
        structuredOutput 
      }
    });

    if (error) {
      throw error;
    }

    // Process the response
    let formattedResponse: AIResponse;
    
    if (structuredOutput) {
      try {
        // Handle structured output
        const parsedContent = typeof data.content === 'object' ? data.content : JSON.parse(data.content);
        
        // Cache the result before returning
        try {
          storage.set(cacheKey, JSON.stringify(parsedContent));
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
    formattedResponse = {
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
    
    // Cache the result
    try {
      storage.set(cacheKey, JSON.stringify(formattedResponse));
    } catch (cacheError) {
      console.error("Failed to cache response:", cacheError);
    }

    return formattedResponse;
  } catch (error) {
    console.error("Error getting AI skin advice:", error);
    return {
      formattedHtml: "I'm having trouble analyzing this skin information right now. Please try again in a moment.",
      sections: {}
    };
  }
};
