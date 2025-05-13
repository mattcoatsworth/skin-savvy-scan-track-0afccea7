
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import SuggestionCarousel from "./chat/SuggestionCarousel";
import AttachmentMenu from "./chat/AttachmentMenu";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [chatInput, setChatInput] = useState("");
  const [attachmentMenuOpen, setAttachmentMenuOpen] = useState(false);
  
  // Handle chat form submission
  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (chatInput.trim()) {
      onSendMessage(chatInput);
      setChatInput("");
    }
  };

  // Handle suggestion clicks
  const handleSuggestionClick = (suggestion: string) => {
    onSendMessage(suggestion);
  };

  // Handle attachment options
  const handleFileUpload = () => {
    console.log("File upload selected");
    setAttachmentMenuOpen(false);
    // Implementation for file upload would go here
  };

  const handleCameraCapture = () => {
    console.log("Camera capture selected");
    setAttachmentMenuOpen(false);
    // Implementation for camera capture would go here
  };

  const handlePhotoLibrary = () => {
    console.log("Photo library selected");
    setAttachmentMenuOpen(false);
    // Implementation for photo library would go here
  };

  // Expanded list of quick suggestion topics
  const suggestions = [
    "What's my skin type?",
    "Help with acne",
    "Skincare routine",
    "Recommend moisturizer",
    "Best sunscreen",
    "Reduce redness",
    "Anti-aging tips"
  ];

  return (
    <div className="bg-slate-50 shadow-sm fixed bottom-0 left-0 right-0 z-10 pb-8 pt-3">
      <div className="max-w-md mx-auto px-4">
        {/* Quick suggestions with scroll indicators */}
        <SuggestionCarousel 
          suggestions={suggestions} 
          onSuggestionClick={handleSuggestionClick} 
        />

        <form onSubmit={handleChatSubmit} className="max-w-md mx-auto">
          <div className="relative flex items-center">
            <Input
              type="text"
              placeholder="Ask anything"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="flex-1 rounded-full border-gray-200 pr-10 pl-10 bg-white shadow-sm"
            />
            
            <AttachmentMenu 
              open={attachmentMenuOpen}
              onOpenChange={setAttachmentMenuOpen}
              onFileUpload={handleFileUpload}
              onCameraCapture={handleCameraCapture}
              onPhotoLibrary={handlePhotoLibrary}
            />

            <button 
              type="submit" 
              className="absolute right-2 text-skin-teal p-1"
              disabled={!chatInput.trim()}
            >
              <Send className="h-5 w-5" />
              <span className="sr-only">Send</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatInput;
