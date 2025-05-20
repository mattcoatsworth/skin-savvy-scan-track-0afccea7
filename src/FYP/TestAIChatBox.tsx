
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, MessageSquare, ChevronRight, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface TestAIChatBoxProps {
  productTitle?: string;
  initialMessages?: Message[];
}

/**
 * Test AI Chat Box component
 * Allows users to ask questions and receive AI-generated responses
 */
const TestAIChatBox: React.FC<TestAIChatBoxProps> = ({ productTitle, initialMessages = [] }) => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (message.trim()) {
      // Navigate to chat page with initial message
      navigate("/chat", { state: { initialMessage: message } });
    } else {
      toast.error("Please enter a message first");
    }
  };

  // Handle suggestion clicks
  const handleSuggestionClick = (suggestion: string) => {
    navigate("/chat", { state: { initialMessage: suggestion } });
  };
  
  // Get context-specific suggestions based on productTitle
  const getSuggestions = () => {
    if (productTitle?.includes("Meal Plan")) {
      return [
        "Adjust for allergies?",
        "Recipe details?",
        "Substitute ingredients?",
        "Food portion sizes?",
        "Best meal timing?",
        "Weekly shopping tips"
      ];
    }
    
    // Energy analysis specific suggestions
    if (initialMessages?.[0]?.content?.includes("energy analysis")) {
      return [
        "Explain chakra healing more?",
        "How to balance my energy?",
        "Foods for skin energy?",
        "Daily rituals for healing?",
        "Meditation for my condition?",
        "Herbs for my skin type?"
      ];
    }
    
    // Default suggestions
    return [
      "Tell me more about this",
      "Is this right for me?",
      "How does this work?",
      "Side effects?",
      "Best practices",
      "Alternatives"
    ];
  };

  const suggestions = getSuggestions();

  // Get initial message from assistant if available
  const initialMessage = initialMessages.find(msg => msg.role === "assistant")?.content;

  return (
    <div className="mt-6 mb-10">
      {/* Display initial assistant message if any */}
      {initialMessage && (
        <div className="mb-4 bg-gray-50 rounded-lg p-4 border border-gray-100">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0">
              <MessageSquare className="h-4 w-4" />
            </div>
            <div className="text-sm text-gray-700">{initialMessage}</div>
          </div>
        </div>
      )}
      
      {/* Quick suggestions with scroll indicators */}
      <div className="relative mb-3">
        {/* Left scroll indicator */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-r from-slate-50 to-transparent w-8 h-full flex items-center">
          <ChevronLeft className="h-5 w-5 text-gray-500" />
        </div>
        
        <div className="flex overflow-x-auto gap-2 pb-1.5 px-6 no-scrollbar scroll-smooth">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="flex-shrink-0 px-3 py-1.5 bg-white rounded-full border text-sm text-gray-700 whitespace-nowrap flex items-center gap-1.5 hover:bg-gray-50 transition-colors shadow-sm"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              {suggestion}
            </button>
          ))}
        </div>
        
        {/* Right scroll indicator */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-l from-slate-50 to-transparent w-8 h-full flex items-center justify-end">
          <ChevronRight className="h-5 w-5 text-gray-500" />
        </div>
      </div>
      
      <Card className="border-slate-200">
        <CardContent className="p-4">
          <h3 className="text-base font-medium flex items-center gap-2 mb-3">
            <MessageSquare className="h-4 w-4 text-skin-teal" />
            Ask a question
          </h3>
          
          <form onSubmit={handleSendMessage} className="relative flex items-center">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={productTitle ? `Ask about ${productTitle}...` : "Ask a question..."}
              className="flex-1 rounded-full border-gray-200 pr-10 pl-4 bg-white shadow-sm"
            />
            <Button 
              type="submit" 
              size="icon" 
              className="absolute right-1 text-skin-teal p-1 bg-transparent hover:bg-transparent"
              disabled={!message.trim()}
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
          
          <div className="mt-2 text-xs text-muted-foreground">
            {productTitle?.includes("Meal Plan") 
              ? "Ask our AI anything about this meal plan or your nutritional needs"
              : "Ask our AI anything about this recommendation or your skin health"}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestAIChatBox;
