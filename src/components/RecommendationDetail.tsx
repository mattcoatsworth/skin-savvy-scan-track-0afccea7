
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import BackButton from "@/components/BackButton";
import { ArrowRight, Check, Info, Calendar, BarChart2, Lightbulb, AlertCircle, Zap, Clock, Brain } from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";
import { useAIContentCache } from "@/hooks/useAIContentCache";

// Define types for the recommendation content
export interface RecommendationContent {
  overview: {
    title: string;
    emoji: string;
    tagline: string;
    benefitScore: number;
    whyRecommended: string;
  };
  keyBenefits: Array<{
    title: string;
    description: string;
  }>;
  correlationData: Array<{
    title: string;
    description: string;
  }>;
  howToUse: Array<{
    step: number;
    title: string;
    description: string;
  }>;
  products: Array<{
    name: string;
    brand: string;
    price: string;
    rating: number;
    description: string;
    strength: string;
  }>;
  scientificResearch: Array<{
    journal: string;
    study: string;
    findings: string;
  }>;
}

interface RecommendationDetailProps {
  recommendationType: string;
  userSkinData?: any;
}

const RecommendationDetail: React.FC<RecommendationDetailProps> = ({ 
  recommendationType,
  userSkinData 
}) => {
  const [content, setContent] = useState<RecommendationContent | null>(null);
  const [loading, setLoading] = useState(true);
  const { getOrGenerate } = useAIContentCache();

  // Icon map for correlation data section
  const getIconForIndex = (index: number) => {
    const icons = [
      <Brain className="h-4 w-4" />,
      <Clock className="h-4 w-4" />,
      <Lightbulb className="h-4 w-4" />
    ];
    return icons[index % icons.length];
  };

  // Color map for correlation data section
  const getColorForIndex = (index: number) => {
    const colors = [
      { bg: "bg-red-100", text: "text-red-500" },
      { bg: "bg-amber-100", text: "text-amber-500" },
      { bg: "bg-blue-100", text: "text-blue-500" },
      { bg: "bg-green-100", text: "text-green-500" }
    ];
    return colors[index % colors.length];
  };

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      
      try {
        const result = await getOrGenerate(
          { 
            productId: recommendationType,
            productType: "recommendation",
            contentType: "detail" 
          },
          async () => {
            const response = await fetch('/api/generate-recommendation-content', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                recommendationType,
                userSkinData
              }),
            });

            if (!response.ok) {
              const error = await response.json();
              throw new Error(error.message || 'Failed to generate content');
            }

            return await response.json();
          }
        );

        setContent(result);
      } catch (error) {
        console.error("Error fetching recommendation content:", error);
        toast({
          title: "Error",
          description: "Failed to load recommendation content. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [recommendationType, userSkinData]);

  if (loading) {
    return (
      <div className="bg-slate-50 min-h-screen">
        <div className="max-w-md mx-auto px-4 py-6">
          <header className="mb-6 flex items-center">
            <BackButton />
            <div>
              <h1 className="text-2xl font-bold">Loading...</h1>
              <div className="h-4 w-32 bg-gray-200 animate-pulse rounded"></div>
            </div>
          </header>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="ios-card">
                <CardContent className="p-6">
                  <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded mb-3"></div>
                  <div className="h-4 w-full bg-gray-200 animate-pulse rounded mb-2"></div>
                  <div className="h-4 w-5/6 bg-gray-200 animate-pulse rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="bg-slate-50 min-h-screen">
        <div className="max-w-md mx-auto px-4 py-6">
          <header className="mb-6 flex items-center">
            <BackButton />
            <div>
              <h1 className="text-2xl font-bold">Error</h1>
              <p className="text-skin-teal">Failed to load recommendation</p>
            </div>
          </header>
          <Card className="ios-card">
            <CardContent className="p-6">
              <p className="text-gray-600">
                We couldn't load the personalized recommendation. Please try again later.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6 flex items-center">
          <BackButton />
          <div>
            <h1 className="text-2xl font-bold">{content.overview.title}</h1>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Personalized recommendation</span>
            </div>
          </div>
        </header>

        {/* Overview Section */}
        <Card className="ios-card mb-6">
          <CardContent className="p-6">
            <div className="flex items-start mb-4">
              <div className="text-2xl mr-3">{content.overview.emoji}</div>
              <div>
                <h2 className="text-xl font-semibold">{content.overview.tagline}</h2>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Potential Benefit</span>
                <span className="text-sm font-medium">{content.overview.benefitScore}%</span>
              </div>
              <Progress 
                value={content.overview.benefitScore} 
                className="h-3" 
                indicatorClassName={`bg-${content.overview.benefitScore >= 70 ? 'green' : content.overview.benefitScore >= 40 ? 'amber' : 'red'}-500`} 
              />
            </div>
            
            <div className="mb-4">
              <h3 className="text-base font-medium mb-1">Why we recommend this</h3>
              <p className="text-sm">{content.overview.whyRecommended}</p>
            </div>
          </CardContent>
        </Card>

        {/* Correlation Data Section */}
        {content.correlationData && content.correlationData.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">{recommendationType === "limit-dairy" ? "Detailed Analysis" : "Key Insights"}</h2>
            <Card className="ios-card">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {content.correlationData.map((data, index) => (
                    <div key={index} className="flex items-start">
                      <div className={`h-6 w-6 rounded-full ${getColorForIndex(index).bg} flex items-center justify-center ${getColorForIndex(index).text} mr-3 flex-shrink-0 mt-0.5`}>
                        {getIconForIndex(index)}
                      </div>
                      <div>
                        <h3 className="font-medium">{data.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{data.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Benefits Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Key Benefits for Your Skin</h2>
          <Card className="ios-card">
            <CardContent className="p-6">
              <div className="space-y-4">
                {content.keyBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium">{benefit.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* How to Use Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">
            {recommendationType === "meditation" ? "Recommended Practices" : 
             recommendationType === "limit-dairy" ? "Recommendations" : "How to Use"}
          </h2>
          <Card className="ios-card">
            <CardContent className="p-6">
              <div className="space-y-4">
                {content.howToUse.map((step, index) => (
                  <div key={index} className={`flex items-start ${index < content.howToUse.length - 1 ? "pb-3 border-b border-gray-100" : ""}`}>
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-3 flex-shrink-0 mt-0.5">
                      <span className="text-sm font-bold">{step.step}</span>
                    </div>
                    <div>
                      <h3 className="font-medium">{step.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Product Recommendations */}
        {content.products && content.products.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">
              {recommendationType === "zinc-supplement" ? "Recommended Forms" : "Product Recommendations"}
            </h2>
            <Card className="ios-card">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {content.products.map((product, index) => (
                    <div 
                      key={index} 
                      className={`flex items-start ${index < content.products.length - 1 ? "pb-3 border-b border-gray-100" : ""}`}
                    >
                      <div className="h-10 w-10 bg-slate-100 rounded-md mr-3 flex-shrink-0"></div>
                      <div>
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-xs text-gray-500">{product.brand}</p>
                        <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                        <div className="mt-2 flex justify-between items-center">
                          <span className="text-xs text-skin-teal">{product.strength}</span>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                            {product.rating}/5 rating
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Scientific Research */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Scientific Research</h2>
          <Card className="ios-card">
            <CardContent className="p-6">
              <div className="space-y-4">
                {content.scientificResearch.map((research, index) => (
                  <div key={index} className={`${index < content.scientificResearch.length - 1 ? "pb-3 border-b border-gray-100" : ""}`}>
                    <h3 className="font-medium text-blue-600">{research.journal}</h3>
                    <p className="text-xs text-gray-500 mb-1">{research.study}</p>
                    <p className="text-sm text-gray-600">{research.findings}</p>
                    <Link to="#" className="text-sm text-blue-500 flex items-center mt-1">
                      View research <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RecommendationDetail;
