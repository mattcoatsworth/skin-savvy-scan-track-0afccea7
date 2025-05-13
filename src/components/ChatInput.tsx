
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Send, Paperclip, File, Camera, Image, MessageCircle, ChevronRight, ChevronLeft } from "lucide-react";
import { spacing } from "@/design";

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

  // Expanded list of quick suggestion topics to make scrolling more obvious
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

        <form onSubmit={handleChatSubmit} className="max-w-md mx-auto">
          <div className="relative flex items-center">
            <Input
              type="text"
              placeholder="Ask anything"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="flex-1 rounded-full border-gray-200 pr-10 pl-10 bg-white shadow-sm"
            />
            
            <Popover open={attachmentMenuOpen} onOpenChange={setAttachmentMenuOpen}>
              <PopoverTrigger asChild>
                <button 
                  type="button"
                  className="absolute left-2 text-gray-500 p-1"
                >
                  <Paperclip className="h-4 w-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-0" side="top" align="start">
                <div className="py-1 border-b">
                  <button onClick={handleFileUpload} className="w-full flex items-center px-4 py-3 hover:bg-gray-100">
                    <File className="h-5 w-5 mr-3" />
                    <span>Files</span>
                  </button>
                </div>
                <div className="py-1 border-b">
                  <button onClick={handleCameraCapture} className="w-full flex items-center px-4 py-3 hover:bg-gray-100">
                    <Camera className="h-5 w-5 mr-3" />
                    <span>Camera</span>
                  </button>
                </div>
                <div className="py-1">
                  <button onClick={handlePhotoLibrary} className="w-full flex items-center px-4 py-3 hover:bg-gray-100">
                    <Image className="h-5 w-5 mr-3" />
                    <span>Photos</span>
                  </button>
                </div>
              </PopoverContent>
            </Popover>

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
