
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";

const EmptySuggestedActions = () => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-base">Suggested Actions</h3>
          <Link to="/suggested-actions">
            <Button variant="link" size="sm" className="text-xs p-0 h-auto">
              View All
            </Button>
          </Link>
        </div>
        
        <div className="flex flex-col items-center justify-center py-6">
          <Lightbulb className="h-10 w-10 text-gray-300 mb-2" />
          <p className="text-sm text-center text-muted-foreground">No suggested actions yet</p>
          <p className="text-xs text-center text-muted-foreground mb-2">
            Continue tracking your skin to receive personalized suggestions
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmptySuggestedActions;
