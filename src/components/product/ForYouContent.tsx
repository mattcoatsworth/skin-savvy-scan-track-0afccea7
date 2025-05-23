
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface ForYouContentProps {
  personalRating: number;
  matchQuality: string;
  recommendation: string;
  whyItWorks: string;
  usageSuggestion: string;
  saveButtonText?: string;
  onSave?: () => void;
}

const ForYouContent: React.FC<ForYouContentProps> = ({
  personalRating,
  matchQuality,
  recommendation,
  whyItWorks,
  usageSuggestion,
  saveButtonText = "Save to My Foods",
  onSave = () => {}
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-1">Personal Match Rating</h3>
          <div className="flex items-center">
            <div className="flex-1 mr-4">
              <Progress 
                value={personalRating} 
                className="h-3 bg-gray-100" 
                indicatorClassName={personalRating >= 70 ? "bg-green-500" : personalRating >= 40 ? "bg-amber-500" : "bg-red-500"} 
              />
            </div>
            <div className="text-base font-semibold">{personalRating}/100</div>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{matchQuality}</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-1">Recommendation</h3>
            <p className="text-sm">{recommendation}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-1">Why This Works For You</h3>
            <p className="text-sm text-gray-600">{whyItWorks}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-1">Usage Suggestion</h3>
            <p className="text-sm text-gray-600">{usageSuggestion}</p>
          </div>
        </div>
        
        <Button 
          className="w-full mt-6 flex items-center justify-center gap-2"
          onClick={onSave} 
        >
          <Heart className="h-4 w-4" />
          {saveButtonText}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ForYouContent;
