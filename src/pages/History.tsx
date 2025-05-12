import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useLocation } from "react-router-dom";
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
import { Camera, Image, Smile, Sun, Moon, LoaderCircle, Calendar } from "lucide-react";
import SkinIndexComparison from "@/components/SkinIndexComparison";
import InsightsTrends from "@/components/InsightsTrends";
import { useSkinAdvice } from "@/hooks/useSkinAdvice";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ViewScoringMethod from "@/components/ViewScoringMethod";
import Disclaimer from "@/components/Disclaimer";
import { Progress } from "@/components/ui/progress";
import TrendChart from "@/components/TrendChart";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { Badge } from "@/components/ui/badge";
import SelfieCarousel from "@/components/SelfieCarousel";

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
  amSelfies?: (string | null)[];
  pmSelfies?: (string | null)[];
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
  useScrollToTop();
  // Get the location to parse query parameters
  const location = useLocation();
  
  // Extract the tab parameter from the URL
  const getTabFromUrl = () => {
    const searchParams = new URLSearchParams(location.search);
    const tabParam = searchParams.get('tab');
    return tabParam === 'weekly' ? 'weekly' : 'daily';
  };
  
  // State for today's selfies (updated to support multiple images per type)
  const [todaysSelfies, setTodaysSelfies] = useState({
    am: [] as (string | null)[],
    pm: [] as (string | null)[]
  });
  
  const [aiSkinAnalysis, setAiSkinAnalysis] = useState<{
    status: string;
    analysis: string;
  }>({ 
    status: "Loading...", 
    analysis: "Analyzing your skin logs..." 
  });
  
  const [isLoading, setIsLoading] = useState(true);
  
  // Set the active tab based on URL parameter
  const [activeTab, setActiveTab] = useState(getTabFromUrl());
  
  // Update the active tab when the URL changes
  useEffect(() => {
    setActiveTab(getTabFromUrl());
  }, [location.search]);
  
  // Use the skin advice hook for AI analysis
  const { getAdvice, isLoading: isAdviceLoading, getTextContent } = useSkinAdvice({ adviceType: "general" });
  
  // Generate 7 days of mock data with multiple selfies per day
  const dayLogs: DayLogType[] = Array.from({ length: 7 }).map((_, index) => {
    const date = subDays(new Date(), index);
    const rating = Math.floor(Math.random() * 100) + 1; // Random rating between 1-100
    
    // Generate random selfie data (some filled, some empty)
    const amSelfies = Array(4).fill(null).map((_, i) => {
      // 30% chance of having a selfie
      return Math.random() > 0.7 ? 
        `https://source.unsplash.com/random/300x300/?face&sig=${index * 10 + i}` : 
        null;
    });
    
    const pmSelfies = Array(4).fill(null).map((_, i) => {
      // 30% chance of having a selfie
      return Math.random() > 0.7 ? 
        `https://source.unsplash.com/random/300x300/?face&sig=${index * 10 + i + 5}` : 
        null;
    });
    
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
      amSelfies,
      pmSelfies
    };
  });

  function getRandomFactors(array: string[], count: number): string[] {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
  
  // Handle adding a selfie image
  const handleAddSelfie = (type: "am" | "pm", index: number) => {
    // In a real app, this would open the camera or file selector
    // For demo, we'll use placeholder images
    const placeholderImages = [
      "https://source.unsplash.com/random/300x300/?face&sig=1",
      "https://source.unsplash.com/random/300x300/?face&sig=2",
      "https://source.unsplash.com/random/300x300/?face&sig=3",
      "https://source.unsplash.com/random/300x300/?face&sig=4"
    ];
    
    setTodaysSelfies(prev => {
      const newImages = [...prev[type]];
      newImages[index] = placeholderImages[index % placeholderImages.length];
      
      // Save to localStorage
      localStorage.setItem(`today-${type}-selfies`, JSON.stringify(newImages));
      
      return {
        ...prev,
        [type]: newImages
      };
    });
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
  
  // Load saved selfies from localStorage on component mount
  useEffect(() => {
    const savedAmSelfies = localStorage.getItem('today-am-selfies');
    const savedPmSelfies = localStorage.getItem('today-pm-selfies');
    
    if (savedAmSelfies) {
      try {
        setTodaysSelfies(prev => ({
          ...prev,
          am: JSON.parse(savedAmSelfies)
        }));
      } catch (e) {
        console.error("Error parsing saved AM selfies:", e);
      }
    }
    
    if (savedPmSelfies) {
      try {
        setTodaysSelfies(prev => ({
          ...prev,
          pm: JSON.parse(savedPmSelfies)
        }));
      } catch (e) {
        console.error("Error parsing saved PM selfies:", e);
      }
    }
  }, []);
  
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

  // Weekly Skin Analysis data from WeeklySkinAnalysis.tsx
  const weeklyRating = 82;
  const previousWeekRating = 75;
  const weeklyTrendData = [
    { date: "Mon", value: 65 },
    { date: "Tue", value: 72 },
    { date: "Wed", value: 78 },
    { date: "Thu", value: 80 },
    { date: "Fri", value: 85 },
    { date: "Sat", value: 88 },
    { date: "Sun", value: 82 }
  ];

  // Sample data for skin parameters
  const skinParameters = [
    { name: "Hydration", current: 78, previous: 65 },
    { name: "Elasticity", current: 85, previous: 82 },
    { name: "Oil Control", current: 72, previous: 68 },
    { name: "Texture", current: 88, previous: 75 }
  ];

  // Sample data for factors that influenced skin health
  const positiveFactors = [
    { name: "Consistent hydration", impact: "+15%" },
    { name: "Regular exfoliation", impact: "+12%" },
    { name: "Quality sleep (7+ hrs)", impact: "+10%" }
  ];
  
  const negativeFactors = [
    { name: "Stress levels", impact: "-8%" },
    { name: "Sugar consumption", impact: "-5%" }
  ];

  // Sample daily skin score data
  const dailyScores = [
    { day: "Monday", score: 65, note: "Slightly dehydrated" },
    { day: "Tuesday", score: 72, note: "Improved after increased water intake" },
    { day: "Wednesday", score: 78, note: "Minor breakout on chin" },
    { day: "Thursday", score: 80, note: "Calmer skin after using aloe" },
    { day: "Friday", score: 85, note: "Good skin day overall" },
    { day: "Saturday", score: 88, note: "Best skin day this week" },
    { day: "Sunday", score: 82, note: "Slight dullness in the evening" }
  ];

  // Sample AI analysis data
  const aiAnalysis = {
    patternAnalysis: "Your skin health improved steadily throughout the week, showing a positive response to your consistent hydration routine. The most notable improvement was in overall texture and brightness, particularly after introducing the new hydrating serum. Your skin appears most reactive to sleep quality and hydration levels, with a clear correlation between increased water intake and skin clarity.",
    
    detectedPatterns: [
      { 
        category: "Hydration & Diet", 
        title: "Water Intake Correlation", 
        description: "Days with 8+ glasses of water showed 12% higher skin scores",
        correlation: 85 
      },
      { 
        category: "Sleep & Stress", 
        title: "Sleep Quality Impact", 
        description: "Nights with 7+ hours of sleep led to reduced inflammation",
        correlation: 78 
      },
      { 
        category: "Product Usage", 
        title: "Hydrating Serum Effect", 
        description: "Consistent usage led to improved elasticity within 4 days",
        correlation: 72 
      }
    ],
    
    focusAreas: [
      { 
        title: "Continue Hydration Routine", 
        description: "Maintain 8+ glasses of water daily and consistent use of humidifier at night",
        priority: "primary", 
        type: "habit" 
      },
      { 
        title: "Monitor Sugar Intake", 
        description: "Sugar consumption on Friday and Saturday correlated with Sunday's slight dullness",
        priority: "secondary", 
        type: "diet" 
      },
      { 
        title: "Address Stress Levels", 
        description: "Implement brief mindfulness sessions on workdays to reduce cortisol impact",
        priority: "tertiary", 
        type: "lifestyle" 
      }
    ],
    
    metrics: {
      overall: "+7%",
      hydration: "+13%",
      inflammation: "-6%",
      breakouts: "-4%"
    },
    
    challenges: [
      { 
        title: "Morning Hydration Boost", 
        description: "Start each day with 16oz of water before coffee for one week",
        difficulty: "easy",
        category: "food" 
      },
      { 
        title: "Niacinamide Integration", 
        description: "Add a niacinamide serum to your evening routine to help with oil control",
        difficulty: "medium",
        category: "product" 
      },
      { 
        title: "Stress-Reduction Protocol", 
        description: "Complete three 5-minute breathing exercises daily during work hours",
        difficulty: "medium",
        category: "stress" 
      },
      { 
        title: "Sleep Schedule Consistency", 
        description: "Aim for the same bedtime (within 30 minutes) every night this week",
        difficulty: "hard",
        category: "sleep" 
      }
    ]
  };

  // Helper function to get the badge styling based on difficulty
  const getDifficultyBadgeClass = (difficulty: string) => {
    switch(difficulty) {
      case 'easy':
        return 'inline bg-green-100 text-green-800 px-2 py-0.5 text-xs';
      case 'medium':
        return 'inline bg-yellow-100 text-yellow-800 px-2 py-0.5 text-xs';
      case 'hard':
        return 'inline bg-red-100 text-red-800 px-2 py-0.5 text-xs';
      default:
        return 'inline bg-slate-100 text-slate-800 px-2 py-0.5 text-xs';
    }
  };

  // Helper function to get the category badge styling
  const getCategoryBadgeClass = () => {
    return 'inline bg-slate-200 text-slate-700 px-2 py-0.5 text-xs';
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-md mx-auto">
        <header className="mb-6 flex items-center">
          <BackButton />
          <h1 className="text-2xl font-bold">Skin</h1>
        </header>
        
        {/* Add tabs at the top */}
        <Tabs value={activeTab} className="w-full" onValueChange={setActiveTab}>
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
            
            {/* Add Today's Selfies Section - Updated to use SelfieCarousel */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Today's Selfies</h2>
              <Card className="ios-card">
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Morning Selfie Carousel */}
                    <SelfieCarousel
                      type="am"
                      images={todaysSelfies.am}
                      onAddImage={handleAddSelfie}
                      label="Morning"
                    />
                    
                    {/* Evening Selfie Carousel */}
                    <SelfieCarousel
                      type="pm" 
                      images={todaysSelfies.pm}
                      onAddImage={handleAddSelfie}
                      label="Evening"
                    />
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
            
            {/* Daily Log Cards - Updated to use SelfieCarousel */}
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
                        <div className="grid grid-cols-2 gap-4">
                          {/* Morning Selfies Preview */}
                          <div className="flex flex-col items-center">
                            <span className="text-xs text-slate-500 mb-1">AM</span>
                            <div className="aspect-square w-full bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                              {log.amSelfies?.[0] ? (
                                <img 
                                  src={log.amSelfies
