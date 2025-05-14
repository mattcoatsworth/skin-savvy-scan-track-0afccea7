
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useSkinAdvice } from "@/hooks/useSkinAdvice";

type FactorType = "Food" | "Supplement" | "Makeup" | "Weather";

type Factor = {
  type: FactorType;
  status: string;
  icon: React.ReactNode;
};

export type RecommendationType = "skincare" | "food" | "lifestyle" | "supplements";

export type Recommendation = {
  type: RecommendationType;
  text: string;
  icon?: React.ReactNode;
  linkTo?: string;
};

type DailySkinSnapshotProps = {
  emoji: string;
  status: string;
  factors: Factor[];
  recommendations?: Recommendation[];
};

const DailySkinSnapshot: React.FC<DailySkinSnapshotProps> = ({
  emoji,
  status,
  factors,
  recommendations: initialRecommendations = []
}) => {
  // Use the skin advice hook to get recommendations
  const { recommendations: aiRecommendations, isLoading } = useSkinAdvice();
  
  // Combine recommendations, prioritizing AI recommendations if available,
  // falling back to provided recommendations
  const recommendations = aiRecommendations && aiRecommendations.length > 0
    ? aiRecommendations
    : initialRecommendations;

  // Get the background class based on recommendation type
  const getRecommendationClass = (type: RecommendationType) => {
    switch (type) {
      case "skincare":
        return "recommendation-item skincare";
      case "food":
        return "recommendation-item food";
      case "lifestyle":
        return "recommendation-item lifestyle";
      case "supplements":
        return "recommendation-item supplements";
      default:
        return "recommendation-item skincare";
    }
  };

  return (
    <div className="ios-section">
      <h2 className="text-xl font-semibold mb-3">Today's Skin</h2>
      
      <Card className="ios-card">
        <CardContent className="p-4">
          {/* Status and emoji */}
          <div className="flex items-center mb-4">
            <span className="text-3xl mr-3">{emoji}</span>
            <div>
              <h3 className="font-medium">{status}</h3>
              <p className="text-sm text-muted-foreground">May 14, 2025</p>
            </div>
          </div>
          
          {/* Contributing Factors */}
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-600 mb-2">Contributing Factors</p>
            <div className="flex flex-wrap gap-2">
              {factors.map((factor, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="flex items-center gap-1 px-2 py-1 rounded-full bg-gray-50"
                >
                  {factor.icon}
                  <span className="text-xs">{factor.type}: <span className="font-medium">{factor.status}</span></span>
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Recommendations */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">For You Recommendations:</p>
            <div className="space-y-2">
              {isLoading ? (
                <div className="animate-pulse space-y-2">
                  <div className="h-10 bg-gray-100 rounded-full"></div>
                  <div className="h-10 bg-gray-100 rounded-full"></div>
                </div>
              ) : (
                recommendations.map((rec, idx) => {
                  const recommendationClass = getRecommendationClass(rec.type);
                  const linkTo = rec.linkTo || `/recommendations-detail/${rec.type}/${idx}/testai`;
                  
                  return (
                    <Link 
                      key={idx} 
                      to={linkTo}
                      className={cn(recommendationClass)}
                    >
                      {rec.icon && <span>{rec.icon}</span>}
                      <span className="text-sm font-medium">{rec.text}</span>
                    </Link>
                  );
                })
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DailySkinSnapshot;
