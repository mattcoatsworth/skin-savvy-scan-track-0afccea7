
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import TestAIChatBox from "@/components/TestAIChatBox";

const DisclaimerChatBox = () => {
  return (
    <>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">Expected Results</h3>
          <div className="bg-emerald-100 text-emerald-800 py-1 px-3 rounded-full text-sm font-medium">
            ~85% Improvement
          </div>
        </div>
        <Card className="border-slate-200">
          <CardContent className="p-4 text-muted-foreground text-sm">
            <p>
              Following this personalized meal plan consistently may result in approximately 
              85% improvement in your skin health metrics over time. Results may vary based on 
              individual factors, consistency, and other lifestyle elements.
            </p>
          </CardContent>
        </Card>
      </div>

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
