import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
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

// Import product data (In a real app, this would come from an API)
import { foodItems, productItems } from "@/data/products";

const ProductAITestPage = () => {
  // Add scroll to top functionality
  useScrollToTop();
  
  const { type, id } = useParams<{ type: string; id: string }>();
  const navigate = useNavigate();
  
  // States for AI-generated content
  const [aiContent, setAiContent] = useState<Record<string, {
    formattedHtml: string;
    sections: Record<string, string | string[]>;
  }>>({
    overview: { formattedHtml: "", sections: {} },
    details: { formattedHtml: "", sections: {} },
    science: { formattedHtml: "", sections: {} },
    disclaimer: { formattedHtml: "", sections: {} }
  });
  
  const [isLoading, setIsLoading] = useState({
    overview: true,
    details: true,
    science: true,
    disclaimer: true
  });
  
  // Initialize the skin advice hook for different content types
  const { getAdvice: getOverviewAdvice } = useSkinAdvice({ adviceType: "general" });
  const { getAdvice: getDetailsAdvice } = useSkinAdvice({ adviceType: "product" });
  const { getAdvice: getScienceAdvice } = useSkinAdvice({ adviceType: "general" });
  const { getAdvice: getDisclaimerAdvice } = useSkinAdvice({ adviceType: "general" });
  
  // Find the product from our data
  const products = type === "food" ? foodItems : productItems;
  const product = products.find(p => p.id === id);

  // Function to navigate to normal product page
  const switchToCurrent = () => {
    navigate(`/product/${type}/${id}`);
  };

  // Create sections for structured display
  const processAIResponse = (sectionName: string, sections: Record<string, string | string[]>) => {
    const result = [];
    
    for (const [key, content] of Object.entries(sections)) {
      if (Array.isArray(content)) {
        result.push({
          title: key,
          items: content.map((item, index) => ({
            text: item,
            type: sectionName,
            category: key,
            linkTo: `/recommendations-detail/ai-${sectionName}-${index + 1}`
          }))
        });
      } else if (typeof content === 'string') {
        result.push({
          title: key,
          items: [{
            text: content,
            type: sectionName,
            category: key,
            linkTo: `/recommendations-detail/ai-${sectionName}`
          }]
        });
      }
    }
    
    return result;
  };

  useEffect(() => {
    // Get AI content for each section when product changes
    const fetchAIContent = async () => {
      if (!product) return;
      
      try {
        // Generate Overview content
        setIsLoading(prev => ({ ...prev, overview: true }));
        const overviewPrompt = `Write a detailed overview about ${product.name} as a ${type} product and its effects on skin health. 
                                Include information about its impact (${product.impact}), what it does, and a brief description. 
                                Write this as if it's for a skincare app product detail page. Keep it under 200 words.`;
        
        const overview = await getOverviewAdvice(overviewPrompt, { 
          productType: type,
          productName: product.name,
          productImpact: product.impact
        });
        setAiContent(prev => ({...prev, overview}));
        setIsLoading(prev => ({ ...prev, overview: false }));
        
        // Generate Details content
        setIsLoading(prev => ({ ...prev, details: true }));
        const detailsPrompt = `Create a detailed list of benefits and concerns for ${product.name} as a ${type} product.
                              Format your response with clear bullet points for both benefits and concerns.
                              Include at least 4 potential benefits and 3 potential concerns based on scientific research.
                              Make it specific to skin health.`;
        
        const details = await getDetailsAdvice(detailsPrompt, {
          productType: type,
          productName: product.name
        });
        setAiContent(prev => ({...prev, details}));
        setIsLoading(prev => ({ ...prev, details: false }));
        
        // Generate Science content
        setIsLoading(prev => ({ ...prev, science: true }));
        const sciencePrompt = `Provide scientific information about ${product.name} as it relates to skin health. 
                              Include information about key compounds or nutrients, mechanisms of action, and reference any 
                              relevant scientific studies if applicable. Keep it factual and educational but accessible to non-experts.`;
        
        const science = await getScienceAdvice(sciencePrompt, {
          productType: type,
          productName: product.name
        });
        setAiContent(prev => ({...prev, science}));
        setIsLoading(prev => ({ ...prev, science: false }));
        
        // Generate Disclaimer content
        setIsLoading(prev => ({ ...prev, disclaimer: true }));
        const disclaimerPrompt = `Create a medical and scientific disclaimer about the information provided for ${product.name} 
                                  and its effects on skin health. Include standard disclaimers about individual variation, 
                                  consultation with healthcare providers, and limitations of current research.`;
        
        const disclaimer = await getDisclaimerAdvice(disclaimerPrompt, {
          productType: type,
          productName: product.name
        });
        setAiContent(prev => ({...prev, disclaimer}));
        setIsLoading(prev => ({ ...prev, disclaimer: false }));
        
      } catch (error) {
        console.error("Error generating AI content:", error);
      }
    };
    
    fetchAIContent();
  }, [product, type]);

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

  // Navigate to the chat page with initial product question
  const askAiAboutProduct = () => {
    const initialMessage = `Can you tell me more about ${product.name} by ${product.brand || 'this brand'} and how it might affect my skin?`;
    window.location.href = `/chat?initial=${encodeURIComponent(initialMessage)}`;
  };

  // Process AI sections
  const detailsSections = processAIResponse("details", aiContent.details?.sections || {});
  const scienceSections = processAIResponse("science", aiContent.science?.sections || {});

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
        
        <Tabs defaultValue="ai" className="mb-6">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="current" onClick={switchToCurrent}>Current</TabsTrigger>
            <TabsTrigger value="ai">AI</TabsTrigger>
          </TabsList>
          <TabsContent value="ai" className="mt-4">
            {/* Overview Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Overview</h2>
              <Card>
                <CardContent className="p-6">
                  {isLoading.overview ? (
                    <LoadingIndicator />
                  ) : (
                    <div>
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
                        <div className="text-sm border-l-2 border-slate-200 pl-4 py-1">
                          {aiContent.overview?.sections["Brief Summary"] && (
                            <p>
                              {typeof aiContent.overview.sections["Brief Summary"] === 'string' 
                                ? aiContent.overview.sections["Brief Summary"]
                                : "Summary of benefits and effects"}
                            </p>
                          )}
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
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            {/* Details Section - AI Generated */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Details</h2>
              {isLoading.details ? (
                <Card>
                  <CardContent className="p-6">
                    <LoadingIndicator />
                  </CardContent>
                </Card>
              ) : (
                detailsSections.length > 0 ? (
                  <div className="space-y-4">
                    {detailsSections.map((section, idx) => (
                      <div key={idx} className="ai-section">
                        <h3 className="ai-section-title">{section.title}</h3>
                        
                        <div className="space-y-3">
                          {section.items.map((item, itemIdx) => (
                            <Link to={item.linkTo} key={itemIdx} className="block">
                              <Card className="ios-card mb-4 hover:shadow-md transition-shadow">
                                <CardContent className="p-4 flex items-center justify-between">
                                  <div>
                                    <h3 className="font-medium text-base">
                                      {item.text.split(":")[0] || `Point ${itemIdx + 1}`}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                      {item.text.includes(":") 
                                        ? item.text.split(":").slice(1).join(":").trim()
                                        : item.text}
                                    </p>
                                  </div>
                                </CardContent>
                              </Card>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-3">AI Generated Details</h3>
                      <div className="text-sm">
                        {aiContent.details?.formattedHtml ? (
                          <div dangerouslySetInnerHTML={{ __html: aiContent.details.formattedHtml }} className="skin-advice-content" />
                        ) : (
                          <p>No details available for this product.</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              )}
            </div>

            {/* Science Section - AI Generated */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Science</h2>
              {isLoading.science ? (
                <Card>
                  <CardContent className="p-6">
                    <LoadingIndicator />
                  </CardContent>
                </Card>
              ) : (
                scienceSections.length > 0 ? (
                  <div className="space-y-4">
                    {scienceSections.map((section, idx) => (
                      <div key={idx} className="ai-section">
                        <h3 className="ai-section-title">{section.title}</h3>
                        
                        <div className="space-y-3">
                          {section.items.map((item, itemIdx) => (
                            <Link to={item.linkTo} key={itemIdx} className="block">
                              <Card className="ios-card mb-4 hover:shadow-md transition-shadow">
                                <CardContent className="p-4 flex items-center justify-between">
                                  <div>
                                    <h3 className="font-medium text-base">
                                      {item.text.split(":")[0] || `Finding ${itemIdx + 1}`}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                      {item.text.includes(":") 
                                        ? item.text.split(":").slice(1).join(":").trim()
                                        : item.text}
                                    </p>
                                  </div>
                                </CardContent>
                              </Card>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-3">AI Generated Science Information</h3>
                      <div className="text-sm">
                        {aiContent.science?.formattedHtml ? (
                          <div dangerouslySetInnerHTML={{ __html: aiContent.science.formattedHtml }} className="skin-advice-content" />
                        ) : (
                          <p>No scientific information available for this product.</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              )}
            </div>
            
            {/* Disclaimer Section - AI Generated */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Disclaimer</h2>
              <Card className="ios-card bg-slate-50 border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  {isLoading.disclaimer ? (
                    <LoadingIndicator />
                  ) : (
                    <div className="text-sm">
                      {aiContent.disclaimer?.formattedHtml ? (
                        <div dangerouslySetInnerHTML={{ __html: aiContent.disclaimer.formattedHtml }} className="skin-advice-content" />
                      ) : (
                        <p>
                          This information is provided for educational purposes only and is not intended as medical advice.
                          Individual responses to products may vary. Always consult with a healthcare provider before making
                          significant changes to your skincare routine.
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* View Scoring Method (always at bottom) */}
        <ViewScoringMethod />
      </div>
    </div>
  );
};

export default ProductAITestPage;
