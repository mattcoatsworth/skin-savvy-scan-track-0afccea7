
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, MessageSquare } from "lucide-react";
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

  return (
    <div className="mt-8 mb-20">
      <Card className="border-slate-200">
        <CardContent className="p-4">
          <h3 className="text-base font-medium flex items-center gap-2 mb-3">
            <MessageSquare className="h-4 w-4 text-skin-teal" />
            Ask a question
          </h3>
          
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={productTitle ? `Ask about ${productTitle}...` : "Ask a question..."}
              className="flex-1 bg-slate-50"
            />
            <Button 
              type="submit" 
              size="icon" 
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
