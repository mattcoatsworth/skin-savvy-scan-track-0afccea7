
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import OnboardingTemplate from "@/components/OnboardingTemplate";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

type CycleFormValues = {
  cycleType: string;
  lastPeriodDate?: Date;
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
      lastPeriodDate: undefined,
    },
  });

  const onSubmit = (data: CycleFormValues) => {
    // Save to localStorage for future reference
    localStorage.setItem("userCycleType", data.cycleType);
    
    // Also save the last period date if provided
    if (data.lastPeriodDate) {
      localStorage.setItem("userLastPeriodDate", data.lastPeriodDate.toISOString());
    }
    
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
        <form className="space-y-6">
          <FormField
            control={form.control}
            name="lastPeriodDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <div className="mb-2">
                  <Label>When was the first day of your last period?</Label>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date()
                      }
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <div className="text-sm text-muted-foreground mt-1">
                  This helps us track your cycle more accurately.
                </div>
              </FormItem>
            )}
          />

          <div className="mt-6 mb-2">
            <Label>What type of cycle do you have?</Label>
          </div>
          
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
