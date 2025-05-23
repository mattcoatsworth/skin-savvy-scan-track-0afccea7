
import React from "react";
import { BarChart2 } from "lucide-react";

interface SkinImpactContentProps {
  skinImpactText: string;
  title?: string;
  icon?: React.ReactNode;
}

const SkinImpactContent: React.FC<SkinImpactContentProps> = ({
  skinImpactText,
  title = "Skin Impact",
  icon = <BarChart2 className="h-5 w-5 mr-2 text-blue-500" />
}) => {
  return (
    <>
      <div className="flex items-center mb-2">
        {icon}
        <h4 className="font-medium">{title}</h4>
      </div>
      <p className="text-sm text-muted-foreground">
        {skinImpactText}
      </p>
    </>
  );
};

export default SkinImpactContent;
