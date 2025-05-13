
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import BackButton from "@/components/BackButton";
import { usePersonalizedRecommendation } from "@/hooks/usePersonalizedRecommendation";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { RefreshCw, Info, Check, ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

interface PersonalizedRecommendationPageProps {
  recommendationType: string;
  title: string;
}

const PersonalizedRecommendationPage: React.FC<PersonalizedRecommendationPageProps> = ({
  recommendationType,
  title
}) => {
  useScrollToTop();
  const { recommendation, isLoading, error, refreshRecommendation } = usePersonalizedRecommendation({
    recommendationType
  });

  // Functions to render different section types with consistent styling
  const renderOverviewSection = () => {
    if (!recommendation?.overview) return null;
    
    return (
      <Card className="ios-card mb-6">
        <CardContent className="p-6">
          <div className="flex items-start mb-4">
            <div className="text-2xl mr-3">
              {recommendationType.includes('limit') ? '🔴' : '🟢'}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{recommendation.overview.title || "Personalized Recommendation"}</h2>
              <p className="text-muted-foreground">{recommendation.overview.content}</p>
            </div>
          </div>

          {/* Impact Strength Bar - if provided in data */}
          {recommendation.overview.subsections?.find(s => s.title.includes("Impact") || s.title.includes("Strength")) && (
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Impact Strength</span>
                <span className="text-sm font-medium">
                  {recommendation.overview.subsections.find(s => 
                    s.title.includes("Impact") || s.title.includes("Strength"))?.content || "Medium"}
                </span>
              </div>
              <Progress 
                value={70} 
                className="h-3" 
                indicatorClassName={recommendationType.includes('limit') ? 'bg-red-500' : 'bg-green-500'} 
              />
            </div>
          )}
          
          <div className="mb-4">
            <h3 className="text-base font-medium mb-1">What we've found</h3>
            <p className="text-sm">
              {recommendation.overview.subsections?.find(s => 
                s.title.includes("Found") || s.title.includes("Data"))?.content || recommendation.overview.content}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderAnalysisSection = () => {
    if (!recommendation?.analysis) return null;

    return (
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">{recommendation.analysis.title || "Detailed Analysis"}</h2>
        <Card className="ios-card">
          <CardContent className="p-6">
            <div className="space-y-4">
              {recommendation.analysis.subsections?.map((subsection, index) => (
                <div key={index} className="flex items-start">
                  <div className={`h-6 w-6 rounded-full bg-${index % 3 === 0 ? 'red' : index % 3 === 1 ? 'amber' : 'blue'}-100 flex items-center justify-center text-${index % 3 === 0 ? 'red' : index % 3 === 1 ? 'amber' : 'blue'}-500 mr-3 flex-shrink-0 mt-0.5`}>
                    <Info className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium">{subsection.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {typeof subsection.content === 'string' ? subsection.content : subsection.content.join(' ')}
                    </p>
                  </div>
                </div>
              ))}

              {!recommendation.analysis.subsections && (
                <p className="text-sm text-gray-600">{recommendation.analysis.content}</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderBenefitsSection = () => {
    if (!recommendation?.benefits) return null;

    return (
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">{recommendation.benefits.title || "Benefits"}</h2>
        <Card className="ios-card">
          <CardContent className="p-6">
            <div className="space-y-4">
              {recommendation.benefits.subsections?.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-2 flex-shrink-0">
                    <Check className="h-3 w-3 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">{benefit.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {typeof benefit.content === 'string' ? benefit.content : benefit.content.join(' ')}
                    </p>
                  </div>
                </div>
              ))}

              {!recommendation.benefits.subsections && (
                <div>
                  <p className="text-sm mb-2">{recommendation.benefits.content}</p>
                  <ul className="space-y-2">
                    {Array(5).fill(0).map((_, i) => (
                      <li key={i} className="flex items-center">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-2 flex-shrink-0">
                          <Check className="h-3 w-3 text-green-500" />
                        </div>
                        <span className="text-sm">Benefit {i + 1}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderImplementationSection = () => {
    if (!recommendation?.implementation) return null;

    return (
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">{recommendation.implementation.title || "Implementation Plan"}</h2>
        <Card className="ios-card">
          <CardContent className="p-6">
            <div className="space-y-4">
              {recommendation.implementation.subsections?.map((step, index) => (
                <div key={index} className="flex items-start pb-3 border-b border-gray-100">
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3 flex-shrink-0 mt-0.5">
                    <span className="text-sm font-bold">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-medium">{step.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {typeof step.content === 'string' ? step.content : step.content.join(' ')}
                    </p>
                  </div>
                </div>
              ))}

              {!recommendation.implementation.subsections && (
                <p className="text-sm text-gray-600">{recommendation.implementation.content}</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderScienceSection = () => {
    if (!recommendation?.scienceResearch) return null;

    return (
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">{recommendation.scienceResearch.title || "Scientific Research"}</h2>
        <Card className="ios-card">
          <CardContent className="p-6">
            <div className="space-y-4">
              {recommendation.scienceResearch.subsections?.map((research, index) => (
                <div key={index} className="pb-3 border-b border-gray-100">
                  <h3 className="font-medium text-blue-600">{research.title}</h3>
                  <p className="text-xs text-gray-500 mb-1">Research Study</p>
                  <p className="text-sm text-gray-600">
                    {typeof research.content === 'string' ? research.content : research.content.join(' ')}
                  </p>
                  <Link to="#" className="text-sm text-blue-500 flex items-center mt-1">
                    View research <ArrowRight className="h-3 w-3 ml-1" />
                  </Link>
                </div>
              ))}

              {!recommendation.scienceResearch.subsections && (
                <p className="text-sm text-gray-600">{recommendation.scienceResearch.content}</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderResourcesSection = () => {
    if (!recommendation?.additionalResources) return null;

    return (
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">{recommendation.additionalResources.title || "Recommended Resources"}</h2>
        <Card className="ios-card">
          <CardContent className="p-6">
            <div className="space-y-4">
              {recommendation.additionalResources.subsections?.map((resource, index) => (
                <div key={index} className="flex items-start pb-3 border-b border-gray-100">
                  <div className="h-10 w-10 bg-slate-100 rounded-md mr-3 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-medium">{resource.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {typeof resource.content === 'string' ? resource.content : resource.content.join(' ')}
                    </p>
                    <Link to="#" className="text-sm text-blue-500 flex items-center mt-1">
                      Learn more <ExternalLink className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                </div>
              ))}

              {!recommendation.additionalResources.subsections && (
                <p className="text-sm text-gray-600">{recommendation.additionalResources.content}</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Loading skeleton for the page
  const renderSkeleton = () => (
    <>
      <div className="mb-6">
        <Card className="ios-card">
          <CardContent className="p-6">
            <div className="flex items-start mb-4">
              <Skeleton className="h-8 w-8 mr-3" />
              <div className="space-y-2 w-full">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6">
        <Skeleton className="h-6 w-1/3 mb-3" />
        <Card className="ios-card">
          <CardContent className="p-6">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start">
                  <Skeleton className="h-6 w-6 mr-3" />
                  <div className="space-y-2 w-full">
                    <Skeleton className="h-5 w-1/3" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );

  // Error state
  const renderError = () => (
    <Card className="ios-card mb-6">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-2">Unable to Load Recommendation</h2>
        <p className="text-gray-600 mb-4">
          We couldn't generate a personalized recommendation at this time. This may be due to insufficient data or a temporary issue.
        </p>
        <Button onClick={refreshRecommendation} className="flex items-center">
          <RefreshCw className="mr-2 h-4 w-4" /> Try Again
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6 flex items-center">
          <BackButton />
          <div>
            <h1 className="text-2xl font-bold">{title}</h1>
            <div className="flex items-center text-sm text-muted-foreground">
              <Info className="h-4 w-4 mr-1" />
              <span>Personalized recommendation</span>
            </div>
          </div>
        </header>

        {isLoading && renderSkeleton()}
        {error && renderError()}
        
        {!isLoading && !error && recommendation && (
          <>
            {renderOverviewSection()}
            {renderAnalysisSection()}
            {renderBenefitsSection()}
            {renderImplementationSection()}
            {renderScienceSection()}
            {renderResourcesSection()}
            
            <div className="flex justify-center mt-8 mb-4">
              <Button onClick={refreshRecommendation} variant="outline" className="flex items-center">
                <RefreshCw className="mr-2 h-4 w-4" /> Refresh Recommendation
              </Button>
            </div>
            
            <p className="text-xs text-center text-muted-foreground">
              This recommendation was generated based on your skin logs and product usage data.
              Last updated: {new Date(recommendation.metadata?.generatedAt || Date.now()).toLocaleDateString()}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default PersonalizedRecommendationPage;
