
import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, XCircle, Calendar, BadgeInfo, Clock, Activity, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/BackButton";
import ViewScoringMethod from "@/components/ViewScoringMethod";
import { useSkinAdvice } from "@/hooks/useSkinAdvice";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import SuggestedActions from "@/components/SuggestedActions";
import { useAIContentCache } from "@/hooks/useAIContentCache";
import { toast } from "sonner";

// Import product data (In a real app, this would come from an API)
import { foodItems, productItems } from "@/data/products";

const ProductDetail = () => {
  // Add scroll to top functionality
  useScrollToTop();
  
  const { type, id } = useParams<{ type: string; id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [aiAnalysis, setAiAnalysis] = useState<string>("");
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false);
  const [isLoadingPersonalized, setIsLoadingPersonalized] = useState(true);
  const [personalizedData, setPersonalizedData] = useState<{
    impact: string;
    rating: number;
    matchScore: number;
    relevantLogs: any[];
    personalizedRecommendations: string;
  } | null>(null);
  
  // Initialize the skin advice hook for product analysis
  const { getAdvice, isLoading: isAdviceLoading, getTextContent } = useSkinAdvice({
    adviceType: "product"
  });
  
  // Initialize content cache hook
  const { getOrGenerate } = useAIContentCache();
  
  // First try to get product from location state
  const productFromState = location.state?.product;
  
  // If not in state, get from our data
  const products = type === "food" ? foodItems : productItems;
  const product = productFromState || products.find(p => p.id === id);

  // Function to navigate to AI test page
  const switchToAI = () => {
    navigate(`/product/${type}/${id}/testai`);
  };

  // Function to navigate to the personalized tab
  const switchToPersonalized = () => {
    navigate(`/product/${type}/${id}/personalized`);
  };

  useEffect(() => {
    // Get AI analysis when product changes
    const loadAiAnalysis = async () => {
      if (!product) return;
      
      setIsLoadingAnalysis(true);
      
      try {
        const result = await getOrGenerate({
          productId: id,
          productType: type,
          contentType: 'analysis'
        }, () => getAdvice("Analyze this product for skin health", { 
          productType: type,
          productName: product.name,
          productBrand: product.brand,
          productDescription: product.description,
          productImpact: product.impact,
          benefits: product.benefits || [],
          concerns: product.concerns || []
        }));
        
        if (result) {
          // The result is the cached or freshly-generated content
          const textContent = typeof result === 'string' 
            ? result 
            : getTextContent(result);
          setAiAnalysis(textContent);
        }
      } catch (error) {
        console.error("Error getting AI analysis:", error);
        toast.error("Failed to load AI analysis");
      } finally {
        setIsLoadingAnalysis(false);
      }
    };
    
    loadAiAnalysis();
  }, [product, type, id]);

  // Load personalized data based on user logs (simulated)
  useEffect(() => {
    const loadPersonalizedData = async () => {
      if (!product) return;
      
      setIsLoadingPersonalized(true);
      
      try {
        // In a real implementation, this would fetch and analyze user data
        // For now, we'll simulate this with a timeout and mock data
        setTimeout(() => {
          // This is where we'd analyze user logs for patterns related to this product
          // For now, using mock data that would be dynamically generated in a real implementation
          setPersonalizedData({
            impact: product.impact === "Positive" ? "Positive" : "Neutral", // Personalized impact assessment
            rating: Math.min(product.rating + 15, 100), // Personalized rating based on user's skin type
            matchScore: 85, // How well this product matches the user's skin needs
            relevantLogs: [
              { date: "2025-05-01", observation: "Skin was clearer after using this product" },
              { date: "2025-05-05", observation: "Less redness noted in morning" }
            ],
            personalizedRecommendations: 
              `Based on your skin log patterns, this ${product.name} appears to be particularly beneficial for your skin type. 
               Your skin logs show improved hydration levels on days following use of this product. 
               Consider using it consistently in your ${product.impact === "Positive" ? "morning" : "evening"} routine for best results.`
          });
          setIsLoadingPersonalized(false);
        }, 1500);
        
      } catch (error) {
        console.error("Error loading personalized data:", error);
        setIsLoadingPersonalized(false);
      }
    };
    
    loadPersonalizedData();
  }, [product]);
  
  if (!product) {
    return (
      <div className="bg-slate-50 min-h-screen pb-20">
        <div className="max-w-md mx-auto px-4 py-6">
          <header className="flex items-center mb-6">
            <BackButton />
            <h1 className="text-2xl font-bold">Product Not Found</h1>
          </header>
          <Card>
            <CardContent className="p-6">
              <p>Sorry, the product you're looking for couldn't be found.</p>
              <Link to="/insights" className="text-skin-teal flex items-center mt-4">
                Return to Insights
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Determine rating label and color
  const getRatingLabel = (rating: number) => {
    if (rating >= 80) return "Great";
    if (rating >= 60) return "Good";
    if (rating >= 40) return "OK";
    if (rating >= 20) return "Fair";
    return "Poor";
  };
  
  const getProgressColor = (rating: number) => {
    if (rating >= 70) return "bg-green-500";
    if (rating >= 40) return "bg-amber-500";
    return "bg-red-500";
  };
  
  const getTextColor = (rating: number) => {
    if (rating >= 70) return "text-green-600";
    if (rating >= 40) return "text-amber-600";
    return "text-red-600";
  };

  // Navigate to the chat page with initial product question
  const askAiAboutProduct = () => {
    const initialMessage = `Can you tell me more about ${product.name} by ${product.brand || 'this brand'} and how it might affect my skin?`;
    window.location.href = `/chat?initial=${encodeURIComponent(initialMessage)}`;
  };

  // Loading indicator component
  const LoadingIndicator = () => (
    <div className="flex items-center justify-center py-4">
      <div className="flex space-x-2">
        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '600ms' }}></div>
      </div>
    </div>
  );

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6 flex items-center">
          <BackButton />
          <h1 className="text-2xl font-bold">{product.name}</h1>
        </header>

        <Tabs defaultValue="current" className="mb-6">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="current">Current</TabsTrigger>
            <TabsTrigger value="foryou">For You</TabsTrigger>
            <TabsTrigger value="ai" onClick={switchToAI}>AI</TabsTrigger>
          </TabsList>
          
          {/* Current Tab Content - Kept the same */}
          <TabsContent value="current" className="mt-4">
            {/* Overview Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Overview</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div>
                      <h2 className="text-xl font-semibold">{product.impact} Effect</h2>
                      <p className="text-muted-foreground">{product.description}</p>
                    </div>
                  </div>

                  <div className="mb-4 flex items-center">
                    <BadgeInfo className="h-5 w-5 mr-2 text-muted-foreground" />
                    <div>
                      <h3 className="text-base font-medium">Category</h3>
                      <p>{type === "food" ? "Food" : "Skincare Product"}</p>
                    </div>
                  </div>
                  
                  {product.brand && (
                    <div className="mb-4 flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                      <div>
                        <h3 className="text-base font-medium">Brand</h3>
                        <p>{product.brand}</p>
                      </div>
                    </div>
                  )}

                  {product.rating !== undefined && (
                    <div className="mb-6">
                      <div className="flex items-center mb-1">
                        <Activity className="h-5 w-5 mr-2 text-muted-foreground" />
                        <h3 className="text-base font-medium">Effect Rating</h3>
                      </div>
                      <div className="flex items-center">
                        <div className="flex-1 mr-4">
                          <Progress 
                            value={product.rating} 
                            className="h-3 bg-gray-100" 
                            indicatorClassName={getProgressColor(product.rating)} 
                          />
                        </div>
                        <div className="text-base font-semibold">{product.rating}/100</div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{getRatingLabel(product.rating)}</p>
                    </div>
                  )}

                  <div>
                    <h3 className="text-base font-medium mb-1">Key About {product.name}</h3>
                    <p className="text-sm">{product.description}</p>
                  </div>
                  
                  <Button 
                    onClick={askAiAboutProduct}
                    className="w-full mt-4 flex items-center justify-center gap-2"
                    variant="outline"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Ask AI about this product
                  </Button>
                </CardContent>
              </Card>

              {/* AI Analysis Section */}
              <Card className="mt-4">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-3">AI Skin Analysis</h2>
                  {isLoadingAnalysis || isAdviceLoading ? (
                    <LoadingIndicator />
                  ) : (
                    <div className="text-sm">
                      {aiAnalysis ? (
                        <p>{aiAnalysis}</p>
                      ) : (
                        <p>Unable to generate AI analysis at this time.</p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recommendations section */}
              <Card className="mt-4">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-3">Recommendations</h2>
                  {product.impact === "Positive" ? (
                    <ul className="list-disc pl-4 space-y-2">
                      <li>Continue using this product in your routine</li>
                      <li>Consider increasing frequency if beneficial</li>
                      <li>Monitor for consistent positive effects</li>
                    </ul>
                  ) : product.impact === "Negative" ? (
                    <ul className="list-disc pl-4 space-y-2">
                      <li>Consider discontinuing use of this product</li>
                      <li>Look for alternatives without triggering components</li>
                      <li>Review ingredients for potential irritants</li>
                    </ul>
                  ) : (
                    <ul className="list-disc pl-4 space-y-2">
                      <li>Continue monitoring effects over longer period</li>
                      <li>Consider adjusting usage frequency</li>
                      <li>Try combining with other beneficial products</li>
                    </ul>
                  )}
                </CardContent>
              </Card>
            </div>
            
            {/* Benefits Section */}
            {product.benefits && product.benefits.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Details</h2>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-3">Skin Benefits</h3>
                    <div className="space-y-3">
                      {product.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                          <p>{benefit}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Concerns Section */}
            {product.concerns && product.concerns.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Potential Concerns</h2>
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      {product.concerns.map((concern, index) => (
                        <div key={index} className="flex items-start">
                          <XCircle className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                          <p>{concern}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {/* Data Analysis Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Science</h2>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">Data Analysis</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    This assessment is based on your personal experience and may not represent universal results. 
                    The analysis takes into account multiple factors including:
                  </p>
                  <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                    <li>Your skin type and sensitivity</li>
                    <li>Application method and frequency</li>
                    <li>Environmental factors during testing period</li>
                    <li>Combined effects with other products/factors</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* For You Tab - New personalized content */}
          <TabsContent value="foryou" className="mt-4">
            {isLoadingPersonalized ? (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Personalizing Your Insights</h2>
                  <p className="text-sm mb-4">
                    We're analyzing your skin logs and product usage patterns to generate personalized insights...
                  </p>
                  <LoadingIndicator />
                </CardContent>
              </Card>
            ) : personalizedData ? (
              <>
                {/* Personalized Overview Section */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Personalized Overview</h2>
                  <Card className="bg-gradient-to-br from-slate-50 to-blue-50">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div>
                          <h2 className="text-xl font-semibold">
                            <Badge className="mr-2">{personalizedData.matchScore}% Match</Badge> 
                            {personalizedData.impact} For Your Skin
                          </h2>
                          <p className="text-muted-foreground">Based on your skin logs and patterns</p>
                        </div>
                      </div>

                      {personalizedData.rating !== undefined && (
                        <div className="mb-6">
                          <div className="flex items-center mb-1">
                            <Activity className="h-5 w-5 mr-2 text-muted-foreground" />
                            <h3 className="text-base font-medium">Personalized Effect Rating</h3>
                          </div>
                          <div className="flex items-center">
                            <div className="flex-1 mr-4">
                              <Progress 
                                value={personalizedData.rating} 
                                className="h-3 bg-gray-100" 
                                indicatorClassName={getProgressColor(personalizedData.rating)} 
                              />
                            </div>
                            <div className="text-base font-semibold">{personalizedData.rating}/100</div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {getRatingLabel(personalizedData.rating)} for your skin type
                          </p>
                        </div>
                      )}

                      <div className="mb-4">
                        <h3 className="text-base font-medium mb-1">Personalized Analysis</h3>
                        <p className="text-sm">{personalizedData.personalizedRecommendations}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Personalized Skin Log Observations */}
                  <Card className="mt-4">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-3">Your Skin Log Observations</h3>
                      <div className="space-y-4">
                        {personalizedData.relevantLogs.map((log, index) => (
                          <div key={index} className="flex items-start">
                            <div className="bg-slate-100 rounded-full h-7 w-7 flex items-center justify-center mr-3 flex-shrink-0">
                              {index + 1}
                            </div>
                            <div>
                              <p className="font-medium">{log.date}</p>
                              <p className="text-sm text-gray-600">{log.observation}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Personalized Actions */}
                  <div className="mt-6">
                    <SuggestedActions 
                      actions={[
                        { 
                          text: "Log your experience with this product", 
                          linkTo: "/log-skin-condition"
                        },
                        { 
                          text: "View products that work well with this", 
                          linkTo: "/insights"
                        },
                        { 
                          text: "Set a reminder to use this product", 
                          linkTo: "/profile"
                        },
                      ]} 
                    />
                  </div>
                </div>
                
                {/* Personalized Details */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Patterns & Correlations</h2>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-3">How This Product Affects Your Skin</h3>
                      
                      <div className="space-y-4">
                        <div className="border-b border-gray-100 pb-3">
                          <div className="flex items-center">
                            <span className="mr-2">🟢</span>
                            <h4 className="font-medium">Hydration</h4>
                          </div>
                          <p className="text-sm text-gray-600 ml-6">
                            Your logs show increased hydration when using this product consistently
                          </p>
                        </div>
                        
                        <div className="border-b border-gray-100 pb-3">
                          <div className="flex items-center">
                            <span className="mr-2">🟡</span>
                            <h4 className="font-medium">Redness</h4>
                          </div>
                          <p className="text-sm text-gray-600 ml-6">
                            Slight decrease in redness noted after 3+ days of usage
                          </p>
                        </div>
                        
                        <div className="pb-3">
                          <div className="flex items-center">
                            <span className="mr-2">⚪</span>
                            <h4 className="font-medium">Breakouts</h4>
                          </div>
                          <p className="text-sm text-gray-600 ml-6">
                            No significant impact on breakouts based on your logs
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            ) : (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Not Enough Data</h2>
                  <p>
                    We don't have enough skin logs to generate personalized insights yet. 
                    Continue logging your daily skin condition to see personalized recommendations.
                  </p>
                  <Button 
                    onClick={() => navigate('/log-skin-condition')}
                    className="mt-4"
                  >
                    Log Skin Condition
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
        
        {/* View Scoring Method (always at bottom) */}
        <ViewScoringMethod />
      </div>
    </div>
  );
};

export default ProductDetail;
