
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import OnboardingTemplate from "@/components/OnboardingTemplate";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Label } from "@/components/ui/label";

type CycleFormValues = {
  cycleType: string;
  lastPeriodDate?: Date;
  cycleLength?: number;
};

const cycleTypes = [
  { id: "regular", label: "Regular (21-35 days)", description: "Consistent cycle length month to month" },
  { id: "irregular", label: "Irregular", description: "Cycle length varies significantly" },
  { id: "hormonal", label: "On hormonal birth control", description: "Using pills, IUD, or other hormonal methods" },
  { id: "menopausal", label: "Menopausal/Post-menopausal", description: "No periods for 12+ months" },
  { id: "pregnant", label: "Pregnant/Post-partum", description: "Currently pregnant or recently gave birth" },
  { id: "other", label: "Other", description: "None of the above apply" },
  { id: "not-applicable", label: "Not applicable", description: "Does not apply to me" },
];

const cycleLengths = [
  { value: 21, label: "21 days" },
  { value: 24, label: "24 days" },
  { value: 28, label: "28 days" },
  { value: 30, label: "30 days" },
  { value: 32, label: "32 days" },
  { value: 35, label: "35 days" },
];

const FemaleOnboardingCycleInfo: React.FC = () => {
  const navigate = useNavigate();
  const form = useForm<CycleFormValues>({
    defaultValues: {
      cycleType: "",
      lastPeriodDate: undefined,
      cycleLength: undefined,
    },
  });

  const selectedCycleType = form.watch("cycleType");

  const onSubmit = (data: CycleFormValues) => {
    // Save to localStorage for future reference
    localStorage.setItem("userCycleType", data.cycleType);
    
    // Also save the last period date if provided
    if (data.lastPeriodDate) {
      localStorage.setItem("userLastPeriodDate", data.lastPeriodDate.toISOString());
    }

    // Save cycle length if provided
    if (data.cycleLength) {
      localStorage.setItem("userCycleLength", data.cycleLength.toString());
    }
    
    // Navigate to the next screen
    navigate("/onboarding/female/food-allergies");
  };

  const handleNext = () => {
    form.handleSubmit(onSubmit)();
  };

  return (
    <OnboardingTemplate
      title="Tell us about your menstrual cycle"
      currentStep={6}
      totalSteps={13}
      onNext={handleNext}
      nextDisabled={!form.watch("cycleType")}
    >
      <Form {...form}>
        <form className="space-y-6">
          {/* When does your cycle start - Calendar dropdown */}
          <FormField
            control={form.control}
            name="lastPeriodDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <div className="mb-2">
                  <Label>When does your cycle start? (Optional)</Label>
                </div>
                <div className="text-sm text-muted-foreground mb-3">
                  This helps us track your cycle so we can understand your skin conditions more accurately.
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal rounded-lg",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Select the first day of your last period</span>
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
                        date > new Date() || date < new Date(new Date().setMonth(new Date().getMonth() - 3))
                      }
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />

          {/* What type of cycle do you have */}
          <div className="mb-2">
            <Label>What type of cycle do you have?</Label>
          </div>
          
          <FormField
            control={form.control}
            name="cycleType"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="space-y-3">
                    {cycleTypes.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => field.onChange(item.id)}
                        className={`flex flex-col space-y-1 rounded-lg p-4 cursor-pointer transition-colors ${
                          field.value === item.id 
                            ? "bg-primary/10 border-primary border" 
                            : "bg-background border border-input hover:bg-accent/50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{item.label}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          {selectedCycleType === "regular" && (
            <FormField
              control={form.control}
              name="cycleLength"
              render={({ field }) => (
                <FormItem>
                  <div className="mb-2">
                    <Label>How long is your typical cycle?</Label>
                  </div>
                  <FormControl>
                    <div className="grid grid-cols-2 gap-2">
                      {cycleLengths.map((length) => (
                        <div
                          key={length.value}
                          onClick={() => field.onChange(length.value)}
                          className={`flex items-center justify-center p-3 rounded-lg cursor-pointer transition-colors ${
                            field.value === length.value 
                              ? "bg-primary/10 border-primary border" 
                              : "bg-background border border-input hover:bg-accent/50"
                          }`}
                        >
                          <span className="font-medium">{length.label}</span>
                        </div>
                      ))}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          )}
        </form>
      </Form>
    </OnboardingTemplate>
  );
};

export default FemaleOnboardingCycleInfo;
