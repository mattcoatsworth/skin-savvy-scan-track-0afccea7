
import React, { useState } from "react";
import { useApiKey } from "@/contexts/ApiKeyContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Save } from "lucide-react";
import { toast } from "sonner";

const ApiKeyInput = () => {
  const { openaiApiKey, setOpenaiApiKey } = useApiKey();
  const [tempApiKey, setTempApiKey] = useState(openaiApiKey);
  const [showApiKey, setShowApiKey] = useState(false);

  const handleSave = () => {
    setOpenaiApiKey(tempApiKey);
    toast.success("API Key saved successfully");
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold mb-2">OpenAI API Key</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Enter your OpenAI API key to enable chat functionality. 
        Your key is stored locally in your browser and never sent to our servers.
      </p>
      
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type={showApiKey ? "text" : "password"}
            value={tempApiKey}
            onChange={(e) => setTempApiKey(e.target.value)}
            placeholder="sk-..."
            className="pr-10"
          />
          <button 
            type="button"
            onClick={() => setShowApiKey(!showApiKey)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        <Button onClick={handleSave} className="flex items-center gap-1">
          <Save size={16} />
          Save
        </Button>
      </div>
    </div>
  );
};

export default ApiKeyInput;
