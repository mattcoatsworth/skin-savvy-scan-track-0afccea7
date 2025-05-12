
import React, { useState } from "react";
import { Camera } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface SelfieCarouselProps {
  type: "am" | "pm";
  images: (string | null)[];
  onAddImage: (type: "am" | "pm", index: number) => void;
  maxImages?: number;
  label?: string;
}

const SelfieCarousel = ({
  type,
  images,
  onAddImage,
  maxImages = 4,
  label = type === "am" ? "Morning" : "Evening",
}: SelfieCarouselProps) => {
  const [isPhotoDialogOpen, setIsPhotoDialogOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Handle taking or selecting a photo
  const handleTakePhoto = () => {
    onAddImage(type, currentImageIndex);
    setIsPhotoDialogOpen(false);
  };

  const handleSelectFromGallery = () => {
    onAddImage(type, currentImageIndex);
    setIsPhotoDialogOpen(false);
  };

  // Ensure we have exactly maxImages slots (filled or empty)
  const normalizedImages = [...images];
  while (normalizedImages.length < maxImages) {
    normalizedImages.push(null);
  }

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex items-center mb-2">
        {type === "am" ? (
          <div className="flex items-center text-amber-500">
            <h3 className="font-medium text-sm">{label}</h3>
          </div>
        ) : (
          <div className="flex items-center text-indigo-400">
            <h3 className="font-medium text-sm">{label}</h3>
          </div>
        )}
      </div>

      <div className="w-full">
        {/* Single image display - more consistent with design mockups */}
        <div
          className="aspect-square w-full bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 overflow-hidden cursor-pointer"
          onClick={() => {
            // Find the first empty slot or use the first slot if all are filled
            const emptyIndex = normalizedImages.findIndex(img => !img);
            const indexToUse = emptyIndex >= 0 ? emptyIndex : 0;
            setCurrentImageIndex(indexToUse);
            setIsPhotoDialogOpen(true);
          }}
        >
          {normalizedImages[0] ? (
            <img
              src={normalizedImages[0]}
              alt={`${label} Selfie`}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="flex flex-col items-center">
              <Camera className="h-6 w-6 mb-1" />
              <span className="text-xs">No Photo</span>
            </div>
          )}
        </div>
        <div className="flex justify-center mt-2">
          <div className="text-xs text-center text-gray-500">
            {images.filter(img => img).length} of {maxImages} images
            {normalizedImages.filter(img => img).length > 1 && (
              <span className="ml-1">• +{normalizedImages.filter(img => img).length - 1} more photos</span>
            )}
          </div>
        </div>
      </div>

      {/* Photo selection dialog */}
      <Dialog open={isPhotoDialogOpen} onOpenChange={setIsPhotoDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle>Add {label} Photo {currentImageIndex + 1}</DialogTitle>
          <DialogDescription>
            Choose how you want to add your photo
          </DialogDescription>
          
          <div className="grid grid-cols-2 gap-4 py-4">
            <div 
              onClick={handleTakePhoto}
              className="flex flex-col items-center justify-center h-24 gap-2 border rounded-md p-4 cursor-pointer hover:bg-gray-50"
            >
              <Camera className="h-8 w-8" />
              <span>Take Picture</span>
            </div>
            
            <div 
              onClick={handleSelectFromGallery}
              className="flex flex-col items-center justify-center h-24 gap-2 border rounded-md p-4 cursor-pointer hover:bg-gray-50"
            >
              <Camera className="h-8 w-8" />
              <span>Photo Gallery</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SelfieCarousel;
