import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/BackButton";
import { CheckCircle, Clock } from "lucide-react";

type ActionType = {
  id: string;
  text: string;
  description: string;
  steps?: string[];
  benefits?: string[];
  timeEstimate?: string;
  completed?: boolean;
};

const SuggestedActionDetail = () => {
  const { actionId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [action, setAction] = useState<ActionType | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  // Sample data - in a real app, this would come from an API
  const sampleActions: ActionType[] = [
    {
      id: "water-intake",
      text: "Try logging your water intake today",
      description: "Proper hydration is essential for healthy skin. Tracking your water intake can help you ensure you're getting enough fluids throughout the day.",
      steps: [
        "Start your day with a glass of water upon waking",
        "Aim for at least 8 glasses (64 oz) throughout the day",
        "Set reminders on your phone for regular water breaks",
        "Record your intake in the app's daily log section"
      ],
      benefits: [
        "Improved skin hydration and elasticity",
        "Reduced appearance of fine lines",
        "Better toxin elimination through proper fluid balance",
        "Potential improvement in skin clarity"
      ],
      timeEstimate: "All day (ongoing)",
      completed: false
    },
    {
      id: "supplement-irritation",
      text: "Consider pausing this supplement to see if irritation decreases",
      description: "Our analysis has detected a possible correlation between your new supplement and recent skin irritation. Taking a break from this supplement may help determine if it's causing your skin concerns.",
      steps: [
        "Discontinue supplement use for 7-10 days",
        "Continue with your regular skincare routine",
        "Document any changes in skin condition daily",
        "If irritation subsides, consider reintroducing at a lower dose to confirm"
      ],
      benefits: [
        "Identify if the supplement is causing irritation",
        "Reduce inflammation and discomfort",
        "Find alternative options if necessary",
        "Better understand your skin's sensitivities"
      ],
      timeEstimate: "7-10 days",
      completed: false
    },
    {
      id: "spf-consistency",
      text: "Use SPF more consistently this week",
      description: "Consistent sun protection is the most effective anti-aging strategy. Recent skin analyses indicate signs of sun damage that could be prevented with more regular SPF application.",
      steps: [
        "Apply SPF 30+ every morning, regardless of weather",
        "Reapply every 2 hours when outdoors",
        "Don't forget commonly missed areas like ears, neck, and hands",
        "Track application in your daily log for accountability"
      ],
      benefits: [
        "Prevention of further photodamage",
        "Reduction in hyperpigmentation development",
        "Lower risk of skin cancer",
        "Slower development of fine lines and wrinkles"
      ],
      timeEstimate: "Ongoing, 7+ days to see results",
      completed: false
    }
  ];

  useEffect(() => {
    // Check if we have action data passed through location state
    if (location.state && location.state.insightId) {
      const stateActionId = location.state.insightId;
      const foundAction = sampleActions.find(a => a.id === stateActionId);
      if (foundAction) {
        setAction(foundAction);
        setIsCompleted(foundAction.completed || false);
      }
    } 
    // Otherwise look for the action by ID from URL params
    else if (actionId) {
      const foundAction = sampleActions.find(a => a.id === actionId);
      if (foundAction) {
        setAction(foundAction);
        setIsCompleted(foundAction.completed || false);
      } else {
        // If no action is found, navigate to the actions list
        navigate("/suggested-actions");
      }
    }
  }, [location, actionId, navigate]);

  const handleMarkComplete = () => {
    setIsCompleted(true);
    // In a real app, you would send this update to the server
  };

  if (!action) {
    return (
      <div className="flex justify-center items-center h-48">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <header className="mb-6 flex items-center">
        <BackButton />
        <h1 className="text-xl font-bold truncate">{action.text}</h1>
      </header>

      <Card className="mb-6 border-l-4 border-l-skin-teal">
        <CardContent className="p-6">
          <p className="mb-4">{action.description}</p>
          
          {action.timeEstimate && (
            <div className="flex items-center text-sm text-muted-foreground mb-4">
              <Clock className="h-4 w-4 mr-2" />
              <span>Time estimate: {action.timeEstimate}</span>
            </div>
          )}

          {!isCompleted ? (
            <Button 
              onClick={handleMarkComplete} 
              className="w-full bg-skin-teal hover:bg-skin-teal/80 text-white"
            >
              Mark as Completed
            </Button>
          ) : (
            <div className="flex items-center justify-center p-2 bg-green-100 text-green-700 rounded">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span>Completed</span>
            </div>
          )}
        </CardContent>
      </Card>

      {action.steps && action.steps.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Steps to Take</h2>
          <Card>
            <CardContent className="p-4">
              <ol className="list-decimal pl-5 space-y-2">
                {action.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>
      )}

      {action.benefits && action.benefits.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Expected Benefits</h2>
          <Card>
            <CardContent className="p-4">
              <ul className="list-disc pl-5 space-y-2">
                {action.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Track Your Progress</h2>
        <Card>
          <CardContent className="p-4">
            <p className="mb-4">Log your daily progress to see how this action affects your skin over time.</p>
            <Button variant="outline" className="w-full">Add to Daily Log</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuggestedActionDetail;
