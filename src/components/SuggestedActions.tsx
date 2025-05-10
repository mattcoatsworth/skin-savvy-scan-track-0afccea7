
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

type ActionType = {
  text: string;
  linkTo?: string;
  id?: string;
  supplementId?: string;
};

type SuggestedActionsProps = {
  actions: ActionType[];
  className?: string;
};

const SuggestedActions: React.FC<SuggestedActionsProps> = ({ actions, className }) => {
  // Function to determine where each action should link to
  const getActionLink = (action: ActionType) => {
    // If this is a supplement-related action, link directly to the supplement page
    if (action.supplementId) {
      return `/supplement/${action.supplementId}`;
    }
    
    // If a custom link is provided, use it
    if (action.linkTo) {
      return action.linkTo;
    }
    
    // If we have an ID, link to specific action detail page
    if (action.id) {
      return `/suggested-actions/${action.id}`;
    }
    
    // Default to the suggested actions page
    return "/suggested-actions";
  };
  
  // Add onClick handler for scrolling to top when clicked
  const handleClick = () => {
    window.scrollTo(0, 0);
  };
  
  return (
    <div className={cn("ios-section", className)}>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold">Suggested Actions</h2>
        <Link to="/suggested-actions" className="text-sm text-skin-teal" onClick={handleClick}>
          View all
        </Link>
      </div>
      
      <div className="space-y-3">
        {actions.map((action, index) => (
          <Link 
            to={getActionLink(action)} 
            key={index} 
            state={{ insightId: action.id, from: window.location.pathname }}
            className="block"
            onClick={handleClick}
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
