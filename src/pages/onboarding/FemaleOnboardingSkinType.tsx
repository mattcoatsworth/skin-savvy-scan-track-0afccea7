
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RadioGroup } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
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
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="space-y-4 mt-4"
                  >
                    {skinTypes.map((type) => (
                      <div 
                        key={type.value}
                        className={`flex flex-col space-y-1 rounded-xl border p-4 cursor-pointer ${
                          field.value === type.value ? "border-primary bg-primary/5" : "border-input"
                        }`}
                        onClick={() => field.onChange(type.value)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`h-4 w-4 rounded-full ${field.value === type.value ? "bg-primary" : "border border-input"}`}></div>
                          <Label 
                            className="flex-1 cursor-pointer font-medium"
                          >
                            {type.label}
                          </Label>
                        </div>
                        <p className="text-sm text-muted-foreground pl-7">{type.description}</p>
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

export default FemaleOnboardingSkinType;
