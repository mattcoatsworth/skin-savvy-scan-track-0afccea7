
import React from "react";
import { Camera } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface SelfieSectionProps {
  amImages: (string | null)[];
  pmImages: (string | null)[];
  onAddImage?: (type: "am" | "pm", index: number) => void;
  maxImages?: number;
  readOnly?: boolean;
  title?: string;
}

const SelfieSection = ({
  amImages = [],
  pmImages = [],
  onAddImage,
  maxImages = 4,
  readOnly = false,
  title = "Selfies"
}: SelfieSectionProps) => {
  const [isPhotoDialogOpen, setIsPhotoDialogOpen] = React.useState(false);
  const [currentType, setCurrentType] = React.useState<"am" | "pm">("am");
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  
  // Handle opening the photo dialog
  const handleOpenPhotoDialog = (type: "am" | "pm") => {
    if (readOnly) return;
    
    // Find the first empty slot or use the first slot if all are filled
    const images = type === "am" ? amImages : pmImages;
    const emptyIndex = images.findIndex(img => !img);
    const indexToUse = emptyIndex >= 0 ? emptyIndex : 0;
    
    setCurrentType(type);
    setCurrentImageIndex(indexToUse);
    setIsPhotoDialogOpen(true);
  };

  // Handle taking or selecting a photo
  const handleTakePhoto = () => {
    if (onAddImage) {
      onAddImage(currentType, currentImageIndex);
    }
    setIsPhotoDialogOpen(false);
  };

  const handleSelectFromGallery = () => {
    if (onAddImage) {
      onAddImage(currentType, currentImageIndex);
    }
    setIsPhotoDialogOpen(false);
  };

  // Count valid images (filtering out null or undefined values)
  const amCount = amImages.filter(img => img).length;
  const pmCount = pmImages.filter(img => img).length;

  return (
    <div>
      <div className="grid grid-cols-2 gap-6">
        {/* Morning section */}
        <div className="flex flex-col items-center">
          <h3 className="font-medium text-amber-500 mb-3">Morning</h3>
          <div 
            className={`aspect-square w-full bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden ${!readOnly ? 'cursor-pointer' : ''}`}
            onClick={() => !readOnly && handleOpenPhotoDialog("am")}
          >
            {amImages[0] ? (
              <img 
                src={amImages[0]} 
                alt="Morning Selfie" 
                className="object-cover w-full h-full" 
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <Camera className="h-12 w-12 text-gray-300 mb-2" />
                <span className="text-gray-400">No Photo</span>
              </div>
            )}
          </div>
          <p className="text-sm text-center mt-3 text-gray-500">
            {amCount} of {maxImages} images
          </p>
        </div>
        
        {/* Evening section */}
        <div className="flex flex-col items-center">
          <h3 className="font-medium text-indigo-400 mb-3">Evening</h3>
          <div 
            className={`aspect-square w-full bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden ${!readOnly ? 'cursor-pointer' : ''}`}
            onClick={() => !readOnly && handleOpenPhotoDialog("pm")}
          >
            {pmImages[0] ? (
              <img 
                src={pmImages[0]} 
                alt="Evening Selfie" 
                className="object-cover w-full h-full" 
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <Camera className="h-12 w-12 text-gray-300 mb-2" />
                <span className="text-gray-400">No Photo</span>
              </div>
            )}
          </div>
          <p className="text-sm text-center mt-3 text-gray-500">
            {pmCount} of {maxImages} images
          </p>
        </div>
      </div>

      {/* Photo selection dialog */}
      {!readOnly && (
        <Dialog open={isPhotoDialogOpen} onOpenChange={setIsPhotoDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogTitle>Add {currentType === "am" ? "Morning" : "Evening"} Photo {currentImageIndex + 1}</DialogTitle>
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
      )}
    </div>
  );
};

export default SelfieSection;
