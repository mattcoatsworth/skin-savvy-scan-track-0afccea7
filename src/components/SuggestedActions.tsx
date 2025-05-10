
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
    
    // If we have an ID, link to specific action detail page
    if (action.id) {
      return `/suggested-actions/${action.id}`;
    }
    
    // Default to the suggested actions page
    return "/suggested-actions";
  };
  
  // Enhanced click handler for scrolling to top before navigation
  const handleActionClick = (e: React.MouseEvent, path: string, actionId?: string) => {
    e.preventDefault();
    
    // First scroll to top
    window.scrollTo(0, 0);
    
    // Small timeout to allow scroll to happen before navigation
    setTimeout(() => {
      navigate(path, { 
        state: actionId ? { insightId: actionId, from: window.location.pathname } : undefined
      });
    }, 10);
  };
  
  return (
    <div className={cn("ios-section", className)}>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold">Suggested Actions</h2>
        <Link 
          to="/suggested-actions" 
          className="text-sm text-skin-teal" 
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo(0, 0);
            setTimeout(() => navigate("/suggested-actions"), 10);
          }}
        >
          View all
        </Link>
      </div>
      
      <div className="space-y-3">
        {actions.map((action, index) => {
          const path = getActionLink(action);
          return (
            <Card 
              key={index} 
              className="ios-card border-l-4 border-l-skin-teal hover:shadow-md transition-all cursor-pointer"
              onClick={(e) => handleActionClick(e, path, action.id)}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <p className="font-medium">{action.text}</p>
                  <ArrowRight className="h-5 w-5 text-skin-teal" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default SuggestedActions;
