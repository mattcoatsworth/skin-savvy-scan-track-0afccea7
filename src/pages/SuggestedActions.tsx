
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import BackButton from "@/components/BackButton";

const SuggestedActions = () => {
  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <header className="flex items-center mb-6">
        <BackButton />
        <h1 className="text-2xl font-bold">Suggested Actions</h1>
      </header>
      
      <Card>
        <CardContent className="p-6">
          <p>Suggested actions content</p>
          <p className="text-sm text-gray-500 mt-4">
            This is a placeholder for the Suggested Actions page.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuggestedActions;
