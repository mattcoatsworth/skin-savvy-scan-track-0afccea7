import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, InfoIcon, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";
import { useSkinAdvice } from "@/hooks/useSkinAdvice";
import BackButton from "@/components/BackButton";
import AppNavigation from "@/components/AppNavigation";
import { useAIDetailCache } from "@/hooks/useAIDetailCache";
import { useRecommendationIdParser } from "@/hooks/useRecommendationIdParser";

// Define the content interface to match the one in useAIDetailCache
interface DetailContent {
  title: string;
  overview: string;
  details: string;
  disclaimer: string;
  recommendations: string[];
}

/**
 * Detail page for AI-generated recommendations
 */
const AIRecommendationDetail = () => {
  // Extract all possible ID parameters from URL
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  console.log("AIRecommendationDetail: All URL params:", params);
  console.log("AIRecommendationDetail: Location state:", location.state);

  // Check if we're in testai mode (like ProductAITestPage)
  const isTestAiMode = location.pathname.endsWith('/testai');
  
  // Extract ID from various possible URL formats
  const fullId = params['*'] || params.id || params.type || "";
  
  console.log("AIRecommendationDetail: Using fullId:", fullId);
  
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState<DetailContent>({
    title: "",
    overview: "",
    details: "",
    disclaimer: "",
    recommendations: []
  });
  
  const { getAdvice } = useSkinAdvice({ 
    adviceType: "general",
    model: "gpt-4o-mini" 
  });
  
  const { getCachedDetail, preGenerateDetailContent, cacheDetailContent } = useAIDetailCache();
  const { parseRecommendationId, getRecommendationIdVariants } = useRecommendationIdParser();
  
  // Format the type for display
  const formatType = (type: string): string => {
    switch(type.toLowerCase()) {
      case "ai":
        return "AI Recommendation";
      case "factor":
        return "Contributing Factor";
      case "action":
        return "Recommended Action";
      case "observation":
        return "Key Observation";
      case "timeline":
        return "Timeline Insight";
      default:
        return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };
  
  // Format a nice title based on ID
  const formatTitle = (id: string): string => {
    // Remove "ai-" prefix if present
    const cleanId = id.replace(/^ai-/, '');
    
    // Split by hyphens and capitalize each word
    return cleanId
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Parse the recommendation ID from the URL
  const { recommendationType, recommendationNumber } = parseRecommendationId(fullId);

  console.log(`AIRecommendationDetail: Parsed fullId=${fullId} to type=${recommendationType}, number=${recommendationNumber}`);

  useEffect(() => {
    const fetchContent = async () => {
      if (!fullId && !location.state?.recommendation) {
        console.error("Invalid recommendation ID: empty and no state passed");
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      
      try {
        console.log(`Attempting to fetch content for: ${fullId}`);
        
        // First check for state passed from a card (similar to ProductDetail)
        if (location.state?.recommendation) {
          console.log("Found recommendation data in location state:", location.state.recommendation);
          const recommendationText = location.state.recommendation.text;
          
          // If we're in testai mode, generate content directly like ProductAITestPage does
          if (isTestAiMode && recommendationText) {
            console.log("TestAI mode detected, generating content directly");
            const baseTitle = typeof recommendationText === 'string' 
              ? recommendationText.split(":")[0] 
              : formatTitle(fullId);
            
            const generatedContent = await generateNewContent(baseTitle);
            if (generatedContent) {
              setContent(generatedContent);
              setIsLoading(false);
              return;
            }
          }
        }
        
        // Generate variants for lookup to maximize chance of finding content
        const variants = getRecommendationIdVariants(recommendationType, recommendationNumber, fullId);
        console.log("Looking up with variants:", variants);
        
        let cachedContent = null;
        
        // Try each variant until we find content in Supabase
        for (const variant of variants) {
          if (!variant.type || !variant.id) continue;
          
          console.log(`Trying to fetch with type=${variant.type}, id=${variant.id}`);
          cachedContent = await getCachedDetail(variant.type, variant.id);
          
          if (cachedContent) {
            console.log(`Found content in Supabase with type=${variant.type}, id=${variant.id}`, cachedContent);
            break;
          }
        }
        
        // If still not found, check local storage with various keys
        if (!cachedContent) {
          console.log("No content found in Supabase, checking localStorage");
          const possibleCacheKeys = [
            `ai-recommendation-detail-${fullId}`,
            `ai-recommendation-detail-${recommendationType}-${recommendationNumber}`,
            `ai-recommendation-detail-ai-${recommendationType}-${recommendationNumber}`,
            `${recommendationType}-${recommendationNumber}` // Simpler key
          ];
          
          for (const cacheKey of possibleCacheKeys) {
            console.log(`Checking localStorage key: ${cacheKey}`);
            const localCachedContent = localStorage.getItem(cacheKey);
            if (localCachedContent) {
              console.log(`Found in localStorage with key: ${cacheKey}`);
              try {
                const parsedContent = JSON.parse(localCachedContent);
                // Ensure local storage content has the expected structure
                cachedContent = {
                  title: parsedContent.title || "",
                  overview: parsedContent.overview || "",
                  details: parsedContent.details || "",
                  disclaimer: parsedContent.disclaimer || "",
                  recommendations: Array.isArray(parsedContent.recommendations) ? parsedContent.recommendations : []
                };
                
                // Also cache this in Supabase for future use
                await cacheDetailContent(recommendationType, recommendationNumber, cachedContent);
                
                break;
              } catch (e) {
                console.error("Failed to parse localStorage content", e);
                // Continue to next cache key
              }
            }
          }
        }
        
        // If we found cached content, use it
        if (cachedContent) {
          console.log("Using cached content", cachedContent);
          setContent(cachedContent);
          setIsLoading(false);
          return;
        }
        
        // No cached content anywhere, generate new content
        console.log("No cached content found, generating new content");
        
        // Build the base title from the ID for the prompt or use text from state
        const baseTitle = location.state?.recommendation?.text 
          ? location.state.recommendation.text.split(":")[0]
          : formatTitle(fullId);
        
        console.log("Generating content with base title:", baseTitle);
        
        // Generate content immediately with minimal placeholder
        const generatedContent = await generateNewContent(baseTitle);
        if (generatedContent) {
          setContent(generatedContent);
          
          // Save to all possible cache variants
          await cacheDetailContent(recommendationType, recommendationNumber, generatedContent);
          await cacheDetailContent(`ai-${recommendationType}`, recommendationNumber, generatedContent);
          
          try {
            const contentStr = JSON.stringify(generatedContent);
            localStorage.setItem(`ai-recommendation-detail-${fullId}`, contentStr);
            localStorage.setItem(`ai-recommendation-detail-${recommendationType}-${recommendationNumber}`, contentStr);
            localStorage.setItem(`${recommendationType}-${recommendationNumber}`, contentStr);
          } catch (error) {
            console.error("Failed to cache in localStorage:", error);
          }
        }
      } catch (error) {
        console.error("Error fetching content:", error);
        toast.error("Error loading recommendation details");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchContent();
  }, [fullId, recommendationType, recommendationNumber, location.state, isTestAiMode]);

  // Function to generate content when not found in cache
  const generateNewContent = async (baseTitle: string): Promise<DetailContent | null> => {
    try {
      // First set temporary content for UI responsiveness
      const tempContent: DetailContent = {
        title: baseTitle,
        overview: "Loading detailed content...",
        details: "We're generating personalized information for this recommendation.",
        disclaimer: "This information is for educational purposes only and is not medical advice.",
        recommendations: ["Loading recommendations..."]
      };
      
      // Update UI immediately
      setContent(tempContent);
      
      // Generate detailed content using AI
      const detailPrompt = `
        Create detailed information about the skin care topic: "${baseTitle}".
        
        Please provide:
        1. A clear title for this topic (just the key concept, 2-5 words)
        2. A concise overview paragraph explaining the concept
        3. Detailed information including benefits, how to implement, and expected results
        4. 3-5 specific recommendations related to this topic
        5. A brief medical disclaimer appropriate for skin care advice
        
        Format your response with the following sections:
        ### Title: [Your Title]
        ### Overview: [Single paragraph overview]
        ### Details: [Several paragraphs of detailed information]
        ### Recommendations: [Bulleted list of specific recommendations]
        ### Disclaimer: [Brief appropriate medical disclaimer]
      `;
      
      const response = await getAdvice(detailPrompt);
      
      if (response && response.sections) {
        return {
          title: response.sections["Title"] as string || baseTitle,
          overview: response.sections["Overview"] as string || tempContent.overview,
          details: response.sections["Details"] as string || tempContent.details,
          disclaimer: response.sections["Disclaimer"] as string || tempContent.disclaimer,
          recommendations: Array.isArray(response.sections["Recommendations"]) 
            ? response.sections["Recommendations"] as string[] 
            : tempContent.recommendations
        };
      }
      
      return tempContent;
    } catch (error) {
      console.error("Error generating content:", error);
      toast.error("Could not generate detailed content");
      return null;
    }
  };

  const recommendationTypeDisplay = formatType(recommendationType);
  const displayTitle = content.title || formatTitle(fullId);
  
  // If content is empty after loading is done, show the "Not Found" message
  const showNotFoundMessage = !isLoading && 
                              (!content || !content.overview || content.overview.trim() === "");

  if (showNotFoundMessage) {
    return (
      <div className="bg-slate-50 min-h-screen pb-20">
        <div className="max-w-md mx-auto px-4 py-6">
          <header className="mb-6">
            <BackButton />
            <h1 className="text-2xl font-bold">Recommendation Not Found</h1>
          </header>
          
          <Card>
            <CardContent className="p-6">
              <p className="text-lg mb-4">
                Sorry, we couldn't find details for this recommendation.
              </p>
              <p className="text-sm mb-4 text-gray-600">
                URL ID: {fullId}<br />
                Parsed Type: {recommendationType}<br />
                Parsed Number: {recommendationNumber}
              </p>
              <Button 
                onClick={() => navigate(-1)}
                className="w-full"
              >
                Return to Previous Page
              </Button>
            </CardContent>
          </Card>
        </div>
        <AppNavigation />
      </div>
    );
  }
  
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <BackButton />
            <h1 className="text-2xl font-bold">{displayTitle}</h1>
          </div>
        </header>
        
        {/* Type Badge */}
        <div className="mb-4">
          <Badge variant="outline" className="bg-skin-teal/10 text-skin-teal border-skin-teal/20">
            {recommendationTypeDisplay} {recommendationNumber}
          </Badge>
        </div>
        
        {/* For /testai routes, we stack the sections instead of using tabs */}
        {isTestAiMode ? (
          <div className="space-y-6">
            {/* Overview Section - Stacked */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Overview</h2>
              {isLoading ? (
                <Card>
                  <CardContent className="pt-6">
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-4 w-3/4" />
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-lg mb-4">{content.overview}</p>
                    <div className="flex items-center text-muted-foreground text-sm mt-4">
                      <InfoIcon className="h-4 w-4 mr-2" />
                      <p>Personalized based on your skin logs</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
            
            {/* Details Section - Stacked */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Details</h2>
              {isLoading ? (
                <Card>
                  <CardContent className="pt-6">
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-4 w-3/4" />
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="pt-6 prose prose-slate prose-sm max-w-none">
                    <div className="text-base leading-relaxed whitespace-pre-line">
                      {content.details}
                    </div>
                    
                    <div className="mt-6 text-sm text-muted-foreground p-3 bg-slate-50 border border-slate-100 rounded-md">
                      {content.disclaimer}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
            
            {/* Actions Section - Stacked */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Actions</h2>
              {isLoading ? (
                <Card>
                  <CardContent className="pt-6">
                    <Skeleton className="h-10 w-full mb-4" />
                    <Skeleton className="h-10 w-full mb-4" />
                    <Skeleton className="h-10 w-full" />
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-medium text-lg mb-4">Recommended Actions</h3>
                    
                    {content.recommendations && content.recommendations.length > 0 ? (
                      <ul className="space-y-3">
                        {content.recommendations.map((recommendation, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{recommendation}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="flex items-center justify-center py-6 text-muted-foreground">
                        <XCircle className="h-5 w-5 mr-2" />
                        <span>No specific actions available</span>
                      </div>
                    )}
                    
                    <Button 
                      className="w-full mt-6" 
                      onClick={() => {
                        toast.success("Added to your skin goals!");
                        setTimeout(() => navigate("/skin"), 1500);
                      }}
                    >
                      Add to My Skin Goals
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        ) : (
          // For non-testai routes, we keep the tabs
          <Tabs defaultValue="overview" className="w-full mb-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="actions">Actions</TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-4">
              {isLoading ? (
                <Card>
                  <CardContent className="pt-6">
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-4 w-3/4" />
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-lg mb-4">{content.overview}</p>
                    <div className="flex items-center text-muted-foreground text-sm mt-4">
                      <InfoIcon className="h-4 w-4 mr-2" />
                      <p>Personalized based on your skin logs</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            {/* Details Tab */}
            <TabsContent value="details" className="mt-4">
              {isLoading ? (
                <Card>
                  <CardContent className="pt-6">
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-4 w-3/4" />
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="pt-6 prose prose-slate prose-sm max-w-none">
                    <div className="text-base leading-relaxed whitespace-pre-line">
                      {content.details}
                    </div>
                    
                    <div className="mt-6 text-sm text-muted-foreground p-3 bg-slate-50 border border-slate-100 rounded-md">
                      {content.disclaimer}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            {/* Actions Tab */}
            <TabsContent value="actions" className="mt-4">
              {isLoading ? (
                <Card>
                  <CardContent className="pt-6">
                    <Skeleton className="h-10 w-full mb-4" />
                    <Skeleton className="h-10 w-full mb-4" />
                    <Skeleton className="h-10 w-full" />
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-medium text-lg mb-4">Recommended Actions</h3>
                    
                    {content.recommendations && content.recommendations.length > 0 ? (
                      <ul className="space-y-3">
                        {content.recommendations.map((recommendation, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{recommendation}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="flex items-center justify-center py-6 text-muted-foreground">
                        <XCircle className="h-5 w-5 mr-2" />
                        <span>No specific actions available</span>
                      </div>
                    )}
                    
                    <Button 
                      className="w-full mt-6" 
                      onClick={() => {
                        toast.success("Added to your skin goals!");
                        setTimeout(() => navigate("/skin"), 1500);
                      }}
                    >
                      Add to My Skin Goals
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
      
      <AppNavigation />
    </div>
  );
};

export default AIRecommendationDetail;
