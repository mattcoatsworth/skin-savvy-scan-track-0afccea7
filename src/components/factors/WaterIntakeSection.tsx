
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Droplet, Minus, Plus } from "lucide-react";
import FactorCardSection from "./FactorCardSection";

interface WaterIntakeSectionProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

const WaterIntakeSection: React.FC<WaterIntakeSectionProps> = ({ 
  value, 
  onChange, 
  min = 0, 
  max = 12
}) => {
  // Get water intake rating feedback
  const getWaterIntakeRating = (cups: number): {label: string; color: string} => {
    if (cups >= 8) {
      return { label: "Excellent", color: "#4ADE80" }; // Green
    } else if (cups >= 6) {
      return { label: "Good", color: "#FACC15" }; // Yellow
    } else if (cups >= 4) {
      return { label: "Adequate", color: "#FFA500" }; // Orange
    } else {
      return { label: "Low", color: "#F87171" }; // Red
    }
  };

  const waterRating = getWaterIntakeRating(value);
  
  // Increment or decrement water intake
  const adjustWaterIntake = (amount: number) => {
    const newValue = Math.max(min, Math.min(max, value + amount));
    onChange(newValue);
  };

  return (
    <FactorCardSection 
      title="Water Intake" 
      icon={<Droplet className="h-5 w-5" />}
      description="Track your daily hydration"
    >
      <div className="mt-2 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm">Daily water intake:</span>
          <div className="flex items-center">
            <Button 
              variant="outline" 
              size="sm"
              className="h-8 w-8 p-0 rounded-full"
              onClick={() => adjustWaterIntake(-1)}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="mx-3 font-medium">{value} cups</span>
            <Button 
              variant="outline" 
              size="sm"
              className="h-8 w-8 p-0 rounded-full"
              onClick={() => adjustWaterIntake(1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Slider 
          value={[value]} 
          min={min} 
          max={max} 
          step={1} 
          onValueChange={(vals) => onChange(vals[0])}
          className="cursor-pointer"
        />
        
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{min} cups</span>
          <span className="font-medium px-2 py-0.5 rounded" 
                style={{ backgroundColor: `${waterRating.color}20`, color: waterRating.color }}>
            {waterRating.label}
          </span>
          <span>{max} cups</span>
        </div>
      </div>
    </FactorCardSection>
  );
};

export default WaterIntakeSection;
