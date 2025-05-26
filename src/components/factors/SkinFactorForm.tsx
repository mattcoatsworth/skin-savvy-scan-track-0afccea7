import React from "react";
import FactorCardSection from "./FactorCardSection";
import WaterIntakeSection from "./WaterIntakeSection";
import SleepSection from "./SleepSection";
import FoodSection from "./FoodSection";
import SupplementsSection from "./SupplementsSection";
import MakeupSection from "./MakeupSection";
import StressSection from "./StressSection";
import StressorsSection from "./StressorsSection";
import WeatherSection from "./WeatherSection";
import MenstrualCycleSection from "./MenstrualCycleSection";
import NotesSection from "./NotesSection";

interface SkinFactorFormProps {
  // Define any props you need here
}

const SkinFactorForm: React.FC<SkinFactorFormProps> = () => {
  return (
    <div>
      <FactorCardSection title="Water Intake" icon={<span>💧</span>}>
        <WaterIntakeSection />
      </FactorCardSection>

      <FactorCardSection title="Sleep" icon={<span>🌙</span>}>
        <SleepSection />
      </FactorCardSection>

      <FactorCardSection title="Food" icon={<span>🍔</span>}>
        <FoodSection />
      </FactorCardSection>

      <FactorCardSection title="Supplements" icon={<span>💊</span>}>
        <SupplementsSection />
      </FactorCardSection>

      <FactorCardSection title="Makeup" icon={<span>💄</span>}>
        <MakeupSection />
      </FactorCardSection>

      <FactorCardSection title="Stress" icon={<span>😫</span>}>
        <StressSection />
        <StressorsSection />
      </FactorCardSection>

      <FactorCardSection title="Weather" icon={<span>☀️</span>}>
        <WeatherSection />
      </FactorCardSection>

      <FactorCardSection title="Menstrual Cycle" icon={<span>🩸</span>}>
        <MenstrualCycleSection />
      </FactorCardSection>

      <FactorCardSection title="Notes" icon={<span>📝</span>}>
        <NotesSection />
      </FactorCardSection>
    </div>
  );
};

export default SkinFactorForm;
