import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RadioGroup } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import OnboardingTemplate from "@/components/OnboardingTemplate";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Share } from "lucide-react";

type FamilyHistoryFormValues = {
  familyHistory: "yes" | "no" | "unsure";
  details: string;
  wantReferral: boolean;
};

const FemaleOnboardingFamilyHistory: React.FC = () => {
  const navigate = useNavigate();
  const [referralLink, setReferralLink] = useState<string | null>(null);
  
  const form = useForm<FamilyHistoryFormValues>({
    defaultValues: {
      familyHistory: undefined,
      details: "",
      wantReferral: false,
    },
  });

  const familyHistory = form.watch("familyHistory");
  const wantReferral = form.watch("wantReferral");

  const onSubmit = (data: FamilyHistoryFormValues) => {
    // Save to localStorage for future reference
    const historyData = {
      familyHistory: data.familyHistory,
      details: data.details,
      wantReferral: data.wantReferral,
    };
    localStorage.setItem("userFamilyHistory", JSON.stringify(historyData));
    
    // Navigate to the completion page or home page
    navigate("/home");
  };

  const handleNext = () => {
    form.handleSubmit(onSubmit)();
  };

  const generateReferralLink = () => {
    // Generate a unique referral code using timestamp and random string
    const referralCode = `REF-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 8)}`;
    
    // Create referral link (in a production app this would be tracked in a database)
    const link = `https://skinsavvy.app/signup?ref=${referralCode}`;
    setReferralLink(link);
    
    // Save referral data to localStorage
    const referralData = {
      code: referralCode,
      link: link,
      created: new Date().toISOString(),
    };
    localStorage.setItem("userReferralCode", JSON.stringify(referralData));
    
    form.setValue("wantReferral", true);
  };

  const copyToClipboard = () => {
    if (referralLink) {
      navigator.clipboard.writeText(referralLink)
        .then(() => {
          toast({
            title: "Copied to clipboard!",
            description: "You can now share this link with your siblings.",
          });
        })
        .catch(() => {
          toast({
            title: "Failed to copy",
            description: "Please try again or copy manually.",
            variant: "destructive"
          });
        });
    }
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
                        className={`flex items-center space-x-3 rounded-lg border p-4 cursor-pointer ${
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
            <div className="space-y-4">
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
              
              {/* Referral section */}
              <div className="mt-6 border-t pt-4">
                <Label className="mb-2 block">Would you like to invite your siblings to join Skin Savvy?</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Share a referral link with your siblings and you'll both receive special offers.
                </p>
                
                {!referralLink ? (
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full"
                    onClick={generateReferralLink}
                  >
                    Generate Referral Link
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <input 
                        type="text" 
                        readOnly 
                        value={referralLink} 
                        className="flex-1 p-2 text-sm border rounded-md bg-muted"
                      />
                      <Button 
                        type="button"
                        size="sm"
                        onClick={copyToClipboard}
                      >
                        <Share className="h-4 w-4 mr-2" />
                        Copy
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Your referral link is ready to share. You'll receive a reward when your sibling signs up!
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </form>
      </Form>
    </OnboardingTemplate>
  );
};

export default FemaleOnboardingFamilyHistory;
