import React from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import OnboardingTemplate from "@/components/OnboardingTemplate";

type SkinGoalsFormValues = {
  goals: string[];
};

const skinGoals = [
  { id: "clearAcne", label: "Clear Acne & Breakouts" },
  { id: "hydration", label: "Improve Hydration" },
  { id: "antiAging", label: "Prevent/Reduce Signs of Aging" },
  { id: "evenTone", label: "Even Skin Tone" },
  { id: "reducePores", label: "Reduce Pore Size" },
  { id: "smoothTexture", label: "Smooth Skin Texture" },
  { id: "reduceOiliness", label: "Control Oiliness" },
  { id: "calmRedness", label: "Calm Redness & Irritation" },
  { id: "brighten", label: "Brighten & Add Radiance" },
  { id: "firmness", label: "Improve Firmness & Elasticity" },
];

const FemaleOnboardingSkinGoals: React.FC = () => {
  const navigate = useNavigate();
  const form = useForm<SkinGoalsFormValues>({
    defaultValues: {
      goals: [],
    },
  });

  const onSubmit = (data: SkinGoalsFormValues) => {
    // Save to localStorage for future reference
    localStorage.setItem("userSkinGoals", JSON.stringify(data.goals));
    
    // Navigate to the next screen - now going to menstrual cycle screen
    navigate("/onboarding/female/menstrual-cycle");
  };

  const handleNext = () => {
    form.handleSubmit(onSubmit)();
  };

  return (
    <OnboardingTemplate
      title="What are your skin goals?"
      description="Select all goals you'd like to achieve."
      currentStep={5}
      totalSteps={13}
      onNext={handleNext}
      nextDisabled={form.watch("goals").length === 0}
    >
      <Form {...form}>
        <form className="space-y-4">
          <FormField
            control={form.control}
            name="goals"
            render={() => (
              <FormItem>
                <div className="space-y-3">
                  {skinGoals.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="goals"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex items-center space-x-3 space-y-0 rounded-lg border p-3"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <Label className="cursor-pointer flex-1">{item.label}</Label>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </OnboardingTemplate>
  );
};

export default FemaleOnboardingSkinGoals;
