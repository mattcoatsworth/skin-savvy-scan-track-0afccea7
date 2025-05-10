
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type AdviceType = "general" | "product" | "recommendation" | "action";

interface UseSkinAdviceProps {
  adviceType?: AdviceType;
  model?: string;
}

export const useSkinAdvice = ({
  adviceType = "general",
  model = "gpt-4o-mini"
}: UseSkinAdviceProps = {}) => {
  const [isLoading, setIsLoading] = useState(false);

  // Get AI advice based on provided context
  const getAdvice = async (
    question: string, 
    context: Record<string, any> = {}
  ): Promise<string> => {
    try {
      setIsLoading(true);

      // Create messages for the AI
      const messages = [
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
