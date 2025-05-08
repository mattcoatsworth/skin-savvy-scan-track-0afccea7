
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

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
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold">Suggested Actions</h2>
        <Link to="/suggested-actions" className="text-sm text-skin-teal">
          View all
        </Link>
      </div>
      
      <div className="space-y-3">
        {actions.map((action, index) => (
          <Link to="/suggested-actions" key={index}>
            <Card className="ios-card border-l-4 border-l-skin-teal">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <p className="font-medium">{action.text}</p>
                  <ArrowRight className="h-5 w-5 text-skin-teal" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SuggestedActions;
