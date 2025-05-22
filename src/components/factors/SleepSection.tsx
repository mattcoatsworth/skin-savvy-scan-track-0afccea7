
import React from "react";
import { Slider } from "@/components/ui/slider";
import { Moon } from "lucide-react";
import FactorCardSection from "./FactorCardSection";

interface SleepSectionProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

const SleepSection: React.FC<SleepSectionProps> = ({ 
  value, 
  onChange, 
  min = 0, 
  max = 12
}) => {
  // Get sleep rating feedback
  const getSleepRating = (hours: number): {label: string; color: string} => {
    if (hours >= 8) {
      return { label: "Optimal", color: "#4ADE80" }; // Green
    } else if (hours >= 7) {
      return { label: "Good", color: "#FACC15" }; // Yellow
    } else if (hours >= 6) {
      return { label: "Fair", color: "#FFA500" }; // Orange
    } else {
      return { label: "Poor", color: "#F87171" }; // Red
    }
  };

  const sleepRating = getSleepRating(value);
  
  return (
    <FactorCardSection 
      title="Sleep" 
      icon={<Moon className="h-5 w-5" />}
      description="Track your sleep duration"
    >
      <div className="mt-2 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm">Hours slept:</span>
          <span className="font-medium">{value} hours</span>
        </div>
        
        <Slider 
          value={[value]} 
          min={min} 
          max={max} 
          step={0.5} 
          onValueChange={(vals) => onChange(vals[0])}
          className="cursor-pointer"
        />
        
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{min} hours</span>
          <span className="font-medium px-2 py-0.5 rounded" 
                style={{ backgroundColor: `${sleepRating.color}20`, color: sleepRating.color }}>
            {sleepRating.label}
          </span>
          <span>{max} hours</span>
        </div>
      </div>
    </FactorCardSection>
  );
};

export default SleepSection;
