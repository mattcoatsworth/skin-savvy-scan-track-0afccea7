
import React from "react";
import { Card } from "@/components/ui/card";

const DailySkinLog: React.FC = () => {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">Your Daily Skin Log</h2>
      <p className="text-sm text-muted-foreground">
        Track your daily skin condition and see how it changes over time.
      </p>
      
      {/* Placeholder for daily skin log entries */}
      <div className="space-y-2">
        <div className="p-3 border rounded-md bg-gray-50">
          <div className="flex justify-between items-center">
            <span className="font-medium">Today</span>
            <span className="text-sm text-muted-foreground">Score: 85</span>
          </div>
          <p className="text-sm mt-1">Skin looks well-hydrated with minimal redness.</p>
        </div>
        
        <div className="p-3 border rounded-md bg-gray-50">
          <div className="flex justify-between items-center">
            <span className="font-medium">Yesterday</span>
            <span className="text-sm text-muted-foreground">Score: 72</span>
          </div>
          <p className="text-sm mt-1">Some dryness around T-zone, otherwise good.</p>
        </div>
        
        <div className="p-3 border rounded-md bg-gray-50">
          <div className="flex justify-between items-center">
            <span className="font-medium">2 days ago</span>
            <span className="text-sm text-muted-foreground">Score: 78</span>
          </div>
          <p className="text-sm mt-1">Minor breakout on chin, otherwise skin is improving.</p>
        </div>
      </div>
    </div>
  );
};

export default DailySkinLog;
