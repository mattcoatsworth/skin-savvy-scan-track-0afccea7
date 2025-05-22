
import React from "react";
import { Slider } from "@/components/ui/slider";
import { Activity } from "lucide-react";
import FactorCardSection from "./FactorCardSection";

interface StressSectionProps {
  value: number;
  onChange: (value: number) => void;
}

const StressSection: React.FC<StressSectionProps> = ({ value, onChange }) => {
  // Get stress level label
  const getStressLabel = (level: number): { label: string; color: string } => {
    if (level <= 2) {
      return { label: "Low Stress", color: "#4ADE80" }; // Green
    } else if (level <= 5) {
      return { label: "Mild Stress", color: "#FACC15" }; // Yellow
    } else if (level <= 8) {
      return { label: "Moderate Stress", color: "#FFA500" }; // Orange
    } else {
      return { label: "High Stress", color: "#F87171" }; // Red
    }
  };

  const stressLabel = getStressLabel(value);

  return (
    <FactorCardSection 
      title="Stress Level" 
      icon={<Activity className="h-5 w-5" />}
      description="Rate your overall stress today"
    >
      <div className="mt-2 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm">Stress level:</span>
          <span 
            className="font-medium px-2 py-0.5 rounded text-xs"
            style={{ backgroundColor: `${stressLabel.color}20`, color: stressLabel.color }}
          >
            {stressLabel.label}
          </span>
        </div>
        
        <Slider 
          value={[value]} 
          min={1} 
          max={10} 
          step={1} 
          onValueChange={([val]) => onChange(val)}
          className="cursor-pointer"
        />
        
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Low (1)</span>
          <span className="font-medium">{value}/10</span>
          <span>High (10)</span>
        </div>
      </div>
    </FactorCardSection>
  );
};

export default StressSection;
