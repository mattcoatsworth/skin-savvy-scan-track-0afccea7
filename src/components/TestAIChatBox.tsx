
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, MessageCircle, ChevronRight, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface TestAIChatBoxProps {
  productTitle?: string;
}

const TestAIChatBox: React.FC<TestAIChatBoxProps> = ({ productTitle }) => {
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
  
  // Common quick suggestions
  const suggestions = [
    "Tell me more about this",
    "Is this right for me?",
    "How does this work?",
    "Side effects?",
    "Best practices",
    "Alternatives"
  ];

  return (
    <div className="mt-8 mb-20">
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
              <MessageCircle className="h-3.5 w-3.5" />
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
            <MessageCircle className="h-4 w-4 text-skin-teal" />
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
            Ask our AI anything about this recommendation or your skin health
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestAIChatBox;
