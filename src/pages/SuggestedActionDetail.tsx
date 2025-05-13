
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import BackButton from "@/components/BackButton";
import { useSkinAdvice } from "@/hooks/useSkinAdvice";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import DisclaimerCard from "@/components/DisclaimerCard";
import TestAIChatBox from "@/components/TestAIChatBox";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

// This component handles the detail view for suggested actions
const SuggestedActionDetail = () => {
  const { id } = useParams<{ id?: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  useScrollToTop();
  
  const [action, setAction] = useState<any>(null);
  const [aiResponse, setAiResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  
  // Check if we're in testai mode
  const isTestAiMode = location.pathname.includes('/testai');
  
  // Initialize the skin advice hook for action details
  const { getAdvice, getTextContent } = useSkinAdvice({ adviceType: "action" });
  
  useEffect(() => {
    const loadAction = async () => {
      setIsLoading(true);
      
      // Mock loading the action data
      // In a real app, this would come from an API
      setTimeout(() => {
        // Simulate fetching data for this specific action
        setAction({
          id: id,
          title: "Review Morning Routine",
          description: "Your morning routine may be contributing to excessive dryness. Let's review and optimize it.",
          priority: "high",
          category: "skincare",
          difficulty: "medium",
          estimatedTime: "15 minutes",
          impact: "Potentially high impact on skin hydration and morning comfort"
        });
        
        setIsLoading(false);
      }, 800);
    };
    
    loadAction();
  }, [id]);
  
  useEffect(() => {
    const getAIResponseForAction = async () => {
      if (!action) return;
      
      try {
        // Get AI response about this specific action
        const aiAdvice = await getAdvice(
          `Provide detailed guidance on how to ${action.title.toLowerCase()} for better skin health. 
           Include specific recommendations, steps to take, and expected outcomes.
           This is for the action: ${action.description}`,
          { actionCategory: action.category, actionDifficulty: action.difficulty }
        );
        
        setAiResponse(getTextContent(aiAdvice));
      } catch (error) {
        console.error("Error getting AI advice:", error);
      }
    };
    
    getAIResponseForAction();
  }, [action]);

  if (isLoading) {
    return (
      <div className="bg-slate-50 min-h-screen pb-20">
        <div className="max-w-md mx-auto px-4 py-6">
          <header className="flex items-center mb-6">
            <BackButton />
            <h1 className="text-2xl font-bold">Loading Action...</h1>
          </header>
          <Card>
            <CardContent className="p-6">
              <p>Loading the suggested action details...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  
  if (!action) {
    return (
      <div className="bg-slate-50 min-h-screen pb-20">
        <div className="max-w-md mx-auto px-4 py-6">
          <header className="flex items-center mb-6">
            <BackButton />
            <h1 className="text-2xl font-bold">Action Not Found</h1>
          </header>
          <Card>
            <CardContent className="p-6">
              <p>Sorry, the action you're looking for couldn't be found.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="flex items-center mb-6">
          <BackButton />
          <h1 className="text-2xl font-bold">{action.title}</h1>
        </header>
        
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Action Details</h2>
            
            <div className="mb-4">
              <h3 className="text-lg font-medium">Description</h3>
              <p className="text-sm text-gray-600">{action.description}</p>
            </div>
            
            <div className="mb-4">
              <h3 className="text-lg font-medium">Category</h3>
              <p className="text-sm text-gray-600">{action.category}</p>
            </div>
            
            <div className="mb-4">
              <h3 className="text-lg font-medium">Priority</h3>
              <p className="text-sm text-gray-600">{action.priority}</p>
            </div>
            
            <div className="mb-4">
              <h3 className="text-lg font-medium">Difficulty</h3>
              <p className="text-sm text-gray-600">{action.difficulty}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium">Estimated Time</h3>
              <p className="text-sm text-gray-600">{action.estimatedTime}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mt-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">AI Guidance</h2>
            {aiResponse ? (
              <p className="text-sm text-gray-600">{aiResponse}</p>
            ) : (
              <p className="text-sm text-gray-600">Loading AI guidance...</p>
            )}
            
            {/* Add a consistent "Add to My Skin Goals" button */}
            <Button 
              className="w-full mt-6 skin-goals-button" 
              onClick={() => {
                // Handle adding to skin goals
                toast({
                  title: "Success",
                  description: "Added to your skin goals!",
                });
              }}
            >
              Add to My Skin Goals
            </Button>
          </CardContent>
        </Card>
        
        {/* Add Disclaimer section */}
        {isTestAiMode ? (
          <>
            <DisclaimerCard />
            <TestAIChatBox productTitle={action?.title} />
          </>
        ) : (
          <DisclaimerCard />
        )}
      </div>
    </div>
  );
};

export default SuggestedActionDetail;
