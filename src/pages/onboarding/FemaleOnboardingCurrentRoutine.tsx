
import React from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import OnboardingTemplate from "@/components/OnboardingTemplate";
import { Input } from "@/components/ui/input";

type CurrentRoutineFormValues = {
  routine: string[];
  otherProducts: string;
};

const routineProducts = [
  { id: "cleanser", label: "Cleanser" },
  { id: "toner", label: "Toner" },
  { id: "serum", label: "Serum" },
  { id: "moisturizer", label: "Moisturizer" },
  { id: "sunscreen", label: "Sunscreen" },
  { id: "exfoliator", label: "Exfoliator" },
  { id: "mask", label: "Face Mask" },
  { id: "eyeCream", label: "Eye Cream" },
  { id: "retinol", label: "Retinol" },
  { id: "oilsBalms", label: "Face Oils/Balms" },
  { id: "nothing", label: "I don't use any skincare products" },
];

const FemaleOnboardingCurrentRoutine: React.FC = () => {
  const navigate = useNavigate();
  const form = useForm<CurrentRoutineFormValues>({
    defaultValues: {
      routine: [],
      otherProducts: "",
    },
  });

  const routine = form.watch("routine");

  const onSubmit = (data: CurrentRoutineFormValues) => {
    // Combine all routine items
    const allItems = [...data.routine];
    if (data.otherProducts && !data.routine.includes("nothing")) {
      allItems.push(`other:${data.otherProducts}`);
    }
    
    // Save to localStorage for future reference
    localStorage.setItem("userCurrentRoutine", JSON.stringify(allItems));
    
    // Navigate to the next screen
    navigate("/onboarding/female/routine-effectiveness");
  };

  const handleNext = () => {
    form.handleSubmit(onSubmit)();
  };

  const handleNothingSelection = (checked: boolean) => {
    if (checked) {
      // If "Nothing" is selected, clear other selections
      form.setValue("routine", ["nothing"]);
    } else {
      // If "Nothing" is unchecked, clear it
      form.setValue("routine", []);
    }
  };

  const handleRoutineSelection = (id: string, checked: boolean) => {
    if (id === "nothing" && checked) {
      // If "Nothing" is checked, clear other selections
      return ["nothing"];
    } else {
      const current = form.getValues("routine");
      let updated: string[];
      
      if (checked) {
        // If any other routine item is checked, remove "nothing"
        updated = current.filter(item => item !== "nothing");
        updated.push(id);
      } else {
        updated = current.filter(item => item !== id);
      }
      
      return updated;
    }
  };

  return (
    <OnboardingTemplate
      title="What do you currently do for your skin?"
      description="Select all products that you use regularly."
      currentStep={9}
      totalSteps={12}
      onNext={handleNext}
      nextDisabled={routine.length === 0}
    >
      <Form {...form}>
        <form className="space-y-4">
          <FormField
            control={form.control}
            name="routine"
            render={() => (
              <FormItem>
                <div className="space-y-3">
                  {routineProducts.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="routine"
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
                                  const newValue = handleRoutineSelection(item.id, !!checked);
                                  field.onChange(newValue);
                                  if (item.id === "nothing") {
                                    handleNothingSelection(!!checked);
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

                  {/* Only show "Other" field if "Nothing" is not selected */}
                  {!routine.includes("nothing") && (
                    <div className="pt-2">
                      <FormField
                        control={form.control}
                        name="otherProducts"
                        render={({ field }) => (
                          <FormItem>
                            <Label>Other products (please specify)</Label>
                            <FormControl>
                              <Input {...field} placeholder="Other skincare products you use" />
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

export default FemaleOnboardingCurrentRoutine;
