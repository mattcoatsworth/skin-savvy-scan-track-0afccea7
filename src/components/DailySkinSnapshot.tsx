
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useSkinAdvice } from "@/hooks/useSkinAdvice";
import { Skeleton } from "@/components/ui/skeleton";

// Define the factor types
type FactorType = "Food" | "Supplement" | "Makeup" | "Weather";

interface Factor {
  type: FactorType;
  status: string;
  icon: React.ReactNode;
}

// Define the recommendation types
export type RecommendationType = "skincare" | "food" | "lifestyle" | "supplements";

interface Recommendation {
  type: RecommendationType;
  text: string;
  icon?: React.ReactNode;
  linkTo?: string;
}

interface DailySkinSnapshotProps {
  emoji: string;
  status: string;
  factors: Factor[];
  recommendations: Recommendation[];
}

// Helper function to get background color class based on factor type
const getFactorBgColor = (type: FactorType): string => {
  switch (type) {
    case "Food":
      return "bg-green-100";
    case "Supplement":
      return "bg-blue-100";
    case "Makeup":
      return "bg-purple-100";
    case "Weather":
      return "bg-orange-100";
    default:
      return "bg-gray-100";
  }
};

// Helper function to get background color class based on recommendation type
const getRecommendationBgColor = (type: RecommendationType): string => {
  switch (type) {
    case "skincare":
      return "bg-blue-100";
    case "food":
      return "bg-orange-100";
    case "supplements":
      return "bg-purple-100";
    case "lifestyle":
      return "bg-green-100";
    default:
      return "bg-gray-100";
  }
};

// Helper function to get text color class based on recommendation type
const getRecommendationTextColor = (type: RecommendationType): string => {
  switch (type) {
    case "skincare":
      return "text-blue-700";
    case "food":
      return "text-orange-700";
    case "supplements":
      return "text-purple-700";
    case "lifestyle":
      return "text-green-700";
    default:
      return "text-gray-700";
  }
};

const DailySkinSnapshot: React.FC<DailySkinSnapshotProps> = ({
  emoji,
  status,
  factors,
  recommendations,
}) => {
  const { isLoading, aiRecommendations } = useSkinAdvice({ adviceType: "daily" });

  // Combine static recommendations with AI recommendations if available
  const displayRecommendations = aiRecommendations?.length 
    ? aiRecommendations 
    : recommendations;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Today's Skin</h2>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/skin" className="text-skin-teal flex items-center gap-1">
            View Details <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-5">
          <div className="flex items-center mb-5">
            <span className="text-3xl mr-3">{emoji}</span>
            <span className="font-medium text-lg">{status}</span>
          </div>

          {/* Contributing Factors */}
          <h3 className="font-medium text-gray-700 mb-2">Contributing Factors:</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {factors.map((factor, index) => (
              <div 
                key={index} 
                className={`${getFactorBgColor(factor.type)} rounded-full px-4 py-1.5 flex items-center`}
              >
                <span className="mr-1.5">{factor.icon}</span>
                <span>{factor.status}</span>
              </div>
            ))}
          </div>

          {/* For You Recommendations */}
          <h3 className="font-medium text-gray-700 mb-2">For You Recommendations:</h3>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : (
            <div className="flex flex-col space-y-2">
              {displayRecommendations.slice(0, 3).map((recommendation, index) => (
                <Link 
                  key={index} 
                  to={recommendation.linkTo || "#"} 
                  className="no-underline"
                >
                  <div 
                    className={`${getRecommendationBgColor(recommendation.type)} rounded-full px-4 py-2.5 flex items-center`}
                  >
                    <span className={`${getRecommendationTextColor(recommendation.type)} mr-2 flex-shrink-0`}>
                      {recommendation.icon}
                    </span>
                    <span className={getRecommendationTextColor(recommendation.type)}>
                      {recommendation.text}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <Button variant="outline" size="sm" className="mt-4 w-full" asChild>
            <Link to="/recommendations">
              View All Recommendations
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DailySkinSnapshot;
