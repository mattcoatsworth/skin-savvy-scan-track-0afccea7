
import React, { useState, useEffect } from "react";
import BackButton from "@/components/BackButton";
import AppNavigation from "@/components/AppNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { LoaderCircle } from "lucide-react";
import { useSkinAdvice } from "@/hooks/useSkinAdvice";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { useAuth } from "@/contexts/AuthContext";
import { getWeeklyRatingByDate, saveWeeklyRating } from "@/models/WeeklyRating";

const weeklyData = {
  weekStartDate: "2024-07-01",
  weekEndDate: "2024-07-07",
  overallScore: 78,
  hydrationLevel: 65,
  inflammationLevel: 42,
  breakoutFrequency: 2,
  keyChanges: [
    "Increased water intake",
    "Started using new moisturizer",
    "Experienced higher stress levels"
  ],
  recommendations: [
    "Continue increased water intake",
    "Monitor skin reaction to new moisturizer",
    "Implement stress management techniques"
  ]
};

const WeeklyInsight = () => {
  useScrollToTop();
  const [isLoading, setIsLoading] = useState(true);
  const [insightData, setInsightData] = useState<any>(null);
  const [aiSummary, setAiSummary] = useState<string>("");
  const { user } = useAuth();
  
  // Get initial data
  useEffect(() => {
    const loadWeeklyData = async () => {
      try {
        if (user?.id) {
          // Get the start and end dates of the current week
          const today = new Date();
          const startOfWeek = new Date(today);
          startOfWeek.setDate(today.getDate() - today.getDay()); // Sunday as start of week
          const endOfWeek = new Date(today);
          endOfWeek.setDate(startOfWeek.getDate() + 6); // Saturday as end of week
          
          const startDateString = startOfWeek.toISOString().split('T')[0];
          const endDateString = endOfWeek.toISOString().split('T')[0];
          
          // Try to fetch the weekly rating from Supabase
          const weeklyRating = await getWeeklyRatingByDate(user.id, today.toISOString().split('T')[0]);
          
          if (weeklyRating) {
            // Use data from Supabase
            setInsightData({
              ...weeklyData, // Use weeklyData as a base
              weekStartDate: weeklyRating.week_start_date,
              weekEndDate: weeklyRating.week_end_date,
              overallScore: weeklyRating.rating,
              // ... merge other properties as needed
            });
          } else {
            // Use sample data but with correct dates
            setInsightData({
              ...weeklyData,
              weekStartDate: startDateString,
              weekEndDate: endDateString,
            });
            
            // Save the sample data to Supabase for future reference
            await saveWeeklyRating({
              userId: user.id,
              weekStartDate: startDateString,
              weekEndDate: endDateString,
              rating: weeklyData.overallScore,
              notes: "Auto-generated weekly insight"
            });
          }
        } else {
          // Use sample data for non-authenticated users
          setInsightData(weeklyData);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading weekly data:", error);
        // Fallback to sample data
        setInsightData(weeklyData);
        setIsLoading(false);
      }
    };
    
    // Simulate loading from API
    setTimeout(() => {
      loadWeeklyData();
    }, 1000);
  }, [user]);
  
  // Initialize the skin advice hook for weekly insights
  const { getAdvice, isLoading: isAiLoading, getTextContent } = useSkinAdvice({
    adviceType: "weekly-insight"
  });
  
  // Get AI-generated summary when data loads
  useEffect(() => {
    const getSummary = async () => {
      if (!insightData) return;
      
      // Check if we have cached summary in localStorage
      const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
      const cacheKey = `weekly-insight-summary-${today}`;
      
      try {
        const cachedSummary = localStorage.getItem(cacheKey);
        if (cachedSummary) {
          setAiSummary(cachedSummary);
          return; // Exit early if we have cached summary
        }
      } catch (error) {
        console.error("Error reading from cache:", error);
        // Continue with API request if cache read fails
      }
      
      try {
        const summaryResponse = await getAdvice(
          "Provide a concise summary of the weekly skin health changes and what they mean",
          { weekData: insightData }
        );
        
        const summaryText = getTextContent(summaryResponse);
        setAiSummary(summaryText);
        
        // Save to localStorage for future use
        try {
          localStorage.setItem(cacheKey, summaryText);
        } catch (storageError) {
          console.error("Error saving to localStorage:", storageError);
        }
      } catch (error) {
        console.error("Error getting AI summary:", error);
        setAiSummary("Unable to generate AI summary at this time.");
      }
    };
    
    if (insightData) {
      getSummary();
    }
  }, [insightData]);

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6 flex items-center">
          <BackButton />
          <h1 className="text-2xl font-bold">Weekly Insight</h1>
        </header>
        
        {isLoading ? (
          <Card className="ios-card">
            <CardContent className="p-6">
              <div className="flex flex-col items-center py-8">
                <LoaderCircle className="animate-spin rounded-full h-8 w-8 border-b-2 border-skin-teal mb-4" />
                <p className="text-muted-foreground">Loading your weekly skin health insights...</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Week Information Section */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Week of {insightData.weekStartDate} - {insightData.weekEndDate}</h2>
              
              <Card className="ios-card mb-3">
                <CardContent className="p-4">
                  <div className="flex items-start">
                    <div className="text-2xl mr-3">📊</div>
                    <div>
                      <h3 className="font-medium">Overall Skin Health Score</h3>
                      <p className="text-xl font-semibold text-skin-teal">{insightData.overallScore}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Key Changes Section */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Key Changes</h2>
              <div className="space-y-3">
                {insightData.keyChanges.map((change, index) => (
                  <Card key={index} className="ios-card">
                    <CardContent className="p-4">
                      <div className="flex items-start">
                        <div className="text-2xl mr-3">🔄</div>
                        <div>
                          <h3 className="font-medium">Change {index + 1}</h3>
                          <p className="text-muted-foreground">{change}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Recommendations Section */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Recommendations</h2>
              <div className="space-y-3">
                {insightData.recommendations.map((recommendation, index) => (
                  <Card key={index} className="ios-card">
                    <CardContent className="p-4">
                      <div className="flex items-start">
                        <div className="text-2xl mr-3">💡</div>
                        <div>
                          <h3 className="font-medium">Recommendation {index + 1}</h3>
                          <p className="text-muted-foreground">{recommendation}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* AI Summary Section */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">AI-Generated Summary</h2>
              <Card className="ios-card">
                <CardContent className="p-4">
                  {isAiLoading ? (
                    <div className="flex items-center justify-center py-4">
                      <LoaderCircle className="animate-spin rounded-full h-6 w-6 border-b-2 border-skin-teal" />
                      <span className="ml-2">Generating summary...</span>
                    </div>
                  ) : (
                    <div className="flex items-start">
                      <div className="text-2xl mr-3">🤖</div>
                      <div>
                        <h3 className="font-medium">Analysis Summary</h3>
                        <p className="text-sm text-gray-600">{aiSummary}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
      
      <AppNavigation />
    </div>
  );
};

export default WeeklyInsight;
