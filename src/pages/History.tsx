import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { format, subDays } from "date-fns";
import SkinHistory from "@/components/SkinHistory";
import BackButton from "@/components/BackButton";
import { 
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Camera, Image, Smile, Sun, Moon, LoaderCircle } from "lucide-react";
import SkinIndexComparison from "@/components/SkinIndexComparison";
import InsightsTrends from "@/components/InsightsTrends";
import { useSkinAdvice } from "@/hooks/useSkinAdvice";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ViewScoringMethod from "@/components/ViewScoringMethod";
import Disclaimer from "@/components/Disclaimer";

// Generate data for the past 7 days for skin history chart
const generatePastWeekData = () => {
  const today = new Date();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  return Array(7).fill(null).map((_, index) => {
    const date = subDays(today, 6 - index);
    const dayName = days[date.getDay()];
    const dateStr = format(date, "M/d");
    // Generate a random rating between 40 and 95 for demo purposes
    const rating = Math.floor(Math.random() * (95 - 40 + 1)) + 40;
    
    return {
      day: dayName,
      date: dateStr,
      rating
    };
  });
};

// Data for skin history chart
const skinRatings = generatePastWeekData();

// Mock data for insights
const insightData = [
  {
    title: "Hydration Effect",
    description: "Drinking 8+ glasses of water improved skin moisture by 30%",
    iconName: "droplet"
  },
  {
    title: "Vitamin C Serum",
    description: "Regular use has helped with brightening and texture",
    iconName: "star"
  },
  {
    title: "Sleep Quality",
    description: "Nights with 7+ hours sleep show 40% better skin clarity",
    iconName: "activity"
  }
];

// Define the type for a day log
type DayLogType = {
  id: string;
  date: Date;
  rating: number;
  summary: string;
  factors: {
    food: string[];
    products: string[];
    skin: string[];
  };
  amSelfie?: string | null;
  pmSelfie?: string | null;
};

// Determine label based on rating
const getRatingLabel = (rating: number) => {
  if (rating >= 80) return "Great";
  if (rating >= 60) return "Good";
  if (rating >= 40) return "OK";
  if (rating >= 20) return "Fair";
  return "Poor";
};

