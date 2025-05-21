
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Camera } from "lucide-react";
import { useLocation } from "react-router-dom";

const ScanButton: React.FC = () => {
  const location = useLocation();
  
  // Don't render the button on the Products page
  if (location.pathname === "/products") {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-3 mb-6">
      <Button 
        variant="outline" 
        className="bg-transparent border-2 border-skin-black text-skin-black hover:bg-skin-black/5 w-full max-w-xs rounded-xl"
        asChild
      >
        <Link to="/log-skin-condition" className="flex items-center justify-center gap-2">
          <Camera className="h-4 w-4" />
          Get Started by Uploading A Selfie
        </Link>
      </Button>
    </div>
  );
};

export default ScanButton;
