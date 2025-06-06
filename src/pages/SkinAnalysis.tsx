import React, { useState, useEffect, useCallback } from "react";
import AppNavigation from "@/components/AppNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Salad, 
  Pill, 
  Palette, 
  CloudSun, 
  MoonStar, 
  Activity, 
  Smile, 
  Droplet, 
  Utensils, 
  Circle, 
  Wine, 
  Beer, 
  Brush,
  Info,
  Calendar,
  Clock
} from "lucide-react";
import { Link } from "react-router-dom";
import BackButton from "@/components/BackButton";
import TrendChart from "@/components/TrendChart";
import { useSkinAdvice } from "@/hooks/useSkinAdvice";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { useAIDetailCache } from "@/hooks/useAIDetailCache";
import { toast } from "sonner";

// Types for AI analysis
interface AISection {
  title: string;
  items: {
    text: string;
    type: string;
    linkTo: string;
  }[];
}

interface AIAdvice {
  formattedHtml: string;
  sections: Record<string, string | string[]>;
}

const SkinAnalysis = () => {
  useScrollToTop();
  const [aiLoading, setAiLoading] = useState(false);
  const [aiAdvice, setAiAdvice] = useState<AIAdvice>({
    formattedHtml: "",
    sections: {}
  });
  const [showAllRecommendations, setShowAllRecommendations] = useState(false);
  const { getAdvice, isLoading, getTextContent } = useSkinAdvice({ adviceType: "recommendation" });
  const { preGenerateMultipleDetails, isGenerating } = useAIDetailCache();
  
  // Sample data
  const skinFactors = [
    { type: "Food" as const, status: "Hydrating", iconName: "salad", details: "Increased water-rich foods and avoided dairy this week" },
    { type: "Supplement" as const, status: "New", iconName: "pill", details: "Started collagen supplement 3 days ago" },
    { type: "Makeup" as const, status: "Same as usual", iconName: "palette", details: "Using the same foundation and concealer" },
    { type: "Weather" as const, status: "Dry + Cold", iconName: "cloud-sun", details: "Low humidity affecting skin hydration" },
    { type: "Sleep" as const, status: "Improved", iconName: "moon-star", details: "Getting 7+ hours consistently this week" },
    { type: "Stress" as const, status: "Moderate", iconName: "activity", details: "Work deadline approaching" },
  ];

  // Weekly trend data
  const weeklyTrendData = [
    { date: "Mon", value: 35 },
    { date: "Tue", value: 40 },
    { date: "Wed", value: 45 },
    { date: "Thu", value: 60 },
    { date: "Fri", value: 75 },
    { date: "Sat", value: 80 },
    { date: "Sun", value: 85 }
  ];

  // For You Recommendations - Expanded to 10+ items
  const skinRecommendations = [
    { 
      type: "food" as const, 
      text: "Try vitamin C serum", 
      iconName: "utensils",
      linkTo: "/recommendations-detail/vitamin-c-serum",
      details: "Helps brighten skin and reduce visible inflammation"
    },
    { 
      type: "food" as const, 
      text: "Increase omega-3", 
      iconName: "utensils",
      linkTo: "/recommendations-detail/increase-omega-3",
      details: "May reduce redness and support skin barrier function"
    },
    { 
      type: "food" as const, 
      text: "Add antioxidant foods", 
      iconName: "utensils",
      linkTo: "/recommendations-detail/antioxidant-foods",
      details: "Support skin healing and combat environmental damage"
    },
    { 
      type: "food" as const, 
      text: "Limit dairy consumption", 
      iconName: "utensils",
      linkTo: "/recommendations-detail/limit-dairy",
      details: "Strong correlation between dairy intake and your breakouts"
    },
    { 
      type: "drink" as const, 
      text: "Morning hydration", 
      iconName: "beer",
      linkTo: "/recommendations-detail/morning-hydration",
      details: "Starting day with water could improve skin's moisture levels"
    },
    { 
      type: "supplements" as const, 
      text: "Add zinc", 
      iconName: "pill",
      linkTo: "/recommendations-detail/add-zinc",
      details: "Could help regulate oil production based on your skin pattern"
    },
    { 
      type: "supplements" as const, 
      text: "Try evening primrose", 
      iconName: "pill",
      linkTo: "/recommendations-detail/evening-primrose",
      details: "May help with hormonal fluctuations affecting your skin"
    },
    { 
      type: "makeup" as const, 
      text: "Switch foundation", 
      iconName: "brush",
      linkTo: "/recommendations-detail/switch-foundation",
      details: "Current foundation may be contributing to clogged pores"
    },
    { 
      type: "makeup" as const, 
      text: "Oil-free concealer", 
      iconName: "brush",
      linkTo: "/recommendations-detail/oil-free-concealer",
      details: "Better option for your T-zone where oil is more prominent"
    },
    { 
      type: "lifestyle" as const, 
      text: "Stress management", 
      iconName: "activity",
      linkTo: "/recommendations-detail/stress-management",
      details: "Recent stress appears to be triggering breakouts on chin area"
    },
    { 
      type: "skincare" as const, 
      text: "Gentle night exfoliant", 
      iconName: "droplet",
      linkTo: "/recommendations-detail/night-exfoliant",
      details: "Could help with uneven texture seen in recent logs"
    },
    { 
      type: "skincare" as const, 
      text: "Add ceramide moisturizer", 
      iconName: "droplet",
      linkTo: "/recommendations-detail/ceramide-moisturizer",
      details: "Would strengthen your skin barrier which shows signs of damage"
    },
    { 
      type: "skincare" as const, 
      text: "Niacinamide serum", 
      iconName: "droplet",
      linkTo: "/recommendations-detail/niacinamide-serum",
      details: "For minimizing pores and balancing oil production"
    },
    { 
      type: "skincare" as const, 
      text: "SPF reapplication", 
      iconName: "droplet",
      linkTo: "/recommendations-detail/spf-reapplication",
      details: "Important for continued protection throughout the day"
    }
  ];

  // Function to get icon component based on iconName
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "salad":
        return <Salad className="text-2xl mr-3" />;
      case "pill":
        return <Pill className="text-2xl mr-3" />;
      case "palette":
        return <Palette className="text-2xl mr-3" />;
      case "cloud-sun":
        return <CloudSun className="text-2xl mr-3" />;
      case "moon-star":
        return <MoonStar className="text-2xl mr-3" />;
      case "activity":
        return <Activity className="text-2xl mr-3" />;
      case "droplet":
        return <Droplet className="text-2xl mr-3" />;
      case "utensils":
        return <Utensils className="text-2xl mr-3" />;
      case "circle":
        return <Circle className="text-2xl mr-3" />;
      case "brush":
        return <Brush className="text-2xl mr-3" />;
      case "beer":
        return <Beer className="text-2xl mr-3" />;
      case "wine":
        return <Wine className="text-2xl mr-3" />;
      case "info":
        return <Info className="text-2xl mr-3" />;
      case "calendar":
        return <Calendar className="text-2xl mr-3" />;
      case "clock":
        return <Clock className="text-2xl mr-3" />;
      default:
        return null;
    }
  };

  // Group recommendations by category
  const groupedRecommendations = skinRecommendations.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {} as Record<string, typeof skinRecommendations>);

  // Get categories in the desired order
  const categoryOrder = ["food", "drink", "supplements", "makeup", "lifestyle", "skincare"];

  // Process AI response into clickable sections
  const processAIResponse = (sections: Record<string, string | string[]> = {}): AISection[] => {
    // Add null/undefined check
    if (!sections) {
      return [];
    }
    
    const aiSections: AISection[] = [];
    
    // Map section names to display names and types
    const sectionConfig: Record<string, {title: string, type: string, icon: string, labelPrefix: string}> = {
      "Key Benefits/Observations": { title: "Key Observations", type: "observation", icon: "circle", labelPrefix: "Observation" },
      "Contributing Factors": { title: "Contributing Factors", type: "factor", icon: "activity", labelPrefix: "Factor" },
      "Recommended Actions": { title: "Recommendations", type: "action", icon: "droplet", labelPrefix: "Recommendation" },
      "Expected Timeline": { title: "Timeline", type: "timeline", icon: "calendar", labelPrefix: "Timeline" }
    };
    
    // Process each section
    Object.entries(sections).forEach(([key, content]) => {
      // Skip Brief Summary section
      if (key === "Brief Summary") return;
      
      if (!content) return; // Skip if content is null/undefined
      
      const config = sectionConfig[key] || { title: key, type: "info", icon: "info", labelPrefix: "Item" };
      
      if (Array.isArray(content)) {
        // Create a section with items for array content
        aiSections.push({
          title: config.title,
          items: content.map((item, index) => {
            // Parse the item to separate title and details if it contains a colon
            const hasColon = item.includes(":");
            const title = hasColon ? item.split(":")[0].trim() : `${config.labelPrefix} ${index + 1}`;
            const details = hasColon ? item.split(":").slice(1).join(":").trim() : item;
            
            // Updated URL format - use /ai-analysis/ path
            return {
              text: item, // Keep the full text for processing
              type: config.type,
              linkTo: `/ai-analysis/${config.type}/${index + 1}` // New URL format
            };
          })
        });
      } else if (typeof content === 'string') {
        // Create a section with a single item for string content
        const hasColon = content.includes(":");
        const title = hasColon ? content.split(":")[0].trim() : `${config.labelPrefix} 1`;
        const details = hasColon ? content.split(":").slice(1).join(":").trim() : content;
        
        aiSections.push({
          title: config.title,
          items: [{
            text: content,
            type: config.type,
            linkTo: `/ai-analysis/${config.type}/1` // New URL format
          }]
        });
      }
    });
    
    return aiSections;
  };

  // Function to generate AI advice using useSkinAdvice hook
  const generateAiAdvice = async (forceRefresh = false) => {
    // Check if we have cached advice in localStorage
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    const cacheKey = `skin-analysis-advice-${today}`;
    
    // If not forcing a refresh, try to get data from localStorage first
    if (!forceRefresh) {
      try {
        const cachedAdvice = localStorage.getItem(cacheKey);
        if (cachedAdvice) {
          const parsedAdvice = JSON.parse(cachedAdvice);
          setAiAdvice(parsedAdvice);
          return; // Exit early if we have cached data
        }
      } catch (error) {
        console.error("Error reading from cache:", error);
        // Continue with API request if cache read fails
      }
    }
    
    // If no cache or we need a refresh, proceed with API request
    setAiLoading(true);
    try {
      const advice = await getAdvice(
        "Provide personalized analysis of my skin condition based on recent logs and factors. Include specific sections for: current status, key observations, contributing factors, recommended actions, and expected timeline. Provide at least 8-10 detailed recommendations.", 
        { skinFactors, weeklyTrendData }
      );
      
      // Make sure advice is not null or undefined before setting state
      if (advice) {
        setAiAdvice(advice);
        
        // Save to localStorage for future use
        try {
          localStorage.setItem(cacheKey, JSON.stringify(advice));
        } catch (storageError) {
          console.error("Error saving to localStorage:", storageError);
        }
        
        // IMPORTANT: After generating AI advice, pre-generate detail pages for each item
        const aiSections = processAIResponse(advice.sections || {});
        const detailsToGenerate: Array<{type: string; id: string; text: string; contextData?: any}> = [];
        
        // Collect all items that need detail pages
        aiSections.forEach(section => {
          section.items.forEach((item, index) => {
            // Extract the type and id from the linkTo URL
            const urlParts = item.linkTo.split('/');
            const type = urlParts[urlParts.length - 2] || item.type;
            const id = urlParts[urlParts.length - 1] || `${index + 1}`;
            
            detailsToGenerate.push({
              type,
              id,
              text: item.text,
              contextData: { skinFactors, weeklyTrendData }
            });
          });
        });
        
        // Pre-generate all detail pages in the background
        if (detailsToGenerate.length > 0) {
          console.log(`Pre-generating ${detailsToGenerate.length} detail pages in the background`);
          
          // Don't await this - let it run in the background while user browses
          preGenerateMultipleDetails(detailsToGenerate).then(({ generatedCount }) => {
            if (generatedCount > 0) {
              toast.success(`${generatedCount} new recommendation details prepared`, {
                duration: 3000,
                position: "bottom-center"
              });
            }
          });
        }
      } else {
        setAiAdvice({ formattedHtml: "", sections: {} });
      }
    } catch (error) {
      console.error("Error getting AI skin advice:", error);
      // Set default empty values on error
      setAiAdvice({ formattedHtml: "", sections: {} });
    } finally {
      setAiLoading(false);
    }
  };
  
  // Generate AI advice on first render
  React.useEffect(() => {
    generateAiAdvice();
  }, []);
  
  // Process AI sections - add null check to provide fallback value
  const aiSections = processAIResponse(aiAdvice?.sections || {});

  // Get recommendations section specifically
  const recommendationsSection = aiSections.find(section => section.title === "Recommendations");
  
  // Check if we have AI recommendations
  const hasAiRecommendations = recommendationsSection && recommendationsSection.items.length > 0;
  
  // Display count for recommendations - fixed at 8 to ensure we show all 8
  const displayCount = 8;
  
  console.log("Recommendations section:", recommendationsSection);
  console.log("Has AI recommendations:", hasAiRecommendations);
  if (recommendationsSection) {
    console.log("Total recommendations:", recommendationsSection.items.length);
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6 flex items-center">
          <BackButton />
          <h1 className="text-2xl font-bold">Full Skin Analysis</h1>
        </header>
        
        <Tabs defaultValue="current" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="current">Current</TabsTrigger>
            <TabsTrigger value="for-you">For You</TabsTrigger>
            <TabsTrigger value="ai">AI Analysis</TabsTrigger>
          </TabsList>
          
          {/* Current Tab - Original content */}
          <TabsContent value="current" className="space-y-6">
            {/* Today's Skin Card */}
            <Card className="ios-card">
              <CardContent className="p-4">
                <div className="flex items-center mb-4">
                  <Smile className="text-4xl mr-3" />
                  <div>
                    <h2 className="font-medium text-lg">Today's Skin</h2>
                    <p className="text-xl font-semibold">Balanced</p>
                  </div>
                </div>
                
                <div className="mb-3">
                  <p className="text-sm font-medium mb-2">Detailed Analysis:</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Your skin appears balanced today with good hydration levels. Inflammation is minimal and there's
                    an improvement in overall tone compared to yesterday.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            {/* Weekly Trend */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Weekly Trend</h2>
              <Card className="ios-card">
                <CardContent className="p-4">
                  <p className="text-muted-foreground mb-3">Your skin has been gradually improving this week</p>
                  <TrendChart data={weeklyTrendData} height={80} />
                </CardContent>
              </Card>
            </div>
            
            {/* Contributing Factors */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Contributing Factors</h2>
              <div className="space-y-3">
                {skinFactors.map((factor, index) => (
                  <Card key={index} className="ios-card">
                    <CardContent className="p-4">
                      <div className="flex items-start">
                        {getIconComponent(factor.iconName)}
                        <div>
                          <h3 className="font-medium">{factor.type}: {factor.status}</h3>
                          <p className="text-sm text-muted-foreground">{factor.details}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
          
          {/* For You Tab - Personalized Recommendations */}
          <TabsContent value="for-you" className="space-y-6">
            <h2 className="text-xl font-semibold mb-3">For You Recommendations</h2>
            
            <div className="space-y-5">
              {categoryOrder.map((category) => {
                const recs = groupedRecommendations[category];
                
                // Skip if no recommendations in this category
                if (!recs || recs.length === 0) return null;
                
                return (
                  <div key={category} className="space-y-3">
                    <h3 className="text-lg font-medium capitalize mt-2">{category}</h3>
                    
                    {recs.map((recommendation, index) => (
                      <div key={index} className="mb-3">
                        <Link to={recommendation.linkTo}>
                          <Card className="ios-card hover:shadow-md transition-all">
                            <CardContent className="p-4">
                              <div className="flex items-start">
                                {getIconComponent(recommendation.iconName)}
                                <div>
                                  <h3 className="font-medium">{recommendation.text}</h3>
                                  <p className="text-sm text-muted-foreground">
                                    {recommendation.details}
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </TabsContent>
          
          {/* AI Tab - AI-Generated Analysis */}
          <TabsContent value="ai" className="space-y-6">
            {aiLoading || isLoading ? (
              <Card className="ios-card">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-skin-teal mb-4"></div>
                    <p className="text-muted-foreground">Generating your personalized skin analysis...</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Display AI sections in a structured format */}
                {aiSections.map((section, index) => {
                  // Skip empty sections
                  if (!section.items || section.items.length === 0) return null;
                  
                  // Determine if this is the recommendations section
                  const isRecommendations = section.title === "Recommendations";
                  
                  console.log(`Rendering Section: ${section.title}, Items: ${section.items.length}, Is Recommendations: ${isRecommendations}`);
                  
                  // Force showing all 8 recommendations for the Recommendations section
                  const itemsToDisplay = isRecommendations ? 
                    (showAllRecommendations ? section.items : section.items.slice(0, displayCount))
                    : section.items;
                  
                  console.log(`Items to display for ${section.title}:`, itemsToDisplay.length);
                  
                  return (
                    <div key={index} className="ai-section">
                      <h2 className="text-xl font-semibold mb-3">{section.title}</h2>
                      
                      <div className="space-y-3">
                        {/* Display the appropriate items for this section */}
                        {itemsToDisplay.map((item, itemIdx) => {
                          // Parse item text to extract title and details
                          const hasColon = item.text.includes(":");
                          const sectionConfig = {
                            "Key Observations": "Observation",
                            "Recommendations": "Recommendation",
                            "Contributing Factors": "Factor",
                            "Timeline": "Timeline"
                          };
                          const sectionPrefix = sectionConfig[section.title] || "Item";
                          const title = hasColon ? item.text.split(":")[0].trim() : `${sectionPrefix} ${itemIdx + 1}`;
                          const details = hasColon ? item.text.split(":").slice(1).join(":").trim() : item.text;

                          return (
                            <Link 
                              to={item.linkTo} 
                              key={itemIdx} 
                              className="block"
                              state={{ analysis: { text: item.text, type: item.type, id: `${itemIdx + 1}` } }}
                            >
                              <Card className="ios-card hover:shadow-md transition-all">
                                <CardContent className="p-4">
                                  <div>
                                    <h3 className="font-medium">{title}</h3>
                                    <p className="text-sm text-muted-foreground">
                                      {details}
                                    </p>
                                  </div>
                                </CardContent>
                              </Card>
                            </Link>
                          );
                        })}
                      </div>
                      
                      {/* Show more/less button for recommendations section */}
                      {isRecommendations && section.items.length > displayCount && (
                        <button 
                          onClick={() => setShowAllRecommendations(!showAllRecommendations)}
                          className="mt-4 text-skin-teal text-sm font-medium flex items-center"
                        >
                          {showAllRecommendations 
                            ? "Show less" 
                            : `Show ${section.items.length - displayCount} more recommendations`
                          }
                        </button>
                      )}
                    </div>
                  );
                })}
                
                {/* If there are no structured sections or sections parsing failed */}
                {(!aiSections || aiSections.length === 0) && (
                  <Card className="ios-card">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">AI Skin Analysis</h2>
                        {/* Regenerate button */}
                        <button 
                          onClick={() => generateAiAdvice(true)} 
                          className="px-3 py-1 bg-skin-teal text-white text-xs rounded-md hover:bg-skin-teal-dark transition-colors"
                        >
                          Refresh
                        </button>
                      </div>
                      
                      <div className="prose prose-sm max-w-none">
                        {aiAdvice?.formattedHtml ? (
                          <div 
                            dangerouslySetInnerHTML={{ 
                              __html: typeof aiAdvice.formattedHtml === 'string' 
                                ? aiAdvice.formattedHtml 
                                : '' 
                            }} 
                            className="skin-advice-content" 
                          />
                        ) : (
                          <p>Unable to generate AI analysis at this time. Please try again later.</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              
                {/* About This Analysis card */}
                <Card className="ios-card">
                  <CardContent className="p-6">
                    <h3 className="font-medium mb-3">About This Analysis</h3>
                    <ul className="list-disc pl-5 space-y-2 text-sm">
                      <li>This analysis is based on your recent skin logs and trends</li>
                      <li>The AI considers various factors like diet, products, environment, and lifestyle</li>
                      <li>Recommendations are personalized based on your specific skin patterns</li>
                      <li>Update your logs regularly for increasingly accurate insights</li>
                    </ul>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      <AppNavigation />
    </div>
  );
};

export default SkinAnalysis;