const History = () => {
  // State for photo upload dialog
  const [isPhotoDialogOpen, setIsPhotoDialogOpen] = useState(false);
  const [currentPhotoType, setCurrentPhotoType] = useState<"am" | "pm" | null>(null);
  const [currentDayId, setCurrentDayId] = useState<string | null>(null);
  const [aiSkinAnalysis, setAiSkinAnalysis] = useState<{
    status: string;
    analysis: string;
  }>({ 
    status: "Loading...", 
    analysis: "Analyzing your skin logs..." 
  });
  const [isLoading, setIsLoading] = useState(true);
  
  // Add state for today's selfies
  const [todaysSelfies, setTodaysSelfies] = useState({
    am: null as string | null,
    pm: null as string | null
  });
  
  // Set the default active tab
  const [activeTab, setActiveTab] = useState("daily");
  
  // Use the skin advice hook for AI analysis
  const { getAdvice, isLoading: isAdviceLoading, getTextContent } = useSkinAdvice({ adviceType: "general" });
  
  // Generate 7 days of mock data
  const dayLogs: DayLogType[] = Array.from({ length: 7 }).map((_, index) => {
    const date = subDays(new Date(), index);
    const rating = Math.floor(Math.random() * 100) + 1; // Random rating between 1-100
    
    // Randomly determine if this log has selfies (for demo purposes)
    // In a real app, this would come from user data
    const hasAmSelfie = Math.random() > 0.7;
    const hasPmSelfie = Math.random() > 0.7;
    
    return {
      id: `day-${index}`,
      date,
      rating,
      summary: rating >= 70 
        ? "Skin looking great today" 
        : rating >= 40 
          ? "Some minor issues" 
          : "Having a rough skin day",
      factors: {
        food: getRandomFactors(["Avocado", "Nuts", "Water", "Green Tea", "Dairy", "Sugar", "Processed Foods"], 2),
        products: getRandomFactors(["Retinol", "Vitamin C Serum", "Moisturizer", "Sunscreen", "Cleanser"], 2),
        skin: getRandomFactors(["Hydrated", "Dry", "Oily", "Irritated", "Calm", "Breakout"], 1),
      },
      amSelfie: hasAmSelfie ? null : undefined, // null means placeholder, undefined means no selfie block
      pmSelfie: hasPmSelfie ? null : undefined, // this is just for demo - in real app all would have placeholders
    };
  });

  function getRandomFactors(array: string[], count: number): string[] {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
  
  // Handle photo placeholder click
  const handlePhotoClick = (dayId: string, photoType: "am" | "pm", event: React.MouseEvent) => {
    // Stop event propagation to prevent navigation to day log detail
    event.preventDefault();
    event.stopPropagation();
    
    // Special handling for today's selfies
    if (dayId === "today") {
      setCurrentDayId("today");
      setCurrentPhotoType(photoType);
      setIsPhotoDialogOpen(true);
      return;
    }
    
    // Only open dialog if the photo is null or undefined (not uploaded yet)
    const dayLog = dayLogs.find(log => log.id === dayId);
    // Fix: changed the instanceof check to a more appropriate type check
    const photoExists = photoType === "am" 
      ? typeof dayLog?.amSelfie === 'string' && dayLog.amSelfie !== null
      : typeof dayLog?.pmSelfie === 'string' && dayLog.pmSelfie !== null;
    
    if (!photoExists) {
      setCurrentDayId(dayId);
      setCurrentPhotoType(photoType);
      setIsPhotoDialogOpen(true);
    }
  };
  
  // Handle taking a photo
  const handleTakePhoto = () => {
    // In a real app, this would open the camera
    console.log(`Taking photo for ${currentPhotoType} on day ${currentDayId}`);
    
    // Simulate adding a photo for today's selfies
    if (currentDayId === "today") {
      const placeholderImage = "https://source.unsplash.com/random/300x300/?face";
      setTodaysSelfies(prev => ({
        ...prev,
        [currentPhotoType || "am"]: placeholderImage
      }));
    }
    
    // Close the dialog after action
    setIsPhotoDialogOpen(false);
  };
  
  // Handle selecting from gallery
  const handleSelectFromGallery = () => {
    // In a real app, this would open the photo gallery
    console.log(`Selecting from gallery for ${currentPhotoType} on day ${currentDayId}`);
    
    // Simulate adding a photo for today's selfies
    if (currentDayId === "today") {
      const placeholderImage = "https://source.unsplash.com/random/300x300/?skin";
      setTodaysSelfies(prev => ({
        ...prev,
        [currentPhotoType || "am"]: placeholderImage
      }));
    }
    
    // Close the dialog after action
    setIsPhotoDialogOpen(false);
  };

  // Fetch the user's skin logs and generate AI analysis
  const fetchSkinLogsAndAnalyze = async () => {
    setIsLoading(true);
    
    try {
      // Get the current session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setAiSkinAnalysis({
          status: "Balanced",
          analysis: "Sign in to see your personalized skin analysis based on your logs."
        });
        setIsLoading(false);
        return;
      }
      
      // Fetch recent skin logs
      const { data: recentLogs, error } = await supabase
        .from('skin_logs')
        .select('*, daily_factors(*)')
        .eq('user_id', session.user.id)
        .order('log_date', { ascending: false })
        .limit(7);
      
      if (error) {
        console.error("Error fetching skin logs:", error);
        throw error;
      }
      
      // If no logs exist, show default message
      if (!recentLogs || recentLogs.length === 0) {
        setAiSkinAnalysis({
          status: "New",
          analysis: "Start logging your skin condition to get personalized insights and recommendations."
        });
        setIsLoading(false);
        return;
      }
      
      // Get AI analysis based on logs
      const context = {
        userSkinLogs: recentLogs,
        timeframe: "daily"
      };
      
      const aiResponse = await getAdvice(
        "Analyze the user's skin logs and provide: 1) A one-word skin status assessment (e.g., Balanced, Dry, Oily, Sensitive, etc.) and 2) A brief, specific analysis about their skin condition today compared to previous days. Focus on hydration, inflammation, and overall tone. Keep it concise and personalized.",
        context
      );
      
      if (aiResponse && aiResponse.sections) {
        // Extract the status and analysis from AI response
        const sections = aiResponse.sections;
        let status = "Balanced"; // Default status
        let analysis = "Your skin appears balanced today with good hydration levels.";
        
        // Extract status if available in sections
        if (typeof sections["Brief Summary"] === 'string') {
          // Try to extract a single-word status from the first sentence
          const firstSentence = sections["Brief Summary"].split('.')[0];
          const statusMatch = firstSentence.match(/your skin (is|appears|looks) (\w+)/i);
          if (statusMatch && statusMatch[2]) {
            status = statusMatch[2].charAt(0).toUpperCase() + statusMatch[2].slice(1);
          }
        }
        
        // Extract analysis from Key Observations or Brief Summary
        if (sections["Key Benefits/Observations"]) {
          if (Array.isArray(sections["Key Benefits/Observations"])) {
            analysis = sections["Key Benefits/Observations"].join(" ");
          } else {
            analysis = sections["Key Benefits/Observations"];
          }
        } else if (typeof sections["Brief Summary"] === 'string') {
          analysis = sections["Brief Summary"];
        }
        
        setAiSkinAnalysis({
          status,
          analysis
        });
      }
    } catch (error) {
      console.error("Error analyzing skin logs:", error);
      setAiSkinAnalysis({
        status: "Balanced",
        analysis: "Your skin appears balanced today with good hydration levels. Inflammation is minimal and there's an improvement in overall tone compared to yesterday."
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Add new state for AI analysis
  const [aiAdvice, setAiAdvice] = useState<any>({
    formattedHtml: "",
    sections: {}
  });
  const [aiLoading, setAiLoading] = useState(false);
  
  // Process AI response into clickable sections
  const processAIResponse = (sections: Record<string, string | string[]> = {}): any[] => {
    if (!sections) {
      return [];
    }
    
    const aiSections: any[] = [];
    
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
            
            return {
              text: item, // Keep the full text for processing
              type: config.type,
              linkTo: `/recommendations-detail/ai-${config.type}-${index + 1}`
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
            linkTo: `/recommendations-detail/ai-${config.type}`
          }]
        });
      }
    });
    
    return aiSections;
  };

  // Function to generate AI advice
  const generateAiAdvice = async (forceRefresh = false) => {
    // Sample data needed for AI analysis (similar to what's in SkinAnalysis page)
    const skinFactors = [
      { type: "Food", status: "Hydrating", details: "Increased water-rich foods and avoided dairy this week" },
      { type: "Supplement", status: "New", details: "Started collagen supplement 3 days ago" },
      { type: "Makeup", status: "Same as usual", details: "Using the same foundation and concealer" },
      { type: "Weather", status: "Dry + Cold", details: "Low humidity affecting skin hydration" },
      { type: "Sleep", status: "Improved", details: "Getting 7+ hours consistently this week" },
      { type: "Stress", status: "Moderate", details: "Work deadline approaching" },
    ];

    const weeklyTrendData = [
      { date: "Mon", value: 35 },
      { date: "Tue", value: 40 },
      { date: "Wed", value: 45 },
      { date: "Thu", value: 60 },
      { date: "Fri", value: 75 },
      { date: "Sat", value: 80 },
      { date: "Sun", value: 85 }
    ];
    
    // Check if we have cached advice in localStorage
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    const cacheKey = `skin-history-advice-${today}`;
    
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
        "Provide personalized analysis of my skin condition based on recent logs and factors. Include specific sections for: current status, key observations, contributing factors, recommended actions, and expected timeline.", 
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
  
  // Fetch skin logs and analyze on component mount & generate AI advice
  useEffect(() => {
    fetchSkinLogsAndAnalyze();
    generateAiAdvice();
  }, []);
  
  // Process AI sections
  const aiSections = processAIResponse(aiAdvice?.sections || {});

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-md mx-auto">
        <header className="mb-6 flex items-center">
          <BackButton />
          <h1 className="text-2xl font-bold">Skin</h1>
        </header>
        
        {/* Add tabs at the top */}
        <Tabs defaultValue="daily" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="daily" className="text-base">Daily Analysis</TabsTrigger>
            <TabsTrigger value="weekly" className="text-base">Weekly Analysis</TabsTrigger>
          </TabsList>
          
          {/* Daily Analysis Tab Content */}
          <TabsContent value="daily">
            {/* Today's Skin Card */}
            <Card className="ios-card mb-6">
              <CardContent className="p-6">
                <div className="flex items-start mb-4">
                  <Smile className="h-12 w-12 mr-4 mt-1" />
                  <div className="flex-grow">
                    <h2 className="text-2xl font-bold mb-1">Today's Skin</h2>
                    <p className="text-2xl font-semibold mb-4">
                      {isLoading ? "Analyzing..." : aiSkinAnalysis.status}
                    </p>
                    
                    <p className="font-medium text-base mb-2">Detailed Analysis:</p>
                    <p className="text-slate-600">
                      {isLoading ? 
                        "Analyzing your skin logs..." : 
                        aiSkinAnalysis.analysis
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* SkinIndexComparison component */}
            <SkinIndexComparison className="mb-6" gender="female" age={25} />
            
            {/* Add Today's Selfies Section */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Today's Selfies</h2>
              <Card className="ios-card">
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 gap-4">
                    {/* AM Selfie */}
                    <div className="flex flex-col items-center">
                      <div className="flex items-center mb-2">
                        <Sun className="h-4 w-4 mr-1 text-amber-500" />
                        <h3 className="font-medium text-sm">Morning</h3>
                      </div>
                      <div 
                        className="aspect-square w-full bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 overflow-hidden cursor-pointer"
                        onClick={(e) => handlePhotoClick("today", "am", e)}
                      >
                        {todaysSelfies.am ? (
                          <img 
                            src={todaysSelfies.am} 
                            alt="Morning Selfie" 
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="flex flex-col items-center">
                            <Camera className="h-6 w-6 mb-1" />
                            <span className="text-xs">Add AM Photo</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* PM Selfie */}
                    <div className="flex flex-col items-center">
                      <div className="flex items-center mb-2">
                        <Moon className="h-4 w-4 mr-1 text-indigo-400" />
                        <h3 className="font-medium text-sm">Evening</h3>
                      </div>
                      <div 
                        className="aspect-square w-full bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 overflow-hidden cursor-pointer"
                        onClick={(e) => handlePhotoClick("today", "pm", e)}
                      >
                        {todaysSelfies.pm ? (
                          <img 
                            src={todaysSelfies.pm} 
                            alt="Evening Selfie" 
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="flex flex-col items-center">
                            <Camera className="h-6 w-6 mb-1" />
                            <span className="text-xs">Add PM Photo</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* InsightsTrends component */}
            <InsightsTrends insights={insightData} className="mb-6" />
            
            {/* AI Analysis Section - Added from SkinAnalysis page */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">AI Analysis</h2>
              
              {aiLoading || isAdviceLoading ? (
                <Card className="ios-card">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center py-8">
                      <LoaderCircle className="animate-spin rounded-full h-8 w-8 border-b-2 border-skin-teal mb-4" />
                      <p className="text-muted-foreground">Generating your personalized skin analysis...</p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <>
                  {/* Display AI sections in a structured format */}
                  {aiSections.map((section, index) => (
                    <div key={index} className="ai-section mb-4">
                      <h2 className="text-lg font-semibold mb-3">{section.title}</h2>
                      
                      <div className="space-y-3">
                        {section.items.map((item, itemIdx) => {
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
                            <Link to={item.linkTo} key={itemIdx} className="block">
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
                    </div>
                  ))}
                  
                  {/* If there are no structured sections or sections parsing failed */}
                  {(!aiSections || aiSections.length === 0) && (
                    <Card className="ios-card">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-center mb-4">
                          <h2 className="text-xl font-semibold">AI Analysis</h2>
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
                </>
              )}
            </div>
            
            {/* Daily Log Cards */}
            <div className="flex flex-col gap-y-6">
              {dayLogs.map((log) => (
                <Link key={log.id} to={`/day-log/${log.id}`}>
                  <Card className="ios-card hover:shadow-md transition-all">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium">{format(log.date, "EEEE")}</h3>
                          <p className="text-sm text-muted-foreground">{format(log.date, "MMM d, yyyy")}</p>
                          <p className="text-sm mt-2">{log.summary}</p>
                          
                          <div className="flex flex-wrap gap-1 mt-2">
                            {log.factors.skin.map((factor, index) => (
                              <span key={index} className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full">
                                {factor}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-center">
                          <div className="text-lg font-semibold">
                            {log.rating}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {getRatingLabel(log.rating)}
                          </span>
                        </div>
                      </div>
                      
                      {/* Selfies section */}
                      <div className="mt-4 pt-3 border-t border-gray-100">
                        <h4 className="text-sm font-medium mb-2">Selfies</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {/* AM Photo */}
                          <div 
                            className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs overflow-hidden cursor-pointer"
                            onClick={(e) => handlePhotoClick(log.id, "am", e)}
                          >
                            {log.amSelfie ? (
                              <img 
                                src={log.amSelfie} 
                                alt="AM Selfie" 
                                className="object-cover w-full h-full"
                              />
                            ) : (
                              <span>AM Photo</span>
                            )}
                          </div>
                          
                          {/* PM Photo */}
                          <div 
                            className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs overflow-hidden cursor-pointer"
                            onClick={(e) => handlePhotoClick(log.id, "pm", e)}
                          >
                            {log.pmSelfie ? (
                              <img 
                                src={log.pmSelfie} 
                                alt="PM Selfie" 
                                className="object-cover w-full h-full"
                              />
                            ) : (
                              <span>PM Photo</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            
            {/* Add ViewScoringMethod and Disclaimer components */}
            <ViewScoringMethod />
            <Disclaimer />
          </TabsContent>
          
          {/* Weekly Analysis Tab Content */}
          <TabsContent value="weekly">
            {/* Weekly Skin Report moved here */}
            <SkinHistory ratings={skinRatings} className="mb-6" />
            
            {/* Additional weekly analysis content can be added here */}
            <Card className="ios-card mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-3">Weekly Summary</h2>
                <p className="text-slate-600 mb-4">
                  Your skin has shown improvement over the past week with increased hydration levels and fewer breakouts.
                  Continue with your current skincare routine and monitor changes in texture and tone.
                </p>
                
                <h3 className="text-lg font-medium mb-2">Key Findings</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Hydration increased by 15%</li>
                  <li>Redness decreased significantly</li>
                  <li>Overall skin tone has become more even</li>
                  <li>T-zone oil production has stabilized</li>
                </ul>
              </CardContent>
            </Card>
            
            {/* Weekly trends and patterns */}
            <Card className="ios-card mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-3">Trends & Patterns</h2>
                <p className="text-slate-600">
                  Based on your weekly logs, we've identified the following correlations:
                </p>
                
                <div className="mt-4 space-y-4">
                  <div className="flex items-start">
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <span className="text-green-600 text-sm">+</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Positive Impact</h4>
                      <p className="text-sm text-slate-600">Consistent morning hydration shows strong correlation with skin elasticity and barrier function.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-red-100 p-2 rounded-full mr-3">
                      <span className="text-red-600 text-sm">-</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Negative Impact</h4>
                      <p className="text-sm text-slate-600">Dairy consumption appears to correlate with mild inflammatory response 1-2 days after consumption.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Add ViewScoringMethod and Disclaimer components */}
            <ViewScoringMethod />
            <Disclaimer />
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Photo selection dialog */}
      <Dialog open={isPhotoDialogOpen} onOpenChange={setIsPhotoDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle>Add {currentPhotoType?.toUpperCase()} Photo</DialogTitle>
          <DialogDescription>
            Choose how you want to add your photo
          </DialogDescription>
          
          <div className="grid grid-cols-2 gap-4 py-4">
            <Button 
              onClick={handleTakePhoto}
              className="flex flex-col items-center justify-center h-24 gap-2"
              variant="outline"
            >
              <Camera className="h-8 w-8" />
              <span>Take Picture</span>
            </Button>
            
            <Button 
              onClick={handleSelectFromGallery}
              className="flex flex-col items-center justify-center h-24 gap-2"
              variant="outline"
            >
              <Image className="h-8 w-8" />
              <span>Photo Gallery</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default History;
