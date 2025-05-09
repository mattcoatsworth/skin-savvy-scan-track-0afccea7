
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import OnboardingTemplate from "@/components/OnboardingTemplate";

type GenderFormValues = {
  gender: "female" | "male" | "other";
};

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const form = useForm<GenderFormValues>({
    defaultValues: {
      gender: undefined,
    },
  });

  const onSubmit = (data: GenderFormValues) => {
    // In a real app, we'd save this to state/context/localStorage/backend
    console.log("Selected gender:", data.gender);
    // Navigate to the next onboarding step (or home for now)
    navigate("/");
  };

  const handleNext = () => {
    form.handleSubmit(onSubmit)();
  };

  return (
    <OnboardingTemplate
      title="Welcome to Skin Savvy"
      description="Let's get to know you better to personalize your skin care journey."
      currentStep={1}
      totalSteps={4}
      onNext={handleNext}
      showBackButton={false}
      nextDisabled={!form.watch("gender")}
    >
      <Form {...form}>
        <form className="space-y-8 flex-1 flex flex-col">
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="flex-1">
                <div className="mb-4">
                  <h2 className="text-xl font-medium">What's your gender?</h2>
                  <p className="text-sm text-muted-foreground">
                    This helps us tailor your skin care recommendations
                  </p>
                </div>
                
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="space-y-4 mt-4"
                  >
                    {[
                      { value: "female", label: "Female" },
                      { value: "male", label: "Male" },
                      { value: "other", label: "Other" },
                    ].map((option) => (
                      <div 
                        key={option.value}
                        className={`flex items-center space-x-3 rounded-xl border p-4 ${
                          field.value === option.value ? "border-primary bg-primary/5" : "border-input"
                        }`}
                      >
                        <RadioGroupItem value={option.value} id={option.value} />
                        <Label 
                          htmlFor={option.value}
                          className="flex-1 cursor-pointer font-normal"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </OnboardingTemplate>
  );
};

export default Onboarding;
