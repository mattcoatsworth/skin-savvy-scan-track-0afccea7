
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const Disclaimer = () => {
  return (
    <div className="mt-6">
      <h2 className="text-lg text-muted-foreground mb-2">Disclaimer</h2>
      <Card className="ios-card">
        <CardContent className="p-4">
          <p className="text-muted-foreground text-sm">
            Individual responses may vary. Consult a healthcare professional before making changes to your routine.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Disclaimer;
