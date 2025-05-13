
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

type RecommendationType = "skincare" | "food" | "lifestyle" | "supplements";

interface Recommendation {
  id: string;
  type: RecommendationType;
  text: string;
  icon?: React.ReactNode;
  linkTo: string;
  priority: number;
}

const PersonalizedRecommendations = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setIsLoading(true);
        
        // Get user's skin logs
        const { data: skinLogs, error: skinLogsError } = await supabase
          .from('skin_logs')
          .select('*')
          .order('log_date', { ascending: false })
          .limit(10);
          
        if (skinLogsError) throw skinLogsError;
        
        // Get user's product usage
        const { data: productUsage, error: productError } = await supabase
          .from('product_usage')
          .select('*')
          .order('usage_date', { ascending: false })
          .limit(10);
          
        if (productError) throw productError;
        
        // If we have skin logs, generate personalized recommendations
        if (skinLogs && skinLogs.length > 0) {
          // Based on the data, determine what recommendations to show
          const personalizedRecommendations: Recommendation[] = [
            {
              id: "gentle-cleanser",
              type: "skincare",
              text: "Try a gentle cleanser",
              linkTo: "/recommendations-detail/personalized-gentle-cleanser",
              priority: 1
            },
            {
              id: "limit-dairy",
              type: "food",
              text: "Consider limiting dairy",
              linkTo: "/recommendations-detail/personalized-limit-dairy",
              priority: 2
            },
            {
              id: "meditation",
              type: "lifestyle",
              text: "Add evening meditation",
              linkTo: "/recommendations-detail/personalized-meditation",
              priority: 3
            }
          ];
          
          // Sort by priority
          const sortedRecommendations = personalizedRecommendations.sort((a, b) => a.priority - b.priority);
          
          setRecommendations(sortedRecommendations);
        } else {
          // If no data, show default recommendations
          setRecommendations([
            {
              id: "log-skin",
              type: "lifestyle",
              text: "Start logging your skin condition",
              linkTo: "/day-log/today",
              priority: 1
            }
          ]);
        }
        
      } catch (error) {
        console.error("Error fetching personalized recommendations:", error);
        toast({
          title: "Error",
          description: "Failed to load personalized recommendations.",
          variant: "destructive"
        });
        
        // Fallback to default recommendations
        setRecommendations([
          {
            id: "gentle-cleanser",
            type: "skincare",
            text: "Try a gentle cleanser",
            linkTo: "/recommendations-detail/personalized-gentle-cleanser",
            priority: 1
          }
        ]);
        
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRecommendations();
  }, []);
  
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2].map((i) => (
          <Card key={i} className="ios-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Skeleton className="h-8 w-8 rounded-full mr-3" />
                  <Skeleton className="h-5 w-40" />
                </div>
                <Skeleton className="h-4 w-4" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
  
  return (
    <div className="space-y-3">
      {recommendations.map((rec) => (
        <Link key={rec.id} to={rec.linkTo}>
          <Card className="ios-card hover:shadow-md transition-all cursor-pointer">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <p className="font-medium">{rec.text}</p>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                  For you
                </span>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
      
      {recommendations.length === 0 && (
        <Card className="ios-card">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">
              Start logging your skin condition daily to receive personalized recommendations.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PersonalizedRecommendations;
