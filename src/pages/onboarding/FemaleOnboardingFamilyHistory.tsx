
import React from "react";
import { useNavigate } from "react-router-dom";
import { RadioGroup } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import OnboardingTemplate from "@/components/OnboardingTemplate";
import { Textarea } from "@/components/ui/textarea";

type FamilyHistoryFormValues = {
  familyHistory: "yes" | "no" | "unsure";
  details: string;
};

const FemaleOnboardingFamilyHistory: React.FC = () => {
  const navigate = useNavigate();
  const form = useForm<FamilyHistoryFormValues>({
    defaultValues: {
      familyHistory: undefined,
      details: "",
    },
  });

  const familyHistory = form.watch("familyHistory");

  const onSubmit = (data: FamilyHistoryFormValues) => {
    // Save to localStorage for future reference
    const historyData = {
      familyHistory: data.familyHistory,
      details: data.details,
    };
    localStorage.setItem("userFamilyHistory", JSON.stringify(historyData));
    
    // Navigate to the completion page or home page
    navigate("/home");
  };

  const handleNext = () => {
    form.handleSubmit(onSubmit)();
  };

  return (
    <OnboardingTemplate
      title="Do you have siblings that also have skin issues?"
      description="Family history can help us understand genetic factors."
      currentStep={11}
      totalSteps={12}
      onNext={handleNext}
      nextBtnText="Complete Setup"
      nextDisabled={!form.watch("familyHistory")}
    >
      <Form {...form}>
        <form className="space-y-4 flex-1 flex flex-col">
          <FormField
            control={form.control}
            name="familyHistory"
            render={({ field }) => (
              <FormItem className="space-y-4">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="space-y-4 mt-4"
                  >
                    {[
                      { value: "yes", label: "Yes" },
                      { value: "no", label: "No" },
                      { value: "unsure", label: "I'm not sure" },
                    ].map((option) => (
                      <div 
                        key={option.value}
                        className={`flex items-center space-x-3 rounded-xl border p-4 cursor-pointer ${
                          field.value === option.value ? "border-primary bg-primary/5" : "border-input"
                        }`}
                        onClick={() => field.onChange(option.value)}
                      >
                        <div className={`h-4 w-4 rounded-full ${field.value === option.value ? "bg-primary" : "border border-input"}`}></div>
                        <Label 
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

          {/* Show details field only if "Yes" is selected */}
          {familyHistory === "yes" && (
            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <Label>Would you like to share more details?</Label>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="What skin issues do your siblings have?"
                      className="min-h-[100px] resize-none"
                    />
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

export default FemaleOnboardingFamilyHistory;
