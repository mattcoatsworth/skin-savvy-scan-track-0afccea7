
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingTemplate from "@/components/OnboardingTemplate";
import { Slider } from "@/components/ui/slider";

const FemaleOnboardingRoutineEffectiveness: React.FC = () => {
  const navigate = useNavigate();
  const [effectiveness, setEffectiveness] = useState<number>(5);
  
  const handleNext = () => {
    // Save to localStorage for future reference
    localStorage.setItem("userRoutineEffectiveness", effectiveness.toString());
    
    // Navigate to the next screen
    navigate("/onboarding/female/family-history");
  };

  const getEffectivenessLabel = (value: number): string => {
    if (value <= 2) return "Not working at all";
    if (value <= 4) return "Slightly effective";
    if (value <= 6) return "Somewhat effective";
    if (value <= 8) return "Quite effective";
    return "Very effective";
  };

  return (
    <OnboardingTemplate
      title="On a scale from 1-10, is your current routine working?"
      description="Be honest! This helps us understand what needs improvement."
      currentStep={11}
      totalSteps={13}
      onNext={handleNext}
    >
      <div className="flex-1 flex flex-col">
        <div className="mb-8 flex justify-center">
          <div className="text-6xl font-bold text-primary">{effectiveness}</div>
        </div>
        
        <div className="mb-8">
          <Slider
            defaultValue={[5]}
            min={1}
            max={10}
            step={1}
            onValueChange={(value) => setEffectiveness(value[0])}
          />
          
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>Not at all</span>
            <span>Perfect</span>
          </div>
        </div>
        
        <div className="text-center mt-6 pb-6">
          <p className="text-lg font-medium">{getEffectivenessLabel(effectiveness)}</p>
          <p className="text-sm text-muted-foreground mt-2">
            {effectiveness <= 5 
              ? "We'll help you find products that work better for your skin."
              : "Great! We'll help you optimize and enhance your routine."}
          </p>
        </div>
      </div>
    </OnboardingTemplate>
  );
};

export default FemaleOnboardingRoutineEffectiveness;
