
import React from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import OnboardingTemplate from "@/components/OnboardingTemplate";
import { Input } from "@/components/ui/input";

type ProductAllergiesFormValues = {
  allergies: string[];
  otherAllergy: string;
};

const commonProductAllergies = [
  { id: "fragrance", label: "Fragrance" },
  { id: "parabens", label: "Parabens" },
  { id: "sulfates", label: "Sulfates" },
  { id: "essentialOils", label: "Essential Oils" },
  { id: "alcohol", label: "Alcohol" },
  { id: "benzoylPeroxide", label: "Benzoyl Peroxide" },
  { id: "salicylicAcid", label: "Salicylic Acid" },
  { id: "retinol", label: "Retinol" },
  { id: "none", label: "No Known Product Allergies" },
];

const FemaleOnboardingProductAllergies: React.FC = () => {
  const navigate = useNavigate();
  const form = useForm<ProductAllergiesFormValues>({
    defaultValues: {
      allergies: [],
      otherAllergy: "",
    },
  });

  const allergies = form.watch("allergies");

  const onSubmit = (data: ProductAllergiesFormValues) => {
    // Combine all allergies
    const allAllergies = [...data.allergies];
    if (data.otherAllergy && !data.allergies.includes("none")) {
      allAllergies.push(`other:${data.otherAllergy}`);
    }
    
    // Save to localStorage for future reference
    localStorage.setItem("userProductAllergies", JSON.stringify(allAllergies));
    
    // Navigate to the next screen
    navigate("/onboarding/female/goal-timeline");
  };

  const handleNext = () => {
    form.handleSubmit(onSubmit)();
  };

  const handleNoneSelection = (checked: boolean) => {
    if (checked) {
      // If "None" is selected, clear other selections
      form.setValue("allergies", ["none"]);
    } else {
      // If "None" is unchecked, clear it
      form.setValue("allergies", []);
    }
  };

  const handleAllergySelection = (id: string, checked: boolean) => {
    if (id === "none" && checked) {
      // If "None" is checked, clear other selections
      return ["none"];
    } else {
      const current = form.getValues("allergies");
      let updated: string[];
      
      if (checked) {
        // If any other allergy is checked, remove "none"
        updated = current.filter(item => item !== "none");
        updated.push(id);
      } else {
        updated = current.filter(item => item !== id);
      }
      
      return updated;
    }
  };

  return (
    <OnboardingTemplate
      title="Are you allergic to any skincare ingredients?"
      description="Select any ingredients that have caused reactions."
      currentStep={7}
      totalSteps={12}
      onNext={handleNext}
      nextDisabled={allergies.length === 0}
    >
      <Form {...form}>
        <form className="space-y-4">
          <FormField
            control={form.control}
            name="allergies"
            render={() => (
              <FormItem>
                <div className="space-y-3">
                  {commonProductAllergies.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="allergies"
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
                                  const newValue = handleAllergySelection(item.id, !!checked);
                                  field.onChange(newValue);
                                  if (item.id === "none") {
                                    handleNoneSelection(!!checked);
                                  }
                                }}
                              />
                            </FormControl>
                            <Label className="cursor-pointer flex-1">{item.label}</Label>
                          </FormItem>
                        );
                      }}
                    />
                  ))}

                  {/* Only show "Other" field if "None" is not selected */}
                  {!allergies.includes("none") && (
                    <div className="pt-2">
                      <FormField
                        control={form.control}
                        name="otherAllergy"
                        render={({ field }) => (
                          <FormItem>
                            <Label>Other (please specify)</Label>
                            <FormControl>
                              <Input {...field} placeholder="Type any other allergies here" />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </div>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </OnboardingTemplate>
  );
};

export default FemaleOnboardingProductAllergies;
