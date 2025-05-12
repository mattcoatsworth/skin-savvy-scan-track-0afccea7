
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import OnboardingTemplate from "@/components/OnboardingTemplate";

type CycleFormValues = {
  cycleType: string;
};

const cycleTypes = [
  { id: "regular", label: "Regular (21-35 days)" },
  { id: "irregular", label: "Irregular" },
  { id: "hormonal", label: "On hormonal birth control" },
  { id: "menopausal", label: "Menopausal/Post-menopausal" },
  { id: "pregnant", label: "Pregnant/Post-partum" },
  { id: "other", label: "Other" },
];

const FemaleOnboardingMenstrualCycle: React.FC = () => {
  const navigate = useNavigate();
  const form = useForm<CycleFormValues>({
    defaultValues: {
      cycleType: "",
    },
  });

  const onSubmit = (data: CycleFormValues) => {
    // Save to localStorage for future reference
    localStorage.setItem("userCycleType", data.cycleType);
    
    // Navigate to the next screen
    navigate("/onboarding/female/food-allergies");
  };

  const handleNext = () => {
    form.handleSubmit(onSubmit)();
  };

  return (
    <OnboardingTemplate
      title="When is your cycle?"
      description="Help us understand your hormonal patterns."
      currentStep={6}
      totalSteps={13}
      onNext={handleNext}
      nextDisabled={!form.watch("cycleType")}
    >
      <Form {...form}>
        <form className="space-y-4">
          <FormField
            control={form.control}
            name="cycleType"
            render={({ field }) => (
              <FormItem>
                <div className="space-y-3">
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="space-y-3"
                  >
                    {cycleTypes.map((item) => (
                      <FormItem
                        key={item.id}
                        className="flex items-center space-x-3 space-y-0 rounded-lg border p-3"
                      >
                        <FormControl>
                          <RadioGroupItem value={item.id} />
                        </FormControl>
                        <Label className="cursor-pointer flex-1">{item.label}</Label>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </div>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </OnboardingTemplate>
  );
};

export default FemaleOnboardingMenstrualCycle;
