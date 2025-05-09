
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useNavigate } from "react-router-dom";
import { Send, Paperclip, File, Camera, Image, MessageCircle } from "lucide-react";
import { spacing } from "@/design";

const ChatInput = () => {
  const navigate = useNavigate();
  const [chatInput, setChatInput] = useState("");
  const [attachmentMenuOpen, setAttachmentMenuOpen] = useState(false);
  
  // Handle chat form submission
  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (chatInput.trim()) {
      // Navigate to chat page with the input as state
      navigate("/chat", { 
        state: { initialMessage: chatInput }
      });
      setChatInput("");
    }
  };

  // Handle suggestion clicks
  const handleSuggestionClick = (suggestion: string) => {
    navigate("/chat", { 
      state: { initialMessage: suggestion }
    });
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

  // Quick suggestion topics
  const suggestions = [
    "What's my skin type?",
    "Help with acne",
    "Skincare routine"
  ];

  return (
    <div className="px-4 pb-16 pt-6 bg-slate-50 mt-[-2rem]">
      <div className="max-w-md mx-auto">
        {/* Quick suggestions */}
        <div className="flex overflow-x-auto gap-2 pb-1.5 no-scrollbar">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="flex-shrink-0 px-3 py-1.5 bg-white rounded-full border text-sm text-gray-700 whitespace-nowrap flex items-center gap-1.5 hover:bg-gray-50"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              {suggestion}
            </button>
          ))}
        </div>

        <form onSubmit={handleChatSubmit} className="max-w-md mx-auto mb-3">
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
