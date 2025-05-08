
import React from "react";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ScanButton: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-3">
      <Button 
        className="ios-btn w-full max-w-xs h-14 bg-skin-teal text-lg" 
        onClick={() => console.log("Scan initiated")}
      >
        <Camera className="mr-2 h-5 w-5" />
        Scan a Product
      </Button>
      
      <Button 
        variant="outline" 
        className="bg-transparent border-skin-teal text-skin-teal hover:bg-skin-teal/5 w-full max-w-xs"
        asChild
      >
        <Link to="/log-skin-condition">
          Log Today's Skin Condition
        </Link>
      </Button>
    </div>
  );
};

export default ScanButton;
