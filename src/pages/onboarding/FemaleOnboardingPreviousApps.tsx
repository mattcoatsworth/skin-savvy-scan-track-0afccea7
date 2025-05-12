
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import OnboardingTemplate from "@/components/OnboardingTemplate";
import { Button } from "@/components/ui/button";

type PreviousAppsFormValues = {
  hasPreviousApps: "yes" | "no" | undefined;
};

const FemaleOnboardingPreviousApps: React.FC = () => {
  const navigate = useNavigate();
  const [selection, setSelection] = useState<"yes" | "no" | undefined>(undefined);
  
  const form = useForm<PreviousAppsFormValues>({
    defaultValues: {
      hasPreviousApps: undefined,
    },
  });

  const onSubmit = (data: PreviousAppsFormValues) => {
    if (selection) {
      // Save selection to localStorage
      localStorage.setItem("hasPreviousApps", selection);
      
      // Navigate to the next step in the female onboarding flow
      navigate("/home"); // Will update this when we create the next screen
    }
  };

  const handleNext = () => {
    if (selection) {
      form.setValue("hasPreviousApps", selection);
      form.handleSubmit(onSubmit)();
    }
  };

  const handleSelectionClick = (value: "yes" | "no") => {
    setSelection(value);
  };

  return (
    <OnboardingTemplate
      title="Have you tried other skincare tracking apps?"
      description="We want to make your experience better."
      currentStep={3}
      totalSteps={4}
      onNext={handleNext}
      nextDisabled={!selection}
    >
      <div className="flex flex-col items-center justify-center flex-1 space-y-4 mt-8">
        <div className="w-full space-y-4">
          {[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ].map((option) => (
            <button
              key={option.value}
              className={`w-full p-4 rounded-xl text-left border transition-colors ${
                selection === option.value
                  ? "border-primary bg-primary/5"
                  : "border-input bg-background"
              }`}
              onClick={() => handleSelectionClick(option.value as "yes" | "no")}
            >
              <span className="text-lg font-medium">{option.label}</span>
            </button>
          ))}
        </div>

        {selection && (
          <p className="text-muted-foreground text-sm mt-6">
            {selection === "yes"
              ? "Great! We'll try to make this experience even better."
              : "That's okay! We'll guide you through everything you need to know."}
          </p>
        )}
      </div>
    </OnboardingTemplate>
  );
};

export default FemaleOnboardingPreviousApps;
