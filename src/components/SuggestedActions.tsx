
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

type ActionType = {
  text: string;
  linkTo?: string; // Add optional linkTo property for custom navigation
  id?: string; // Add optional id for specific item identification
};

type SuggestedActionsProps = {
  actions: ActionType[];
  className?: string;
};

const SuggestedActions: React.FC<SuggestedActionsProps> = ({ actions, className }) => {
  // Function to determine where each action should link to
  const getActionLink = (action: ActionType) => {
    // If a custom link is provided, use it
    if (action.linkTo) {
      return action.linkTo;
    }
    
    // Default to the suggested actions page
    return "/suggested-actions";
  };
  
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
          <Link 
            to={getActionLink(action)} 
            key={index} 
            state={action.id ? { insightId: action.id } : undefined}
            className="block"
          >
            <Card className="ios-card border-l-4 border-l-skin-teal hover:shadow-md transition-all">
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
