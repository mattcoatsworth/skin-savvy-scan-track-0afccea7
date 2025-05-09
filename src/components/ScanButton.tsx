
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ScanButton: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-3">
      <Button 
        variant="outline" 
        className="bg-transparent border-2 border-skin-black text-skin-black hover:bg-skin-black/5 w-full max-w-xs rounded-sm"
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
