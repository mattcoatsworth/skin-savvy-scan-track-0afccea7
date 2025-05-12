
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ScanBarcode } from "lucide-react";

const ScanButton: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-3">
      <Button 
        variant="outline" 
        className="bg-transparent border-2 border-skin-black text-skin-black hover:bg-skin-black/5 w-full max-w-xs rounded-xl"
        asChild
      >
        <Link to="/log-skin-condition" className="flex items-center justify-center gap-2">
          <ScanBarcode className="h-4 w-4" />
          Scan Products
        </Link>
      </Button>
    </div>
  );
};

export default ScanButton;
