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

      return data.content;
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
