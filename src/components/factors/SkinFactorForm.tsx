
import React, { useState } from "react";
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
  const [waterIntake, setWaterIntake] = useState(0);
  const [sleepHours, setSleepHours] = useState(8);
  const [foods, setFoods] = useState<string[]>([]);
  const [supplements, setSupplements] = useState<string[]>([]);
  const [makeupProducts, setMakeupProducts] = useState<string[]>([]);
  const [stressLevel, setStressLevel] = useState(1);
  const [stressors, setStressors] = useState<string[]>([]);
  const [weatherCondition, setWeatherCondition] = useState("");
  const [temperature, setTemperature] = useState(20);
  const [humidity, setHumidity] = useState(50);
  const [cyclePhase, setCyclePhase] = useState("");
  const [periodStartDate, setPeriodStartDate] = useState<Date | undefined>(undefined);
  const [notes, setNotes] = useState("");

  return (
    <div>
      <FactorCardSection title="Water Intake" icon={<span>💧</span>}>
        <WaterIntakeSection 
          value={waterIntake}
          onChange={setWaterIntake}
        />
      </FactorCardSection>

      <FactorCardSection title="Sleep" icon={<span>🌙</span>}>
        <SleepSection 
          value={sleepHours}
          onChange={setSleepHours}
        />
      </FactorCardSection>

      <FactorCardSection title="Food" icon={<span>🍔</span>}>
        <FoodSection 
          foods={foods}
          onChange={setFoods}
        />
      </FactorCardSection>

      <FactorCardSection title="Supplements" icon={<span>💊</span>}>
        <SupplementsSection 
          supplements={supplements}
          onChange={setSupplements}
        />
      </FactorCardSection>

      <FactorCardSection title="Makeup" icon={<span>💄</span>}>
        <MakeupSection 
          makeupProducts={makeupProducts}
          onChange={setMakeupProducts}
        />
      </FactorCardSection>

      <FactorCardSection title="Stress" icon={<span>😫</span>}>
        <StressSection 
          value={stressLevel}
          onChange={setStressLevel}
        />
        <StressorsSection 
          stressors={stressors}
          onChange={setStressors}
        />
      </FactorCardSection>

      <FactorCardSection title="Weather" icon={<span>☀️</span>}>
        <WeatherSection 
          condition={weatherCondition}
          temperature={temperature}
          humidity={humidity}
          onConditionChange={setWeatherCondition}
          onTemperatureChange={setTemperature}
          onHumidityChange={setHumidity}
        />
      </FactorCardSection>

      <FactorCardSection title="Menstrual Cycle" icon={<span>🩸</span>}>
        <MenstrualCycleSection 
          cyclePhase={cyclePhase}
          onCyclePhaseChange={setCyclePhase}
          periodStartDate={periodStartDate}
          onPeriodStartDateChange={setPeriodStartDate}
        />
      </FactorCardSection>

      <FactorCardSection title="Notes" icon={<span>📝</span>}>
        <NotesSection 
          value={notes}
          onChange={setNotes}
        />
      </FactorCardSection>
    </div>
  );
};

export default SkinFactorForm;
