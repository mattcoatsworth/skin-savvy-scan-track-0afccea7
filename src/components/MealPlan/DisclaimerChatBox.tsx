
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import TestAIChatBox from "@/components/TestAIChatBox";

const DisclaimerChatBox = () => {
  return (
    <>
      {/* Removed duplicate Expected Results section */}
      
      <TestAIChatBox productTitle="Skin-Focused Meal Plan" />
      
      <div className="mt-6 mb-6">
        <h3 className="text-lg font-semibold mb-3 text-muted-foreground">Disclaimer</h3>
        <Card className="border-slate-200">
          <CardContent className="p-4 text-muted-foreground text-xs">
            <p>
              This information is for educational purposes only and is not intended as
              medical advice. Always consult with a healthcare professional or
              dermatologist for personalized recommendations and treatment options
              regarding skin concerns.
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default DisclaimerChatBox;
