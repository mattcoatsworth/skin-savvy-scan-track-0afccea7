
import React from "react";
import { getFactorColor } from "./theme-utils";

export type FactorType = "Food" | "Supplement" | "Makeup" | "Weather";

export type Factor = {
  type: FactorType;
  status: string;
  icon: React.ReactNode;
};

type SkinFactorProps = {
  factor: Factor;
};

export const SkinFactor: React.FC<SkinFactorProps> = ({ factor }) => {
  return (
    <span 
      className={`${getFactorColor(factor.type)} flex items-center px-3 py-1.5 rounded-full text-sm`}
    >
      <span className="mr-1.5">{factor.icon}</span> {factor.status}
    </span>
  );
};
