
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

  // Format raw text with bullet points and sections
  const formatTextContent = (text: string): string => {
    if (!text) return "";
    
    // Add proper HTML for sections with headings
    let formattedText = text
      .replace(/\n\s*([A-Z][A-Za-z\s]+):\s*\n/g, '<h3 class="text-lg font-medium mt-4 mb-2">$1</h3>\n')
      .replace(/^([A-Z][A-Za-z\s]+):\s*\n/gm, '<h3 class="text-lg font-medium mt-4 mb-2">$1</h3>\n');
    
    // Format lists
    formattedText = formattedText
      .replace(/(?:\n|^)(?:\d+\.\s+(.*?)(?:\n|$))+/gs, function(match) {
        const items = match.trim().split(/\n\d+\.\s+/);
        const listItems = items.filter(item => item).map(item => `<li>${item}</li>`).join('');
        return `\n<ol class="list-decimal pl-5 space-y-1 my-2">${listItems}</ol>\n`;
      })
      .replace(/(?:\n|^)(?:\*\s+(.*?)(?:\n|$))+/gs, function(match) {
        const items = match.trim().split(/\n\*\s+/);
        const listItems = items.filter(item => item).map(item => `<li>${item}</li>`).join('');
        return `\n<ul class="list-disc pl-5 space-y-1 my-2">${listItems}</ul>\n`;
      })
      .replace(/(?:\n|^)(?:-\s+(.*?)(?:\n|$))+/gs, function(match) {
        const items = match.trim().split(/\n-\s+/);
        const listItems = items.filter(item => item).map(item => `<li>${item}</li>`).join('');
        return `\n<ul class="list-disc pl-5 space-y-1 my-2">${listItems}</ul>\n`;
      });
    
    // Format paragraphs
    formattedText = formattedText
      .replace(/\n\n/g, '</p><p class="my-2">')
      .replace(/\n(?!\s*<)/g, '<br/>');
    
    return `<p class="my-2">${formattedText}</p>`;
  };

  // Get AI advice based on provided context
  const getAdvice = async (
    question: string, 
    context: Record<string, any> = {}
  ): Promise<string | any> => {
    try {
      setIsLoading(true);

      // Check for auth session first
      const { data: { session } } = await supabase.auth.getSession();
      
      // Add user context if available
      if (session?.user) {
        // Fetch recent skin logs
        const { data: recentLogs } = await supabase
          .from('skin_logs')
          .select('*, daily_factors(*)')
          .eq('user_id', session.user.id)
          .order('log_date', { ascending: false })
          .limit(7);
          
        // Fetch recent product usage
        const { data: recentProducts } = await supabase
          .from('product_usage')
          .select('*')
          .eq('user_id', session.user.id)
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
        `;
      } else if (adviceType === "weekly-insight") {
        // For regular weekly insight, guide the AI to format content nicely
        systemPrompt = `
          You are a dermatological AI assistant specialized in analyzing skin health trends.
          
          For this weekly insight analysis:
          - Format your analysis with clear section headings (like "Key Patterns", "Notable Improvements", etc.)
          - Use bullet points for lists of observations
          - Use numbered lists for recommendations
          - Keep paragraphs concise (3-4 sentences max)
          - Include specific data points when available
          - Be specific and actionable in your recommendations
          
          Include these sections in your analysis:
          1. Summary (2-3 sentences overview)
          2. Key Patterns (bullet points of observed patterns)
          3. Correlations (what factors seem connected)
          4. Recommendations (numbered steps)
          5. Focus Areas (what to prioritize next week)
          
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
        return structuredOutput 
          ? { error: "Failed to get AI skin advice" }
          : "I'm having trouble analyzing this skin information right now. Please try again in a moment.";
      }

      // If structured output is requested, try to parse the content as JSON
      if (structuredOutput) {
        try {
          // If data.content is already an object, return it
          if (typeof data.content === 'object' && data.content !== null) {
            return data.content;
          }
          
          // Otherwise try to parse it as JSON
          return JSON.parse(data.content);
        } catch (e) {
          console.error("Error parsing structured output:", e);
          return { 
            error: "Failed to parse structured response", 
            rawContent: data.content 
          };
        }
      }

      // Format the text for better readability before returning
      return formatTextContent(data.content);
    } catch (error) {
      console.error("Error getting AI skin advice:", error);
      toast.error("Failed to get skin advice. Please try again.");
      return structuredOutput 
        ? { error: "Failed to get skin advice" }
        : "I'm having trouble analyzing this skin information right now. Please try again in a moment.";
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getAdvice,
    isLoading
  };
};
