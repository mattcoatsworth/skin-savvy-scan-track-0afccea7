
import React from "react";
import { Leaf } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Nutrient } from "./NutrientBadges";
import NutrientBadges from "./NutrientBadges";

interface NutritionalContentProps {
  nutrients: Nutrient[];
  columns?: number;
  title?: string;
  icon?: React.ReactNode;
}

const NutritionalContent: React.FC<NutritionalContentProps> = ({
  nutrients,
  columns = 2,
  title = "Nutritional Profile",
  icon = <Leaf className="h-5 w-5 mr-2 text-emerald-500" />
}) => {
  return (
    <>
      <div className="flex items-center mb-2">
        {icon}
        <h4 className="font-medium">{title}</h4>
      </div>
      <NutrientBadges nutrients={nutrients} columns={columns} />
    </>
  );
};

export default NutritionalContent;
