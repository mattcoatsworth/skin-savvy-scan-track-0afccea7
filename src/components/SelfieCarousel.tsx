
import React, { useState } from "react";
import { Camera, Image, Upload, Trash2, X } from "lucide-react";
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
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from "uuid";

interface SelfieCarouselProps {
  type: "am" | "pm";
  images: (string | null)[];
  onAddImage: (type: "am" | "pm", index: number, imageUrl?: string) => void;
  onDeleteImage?: (type: "am" | "pm", index: number) => void;
  maxImages?: number;
  label?: string;
  readonly?: boolean;
  compact?: boolean;
  userId?: string;
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
  userId = "anonymous", // Default to anonymous if no userId provided
}: SelfieCarouselProps) => {
  const [isPhotoDialogOpen, setIsPhotoDialogOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [viewImageDialogOpen, setViewImageDialogOpen] = useState(false);
  const [selectedViewImage, setSelectedViewImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  
  // Handle file upload to Supabase
  const uploadToSupabase = async (file: File): Promise<string | null> => {
    try {
      setIsUploading(true);
      
      // Create a unique file path for the selfie
      const fileExt = file.name.split('.').pop();
      const currentDate = new Date().toISOString().split('T')[0];
      const filePath = `${userId}/${currentDate}/${type}/${uuidv4()}.${fileExt}`;
      
      // Upload the file to Supabase Storage
      const { data, error } = await supabase.storage
        .from('selfies')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });
      
      if (error) {
        console.error('Error uploading selfie:', error);
        toast({
          title: "Upload Failed",
          description: "There was an error uploading your photo. Please try again.",
          variant: "destructive"
        });
        return null;
      }
      
      // Get the public URL for the uploaded file
      const { data: { publicUrl } } = supabase.storage
        .from('selfies')
        .getPublicUrl(data.path);
      
      return publicUrl;
    } catch (error) {
      console.error('Error in upload process:', error);
      toast({
        title: "Upload Error",
        description: "Something went wrong during the upload process.",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsUploading(false);
    }
  };
  
  // Handle taking a photo using device camera
  const handleTakePhoto = async () => {
    try {
      // Create a file input element programmatically
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.capture = 'environment'; // Use the back camera
      
      // Handle the file selection
      input.onchange = async (e: Event) => {
        const target = e.target as HTMLInputElement;
        if (target.files && target.files[0]) {
          const file = target.files[0];
          
          // Upload the file to Supabase
          const publicUrl = await uploadToSupabase(file);
          
          if (publicUrl) {
            // Call the parent component's callback with the public URL
            onAddImage(type, currentImageIndex, publicUrl);
            
            toast({
              title: "Photo Uploaded",
              description: "Your photo has been saved successfully.",
              duration: 3000,
            });
          }
        }
      };
      
      // Trigger the file input click
      input.click();
      setIsPhotoDialogOpen(false);
    } catch (error) {
      console.error('Error taking photo:', error);
      toast({
        title: "Camera Error",
        description: "There was an error accessing your camera. Please check permissions and try again.",
        variant: "destructive"
      });
    }
  };

  // Handle selecting a photo from gallery
  const handleSelectFromGallery = async () => {
    try {
      // Create a file input element programmatically
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      
      // Handle the file selection
      input.onchange = async (e: Event) => {
        const target = e.target as HTMLInputElement;
        if (target.files && target.files[0]) {
          const file = target.files[0];
          
          // Upload the file to Supabase
          const publicUrl = await uploadToSupabase(file);
          
          if (publicUrl) {
            // Call the parent component's callback with the public URL
            onAddImage(type, currentImageIndex, publicUrl);
            
            toast({
              title: "Photo Uploaded",
              description: "Your photo has been saved successfully.",
              duration: 3000,
            });
          }
        }
      };
      
      // Trigger the file input click
      input.click();
      setIsPhotoDialogOpen(false);
    } catch (error) {
      console.error('Error selecting photo:', error);
      toast({
        title: "Gallery Error",
        description: "There was an error accessing your photo gallery. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDeletePhoto = async (index: number) => {
    try {
      const imageUrl = images[index];
      
      // If this is a Supabase URL, extract the path and delete from storage
      if (imageUrl && imageUrl.includes('storage/v1/object/public/selfies/')) {
        const pathParts = imageUrl.split('storage/v1/object/public/selfies/');
        if (pathParts.length > 1) {
          // Extract the path part after 'selfies/'
          const filePath = pathParts[1];
          
          // Delete the file from Supabase Storage
          const { error } = await supabase.storage
            .from('selfies')
            .remove([filePath]);
          
          if (error) {
            console.error('Error deleting file from Supabase:', error);
            // Continue with local deletion even if Supabase deletion fails
          }
        }
      }
      
      // Call the parent component's delete callback
      if (onDeleteImage) {
        onDeleteImage(type, index);
      }
      
      toast({
        title: "Photo Deleted",
        description: "Your photo has been deleted.",
        duration: 3000,
      });
    } catch (error) {
      console.error('Error deleting photo:', error);
      toast({
        title: "Delete Error",
        description: "There was an error deleting your photo. Please try again.",
        variant: "destructive"
      });
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
            
            {isUploading && (
              <div className="mt-2 text-center text-sm text-blue-500">
                Uploading your photo... Please wait.
              </div>
            )}
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
