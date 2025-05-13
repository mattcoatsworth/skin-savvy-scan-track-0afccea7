
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
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
    // Save gender to localStorage for future reference
    localStorage.setItem("userGender", data.gender);
    
    // Navigate to the appropriate onboarding path based on gender
    switch (data.gender) {
      case "female":
        navigate("/onboarding/female/birthdate");
        break;
      case "male":
        // Will create male flow later
        navigate("/onboarding/female/birthdate"); // Temporarily use female flow
        break;
      default:
        // For "other", we'll use the female flow for now
        navigate("/onboarding/female/birthdate");
    }
  };

  const handleNext = () => {
    form.handleSubmit(onSubmit)();
  };

  const genderOptions = [
    { value: "female", label: "Female" },
    { value: "male", label: "Male" },
    { value: "other", label: "Other" },
  ];

  return (
    <OnboardingTemplate
      title="Welcome to Skin Savvy"
      description="Let's get to know you better to personalize your skin care journey."
      currentStep={1}
      totalSteps={12}
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
                  <div className="space-y-3 mt-4">
                    {genderOptions.map((option) => (
                      <div 
                        key={option.value}
                        onClick={() => field.onChange(option.value)}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-colors ${
                          field.value === option.value 
                            ? "bg-primary/10 border-primary border" 
                            : "bg-background border border-input hover:bg-accent/50"
                        }`}
                      >
                        <span className="font-medium">{option.label}</span>
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

export default Onboarding;
