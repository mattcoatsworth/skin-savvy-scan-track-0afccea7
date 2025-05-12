
import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, XCircle, Calendar, BadgeInfo, Clock, Activity, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/BackButton";
import ViewScoringMethod from "@/components/ViewScoringMethod";
import { useSkinAdvice } from "@/hooks/useSkinAdvice";
import { useScrollToTop } from "@/hooks/useScrollToTop";
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
  const [aiAnalysis, setAiAnalysis] = useState<string>("");
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false);

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
          <div>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <Badge variant="outline" className="mt-1">AI Generated Content</Badge>
          </div>
        </header>
        
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
                <h3 className="text-base font-medium mb-1">AI Generated Summary</h3>
                <div className="text-sm bg-transparent py-1">
                  <p>
                    {aiAnalysis ? aiAnalysis : "Loading AI-powered insights about this product..."}
                  </p>
                </div>
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
        </div>

        {/* Details Section */}
        {(product.benefits && product.benefits.length > 0) || (product.concerns && product.concerns.length > 0) ? (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Details</h2>
            
            {product.benefits && product.benefits.length > 0 && (
              <Card className="mb-4">
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
            )}

            {product.concerns && product.concerns.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">Potential Concerns</h3>
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
            )}
          </div>
        ) : null}

        {/* Science/Analysis Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Science</h2>
          <Card>
            <CardContent className="p-6">
              {isLoadingAnalysis || isAdviceLoading ? (
                <div>
                  <h3 className="text-lg font-semibold mb-3">AI Analysis</h3>
                  <LoadingIndicator />
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-semibold mb-3">Data Analysis</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    This assessment is based on scientific research and may not represent universal results. 
                    The analysis takes into account multiple factors including:
                  </p>
                  <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                    <li>Different skin types and sensitivities</li>
                    <li>Application methods and frequency</li>
                    <li>Environmental factors during usage</li>
                    <li>Combined effects with other products</li>
                  </ul>
                </>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Suggested Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Suggested Actions</h2>
          <SuggestedActions 
            actions={[
              { 
                text: "Log your experience with this product", 
                linkTo: "/log-skin-condition"
              },
              { 
                text: "View similar products", 
                linkTo: "/insights"
              },
              { 
                text: "Set a reminder to use this product", 
                linkTo: "/profile"
              },
            ]} 
          />
        </div>
        
        {/* View Scoring Method (always at bottom) */}
        <ViewScoringMethod />
      </div>
    </div>
  );
};

export default ProductDetail;
