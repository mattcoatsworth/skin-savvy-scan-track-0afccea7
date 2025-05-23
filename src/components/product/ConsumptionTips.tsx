
import React from "react";
import { Droplet } from "lucide-react";

interface ConsumptionTipsProps {
  tips: string[];
  title?: string;
  icon?: React.ReactNode;
}

const ConsumptionTips: React.FC<ConsumptionTipsProps> = ({
  tips,
  title = "Best Consumed",
  icon = <Droplet className="h-5 w-5 mr-2 text-cyan-500" />
}) => {
  return (
    <>
      <div className="flex items-center mb-2">
        {icon}
        <h4 className="font-medium">{title}</h4>
      </div>
      <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
        {tips.map((tip, index) => (
          <li key={index}>{tip}</li>
        ))}
      </ul>
    </>
  );
};

export default ConsumptionTips;
