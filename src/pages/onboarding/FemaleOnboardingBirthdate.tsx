
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import { useForm } from "react-hook-form";
import OnboardingTemplate from "@/components/OnboardingTemplate";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDisplayDate, toStorageFormat } from "@/utils/formatting/dateUtils";

type BirthdateFormValues = {
  birthdate: Date | undefined;
};

const FemaleOnboardingBirthdate: React.FC = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>();
  const MAX_DATE = new Date(); // Today as max date
  const MIN_DATE = new Date(1900, 0, 1); // Jan 1, 1900 as min date

  const form = useForm<BirthdateFormValues>({
    defaultValues: {
      birthdate: undefined,
    },
  });

  const onSubmit = (data: BirthdateFormValues) => {
    if (date) {
      // Save birthdate to localStorage using cross-platform storage format
      localStorage.setItem("userBirthdate", toStorageFormat(date));
      
      // Navigate to the next step in the female onboarding flow
      navigate("/onboarding/female/skin-type");
    }
  };

  const handleNext = () => {
    if (date) {
      form.setValue("birthdate", date);
      form.handleSubmit(onSubmit)();
    }
  };

  return (
    <OnboardingTemplate
      title="When were you born?"
      description="Your age helps us provide more accurate skin care recommendations."
      currentStep={2}
      totalSteps={12}
      onNext={handleNext}
      nextDisabled={!date}
    >
      <div className="flex-1 flex flex-col items-center">
        <div className="w-full mb-6 px-4">
          <p className="text-sm text-muted-foreground mb-2">Select your date of birth:</p>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full pl-3 text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                {date ? (
                  formatDisplayDate(date)
                ) : (
                  <span>Pick a date</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) =>
                  date > MAX_DATE || date < MIN_DATE
                }
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>

        {date && (
          <div className="mt-6 text-center">
            <p className="text-lg">
              You selected: <span className="font-medium">{formatDisplayDate(date)}</span>
            </p>
          </div>
        )}
      </div>
    </OnboardingTemplate>
  );
};

export default FemaleOnboardingBirthdate;
