
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface OnboardingTemplateProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  currentStep: number;
  totalSteps: number;
  nextBtnText?: string;
  onNext: () => void;
  showBackButton?: boolean;
  nextDisabled?: boolean;
}

const OnboardingTemplate: React.FC<OnboardingTemplateProps> = ({
  children,
  title,
  description,
  currentStep,
  totalSteps,
  nextBtnText = "Next",
  onNext,
  showBackButton = true,
  nextDisabled = false,
}) => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const progressPercentage = (currentStep / totalSteps) * 100;
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header with progress bar */}
      <div className="px-4 py-6">
        <div className="flex justify-between items-center mb-2">
          {showBackButton ? (
            <button onClick={handleBack} className="p-2 -ml-2">
              <ArrowLeft className="h-5 w-5" />
            </button>
          ) : (
            <div className="w-9"></div>
          )}
          <div className="text-sm font-medium">
            {currentStep}/{totalSteps}
          </div>
        </div>
        <Progress value={progressPercentage} className="h-1" />
      </div>
      
      {/* Content area */}
      <div className="flex-1 px-4">
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        {description && (
          <p className="text-muted-foreground mb-8">{description}</p>
        )}
        
        {/* Main content */}
        <div className="flex-1">
          {children}
        </div>
      </div>
      
      {/* Footer with next button */}
      <div className="px-4 py-8 mt-auto">
        <Button 
          onClick={onNext} 
          className="w-full"
          disabled={nextDisabled}
        >
          {nextBtnText}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default OnboardingTemplate;
