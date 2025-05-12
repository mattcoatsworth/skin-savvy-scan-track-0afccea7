
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
    <div className="flex flex-col items-center">
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

      <Carousel className="w-full">
        <CarouselContent>
          {normalizedImages.map((image, index) => (
            <CarouselItem key={index}>
              <div
                className="aspect-square w-full bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 overflow-hidden cursor-pointer"
                onClick={() => {
                  if (!image) {
                    setCurrentImageIndex(index);
                    setIsPhotoDialogOpen(true);
                  }
                }}
              >
                {image ? (
                  <img
                    src={image}
                    alt={`${label} Selfie ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex flex-col items-center">
                    <Camera className="h-6 w-6 mb-1" />
                    <span className="text-xs">No Photo</span>
                  </div>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center mt-2">
          <div className="text-xs text-center">
            {images.filter(img => img).length} of {maxImages} images
          </div>
        </div>
      </Carousel>

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
