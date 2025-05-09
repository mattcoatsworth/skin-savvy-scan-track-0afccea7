
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import OnboardingTemplate from "@/components/OnboardingTemplate";

type BirthdateFormValues = {
  birthdate: Date | undefined;
};

const FemaleOnboardingBirthdate: React.FC = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>();
  const MAX_DATE = new Date(); // Today as max date
  const MIN_DATE = new Date(1900, 0, 1); // Jan 1, 1900 as min date

  const form = useForm<BirthdateFormValues>({
    defaultValues: {
      birthdate: undefined,
    },
  });

  const onSubmit = (data: BirthdateFormValues) => {
    if (date) {
      // Save birthdate to localStorage for future reference
      localStorage.setItem("userBirthdate", date.toISOString());
      
      // Navigate to the next step in the female onboarding flow
      // For now, we'll navigate to home since we haven't created the next step
      navigate("/home");
    }
  };

  const handleNext = () => {
    if (date) {
      form.setValue("birthdate", date);
      form.handleSubmit(onSubmit)();
    }
  };

  return (
    <OnboardingTemplate
      title="When were you born?"
      description="Your age helps us provide more accurate skin care recommendations."
      currentStep={2}
      totalSteps={4}
      onNext={handleNext}
      nextDisabled={!date}
    >
      <div className="flex-1 flex flex-col items-center">
        <div className="w-full mb-6 px-4">
          <p className="text-sm text-muted-foreground mb-2">Select your date of birth:</p>
          
          {/* Native date input styled to look iOS-like */}
          <input
            type="date"
            className="w-full p-4 rounded-xl border border-input bg-background text-foreground appearance-none"
            onChange={(e) => {
              if (e.target.value) {
                setDate(new Date(e.target.value));
              }
            }}
            min={MIN_DATE.toISOString().split('T')[0]}
            max={MAX_DATE.toISOString().split('T')[0]}
            style={{
              // iOS-like styling
              fontSize: '16px',
              height: '50px',
            }}
          />
        </div>

        {date && (
          <div className="mt-6 text-center">
            <p className="text-lg">
              You selected: <span className="font-medium">{format(date, "MMMM d, yyyy")}</span>
            </p>
          </div>
        )}
      </div>
    </OnboardingTemplate>
  );
};

export default FemaleOnboardingBirthdate;
