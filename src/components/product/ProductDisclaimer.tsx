
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface ProductDisclaimerProps {
  isLoading: boolean;
  aiContent: any;
}

const ProductDisclaimer = ({ isLoading, aiContent }: ProductDisclaimerProps) => {
  const LoadingIndicator = () => (
    <div className="flex items-center justify-center py-4">
      <div className="flex space-x-2">
        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '600ms' }}></div>
      </div>
    </div>
  );

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-600">Disclaimer</h3>
      
      <Card>
        <CardContent className="p-4">
          {isLoading ? (
            <LoadingIndicator />
          ) : (
            <div className="text-[8px] text-muted-foreground">
              {aiContent.disclaimer?.sections["Disclaimer"] ? (
                <p>{typeof aiContent.disclaimer.sections["Disclaimer"] === 'string' 
                  ? aiContent.disclaimer.sections["Disclaimer"] 
                  : "Individual responses may vary. Consult a healthcare professional before making changes to your routine."}</p>
              ) : (
                <p>Individual responses may vary. Consult a healthcare professional before making changes to your routine.</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDisclaimer;
