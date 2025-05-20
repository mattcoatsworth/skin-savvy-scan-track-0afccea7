
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { History, Plus } from "lucide-react";

const EmptySkinHistory = () => {
  return (
    <Card className="w-full overflow-hidden">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium text-sm">Weekly Skin Report</h3>
          <Link to="/skin?tab=weekly">
            <Button variant="link" size="sm" className="text-xs p-0 h-auto">
              View Report
            </Button>
          </Link>
        </div>
        
        <div className="flex flex-col items-center justify-center py-6">
          <History className="h-10 w-10 text-gray-300 mb-2" />
          <p className="text-sm text-center text-muted-foreground mb-2">No skin data available yet</p>
          <Button size="sm" className="mt-2" asChild>
            <Link to="/log-skin-condition">
              <Plus className="h-4 w-4 mr-1" />
              Log Today
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmptySkinHistory;
