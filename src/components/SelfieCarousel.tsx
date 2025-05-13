import React, { useState } from "react";
import { Image, Upload, Trash2, X, Camera } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { EmptySelfieState } from "@/lib/utils";

interface SelfieCarouselProps {
  type: "am" | "pm";
  images: (string | null)[];
  onAddImage: (type: "am" | "pm", index: number) => void;
  onDeleteImage?: (type: "am" | "pm", index: number) => void;
  maxImages?: number;
  label?: string;
  readonly?: boolean;
  compact?: boolean;
}

const SelfieCarousel = ({
  type,
  images,
  onAddImage,
  onDeleteImage,
  maxImages = 4,
  label = type === "am" ? "Morning" : "Evening",
  readonly = false,
  compact = false,
}: SelfieCarouselProps) => {
  const [isPhotoDialogOpen, setIsPhotoDialogOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [viewImageDialogOpen, setViewImageDialogOpen] = useState(false);
  const [selectedViewImage, setSelectedViewImage] = useState<string | null>(null);
  
  // Handle taking or selecting a photo
  const handleTakePhoto = () => {
    onAddImage(type, currentImageIndex);
    setIsPhotoDialogOpen(false);
  };

  const handleSelectFromGallery = () => {
    onAddImage(type, currentImageIndex);
    setIsPhotoDialogOpen(false);
  };

  const handleDeletePhoto = (index: number) => {
    if (onDeleteImage) {
      onDeleteImage(type, index);
    }
  };

  // Ensure we have exactly maxImages slots (filled or empty)
  const normalizedImages = [...images];
  while (normalizedImages.length < maxImages) {
    normalizedImages.push(null);
  }

  const handleViewImage = (image: string) => {
    setSelectedViewImage(image);
    setViewImageDialogOpen(true);
  };

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

      <Carousel className={`w-full ${compact ? 'max-w-[150px]' : ''}`}>
        <CarouselContent>
          {normalizedImages.map((image, index) => (
            <CarouselItem key={index}>
              <div
                className="aspect-square w-full bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 overflow-hidden relative cursor-pointer"
                onClick={() => {
                  if (!image) {
                    if (!readonly) {
                      setCurrentImageIndex(index);
                      setIsPhotoDialogOpen(true);
                    }
                  } else {
                    handleViewImage(image);
                  }
                }}
              >
                {image ? (
                  <>
                    <img
                      src={image}
                      alt={`${label} Selfie ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                    {!readonly && onDeleteImage && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeletePhoto(index);
                        }}
                        className="absolute top-2 right-2 bg-black/50 rounded-full p-1 text-white hover:bg-black/70 transition-colors"
                        aria-label={`Delete ${label} Selfie ${index + 1}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </>
                ) : (
                  <EmptySelfieState />
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
      {!readonly && (
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
                <Upload className="h-8 w-8" />
                <span>Photo Gallery</span>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Image view dialog */}
      <Dialog open={viewImageDialogOpen} onOpenChange={setViewImageDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
          <DialogTitle>{label} Selfie</DialogTitle>
          <div className="flex justify-center items-center">
            {selectedViewImage && (
              <img 
                src={selectedViewImage} 
                alt={`${label} Selfie`}
                className="max-w-full max-h-[500px] object-contain rounded-md"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SelfieCarousel;
