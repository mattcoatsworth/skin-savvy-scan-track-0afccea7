
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Droplet, Utensils, Pill, Circle, Activity, Calendar, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

type RecommendationType = {
  id: string;
  title: string;
  description: string;
  category: "skincare" | "food" | "supplements" | "lifestyle" | "makeup";
  priority: "high" | "medium" | "low";
};

type ForYouPageProps = {
  recommendations: RecommendationType[];
  className?: string;
};

const getCategoryIcon = (category: string) => {
  switch(category) {
    case "skincare":
      return <Droplet className="h-4 w-4" />;
    case "food":
      return <Utensils className="h-4 w-4" />;
    case "supplements":
      return <Pill className="h-4 w-4" />;
    case "makeup":
      return <Circle className="h-4 w-4" />; // Changed from Lipstick to Circle
    case "lifestyle":
      return <Activity className="h-4 w-4" />;
    default:
      return <Droplet className="h-4 w-4" />;
  }
};

const getCategoryColor = (category: string) => {
  switch(category) {
    case "skincare":
      return "bg-blue-100 text-blue-800";
    case "food":
      return "bg-green-100 text-green-800";
    case "supplements":
      return "bg-purple-100 text-purple-800";
    case "makeup":
      return "bg-pink-100 text-pink-800";
    case "lifestyle":
      return "bg-amber-100 text-amber-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getPriorityBadge = (priority: string) => {
  switch(priority) {
    case "high":
      return <Badge variant="outline" className="ml-2 border-red-500 text-red-500">High priority</Badge>;
    case "medium":
      return <Badge variant="outline" className="ml-2 border-amber-500 text-amber-500">Medium priority</Badge>;
    case "low":
      return <Badge variant="outline" className="ml-2 border-green-500 text-green-500">Low priority</Badge>;
    default:
      return null;
  }
};

const ForYouPage: React.FC<ForYouPageProps> = ({ recommendations, className }) => {
  return (
    <div className={cn("ios-section block", className)}>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold">For You Page</h2>
        <Link to="/recommendations-detail" className="text-skin-teal text-sm font-medium flex items-center">
          View All <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
      
      <div className="space-y-3">
        {recommendations.slice(0, 3).map((recommendation) => (
          <Link 
            key={recommendation.id}
            to="/recommendations-detail"
            className="block"
          >
            <Card className="ios-card hover:shadow-md transition-all">
              <CardContent className="p-4">
                <div className="flex items-start">
                  <div className={`w-8 h-8 rounded-full ${getCategoryColor(recommendation.category)} flex items-center justify-center mr-3`}>
                    {getCategoryIcon(recommendation.category)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h3 className="font-medium text-base">{recommendation.title}</h3>
                      {getPriorityBadge(recommendation.priority)}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{recommendation.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ForYouPage;
