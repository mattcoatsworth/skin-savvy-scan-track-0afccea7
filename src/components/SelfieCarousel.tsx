
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle, X, Camera, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface SelfieCarouselProps {
  type: "am" | "pm";
  images: (string | null)[];
  onAddImage: (type: "am" | "pm", index: number, imageUrl?: string) => void;
  onDeleteImage: (type: "am" | "pm", index: number) => void;
  userId: string;
}

const SelfieCarousel: React.FC<SelfieCarouselProps> = ({
  type,
  images,
  onAddImage,
  onDeleteImage,
  userId,
}) => {
  const [isUploading, setIsUploading] = useState<number | null>(null);
  const { toast } = useToast();
  
  // Helper function to get image ID
  const getImageId = (type: string, index: number, userId: string) => {
    return `${userId}-${type}-${new Date().toISOString().split('T')[0]}-${index}`;
  };
  
  // Function to handle the image file selection and upload
  const handleFileChange = async (index: number) => {
    try {
      // Create file input element
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      
      // Add event listener for when a file is selected
      input.onchange = async (event) => {
        const target = event.target as HTMLInputElement;
        const file = target.files?.[0];
        
        if (!file) return;
        
        try {
          setIsUploading(index);
          
          // Create a unique file path for the image
          const imageId = getImageId(type, index, userId);
          const fileExt = file.name.split('.').pop();
          const filePath = `${imageId}.${fileExt}`;
          
          // Upload file to Supabase Storage
          const { data, error } = await supabase.storage
            .from('selfies')
            .upload(filePath, file, {
              upsert: true
            });
            
          if (error) {
            console.error('Error uploading image:', error.message);
            toast({
              title: "Upload Failed",
              description: "Unable to upload image. Please try again.",
              variant: "destructive",
              duration: 3000,
            });
            setIsUploading(null);
            return;
          }
          
          // Get the public URL for the uploaded image
          const { data: { publicUrl } } = supabase.storage
            .from('selfies')
            .getPublicUrl(filePath);
            
          // Call the parent component's onAddImage function with the public URL
          onAddImage(type, index, publicUrl);
          
          toast({
            title: "Upload Complete",
            description: `Your ${type.toUpperCase()} selfie has been saved.`,
            duration: 3000,
          });
        } catch (err) {
          console.error("Error in file upload:", err);
          toast({
            title: "Upload Error",
            description: "An unexpected error occurred. Please try again.",
            variant: "destructive",
            duration: 3000,
          });
        } finally {
          setIsUploading(null);
        }
      };
      
      // Trigger the file input click event
      input.click();
    } catch (err) {
      console.error("Error creating file input:", err);
      setIsUploading(null);
    }
  };
  
  // Function to delete an image
  const handleDeleteImage = async (index: number) => {
    try {
      const imageUrl = images[index];
      
      if (imageUrl) {
        // Extract the file path from the URL
        const urlParts = imageUrl.split('/');
        const filePath = urlParts[urlParts.length - 1];
        
        if (filePath) {
          // Delete the file from Supabase Storage
          const { error } = await supabase.storage
            .from('selfies')
            .remove([filePath]);
            
          if (error) {
            console.error('Error deleting image:', error.message);
            toast({
              title: "Delete Failed",
              description: "Unable to delete image. Please try again.",
              variant: "destructive",
              duration: 3000,
            });
            return;
          }
        }
      }
      
      // Call the parent component's onDeleteImage function
      onDeleteImage(type, index);
      
      toast({
        title: "Image Deleted",
        description: "The image has been removed from your records.",
        duration: 3000,
      });
    } catch (err) {
      console.error("Error deleting image:", err);
      toast({
        title: "Delete Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  
  return (
    <div>
      <h3 className="font-medium text-center mb-2">{type === "am" ? "Morning" : "Evening"}</h3>
      <div className="grid grid-cols-2 gap-2">
        {[0, 1].map((index) => (
          <div key={index} className="relative">
            {images[index] ? (
              <div className="relative h-24 w-full">
                <img 
                  src={images[index] || ""} 
                  alt={`${type} selfie ${index + 1}`} 
                  className="h-full w-full object-cover rounded-md"
                />
                <button 
                  onClick={() => handleDeleteImage(index)} 
                  className="absolute top-1 right-1 bg-white/80 rounded-full p-1 shadow-sm"
                  aria-label="Delete image"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleFileChange(index)}
                disabled={isUploading !== null}
                className="h-24 w-full flex flex-col items-center justify-center bg-gray-50 border border-dashed border-gray-200 rounded-md hover:bg-gray-100 transition-colors"
                aria-label="Add image"
              >
                {isUploading === index ? (
                  <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                ) : (
                  <>
                    <Camera className="h-6 w-6 text-gray-400 mb-1" />
                    <span className="text-xs text-gray-500">Add {index === 0 ? "Front" : "Side"}</span>
                  </>
                )}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelfieCarousel;
