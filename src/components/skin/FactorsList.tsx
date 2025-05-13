
import React from "react";
import SkinFactorTag from "./SkinFactorTag";

type FactorType = "Food" | "Supplement" | "Makeup" | "Weather";

type Factor = {
  type: FactorType;
  status: string;
  icon: React.ReactNode;
};

interface FactorsListProps {
  factors: Factor[];
}

const FactorsList: React.FC<FactorsListProps> = ({ factors }) => {
  return (
    <div className="mb-4">
      <p className="text-sm text-muted-foreground mb-2">Contributing Factors:</p>
      <div className="flex flex-wrap gap-2">
        {factors.map((factor, index) => (
          <SkinFactorTag 
            key={index}
            type={factor.type}
            status={factor.status}
            icon={factor.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default FactorsList;
