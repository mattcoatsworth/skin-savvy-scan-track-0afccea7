
import React, { useState } from "react";
import { WaterIntakeSection } from "./WaterIntakeSection";
import { SleepSection } from "./SleepSection";
import { FoodSection } from "./FoodSection";
import { SupplementsSection } from "./SupplementsSection";
import { MakeupSection } from "./MakeupSection";
import { StressSection } from "./StressSection";
import { StressorsSection } from "./StressorsSection";
import { WeatherSection } from "./WeatherSection";
import { MenstrualCycleSection } from "./MenstrualCycleSection";
import { NotesSection } from "./NotesSection";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface SkinFactorFormProps {
  onSubmit?: (data: SkinFactorFormData) => void;
  initialData?: Partial<SkinFactorFormData>;
}

export interface SkinFactorFormData {
  waterIntake: number;
  sleepHours: number;
  foods: string[];
  supplements: string[];
  makeupProducts: string[];
  stressLevel: number;
  stressors: string[];
  weatherCondition: string;
  temperature: number;
  humidity: number;
  cyclePhase: string;
  periodStartDate?: Date;
  notes: string;
}

const defaultFormData: SkinFactorFormData = {
  waterIntake: 4,
  sleepHours: 7,
  foods: [],
  supplements: [],
  makeupProducts: [],
  stressLevel: 3,
  stressors: [],
  weatherCondition: "Sunny",
  temperature: 22,
  humidity: 40,
  cyclePhase: "Not Tracking",
  notes: ""
};

const SkinFactorForm: React.FC<SkinFactorFormProps> = ({ onSubmit, initialData = {} }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<SkinFactorFormData>({
    ...defaultFormData,
    ...initialData
  });
  
  const updateFormField = <K extends keyof SkinFactorFormData>(
    field: K, 
    value: SkinFactorFormData[K]
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    } else {
      console.log("Form submitted:", formData);
      toast({
        title: "Factors logged successfully",
        description: "Your skin factors have been saved.",
      });
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <WaterIntakeSection
        value={formData.waterIntake}
        onChange={(value) => updateFormField("waterIntake", value)}
      />
      
      <SleepSection
        value={formData.sleepHours}
        onChange={(value) => updateFormField("sleepHours", value)}
      />
      
      <FoodSection
        foods={formData.foods}
        onChange={(foods) => updateFormField("foods", foods)}
      />
      
      <SupplementsSection
        supplements={formData.supplements}
        onChange={(supplements) => updateFormField("supplements", supplements)}
      />
      
      <MakeupSection
        makeupProducts={formData.makeupProducts}
        onChange={(products) => updateFormField("makeupProducts", products)}
      />
      
      <StressSection
        value={formData.stressLevel}
        onChange={(value) => updateFormField("stressLevel", value)}
      />
      
      <StressorsSection
        stressors={formData.stressors}
        onChange={(stressors) => updateFormField("stressors", stressors)}
      />
      
      <WeatherSection
        condition={formData.weatherCondition}
        temperature={formData.temperature}
        humidity={formData.humidity}
        onConditionChange={(value) => updateFormField("weatherCondition", value)}
        onTemperatureChange={(value) => updateFormField("temperature", value)}
        onHumidityChange={(value) => updateFormField("humidity", value)}
      />
      
      <MenstrualCycleSection
        cyclePhase={formData.cyclePhase}
        onCyclePhaseChange={(phase) => updateFormField("cyclePhase", phase)}
        periodStartDate={formData.periodStartDate}
        onPeriodStartDateChange={(date) => updateFormField("periodStartDate", date)}
      />
      
      <NotesSection
        value={formData.notes}
        onChange={(value) => updateFormField("notes", value)}
      />
      
      <Button type="submit" className="w-full">
        Save Factors
      </Button>
    </form>
  );
};

export default SkinFactorForm;
