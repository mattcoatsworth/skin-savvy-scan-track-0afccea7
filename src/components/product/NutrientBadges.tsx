
import React from "react";
import { Badge } from "@/components/ui/badge";

export interface Nutrient {
  name: string;
  value: string;
  color: string;
}

interface NutrientBadgesProps {
  nutrients: Nutrient[];
  columns?: number;
}

const NutrientBadges: React.FC<NutrientBadgesProps> = ({ 
  nutrients,
  columns = 2
}) => {
  return (
    <div className={`grid grid-cols-${columns} gap-2 mt-2`}>
      {nutrients.map((nutrient, idx) => (
        <div key={idx} className="flex items-center">
          <Badge className={nutrient.color + " mr-2"}>
            {nutrient.value}
          </Badge>
          <span className="text-sm">{nutrient.name}</span>
        </div>
      ))}
    </div>
  );
};

export default NutrientBadges;
