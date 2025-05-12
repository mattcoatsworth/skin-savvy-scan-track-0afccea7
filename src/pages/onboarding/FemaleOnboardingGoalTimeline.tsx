
import React from "react";
import { useNavigate } from "react-router-dom";
import { RadioGroup } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import OnboardingTemplate from "@/components/OnboardingTemplate";
import { Calendar, Clock } from "lucide-react";

type GoalTimelineFormValues = {
  timeline: "1month" | "3months" | "6months" | "1year" | "ongoing";
};

const FemaleOnboardingGoalTimeline: React.FC = () => {
  const navigate = useNavigate();
  const form = useForm<GoalTimelineFormValues>({
    defaultValues: {
      timeline: undefined,
    },
  });

  const onSubmit = (data: GoalTimelineFormValues) => {
    // Save to localStorage for future reference
    localStorage.setItem("userGoalTimeline", data.timeline);
    
    // Navigate to the next screen
    navigate("/onboarding/female/current-routine");
  };

  const handleNext = () => {
    form.handleSubmit(onSubmit)();
  };

  const timelineOptions = [
    { value: "1month", label: "Within 1 month", icon: <Clock className="h-5 w-5" /> },
    { value: "3months", label: "Within 3 months", icon: <Calendar className="h-5 w-5" /> },
    { value: "6months", label: "Within 6 months", icon: <Calendar className="h-5 w-5" /> },
    { value: "1year", label: "Within 1 year", icon: <Calendar className="h-5 w-5" /> },
    { value: "ongoing", label: "Ongoing maintenance", icon: <Calendar className="h-5 w-5" /> },
  ];

  return (
    <OnboardingTemplate
      title="When do you want to achieve your goal?"
      description="Set a realistic timeline for your skin journey."
      currentStep={8}
      totalSteps={12}
      onNext={handleNext}
      nextDisabled={!form.watch("timeline")}
    >
      <Form {...form}>
        <form className="space-y-4 flex-1 flex flex-col">
          <FormField
            control={form.control}
            name="timeline"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="space-y-4 mt-4"
                  >
                    {timelineOptions.map((option) => (
                      <div 
                        key={option.value}
                        className={`flex items-center space-x-3 rounded-xl border p-4 cursor-pointer ${
                          field.value === option.value ? "border-primary bg-primary/5" : "border-input"
                        }`}
                        onClick={() => field.onChange(option.value)}
                      >
                        <div className="text-muted-foreground">
                          {option.icon}
                        </div>
                        <Label 
                          className="flex-1 cursor-pointer font-normal"
                        >
                          {option.label}
                        </Label>
                        <div className={`h-4 w-4 rounded-full ${field.value === option.value ? "bg-primary" : "border border-input"}`}></div>
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

export default FemaleOnboardingGoalTimeline;
