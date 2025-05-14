
import React from "react";
import { Smile } from "lucide-react";

interface SkinStatusHeaderProps {
  status: string;
}

const SkinStatusHeader: React.FC<SkinStatusHeaderProps> = ({ status }) => {
  return (
    <div className="flex items-center mb-4">
      <div className="text-4xl mr-3">
        <Smile className="h-8 w-8" />
      </div>
      <div>
        <h2 className="font-medium text-lg">Today's Skin</h2>
        <p className="text-xl font-semibold">{status}</p>
      </div>
    </div>
  );
};

export default SkinStatusHeader;
