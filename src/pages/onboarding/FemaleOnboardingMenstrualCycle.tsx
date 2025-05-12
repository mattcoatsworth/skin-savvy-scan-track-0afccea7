
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import OnboardingTemplate from "@/components/OnboardingTemplate";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";

type MenstrualCycleFormValues = {
  cycleType: string;
  cycleDay?: number;
};

const FemaleOnboardingMenstrualCycle: React.FC = () => {
  const navigate = useNavigate();
  const [cycleType, setCycleType] = useState<string | undefined>(undefined);
  const [dayInCycle, setDayInCycle] = useState<number | undefined>(undefined);
  
  const form = useForm<MenstrualCycleFormValues>({
    defaultValues: {
      cycleType: undefined,
      cycleDay: undefined,
    },
  });

  const onSubmit = (data: MenstrualCycleFormValues) => {
    // Save to localStorage for future reference
    const cycleData = {
      type: cycleType,
      dayInCycle: dayInCycle
    };
    localStorage.setItem("userMenstrualCycle", JSON.stringify(cycleData));
    
    // Navigate to the next screen
    navigate("/onboarding/female/food-allergies");
  };

  const handleNext = () => {
    form.handleSubmit(onSubmit)();
  };

  // Days array for selection
  const days = Array.from({ length: 40 }, (_, i) => i + 1);

  return (
    <OnboardingTemplate
      title="When is your cycle?"
      description="This helps us provide more personalized recommendations based on hormonal changes."
      currentStep={6}
      totalSteps={13}
      onNext={handleNext}
      nextDisabled={!cycleType}
    >
      <Form {...form}>
        <form className="space-y-6">
          <FormField
            control={form.control}
            name="cycleType"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(value);
                      setCycleType(value);
                    }}
                    value={field.value}
                    className="space-y-3"
                  >
                    {[
                      { value: "regular", label: "Regular periods" },
                      { value: "irregular", label: "Irregular periods" },
                      { value: "none", label: "No periods (menopause, health condition, etc.)" },
                      { value: "hormonal", label: "On hormonal birth control" },
                      { value: "pregnant", label: "Pregnant or postpartum" },
                      { value: "prefer_not", label: "Prefer not to track" },
                    ].map((option) => (
                      <div 
                        key={option.value}
                        className={`flex items-center space-x-3 rounded-lg border p-4 cursor-pointer ${
                          field.value === option.value ? "border-primary bg-primary/5" : "border-input"
                        }`}
                        onClick={() => {
                          field.onChange(option.value);
                          setCycleType(option.value);
                        }}
                      >
                        <FormControl>
                          <RadioGroupItem value={option.value} id={option.value} className="sr-only" />
                        </FormControl>
                        <Label htmlFor={option.value} className="flex-1 cursor-pointer font-normal">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />

          {/* Show day selector only if user has regular periods */}
          {cycleType === "regular" && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">Which day of your cycle are you on?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Day 1 is the first day of your period
              </p>
              
              <div className="grid grid-cols-5 gap-2">
                {days.map((day) => (
                  <Button
                    key={day}
                    type="button"
                    variant={dayInCycle === day ? "default" : "outline"}
                    className="h-12 w-full"
                    onClick={() => {
                      setDayInCycle(day);
                      form.setValue("cycleDay", day);
                    }}
                  >
                    {day}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </form>
      </Form>
    </OnboardingTemplate>
  );
};

export default FemaleOnboardingMenstrualCycle;
