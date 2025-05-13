
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import BackButton from "@/components/BackButton";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, CheckCircle2, Info } from "lucide-react";
import { Link } from "react-router-dom";
import BottomTemplate from "@/components/BottomTemplate";
import useScrollToTop from "@/hooks/useScrollToTop";
import { Skeleton } from "@/components/ui/skeleton";

export interface RecommendationDetailProps {
  id: string;
  type: string;
  loading?: boolean;
  content?: {
    title: string;
    subtitle: string;
    emoji: string;
    impactType: "positive" | "negative";
    impactLabel: string;
    impactScore: number;
    overview: string;
    sections: Array<{
      title: string;
      content: React.ReactNode;
    }>;
  };
}

const RecommendationDetailTemplate: React.FC<RecommendationDetailProps> = ({
  id,
  type,
  loading = false,
  content
}) => {
  useScrollToTop();

  if (loading || !content) {
    return <LoadingState />;
  }

  const { 
    title, subtitle, emoji, impactType, 
    impactLabel, impactScore, overview, sections 
  } = content;

  const getImpactColor = (type: "positive" | "negative", score: number) => {
    if (type === "positive") {
      return score >= 70 ? "bg-green-500" : score >= 40 ? "bg-amber-500" : "bg-red-500";
    } else {
      return score >= 70 ? "bg-red-500" : score >= 40 ? "bg-amber-500" : "bg-green-500";
    }
  };

  const impactColor = getImpactColor(impactType, impactScore);
  const impactEmoji = impactType === "positive" ? "🟢" : "🔴";
  const pageTitle = title || "Recommendation";

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-md mx-auto px-4 py-6 pb-20">
        <header className="mb-6 flex items-center">
          <BackButton />
          <div>
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-skin-teal text-sm">{subtitle}</p>
          </div>
        </header>

        {/* Overview Section */}
        <Card className="ios-card mb-6">
          <CardContent className="p-6">
            <div className="flex items-start mb-4">
              <div className="text-2xl mr-3">{emoji || impactEmoji}</div>
              <div>
                <h2 className="text-xl font-semibold">{impactType === "positive" ? "Recommended Action" : "Suggested Limitation"}</h2>
                <p className="text-muted-foreground">{impactLabel}</p>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">
                  {impactType === "positive" ? "Potential Benefit" : "Impact Strength"}
                </span>
                <span className="text-sm font-medium">{impactScore}%</span>
              </div>
              <Progress 
                value={impactScore} 
                className="h-3" 
                indicatorClassName={impactColor} 
              />
            </div>
            
            <div className="mb-4">
              <h3 className="text-base font-medium mb-1">
                {impactType === "positive" ? "Why we recommend this" : "What we've found"}
              </h3>
              <p className="text-sm">{overview}</p>
            </div>
          </CardContent>
        </Card>

        {/* Dynamic Sections */}
        {sections.map((section, index) => (
          <div className="mb-6" key={`section-${index}`}>
            <h2 className="text-lg font-semibold mb-3">{section.title}</h2>
            <Card className="ios-card">
              <CardContent className="p-6">
                {section.content}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Add Bottom Template */}
      <BottomTemplate pageTitle={pageTitle} />
    </div>
  );
};

const LoadingState = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6 flex items-center">
          <BackButton />
          <div className="w-full">
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </header>

        {/* Loading Overview Card */}
        <Card className="ios-card mb-6">
          <CardContent className="p-6">
            <div className="flex items-start mb-4">
              <Skeleton className="h-10 w-10 mr-3 rounded-full" />
              <div className="w-full">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>

            <Skeleton className="h-3 w-full mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>

        {/* Loading Section Cards */}
        {[1, 2, 3].map((i) => (
          <div className="mb-6" key={`loading-section-${i}`}>
            <Skeleton className="h-6 w-1/3 mb-3" />
            <Card className="ios-card">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationDetailTemplate;
