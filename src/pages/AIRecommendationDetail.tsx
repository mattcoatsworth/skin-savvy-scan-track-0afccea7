
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import Disclaimer from "@/components/Disclaimer";

const AIRecommendationDetail = () => {
  const { id = "" } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState({
    title: "",
    overview: "",
    details: "",
    disclaimer: "",
    recommendations: [] as string[]
  });
  
  const { getAdvice } = useSkinAdvice({ 
    adviceType: "general",
    model: "gpt-4o-mini" 
  });
  
  // Extract recommendation type from the ID
  const recommendationType = id?.split('-')[0] || "recommendation";
  const recommendationNumber = id?.split('-')[1] || "";
  
  // Format the type for display
  const formatType = (type: string): string => {
    switch(type) {
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
        return "Recommendation";
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

  useEffect(() => {
    const generateContent = async () => {
      setIsLoading(true);
      
      try {
        // Try to get cached content from localStorage first
        const cacheKey = `ai-recommendation-detail-${id}`;
        const cachedContent = localStorage.getItem(cacheKey);
        
        if (cachedContent) {
          setContent(JSON.parse(cachedContent));
          setIsLoading(false);
          return;
        }
        
        // Build the base title from the ID
        const baseTitle = formatTitle(id);
        
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
          // Parse the response sections
          const newContent = {
            title: response.sections["Title"] as string || baseTitle,
            overview: response.sections["Overview"] as string || "",
            details: response.sections["Details"] as string || "",
            disclaimer: response.sections["Disclaimer"] as string || "",
            recommendations: Array.isArray(response.sections["Recommendations"]) 
              ? response.sections["Recommendations"] as string[] 
              : []
          };
          
          // Save to state
          setContent(newContent);
          
          // Cache in localStorage
          try {
            localStorage.setItem(cacheKey, JSON.stringify(newContent));
          } catch (error) {
            console.error("Failed to cache AI content:", error);
          }
        } else {
          // Fallback content if API fails
          setContent({
            title: baseTitle,
            overview: "This recommendation focuses on improving your skin health through targeted approaches specific to your skin condition.",
            details: "We're currently unable to load detailed information. Please check back later.",
            disclaimer: "This information is for educational purposes only and is not medical advice. Consult with a healthcare professional before making changes to your skincare routine.",
            recommendations: [
              "Maintain consistent skincare routine",
              "Monitor your skin's response to changes",
              "Stay hydrated and maintain a balanced diet"
            ]
          });
          
          toast.error("Could not generate detailed content");
        }
      } catch (error) {
        console.error("Error generating content:", error);
        toast.error("Error loading recommendation details");
      } finally {
        setIsLoading(false);
      }
    };
    
    generateContent();
  }, [id, getAdvice]);

  const recommendationTypeDisplay = formatType(recommendationType);
  const displayTitle = content.title || formatTitle(id);
  
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
                  
                  {content.recommendations.length > 0 ? (
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
      </div>
      
      <AppNavigation />
    </div>
  );
};

export default AIRecommendationDetail;
