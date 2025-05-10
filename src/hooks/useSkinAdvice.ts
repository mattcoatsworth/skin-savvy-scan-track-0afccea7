
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";

type AdviceType = "general" | "product" | "recommendation" | "action" | "supplement";

interface UseSkinAdviceProps {
  adviceType?: AdviceType;
  model?: string;
}

export const useSkinAdvice = ({
  adviceType = "general",
  model = "gpt-4o-mini"
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
  ): Promise<string> => {
    try {
      setIsLoading(true);

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
        body: { messages, model, adviceType }
      });

      if (error) {
        console.error("Error calling Edge Function:", error);
        toast.error("Failed to get AI skin advice. Please try again.");
        return "I'm having trouble analyzing this skin information right now. Please try again in a moment.";
      }

      return data.content;
    } catch (error) {
      console.error("Error getting AI skin advice:", error);
      toast.error("Failed to get skin advice. Please try again.");
      return "I'm having trouble analyzing this skin information right now. Please try again in a moment.";
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getAdvice,
    isLoading
  };
};
