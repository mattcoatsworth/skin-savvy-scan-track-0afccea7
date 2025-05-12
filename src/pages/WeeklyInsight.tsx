
import React, { useState, useEffect } from "react";
import BackButton from "@/components/BackButton";
import AppNavigation from "@/components/AppNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { LoaderCircle } from "lucide-react";
import { useSkinAdvice } from "@/hooks/useSkinAdvice";
import { useScrollToTop } from "@/hooks/useScrollToTop";

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
  
  // Get initial data
  useEffect(() => {
    // Simulate loading from API
    setTimeout(() => {
      setInsightData(weeklyData);
      setIsLoading(false);
    }, 1500);
  }, []);
  
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
            <Card className="ios-card">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Week of {insightData.weekStartDate} - {insightData.weekEndDate}
                </h2>
                
                <div className="mb-4">
                  <h3 className="text-lg font-medium">Overall Skin Health Score</h3>
                  <p className="text-2xl font-semibold text-skin-teal">{insightData.overallScore}</p>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-lg font-medium">Key Changes</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {insightData.keyChanges.map((change, index) => (
                      <li key={index}>{change}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium">Recommendations</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {insightData.recommendations.map((recommendation, index) => (
                      <li key={index}>{recommendation}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            <Card className="ios-card mt-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">AI-Generated Summary</h2>
                {isAiLoading ? (
                  <div className="flex items-center justify-center py-4">
                    <LoaderCircle className="animate-spin rounded-full h-6 w-6 border-b-2 border-skin-teal" />
                    <span className="ml-2">Generating summary...</span>
                  </div>
                ) : (
                  <p className="text-sm text-gray-600">{aiSummary}</p>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
      
      <AppNavigation />
    </div>
  );
};

export default WeeklyInsight;
