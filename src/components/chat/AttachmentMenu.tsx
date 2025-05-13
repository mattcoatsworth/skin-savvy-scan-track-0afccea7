
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Paperclip, File, Camera, Image } from "lucide-react";

interface AttachmentMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFileUpload: () => void;
  onCameraCapture: () => void;
  onPhotoLibrary: () => void;
}

const AttachmentMenu: React.FC<AttachmentMenuProps> = ({ 
  open, 
  onOpenChange, 
  onFileUpload, 
  onCameraCapture, 
  onPhotoLibrary 
}) => {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
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
          <button onClick={onFileUpload} className="w-full flex items-center px-4 py-3 hover:bg-gray-100">
            <File className="h-5 w-5 mr-3" />
            <span>Files</span>
          </button>
        </div>
        <div className="py-1 border-b">
          <button onClick={onCameraCapture} className="w-full flex items-center px-4 py-3 hover:bg-gray-100">
            <Camera className="h-5 w-5 mr-3" />
            <span>Camera</span>
          </button>
        </div>
        <div className="py-1">
          <button onClick={onPhotoLibrary} className="w-full flex items-center px-4 py-3 hover:bg-gray-100">
            <Image className="h-5 w-5 mr-3" />
            <span>Photos</span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AttachmentMenu;
