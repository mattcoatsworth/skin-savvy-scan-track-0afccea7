
import React from "react";
import AppNavigation from "@/components/AppNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart2 } from "lucide-react";

const Insights = () => {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-center">Insights</h1>
        </header>
        
        <Card className="ios-card mb-6">
          <CardContent className="p-5">
            <div className="flex items-center justify-center py-12 flex-col">
              <BarChart2 className="h-12 w-12 text-skin-teal mb-3" />
              <h2 className="text-xl font-medium text-center">Track More Products</h2>
              <p className="text-center text-muted-foreground mt-2">
                Add more products to see detailed insights and trends
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <AppNavigation />
    </div>
  );
};

export default Insights;
