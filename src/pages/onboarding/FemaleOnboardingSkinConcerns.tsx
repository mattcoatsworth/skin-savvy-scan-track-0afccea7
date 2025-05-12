
import React from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import OnboardingTemplate from "@/components/OnboardingTemplate";

type SkinConcernsFormValues = {
  concerns: string[];
};

const skinConcerns = [
  { id: "acne", label: "Acne & Breakouts" },
  { id: "dryness", label: "Dryness" },
  { id: "oiliness", label: "Excessive Oiliness" },
  { id: "redness", label: "Redness & Irritation" },
  { id: "aging", label: "Fine Lines & Wrinkles" },
  { id: "darkSpots", label: "Dark Spots & Hyperpigmentation" },
  { id: "texture", label: "Uneven Texture" },
  { id: "pores", label: "Large Pores" },
  { id: "dullness", label: "Dullness & Lack of Radiance" },
];

const FemaleOnboardingSkinConcerns: React.FC = () => {
  const navigate = useNavigate();
  const form = useForm<SkinConcernsFormValues>({
    defaultValues: {
      concerns: [],
    },
  });

  const onSubmit = (data: SkinConcernsFormValues) => {
    // Save to localStorage for future reference
    localStorage.setItem("userSkinConcerns", JSON.stringify(data.concerns));
    
    // Navigate to the next screen
    navigate("/onboarding/female/skin-goals");
  };

  const handleNext = () => {
    form.handleSubmit(onSubmit)();
  };

  return (
    <OnboardingTemplate
      title="What are you unhappy with?"
      description="Select all skin concerns that apply to you."
      currentStep={4}
      totalSteps={12}
      onNext={handleNext}
      nextDisabled={form.watch("concerns").length === 0}
    >
      <Form {...form}>
        <form className="space-y-4">
          <FormField
            control={form.control}
            name="concerns"
            render={() => (
              <FormItem>
                <div className="space-y-3">
                  {skinConcerns.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="concerns"
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

export default FemaleOnboardingSkinConcerns;
