
import React from "react";

interface SkinFactorsListProps {
  factors: {
    type: "Food" | "Supplement" | "Makeup" | "Weather";
    status: string;
    icon: React.ReactNode;
  }[];
}

const SkinFactorsList: React.FC<SkinFactorsListProps> = ({ factors }) => {
  return (
    <div className="mt-4">
      <h3 className="text-base font-semibold mb-2">Factors</h3>
      <div className="grid grid-cols-2 gap-2">
        {factors.map((factor, index) => (
          <div key={index} className="flex items-center p-2 bg-gray-50 rounded-md">
            <div className="mr-2 text-gray-600">{factor.icon}</div>
            <div>
              <p className="text-xs text-gray-500">{factor.type}</p>
              <p className="text-sm font-medium">{factor.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkinFactorsList;
