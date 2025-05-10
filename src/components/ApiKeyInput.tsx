
import React from "react";
import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const ApiKeyInput = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 text-green-600 mb-2">
        <CheckCircle2 className="h-5 w-5" />
        <h3 className="text-lg font-semibold">OpenAI API Key Configured</h3>
      </div>
      <p className="text-sm text-muted-foreground">
        Your OpenAI API key is securely stored on the server. 
        Chat functionality will work automatically without requiring individual users to provide their own API keys.
      </p>
    </div>
  );
};

export default ApiKeyInput;
