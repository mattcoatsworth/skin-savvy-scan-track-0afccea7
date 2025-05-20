
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import EnergyAnalysis from "@/components/EnergyAnalysis";
import BackButton from "@/components/BackButton";

const FYP = () => {
  // Add scroll to top functionality
  useScrollToTop();
  
  return (
    <div>
      <header className="mb-6 flex items-center">
        <BackButton />
        <div>
          <h1 className="text-2xl font-bold">For You</h1>
          <p className="text-muted-foreground">Personalized recommendations</p>
        </div>
      </header>
      
      <main className="space-y-6">
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-2">Your FYP</h2>
            <p className="text-sm text-muted-foreground">
              This is your personalized "For You Page" with content tailored to your preferences 
              and skin health goals. Check back regularly for updates!
            </p>
          </CardContent>
        </Card>
        
        {/* Energy Analysis Section */}
        <EnergyAnalysis />
      </main>
    </div>
  );
};

export default FYP;
