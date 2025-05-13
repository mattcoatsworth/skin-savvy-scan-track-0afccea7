
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Smile, ChevronRight } from "lucide-react";
import { SkinFactor, Factor } from "./skin-snapshot/SkinFactor";
import { Recommendation } from "./skin-snapshot/SkinRecommendation";
import { RecommendationsSection } from "./skin-snapshot/RecommendationsSection";
import { useSkinRecommendations } from "./skin-snapshot/useSkinRecommendations";

type SkinSnapshotProps = {
  emoji: string;
  status: string;
  factors: Factor[];
  recommendations?: Recommendation[];
  className?: string;
};

const DailySkinSnapshot: React.FC<SkinSnapshotProps> = ({
  emoji,
  status,
  factors,
  recommendations = [],
  className,
}) => {
  // Use the custom hook to get recommendations
  const { recommendations: displayRecommendations, isLoading } = 
    useSkinRecommendations(factors, recommendations);
  
  return (
    <Link to="/skin">
      <Card className={cn("ios-card hover:shadow-lg transition-shadow", className)}>
        <CardContent className="p-4">
          <div className="flex items-center mb-4">
            <div className="text-4xl mr-3">
              <Smile className="h-8 w-8" />
            </div>
            <div>
              <h2 className="font-medium text-lg">Today's Skin</h2>
              <p className="text-xl font-semibold">{status}</p>
            </div>
          </div>
          
          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-2">Contributing Factors:</p>
            <div className="flex flex-wrap gap-2">
              {factors.map((factor, index) => (
                <SkinFactor key={index} factor={factor} />
              ))}
            </div>
          </div>
          
          {(displayRecommendations.length > 0 || isLoading) && (
            <RecommendationsSection 
              recommendations={displayRecommendations}
              isLoading={isLoading}
            />
          )}
          
          <div className="text-center mt-4 text-skin-teal flex items-center justify-center">
            View Full Analysis <ChevronRight className="h-4 w-4 ml-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default DailySkinSnapshot;
