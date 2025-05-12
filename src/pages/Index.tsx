import React, { useState, useEffect } from "react";
import DailySkinSnapshot from "@/components/DailySkinSnapshot";
import ScanButton from "@/components/ScanButton";
import RecentLogsCarousel from "@/components/RecentLogsCarousel";
import InsightsTrends from "@/components/InsightsTrends";
import SuggestedActions from "@/components/SuggestedActions";
import ExploreSection from "@/components/ExploreSection";
import SkinHistory from "@/components/SkinHistory";
import { Salad, Pill, Palette, CloudSun } from "lucide-react";
import SelfieCarousel from "@/components/SelfieCarousel";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  // Sample data
  const skinFactors = [
    { type: "Food" as const, status: "Hydrating", icon: <Salad className="h-4 w-4" /> },
    { type: "Supplement" as const, status: "New", icon: <Pill className="h-4 w-4" /> },
    { type: "Makeup" as const, status: "Same as usual", icon: <Palette className="h-4 w-4" /> },
    { type: "Weather" as const, status: "Dry + Cold", icon: <CloudSun className="h-4 w-4" /> },
  ];

  // Define the RecommendationType to match what's expected by DailySkinSnapshot
  type RecommendationType = "skincare" | "food" | "lifestyle" | "supplements";
  
  // Add state for today's selfies (multiple images per type)
  const [todaysSelfies, setTodaysSelfies] = useState({
    am: [] as (string | null)[],
    pm: [] as (string | null)[]
  });

  // Load selfies from localStorage on component mount
  useEffect(() => {
    const date = new Date().toISOString().split('T')[0];
    const amKey = `am-selfies-${date}`;
    const pmKey = `pm-selfies-${date}`;
    
    try {
      const storedAmSelfies = localStorage.getItem(amKey);
      const storedPmSelfies = localStorage.getItem(pmKey);
      
      if (storedAmSelfies) {
        setTodaysSelfies(prev => ({
          ...prev,
          am: JSON.parse(storedAmSelfies)
        }));
      }
      
      if (storedPmSelfies) {
        setTodaysSelfies(prev => ({
          ...prev,
          pm: JSON.parse(storedPmSelfies)
        }));
      }
    } catch (error) {
      console.error("Error loading selfies from localStorage:", error);
    }
  }, []);

  // Add toast functionality
  const { toast } = useToast();
  
  // Handle adding a selfie image with Supabase integration
  const handleAddSelfie = (type: "am" | "pm", index: number, imageUrl?: string) => {
    if (imageUrl) {
      // If an image URL is provided (from Supabase), use that
      setTodaysSelfies(prev => {
        const newImages = [...prev[type]];
        newImages[index] = imageUrl;
        
        // Save to localStorage for offline access
        const date = new Date().toISOString().split('T')[0];
        localStorage.setItem(`${type}-selfies-${date}`, JSON.stringify(newImages));
        
        return {
          ...prev,
          [type]: newImages
        };
      });
    } else {
      // Fallback to placeholder images if no URL provided (this is a backup option)
      const placeholderImages = [
        "https://source.unsplash.com/random/300x300/?face&sig=1",
        "https://source.unsplash.com/random/300x300/?face&sig=2",
        "https://source.unsplash.com/random/300x300/?face&sig=3",
        "https://source.unsplash.com/random/300x300/?face&sig=4"
      ];
      
      setTodaysSelfies(prev => {
        const newImages = [...prev[type]];
        newImages[index] = placeholderImages[index % placeholderImages.length];
        
        // Save to localStorage for offline access
        const date = new Date().toISOString().split('T')[0];
        localStorage.setItem(`${type}-selfies-${date}`, JSON.stringify(newImages));
        
        toast({
          title: "Notice",
          description: "Using placeholder image instead of camera. Check app permissions if needed.",
          duration: 3000,
        });
        
        return {
          ...prev,
          [type]: newImages
        };
      });
    }
  };
  
  // Handle deleting a selfie
  const handleDeleteSelfie = (type: "am" | "pm", index: number) => {
    setTodaysSelfies(prev => {
      const newImages = [...prev[type]];
      newImages[index] = null;
      
      // Update localStorage
      const date = new Date().toISOString().split('T')[0];
      localStorage.setItem(`${type}-selfies-${date}`, JSON.stringify(newImages));
      
      return {
        ...prev,
        [type]: newImages
      };
    });
  };

  // Add fallback static recommendations in case AI fails
  const fallbackRecommendations = [
    { 
      type: "skincare" as RecommendationType, 
      text: "Use gentle cleanser", 
      icon: <Pill className="h-4 w-4" />,
      linkTo: "/recommendations-detail/gentle-cleanser" 
    },
    { 
      type: "food" as RecommendationType, 
      text: "Limit dairy intake", 
      icon: <Salad className="h-4 w-4" />,
      linkTo: "/recommendations-detail/limit-dairy"
    },
    { 
      type: "lifestyle" as RecommendationType, 
      text: "Practice meditation", 
      icon: <CloudSun className="h-4 w-4" />,
      linkTo: "/recommendations-detail/meditation"
    },
    { 
      type: "skincare" as RecommendationType, 
      text: "Try vitamin C serum", 
      icon: <Pill className="h-4 w-4" />,
      linkTo: "/recommendations-detail/vitamin-c-serum/testai" 
    },
    { 
      type: "food" as RecommendationType, 
      text: "Add antioxidant foods", 
      icon: <Salad className="h-4 w-4" />,
      linkTo: "/recommendations-detail/antioxidants/testai"
    },
    { 
      type: "lifestyle" as RecommendationType, 
      text: "Morning hydration", 
      icon: <CloudSun className="h-4 w-4" />,
      linkTo: "/recommendations-detail/hydration/testai"
    },
    { 
      type: "skincare" as RecommendationType, 
      text: "SPF reapplication", 
      icon: <Pill className="h-4 w-4" />,
      linkTo: "/recommendations-detail/spf/testai" 
    },
    { 
      type: "supplements" as RecommendationType, 
      text: "Add zinc", 
      icon: <Pill className="h-4 w-4" />,
      linkTo: "/recommendations-detail/zinc"
    },
  ];

  // We no longer need to define static recommendations here as they'll be dynamically generated
  // by the DailySkinSnapshot component using the useSkinAdvice hook

  // Get current date and the past 7 days
  const getDayName = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const getDateString = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const today = new Date();
  const skinHistory = Array(7).fill(null).map((_, i) => {
    const date = new Date();
    date.setDate(today.getDate() - (6 - i));
    // Generate a random rating between 50 and 95 for demo purposes
    const rating = Math.floor(Math.random() * (95 - 50 + 1)) + 50;
    return {
      day: getDayName(date),
      date: getDateString(date),
      rating: rating
    };
  });

  // Define sample recent logs for the RecentLogsCarousel
  const recentLogs = [
    {
      title: "Morning Skincare Routine",
      status: "positive" as const,
      description: "Used new cleanser",
      rating: 85,
      id: "morning-routine-1"
    },
    {
      title: "Afternoon Check",
      status: "neutral" as const,
      description: "Slight dryness noted",
      rating: 65,
      id: "afternoon-check-1"
    },
    {
      title: "Evening Routine",
      status: "positive" as const,
      description: "Added new serum",
      rating: 78,
      id: "evening-routine-1"
    },
    {
      title: "Weekend Mask",
      status: "positive" as const,
      description: "Hydration improved",
      rating: 90,
      id: "weekend-mask-1"
    }
  ];

  const insights = [
    {
      title: "Collagen supplements",
      description: "Improved skin elasticity after 2 weeks",
      icon: "✨",
      id: "collagen-supplements",
      iconName: "badge-check",
      category: "positive" as const
    },
    {
      title: "Alcohol consumption",
      description: "Correlates with next-day puffiness 3 times this month",
      icon: "🍷",
      id: "alcohol-consumption",
      iconName: "wine",
      category: "negative" as const
    },
    {
      title: "Vitamin C serum",
      description: "Brightening effect noted after regular use",
      icon: "🍊",
      id: "vitamin-c-brightening",
      iconName: "sun",
      category: "positive" as const
    },
  ];

  // Update suggested actions to use proper type and id format for AIRecommendationDetail
  const suggestedActions = [
    { 
      text: "Try logging your water intake today",
      linkTo: "/day-log/today", // Link directly to today's log
      id: "water-intake",
      type: "action" // Explicit type for consistency
    },
    { 
      text: "Consider pausing this supplement to see if irritation decreases",
      supplementId: "collagen", // Add supplementId to link directly to supplement page
      id: "supplement-irritation", 
      type: "factor" // Consistent with AI recommendation types
    },
    { 
      text: "Use SPF more consistently this week",
      id: "spf-consistency",
      type: "action" // Consistent with AI recommendation types
    },
    { 
      text: "Try a weekly exfoliation routine",
      id: "exfoliation",
      type: "factor", // Using factor type for testing
    },
  ];

  const exploreItems = [
    { 
      title: "Skin Tips for Your Skin Type", 
      subtitle: "Personalized advice",
      id: "skin-tips",
      linkTo: "/explore/skin-tips"
    },
    { 
      title: "Science Behind Vitamin C", 
      subtitle: "Research & benefits",
      id: "vitamin-c-science",
      linkTo: "/explore/vitamin-c-science"
    },
    { 
      title: "New in the Community", 
      subtitle: "Connect with others",
      id: "community",
      linkTo: "/explore/community"
    },
  ];

  return (
    <div>
      {/* Simplified header with smaller Skin Savvy text */}
      <header className="mb-4">
        <h1 className="text-xl font-bold">Skin Savvy</h1>
      </header>
      
      <main>
        {/* Skin History at the top with proper spacing */}
        <div className="mb-6">
          <SkinHistory ratings={skinHistory} />
        </div>
        
        {/* ScanButton in its own div with proper spacing */}
        <div className="mb-6">
          <ScanButton />
        </div>
        
        {/* Add Today's Selfies Section with updated component */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Today's Selfies</h2>
          <Card className="ios-card">
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Morning Selfie Carousel with Supabase storage */}
                <SelfieCarousel
                  type="am"
                  images={todaysSelfies.am}
                  onAddImage={handleAddSelfie}
                  onDeleteImage={handleDeleteSelfie}
                  userId="current-user" // In a real app, you'd use the authenticated user ID
                />
                
                {/* Evening Selfie Carousel with Supabase storage */}
                <SelfieCarousel
                  type="pm"
                  images={todaysSelfies.pm}
                  onAddImage={handleAddSelfie}
                  onDeleteImage={handleDeleteSelfie}
                  userId="current-user" // In a real app, you'd use the authenticated user ID
                />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <DailySkinSnapshot 
            emoji="😊" 
            status="Balanced" 
            factors={skinFactors}
            recommendations={fallbackRecommendations}
          />
          
          <RecentLogsCarousel logs={recentLogs} />
          
          <InsightsTrends insights={insights} />
          
          <SuggestedActions actions={suggestedActions} />
          
          <ExploreSection items={exploreItems} />
        </div>
      </main>
    </div>
  );
};

export default Index;
