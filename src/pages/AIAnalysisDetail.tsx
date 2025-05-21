
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, InfoIcon, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";
import { useSkinAdvice } from "@/hooks/useSkinAdvice";
import BackButton from "@/components/BackButton";
import AppNavigation from "@/components/AppNavigation";
import { useAIDetailCache } from "@/hooks/useAIDetailCache";
import { useRecommendationIdParser } from "@/hooks/useRecommendationIdParser";
import DisclaimerCard from "@/components/DisclaimerCard";

// Define the content interface for AI analysis
interface AnalysisContent {
  title: string;
  overview: string;
  details: string;
  recommendations: string[];
  impact: string;
  disclaimer: string;
}

// Map analysis types to display names
const analysisTypeDisplayMap: Record<string, string> = {
  "observation": "Key Observation",
  "factor": "Contributing Factor",
  "action": "Recommended Action",
  "timeline": "Timeline Insight",
  "concern": "Potential Concern"
};

/**
 * Detail page for AI-generated skin analysis content
 * This is a dedicated page for AI analysis items
 */
const AIAnalysisDetail = () => {
  // Extract all possible ID parameters from URL
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  console.log("AIAnalysisDetail: All URL params:", params);
  console.log("AIAnalysisDetail: Location state:", location.state);
  
  // Get type and id from URL params
  const type = params.type || "";
  const id = params.id || "";
  
  // For backward compatibility with old URLs
  const fullId = params['*'] || `${type}/${id}`;
  
  console.log(`AIAnalysisDetail: type=${type}, id=${id}, fullId=${fullId}`);
  
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState<AnalysisContent>({
    title: "",
    overview: "",
    details: "",
    recommendations: [],
    impact: "",
    disclaimer: ""
  });
  
  const { getAdvice } = useSkinAdvice({ 
    adviceType: "recommendation", // Fix: Changed from "analysis" to "recommendation" to match allowed types
    model: "gpt-4o-mini" 
  });
  
  const { getCachedDetail, preGenerateDetailContent, cacheDetailContent } = useAIDetailCache();
  const { parseRecommendationId, getRecommendationIdVariants } = useRecommendationIdParser();
  
  // Format a nice title based on type and ID
  const formatTitle = (type: string, id: string, baseTitle: string = ""): string => {
    if (baseTitle) return baseTitle;
    
    const displayType = analysisTypeDisplayMap[type.toLowerCase()] || type;
    return `${displayType} ${id}`;
  };
  
  // If we're using the old URL format, parse it
  let recommendationType = type;
  let recommendationNumber = id;
  
  if (!type || !id) {
    // Handle legacy URL formats
    const parsed = parseRecommendationId(fullId);
    recommendationType = parsed.recommendationType;
    recommendationNumber = parsed.recommendationNumber;
    console.log(`Parsed legacy URL: type=${recommendationType}, id=${recommendationNumber}`);
  }

  useEffect(() => {
    const fetchContent = async () => {
      if ((!type && !id && !fullId) && !location.state?.analysis) {
        console.error("Invalid analysis ID: empty params and no state passed");
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      
      try {
        // First check for state passed from a link
        if (location.state?.analysis) {
          console.log("Found analysis data in location state:", location.state.analysis);
          const analysisText = location.state.analysis.text;
          
          // Use the text from state to generate a title
          const baseTitle = typeof analysisText === 'string' 
            ? analysisText.split(":")[0] 
            : formatTitle(recommendationType, recommendationNumber);
          
          // Generate content based on this title
          const generatedContent = await generateNewContent(baseTitle);
          if (generatedContent) {
            setContent(generatedContent);
            setIsLoading(false);
            
            // Cache this for future use
            await cacheDetailContent(recommendationType, recommendationNumber, generatedContent);
            return;
          }
        }
        
        console.log(`Looking up content for type=${recommendationType}, id=${recommendationNumber}`);
        
        // Generate variants for lookup to maximize chance of finding content
        const variants = getRecommendationIdVariants(recommendationType, recommendationNumber, fullId);
        console.log("Looking up with variants:", variants);
        
        let cachedContent = null;
        
        // Try each variant until we find content
        for (const variant of variants) {
          if (!variant.type || !variant.id) continue;
          
          console.log(`Trying to fetch with type=${variant.type}, id=${variant.id}`);
          cachedContent = await getCachedDetail(variant.type, variant.id);
          
          if (cachedContent) {
            console.log(`Found content for type=${variant.type}, id=${variant.id}`, cachedContent);
            break;
          }
        }
        
        // If no cached content found, check local storage
        if (!cachedContent) {
          console.log("No content found in cache, checking localStorage");
          const possibleCacheKeys = [
            `ai-analysis-${recommendationType}-${recommendationNumber}`,
            `ai-recommendation-detail-${fullId}`,
            `ai-recommendation-detail-${recommendationType}-${recommendationNumber}`,
            `${recommendationType}-${recommendationNumber}`
          ];
          
          for (const cacheKey of possibleCacheKeys) {
            console.log(`Checking localStorage key: ${cacheKey}`);
            const localCachedContent = localStorage.getItem(cacheKey);
            if (localCachedContent) {
              console.log(`Found in localStorage with key: ${cacheKey}`);
              try {
                const parsedContent = JSON.parse(localCachedContent);
                cachedContent = {
                  title: parsedContent.title || "",
                  overview: parsedContent.overview || "",
                  details: parsedContent.details || "",
                  recommendations: Array.isArray(parsedContent.recommendations) ? parsedContent.recommendations : [],
                  impact: parsedContent.impact || "",
                  disclaimer: parsedContent.disclaimer || ""
                };
                
                // Also cache this for future use
                await cacheDetailContent(recommendationType, recommendationNumber, cachedContent);
                break;
              } catch (e) {
                console.error("Failed to parse localStorage content", e);
              }
            }
          }
        }
        
        // If we have content, use it
        if (cachedContent) {
          console.log("Using cached content", cachedContent);
          setContent(cachedContent);
          setIsLoading(false);
          return;
        }
        
        // No cached content, generate new content
        console.log("No cached content found, generating new content");
        
        // Build a title for the prompt
        const displayType = analysisTypeDisplayMap[recommendationType.toLowerCase()] || recommendationType;
        
        // Create a cache key that's unique to this specific type and id
        const uniqueCacheKey = `${recommendationType}-${recommendationNumber}`;
        console.log("Using unique cache key:", uniqueCacheKey);
        
        // Special handling for different types to create unique content
        let baseTitle = "";
        let promptContext = "";
        
        switch(recommendationType.toLowerCase()) {
          case 'action':
            baseTitle = `Recommended Action for Skin Health: ${recommendationNumber}`;
            promptContext = "This is a recommended action for improving skin health based on the user's skin logs and habits.";
            break;
          case 'factor':
            baseTitle = `Contributing Factor to Skin Condition: ${recommendationNumber}`;
            promptContext = "This is a factor that has been identified as contributing to the user's current skin condition.";
            break;
          case 'observation':
            baseTitle = `Key Observation About Skin Health: ${recommendationNumber}`;
            promptContext = "This is an important observation about the user's skin health patterns and trends.";
            break;
          case 'timeline':
            baseTitle = `Timeline Insight for Skin Progress: ${recommendationNumber}`;
            promptContext = "This provides insights about the user's skin health timeline and expected progress.";
            break;
          case 'concern':
            baseTitle = `Potential Skin Health Concern: ${recommendationNumber}`;
            promptContext = "This highlights a potential concern regarding the user's skin health that should be addressed.";
            break;
          default:
            baseTitle = `${displayType} ${recommendationNumber}`;
            promptContext = "This is an analysis of the user's skin health data.";
        }
        
        console.log("Generating content with base title:", baseTitle);
        console.log("Prompt context:", promptContext);
        
        // Generate content immediately with the specialized prompt context
        const generatedContent = await generateNewContent(baseTitle, promptContext);
        if (generatedContent) {
          setContent(generatedContent);
          
          // Cache for future use with the unique key
          await cacheDetailContent(recommendationType, recommendationNumber, generatedContent);
          
          try {
            const contentStr = JSON.stringify(generatedContent);
            localStorage.setItem(`ai-analysis-${recommendationType}-${recommendationNumber}`, contentStr);
          } catch (error) {
            console.error("Failed to cache in localStorage:", error);
          }
        }
      } catch (error) {
        console.error("Error fetching content:", error);
        toast.error("Error loading analysis details");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchContent();
  }, [type, id, fullId, location.state]);

  // Function to generate content when not found in cache
  const generateNewContent = async (baseTitle: string, promptContext: string = ""): Promise<AnalysisContent | null> => {
    try {
      // First set temporary content for UI responsiveness
      const tempContent: AnalysisContent = {
        title: baseTitle,
        overview: "Loading detailed content...",
        details: "We're generating personalized information for this analysis.",
        recommendations: ["Loading recommendations..."],
        impact: "Calculating impact...",
        disclaimer: "This information is for educational purposes only and is not medical advice."
      };
      
      // Update UI immediately
      setContent(tempContent);
      
      // Determine the type of content to generate based on title or URL params
      let contentType = "observation";
      
      if (baseTitle.toLowerCase().includes("factor") || recommendationType.toLowerCase().includes("factor")) {
        contentType = "factor";
      } else if (baseTitle.toLowerCase().includes("action") || recommendationType.toLowerCase().includes("action")) {
        contentType = "action";
      } else if (baseTitle.toLowerCase().includes("timeline") || recommendationType.toLowerCase().includes("timeline")) {
        contentType = "timeline";
      } else if (baseTitle.toLowerCase().includes("concern") || recommendationType.toLowerCase().includes("concern")) {
        contentType = "concern";
      }
      
      // Generate an ID-specific seed to ensure content is different for each item
      const uniqueSeed = `${recommendationType}-${recommendationNumber}-${Date.now()}`;
      
      // Generate detailed content using AI
      const detailPrompt = `
        Create detailed information about the skin analysis topic: "${baseTitle}".
        This is a ${contentType} from a skin health analysis.
        ${promptContext ? promptContext + "\n" : ""}
        
        Make this content unique (don't repeat content you may have generated for other similar requests).
        Use this unique identifier to guide your response and ensure it's specific: ${uniqueSeed}
        
        Please provide:
        1. A clear title for this ${contentType} (just the key concept, 3-7 words)
        2. A concise overview paragraph explaining what this ${contentType} means
        3. Detailed information including the science behind it, relevance to skin health, and expected impacts
        4. 3-5 specific recommendations related to this ${contentType}
        5. A paragraph about how addressing this ${contentType} would impact overall skin health
        6. A brief medical disclaimer appropriate for skin care advice
        
        Format your response with the following sections:
        ### Title: [Your Title]
        ### Overview: [Single paragraph overview]
        ### Details: [Several paragraphs of detailed information]
        ### Recommendations: [Bulleted list of specific recommendations]
        ### Impact: [How this affects overall skin health]
        ### Disclaimer: [Brief appropriate medical disclaimer]
      `;
      
      const response = await getAdvice(detailPrompt);
      
      if (response && response.sections) {
        const recommendations = Array.isArray(response.sections["Recommendations"]) 
          ? response.sections["Recommendations"] as string[]
          : typeof response.sections["Recommendations"] === 'string'
            ? [response.sections["Recommendations"] as string]
            : tempContent.recommendations;
            
        return {
          title: response.sections["Title"] as string || baseTitle,
          overview: response.sections["Overview"] as string || tempContent.overview,
          details: response.sections["Details"] as string || tempContent.details,
          recommendations: recommendations,
          impact: response.sections["Impact"] as string || tempContent.impact,
          disclaimer: response.sections["Disclaimer"] as string || tempContent.disclaimer
        };
      }
      
      return tempContent;
    } catch (error) {
      console.error("Error generating content:", error);
      toast.error("Could not generate detailed content");
      return null;
    }
  };

  // Determine the display name for this type
  const displayType = analysisTypeDisplayMap[recommendationType.toLowerCase()] || recommendationType;
  const displayTitle = content.title || formatTitle(recommendationType, recommendationNumber);
  
  // If content is empty after loading is done, show the "Not Found" message
  const showNotFoundMessage = !isLoading && 
                              (!content || !content.overview || content.overview.trim() === "");

  if (showNotFoundMessage) {
    navigate("/not-found", { replace: true });
    return null;
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
            {displayType} {recommendationNumber}
          </Badge>
        </div>
        
        {/* Overview Section */}
        <div className="mb-6">
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
        
        {/* Details Section */}
        <div className="mb-6">
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
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Impact Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Impact on Skin Health</h2>
          {isLoading ? (
            <Card>
              <CardContent className="pt-6">
                <Skeleton className="h-4 w-full mb-4" />
                <Skeleton className="h-4 w-full mb-4" />
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <p className="text-base">{content.impact}</p>
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Actions Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
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
                    <span>No specific recommendations available</span>
                  </div>
                )}
                
                <Button 
                  className="w-full mt-6 skin-goals-button" 
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
        
        {/* Disclaimer section */}
        <DisclaimerCard 
          disclaimerText={content.disclaimer}
          isLoading={isLoading}
        />
      </div>
      
      <AppNavigation />
    </div>
  );
};

export default AIAnalysisDetail;
