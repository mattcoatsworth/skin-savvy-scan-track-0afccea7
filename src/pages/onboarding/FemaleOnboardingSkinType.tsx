
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import OnboardingTemplate from "@/components/OnboardingTemplate";

type SkinTypeFormValues = {
  skinType: "normal" | "dry" | "oily" | "combination" | "sensitive";
};

const FemaleOnboardingSkinType: React.FC = () => {
  const navigate = useNavigate();
  const form = useForm<SkinTypeFormValues>({
    defaultValues: {
      skinType: undefined,
    },
  });

  const onSubmit = (data: SkinTypeFormValues) => {
    // Save to localStorage for future reference
    localStorage.setItem("userSkinType", data.skinType);
    
    // Navigate to the next screen
    navigate("/onboarding/female/skin-concerns");
  };

  const handleNext = () => {
    form.handleSubmit(onSubmit)();
  };

  const skinTypes = [
    { value: "normal", label: "Normal", description: "Well-balanced: neither too oily nor too dry" },
    { value: "dry", label: "Dry", description: "Feels tight, may have flaky patches" },
    { value: "oily", label: "Oily", description: "Shiny, especially in the T-zone" },
    { value: "combination", label: "Combination", description: "Oily T-zone, dry cheeks" },
    { value: "sensitive", label: "Sensitive", description: "Easily irritated, reacts to products" },
  ];

  return (
    <OnboardingTemplate
      title="What is your skin type?"
      description="This helps us recommend products and routines suited to your skin."
      currentStep={3}
      totalSteps={12}
      onNext={handleNext}
      nextDisabled={!form.watch("skinType")}
    >
      <Form {...form}>
        <form className="space-y-4 flex-1 flex flex-col">
          <FormField
            control={form.control}
            name="skinType"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <div className="space-y-3 mt-4">
                    {skinTypes.map((type) => (
                      <div 
                        key={type.value}
                        onClick={() => field.onChange(type.value)}
                        className={`flex flex-col space-y-1 rounded-xl p-4 cursor-pointer transition-colors ${
                          field.value === type.value 
                            ? "bg-primary/10 border-primary border" 
                            : "bg-background border border-input hover:bg-accent/50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{type.label}</p>
                        </div>
                        <p className="text-sm text-muted-foreground">{type.description}</p>
                      </div>
                    ))}
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </OnboardingTemplate>
  );
};

export default FemaleOnboardingSkinType;
