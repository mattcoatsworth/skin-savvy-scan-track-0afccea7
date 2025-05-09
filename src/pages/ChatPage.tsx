
import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";

type Message = {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
};

const ChatPage: React.FC = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hello! How can I help you with your skin health today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages]);
  
  // Focus on input when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    
    // Simulate AI response (with a slight delay)
    setTimeout(() => {
      const responses = [
        "Based on what you've described, it sounds like you might be experiencing some skin sensitivity. Try to avoid harsh products for a few days.",
        "Hydration is key for healthy skin. Make sure you're drinking enough water and using a good moisturizer.",
        "For acne concerns, products with salicylic acid or benzoyl peroxide can be helpful, but start with lower concentrations.",
        "Sunscreen is essential for preventing premature aging and protecting your skin. Use it daily, even on cloudy days.",
        "Diet can influence skin health. Consider adding more fruits, vegetables, and omega-3 fatty acids to your diet.",
      ];
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: "ai",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen pb-16">
      <div className="bg-white p-4 border-b border-gray-200 flex items-center">
        <MessageSquare className="h-6 w-6 mr-2 text-skin-teal" />
        <h1 className="text-lg font-semibold">Ask Anything</h1>
      </div>
      
      <div className="flex-1 overflow-hidden">
        <ScrollArea ref={scrollAreaRef} className="h-full p-4">
          <div className="flex flex-col space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.sender === "user"
                      ? "bg-skin-teal text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
      
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex space-x-2">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Type your question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className="rounded-full"
          />
          <Button 
            type="button"
            onClick={handleSend}
            className="rounded-full bg-skin-teal"
            size="icon"
            disabled={!input.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
