
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ActionType = {
  text: string;
};

type SuggestedActionsProps = {
  actions: ActionType[];
  className?: string;
};

const SuggestedActions: React.FC<SuggestedActionsProps> = ({ actions, className }) => {
  return (
    <div className={cn("ios-section", className)}>
      <h2 className="text-xl font-semibold mb-3">Suggested Actions</h2>
      
      <div className="space-y-3">
        {actions.map((action, index) => (
          <Card key={index} className="ios-card border-l-4 border-l-skin-teal">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <p className="font-medium">{action.text}</p>
                <ArrowRight className="h-5 w-5 text-skin-teal" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SuggestedActions;
