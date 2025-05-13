
import React from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import BackButton from "@/components/BackButton";

const AIRecommendationDetail = () => {
  const { type, id, testai } = useParams();
  
  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <header className="flex items-center mb-6">
        <BackButton />
        <h1 className="text-2xl font-bold">AI Recommendation</h1>
      </header>
      
      <Card>
        <CardContent className="p-6">
          <p>Recommendation type: {type}</p>
          <p>Recommendation ID: {id}</p>
          <p>Test AI mode: {testai === 'testai' ? 'Enabled' : 'Disabled'}</p>
          <p className="text-sm text-gray-500 mt-4">
            This is a placeholder for the AI Recommendation Detail page.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIRecommendationDetail;
