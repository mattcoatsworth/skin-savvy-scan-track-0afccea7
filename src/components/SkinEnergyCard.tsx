
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Activity } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const SkinEnergyCard: React.FC = () => {
  return (
    <Card className="overflow-hidden border-l-4 border-l-blue-400">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-500" />
            <h3 className="font-medium text-base">Skin Energy</h3>
          </div>
          <Link to="/fyp">
            <Button variant="ghost" size="sm" className="text-xs">
              View Details
            </Button>
          </Link>
        </div>
        
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm">Current Energy Level</p>
          <p className="font-semibold text-sm text-blue-600">78%</p>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div className="bg-blue-500 h-2 rounded-full" style={{ width: "78%" }}></div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-xs text-muted-foreground">Hydration</p>
            <p className="text-xs font-medium">Good</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-xs text-muted-foreground">Nutrients</p>
            <p className="text-xs font-medium">Excellent</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-xs text-muted-foreground">Sleep</p>
            <p className="text-xs font-medium">Needs improvement</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkinEnergyCard;
