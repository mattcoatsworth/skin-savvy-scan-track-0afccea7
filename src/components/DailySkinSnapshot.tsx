
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Smile, Droplet, Utensils, Pill, Circle, Activity, Calendar } from "lucide-react";

type FactorType = "Food" | "Supplement" | "Makeup" | "Weather";

type Factor = {
  type: FactorType;
  status: string;
  icon: React.ReactNode;
};

type RecommendationType = "skincare" | "food" | "supplements" | "makeup" | "lifestyle";

type Recommendation = {
  type: RecommendationType;
  text: string;
  icon: React.ReactNode;
  linkTo: string;
};

type SkinSnapshotProps = {
  emoji: string;
  status: string;
  factors: Factor[];
  recommendations?: Recommendation[];
  className?: string;
};

const getFactorColor = (type: FactorType) => {
  switch (type) {
    case "Food":
      return "bg-green-100 text-green-800";
    case "Supplement":
      return "bg-blue-100 text-blue-800";
    case "Makeup":
      return "bg-purple-100 text-purple-800";
    case "Weather":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getRecommendationColor = (type: RecommendationType) => {
  switch (type) {
    case "skincare":
      return "bg-blue-100 text-blue-800";
    case "food":
      return "bg-green-100 text-green-800";
    case "supplements":
      return "bg-indigo-100 text-indigo-800";
    case "makeup":
      return "bg-purple-100 text-purple-800";
    case "lifestyle":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const DailySkinSnapshot: React.FC<SkinSnapshotProps> = ({
  emoji,
  status,
  factors,
  recommendations = [],
  className,
}) => {
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
          
          <div className="mb-3">
            <p className="text-sm text-muted-foreground mb-2">Contributing Factors:</p>
            <div className="flex flex-wrap">
              {factors.map((factor, index) => (
                <span 
                  key={index} 
                  className={`factor-tag ${getFactorColor(factor.type)} flex items-center`}
                >
                  <span className="mr-1">{factor.icon}</span> {factor.type}: {factor.status}
                </span>
              ))}
            </div>
          </div>
          
          {recommendations.length > 0 && (
            <div className="mb-3 pt-2 border-t border-gray-100">
              <p className="text-sm text-muted-foreground mb-2">For You Recommendations:</p>
              <div className="flex flex-wrap">
                {recommendations.map((recommendation, index) => (
                  <Link 
                    key={index} 
                    to={recommendation.linkTo}
                    className={`factor-tag ${getRecommendationColor(recommendation.type)} flex items-center cursor-pointer hover:opacity-80 transition-opacity`}
                  >
                    <span className="mr-1">{recommendation.icon}</span> {recommendation.text}
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          <div className="text-center mt-4">
            View Full Analysis →
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default DailySkinSnapshot;
