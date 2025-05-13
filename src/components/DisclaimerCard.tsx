
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface DisclaimerCardProps {
  disclaimerText?: string;
  isLoading?: boolean;
}

const DisclaimerCard: React.FC<DisclaimerCardProps> = ({ 
  disclaimerText,
  isLoading = false 
}) => {
  const defaultDisclaimer = "This information is for educational purposes only and is not intended as medical advice. Always consult with a healthcare professional or dermatologist for personalized recommendations and treatment options regarding skin concerns.";
  
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-600">Disclaimer</h2>
      <Card>
        <CardContent className="pt-6 p-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-4">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '600ms' }}></div>
              </div>
            </div>
          ) : (
            <p className="text-[8px] text-muted-foreground">
              {disclaimerText || defaultDisclaimer}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DisclaimerCard;
