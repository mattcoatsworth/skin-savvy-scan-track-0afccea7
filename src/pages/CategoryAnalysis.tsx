import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import BackButton from "@/components/BackButton";
import AppNavigation from "@/components/AppNavigation";
import { useSkinAdvice } from "@/hooks/useSkinAdvice";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample category data
const categoryData = {
  "hydration": {
    title: "Hydration",
    description: "Track your daily water intake and its effect on your skin.",
    trend: "Improving",
    averageScore: 75,
    keyFactors: ["Water Intake", "Electrolyte Balance", "Humidifier Usage"],
    recommendations: ["Drink more water", "Use a humidifier", "Eat hydrating foods"]
  },
  "diet": {
    title: "Diet",
    description: "Analyze how your dietary choices impact your skin health.",
    trend: "Stable",
    averageScore: 68,
    keyFactors: ["Sugar Intake", "Dairy Consumption", "Antioxidant Foods"],
    recommendations: ["Reduce sugar intake", "Increase antioxidant foods", "Consider dairy alternatives"]
  },
  "sleep": {
    title: "Sleep",
    description: "Monitor your sleep patterns and their correlation with skin condition.",
    trend: "Declining",
    averageScore: 62,
    keyFactors: ["Sleep Duration", "Sleep Quality", "Bedtime Routine"],
    recommendations: ["Improve sleep hygiene", "Establish a bedtime routine", "Aim for 7-8 hours of sleep"]
  },
  "stress": {
    title: "Stress",
    description: "Evaluate the impact of stress levels on your skin health.",
    trend: "Worsening",
    averageScore: 55,
    keyFactors: ["Stress Level", "Mindfulness Practices", "Workload"],
    recommendations: ["Practice mindfulness", "Reduce workload", "Engage in stress-reducing activities"]
  },
  "environment": {
    title: "Environment",
    description: "Assess how environmental factors affect your skin.",
    trend: "Variable",
    averageScore: 70,
    keyFactors: ["UV Exposure", "Air Pollution", "Humidity"],
    recommendations: ["Use sunscreen", "Avoid peak sun hours", "Protect skin from pollution"]
  }
};

const CategoryAnalysis = () => {
  useScrollToTop();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [aiAnalysis, setAiAnalysis] = useState<string>("");
  
  // Initialize the skin advice hook
  const { getAdvice, isLoading: isAiLoading, getTextContent } = useSkinAdvice({});
  
  // Load category data
  useEffect(() => {
    // In a real app, this would be from API
    setTimeout(() => {
      setData(categoryData);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  // Get AI analysis when data loads
  useEffect(() => {
    const getAnalysis = async () => {
      if (!data) return;
      
      try {
        // Generate AI analysis for the category data
        const analysisResponse = await getAdvice(
          "Provide an overall analysis of trends across all categories",
          { categoryData: data }
        );
        
        if (analysisResponse) {
          setAiAnalysis(getTextContent(analysisResponse));
        }
      } catch (error) {
        console.error("Error getting AI analysis:", error);
      }
    };
    
    if (data) {
      getAnalysis();
    }
  }, [data, getAdvice, getTextContent]);

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6 flex items-center">
          <BackButton />
          <h1 className="text-2xl font-bold">Category Analysis</h1>
        </header>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            {isLoading ? (
              <Card className="ios-card">
                <CardContent className="p-6">
                  <p>Loading category data...</p>
                </CardContent>
              </Card>
            ) : (
              <>
                <Card className="ios-card">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Overall Trends</h2>
                    <p className="text-muted-foreground">
                      {aiAnalysis || "Analyzing trends across all categories..."}
                    </p>
                  </CardContent>
                </Card>
                
                <div className="space-y-3">
                  {Object.entries(data).map(([category, details]: [string, any]) => (
                    <Link to={`/category/${category}`} key={category}>
                      <Card className="ios-card hover:shadow-md transition-all">
                        <CardContent className="p-4">
                          <h3 className="font-medium">{details.title}</h3>
                          <p className="text-sm text-muted-foreground">{details.description}</p>
                          <p className="text-sm mt-2">
                            Trend: <span className="font-semibold">{details.trend}</span>
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </TabsContent>
          
          <TabsContent value="details" className="space-y-6">
            {isLoading ? (
              <Card className="ios-card">
                <CardContent className="p-6">
                  <p>Loading category data...</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {Object.entries(data).map(([category, details]: [string, any]) => (
                  <Link to={`/category/${category}`} key={category}>
                    <Card className="ios-card hover:shadow-md transition-all">
                      <CardContent className="p-4">
                        <h3 className="font-medium">{details.title}</h3>
                        <p className="text-sm text-muted-foreground">{details.description}</p>
                        <div className="mt-3">
                          <h4 className="text-sm font-medium">Key Factors:</h4>
                          <ul className="list-disc pl-5 text-sm text-muted-foreground">
                            {details.keyFactors.map((factor: string, index: number) => (
                              <li key={index}>{factor}</li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <AppNavigation />
      </div>
    </div>
  );
};

export default CategoryAnalysis;
