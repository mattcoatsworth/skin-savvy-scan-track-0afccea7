import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn, createEmptySelfieState } from "@/lib/utils";

interface SelfieImage {
  id: string;
  url: string;
  date: string;
  type: "am" | "pm";
  rating: number;
}

interface SelfieGridProps {
  images: SelfieImage[];
  className?: string;
}

const SelfieGrid: React.FC<SelfieGridProps> = ({ images, className }) => {
  const [selectedImage, setSelectedImage] = useState<SelfieImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  
  const handleOpenImage = (image: SelfieImage, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };
  
  const handlePreviousImage = () => {
    if (currentIndex > 0) {
      setSelectedImage(images[currentIndex - 1]);
      setCurrentIndex(currentIndex - 1);
    }
  };
  
  const handleNextImage = () => {
    if (currentIndex < images.length - 1) {
      setSelectedImage(images[currentIndex + 1]);
      setCurrentIndex(currentIndex + 1);
    }
  };
  
  // Group images by date
  const imagesByDate: Record<string, SelfieImage[]> = {};
  images.forEach(img => {
    if (!imagesByDate[img.date]) {
      imagesByDate[img.date] = [];
    }
    imagesByDate[img.date].push(img);
  });

  return (
    <div className={cn("", className)}>
      <div className="grid grid-cols-3 gap-1 sm:gap-2">
        {images.length > 0 ? (
          images.map((image, index) => (
            <div 
              key={image.id} 
              className="aspect-square relative cursor-pointer rounded-md overflow-hidden"
              onClick={() => handleOpenImage(image, index)}
            >
              <img 
                src={image.url}
                alt={`Selfie from ${image.date}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-1 left-1 bg-black bg-opacity-50 rounded px-1 py-0.5">
                <span className="text-white text-xs">
                  {image.type === "am" ? "AM" : "PM"}: {image.rating}
                </span>
              </div>
            </div>
          ))
        ) : (
          // Empty state - show 3 placeholder boxes
          Array.from({ length: 3 }).map((_, index) => (
            <div 
              key={`empty-${index}`} 
              className="aspect-square bg-gray-100 rounded-md flex items-center justify-center"
            >
              <span className="text-gray-400 font-medium">No Photos</span>
            </div>
          ))
        )}
      </div>

      {/* Expanded image dialog */}
      <Dialog open={selectedImage !== null} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="sm:max-w-xl p-0 overflow-hidden">
          <DialogHeader className="absolute top-0 right-0 z-10">
            <button 
              className="p-2 rounded-full bg-black bg-opacity-50 text-white"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-4 w-4" />
            </button>
          </DialogHeader>
          
          {selectedImage && (
            <div className="relative h-full flex flex-col">
              <div className="relative flex-1 overflow-hidden">
                <img 
                  src={selectedImage.url}
                  alt={`Selfie from ${selectedImage.date}`}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
                
                {/* Navigation buttons */}
                <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between px-4">
                  {currentIndex > 0 && (
                    <button 
                      className="p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-opacity"
                      onClick={handlePreviousImage}
                    >
                      <ChevronLeft className="h-6 w-6 text-white" />
                    </button>
                  )}
                  
                  {currentIndex < images.length - 1 && (
                    <button 
                      className="p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-opacity ml-auto"
                      onClick={handleNextImage}
                    >
                      <ChevronRight className="h-6 w-6 text-white" />
                    </button>
                  )}
                </div>
              </div>
              
              <div className="p-4 bg-white">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-medium">
                    {selectedImage.date} {selectedImage.type === "am" ? "Morning" : "Evening"}
                  </div>
                  <div className="text-sm font-semibold">
                    Rating: {selectedImage.rating}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SelfieGrid;
