import React from "react";
import AppNavigation from "@/components/AppNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import BackButton from "@/components/BackButton";

type ActionType = {
  text: string;
  description: string;
  completed?: boolean;
};

const SuggestedActionsPage = () => {
  // Sample data
  const suggestedActions: ActionType[] = [
    { 
      text: "Try logging your water intake today", 
      description: "Hydration directly impacts your skin's moisture levels."
    },
    { 
      text: "Consider pausing this supplement to see if irritation decreases", 
      description: "We've noticed a potential correlation between your new supplement and recent skin irritation."
    },
    { 
      text: "Use SPF more consistently this week", 
      description: "Your skin analysis shows signs of sun exposure. Consistent SPF can help prevent further damage."
    },
    { 
      text: "Record your sleep patterns for the next few days", 
      description: "Quality sleep can improve skin repair and regeneration."
    },
    { 
      text: "Try eliminating dairy for one week", 
      description: "Based on your logs, dairy might be contributing to breakouts."
    },
  ];

  const completedActions: ActionType[] = [
    { 
      text: "Log your morning skincare routine", 
      description: "You've successfully logged your routine for 5 consecutive days.",
      completed: true
    },
    { 
      text: "Scan your new moisturizer", 
      description: "You've added this product to your inventory.",
      completed: true
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6 flex items-center">
          <BackButton />
          <h1 className="text-2xl font-bold">Suggested Actions</h1>
        </header>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Recommended For You</h2>
          <div className="space-y-3">
            {suggestedActions.map((action, index) => (
              <Card key={index} className="ios-card border-l-4 border-l-skin-teal">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{action.text}</p>
                      <p className="text-sm text-muted-foreground mt-1">{action.description}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-skin-teal mt-1 shrink-0" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-3">Completed Actions</h2>
          <div className="space-y-3">
            {completedActions.map((action, index) => (
              <Card key={index} className="ios-card border-l-4 border-l-gray-300">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <p className="font-medium">{action.text}</p>
                        <CheckCircle2 className="h-4 w-4 text-green-500 ml-2" />
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{action.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      <AppNavigation />
    </div>
  );
};

export default SuggestedActionsPage;
