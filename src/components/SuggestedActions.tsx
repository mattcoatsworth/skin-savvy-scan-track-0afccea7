
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";

type ActionType = {
  text: string;
  linkTo?: string;
  id?: string;
  supplementId?: string;
  type?: string; // Type for AI recommendations
};

type SuggestedActionsProps = {
  actions: ActionType[];
  className?: string;
};

const SuggestedActions: React.FC<SuggestedActionsProps> = ({ actions, className }) => {
  const navigate = useNavigate();
  
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
    
    // If we have an ID and type for AI recommendation, use the consistent testai format
    if (action.id && action.type) {
      // Ensure we're using the format that AIRecommendationDetail expects
      return `/recommendations-detail/${action.type}/${action.id}/testai`;
    }
    
    // If we have just an ID, link to specific action detail page
    if (action.id) {
      return `/suggested-actions/${action.id}`;
    }
    
    // Default to the suggested actions page
    return "/suggested-actions";
  };
  
  return (
    <div className={cn("ios-section", className)}>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold">Suggested Actions</h2>
        <Link to="/suggested-actions" className="text-sm text-skin-black">
          View all
        </Link>
      </div>
      
      <div className="space-y-3">
        {actions.map((action, index) => {
          const path = getActionLink(action);
          return (
            <Link 
              key={index} 
              to={path}
              state={{ 
                recommendation: {
                  text: action.text,
                  type: action.type || "recommendation",
                  id: action.id || String(index)
                }
              }}
            >
              <Card className="ios-card border-l-4 border-l-skin-black hover:shadow-md transition-all cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <p className="font-medium">{action.text}</p>
                    <ArrowRight className="h-5 w-5 text-skin-black" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SuggestedActions;
