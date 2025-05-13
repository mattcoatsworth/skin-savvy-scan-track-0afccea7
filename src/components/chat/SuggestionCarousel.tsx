
import React from "react";
import { ChevronRight, ChevronLeft, MessageCircle } from "lucide-react";

interface SuggestionCarouselProps {
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
}

const SuggestionCarousel: React.FC<SuggestionCarouselProps> = ({ suggestions, onSuggestionClick }) => {
  return (
    <div className="relative mb-3">
      {/* Left scroll indicator */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-r from-slate-50 to-transparent w-8 h-full flex items-center">
        <ChevronLeft className="h-5 w-5 text-gray-500" />
      </div>
      
      <div className="flex overflow-x-auto gap-2 pb-1.5 px-6 no-scrollbar scroll-smooth">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSuggestionClick(suggestion)}
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
  );
};

export default SuggestionCarousel;
