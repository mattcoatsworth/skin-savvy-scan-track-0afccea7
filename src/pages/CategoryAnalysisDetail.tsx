import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import BackButton from "@/components/BackButton";
import { useSkinAdvice } from "@/hooks/useSkinAdvice";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample category details data
const categoryDetailsData = {
  "food": {
    title: "Food & Diet",
    description: "Analysis of how your diet affects your skin health",
    items: [
      {
        id: "dairy",
        name: "Dairy Products",
        impact: "Negative",
        confidence: 85,
        description: "Strong correlation between dairy consumption and breakouts in your T-zone",
        recommendations: [
          "Consider reducing dairy intake for 2 weeks to observe changes",
          "Try plant-based alternatives like almond or oat milk",
          "If consuming dairy, opt for lower-fat options"
        ]
      },
      {
        id: "water",
        name: "Water Intake",
        impact: "Positive",
        confidence: 92,
        description: "Clear correlation between increased water consumption and improved skin hydration",
        recommendations: [
          "Continue maintaining high water intake (2L+ daily)",
          "Consider adding electrolytes on active days",
          "Distribute water consumption throughout the day"
        ]
      },
      {
        id: "sugar",
        name: "Sugar Consumption",
        impact: "Negative",
        confidence: 78,
        description: "Moderate correlation between high sugar days and increased inflammation",
        recommendations: [
          "Reduce refined sugar intake, especially processed foods",
          "Opt for natural sweeteners like fruit when possible",
          "Monitor skin response after high-sugar meals"
        ]
      },
      {
        id: "antioxidants",
        name: "Antioxidant-Rich Foods",
        impact: "Positive",
        confidence: 88,
        description: "Positive correlation between berries, leafy greens consumption and skin clarity",
        recommendations: [
          "Continue incorporating colorful fruits and vegetables",
          "Consider adding green tea for additional antioxidants",
          "Aim for variety in antioxidant sources"
        ]
      }
    ]
  },
  "sleep": {
    title: "Sleep Patterns",
    description: "Analysis of how your sleep affects your skin health",
    items: [
      {
        id: "duration",
        name: "Sleep Duration",
        impact: "Positive",
        confidence: 90,
        description: "Strong correlation between 7+ hours of sleep and reduced inflammation",
        recommendations: [
          "Maintain consistent 7-8 hour sleep schedule",
          "Prioritize sleep quality on high-stress days",
          "Track sleep quality alongside skin condition"
        ]
      },
      {
        id: "timing",
        name: "Sleep Timing",
        impact: "Neutral",
        confidence: 65,
        description: "No clear correlation between sleep timing and skin condition",
        recommendations: [
          "Focus on quality and duration rather than specific timing",
          "Maintain consistent sleep schedule when possible",
          "Consider sleep quality factors like temperature and light"
        ]
      },
      {
        id: "interruptions",
        name: "Sleep Interruptions",
        impact: "Negative",
        confidence: 82,
        description: "Correlation between interrupted sleep and increased skin sensitivity",
        recommendations: [
          "Address factors causing sleep interruptions",
          "Consider sleep hygiene improvements",
          "Try white noise or other sleep aids if needed"
        ]
      }
    ]
  },
  "stress": {
    title: "Stress Levels",
    description: "Analysis of how stress affects your skin health",
    items: [
      {
        id: "work-stress",
        name: "Work-Related Stress",
        impact: "Negative",
        confidence: 89,
        description: "Strong correlation between work deadlines and breakouts around chin area",
        recommendations: [
          "Implement stress management techniques during high-pressure periods",
          "Schedule short breaks during intense work days",
          "Consider stress-reducing activities after work"
        ]
      },
      {
        id: "exercise",
        name: "Regular Exercise",
        impact: "Positive",
        confidence: 87,
        description: "Clear correlation between exercise days and improved skin tone",
        recommendations: [
          "Maintain regular exercise routine (3-4 times weekly)",
          "Ensure proper cleansing after workouts",
          "Consider morning exercise for all-day benefits"
        ]
      },
      {
        id: "meditation",
        name: "Meditation Practice",
        impact: "Positive",
        confidence: 75,
        description: "Moderate correlation between meditation days and reduced redness",
        recommendations: [
          "Continue short daily meditation practice",
          "Consider stress-response tracking alongside skin logs",
          "Try guided meditations focused on relaxation"
        ]
      }
    ]
  },
  "environment": {
    title: "Environmental Factors",
    description: "Analysis of how your environment affects your skin health",
    items: [
      {
        id: "humidity",
        name: "Humidity Levels",
        impact: "Variable",
        confidence: 80,
        description: "Low humidity correlates with increased dryness; high humidity with increased oiliness",
        recommendations: [
          "Use humidifier during dry conditions",
          "Adjust skincare based on environmental humidity",
          "Consider mattifying products on high-humidity days"
        ]
      },
      {
        id: "pollution",
        name: "Air Pollution",
        impact: "Negative",
        confidence: 83,
        description: "Correlation between high pollution days and increased congestion",
        recommendations: [
          "Double cleanse on high pollution days",
          "Consider antioxidant serums for environmental protection",
          "Track pollution levels alongside skin condition"
        ]
      },
      {
        id: "sun-exposure",
        name: "Sun Exposure",
        impact: "Negative",
        confidence: 95,
        description: "Strong correlation between unprotected sun exposure and increased pigmentation",
        recommendations: [
          "Maintain consistent daily SPF application",
          "Reapply sunscreen every 2 hours when outdoors",
          "Consider additional protection (hats, shade) during peak hours"
        ]
      }
    ]
  }
};

const CategoryAnalysisDetail = () => {
  const { category } = useParams<{ category: string }>();
  useScrollToTop();
  
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [aiRecommendations, setAiRecommendations] = useState<string>("");
  
  // Initialize the skin advice hook with explicit empty object
  const { getAdvice, isLoading: isAiLoading, getTextContent } = useSkinAdvice({});
  
  // Load category detail data
  useEffect(() => {
    // In a real app, this would be from API
    setTimeout(() => {
      if (category && categoryDetailsData[category as keyof typeof categoryDetailsData]) {
        setData(categoryDetailsData[category as keyof typeof categoryDetailsData]);
      }
      setIsLoading(false);
    }, 1000);
  }, [category]);
  
  // Get AI recommendations when data loads
  useEffect(() => {
    const getRecommendations = async () => {
      if (!data || !category) return;
      
      try {
        // Generate AI recommendations for this specific category
        const recommendationsResponse = await getAdvice(
          `Provide personalized recommendations for the ${category} category based on skin log data`,
          { categoryData: data, category }
        );
        
        if (recommendationsResponse) {
          setAiRecommendations(getTextContent(recommendationsResponse));
        }
      } catch (error) {
        console.error("Error getting AI recommendations:", error);
      }
    };
    
    if (data) {
      getRecommendations();
    }
  }, [data, category, getAdvice, getTextContent]);

  if (isLoading) {
    return (
      <div className="bg-slate-50 min-h-screen pb-20">
        <div className="max-w-md mx-auto px-4 py-6">
          <header className="mb-6 flex items-center">
            <BackButton />
            <h1 className="text-2xl font-bold">Loading...</h1>
          </header>
          <Card>
            <CardContent className="p-6 flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-skin-teal"></div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-slate-50 min-h-screen pb-20">
        <div className="max-w-md mx-auto px-4 py-6">
          <header className="mb-6 flex items-center">
            <BackButton />
            <h1 className="text-2xl font-bold">Category Not Found</h1>
          </header>
          <Card>
            <CardContent className="p-6">
              <p>Sorry, we couldn't find data for this category.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6 flex items-center">
          <BackButton />
          <h1 className="text-2xl font-bold">{data?.title || "Loading..."}</h1>
        </header>

        <Tabs defaultValue="factors" className="mb-6">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="factors">Key Factors</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="factors" className="mt-4">
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-2">Overview</h2>
                <p className="text-muted-foreground">{data.description}</p>
              </CardContent>
            </Card>
            
            <div className="space-y-4">
              {data.items.map((item: any) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className={`p-1 text-center text-white ${
                      item.impact === "Positive" ? "bg-green-500" : 
                      item.impact === "Negative" ? "bg-red-500" : 
                      "bg-amber-500"
                    }`}>
                      <span className="text-xs font-medium">{item.impact} Impact</span>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold">{item.name}</h3>
                        <Badge variant="outline">{item.confidence}% Confidence</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                      
                      <h4 className="text-sm font-medium mb-2">Recommendations:</h4>
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        {item.recommendations.map((rec: string, index: number) => (
                          <li key={index}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="recommendations" className="mt-4">
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-2">AI Recommendations</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Personalized recommendations based on your skin logs and patterns
                </p>
                
                {isAiLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-skin-teal"></div>
                  </div>
                ) : (
                  <div className="prose prose-sm max-w-none">
                    {aiRecommendations ? (
                      <div dangerouslySetInnerHTML={{ __html: aiRecommendations }} />
                    ) : (
                      <p>No AI recommendations available at this time.</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-3">Action Plan</h2>
                
                <div className="space-y-4">
                  <div className="border-l-4 border-green-500 pl-4 py-1">
                    <h3 className="font-medium">Do More</h3>
                    <ul className="list-disc pl-5 text-sm space-y-1 mt-2">
                      {data.items
                        .filter((item: any) => item.impact === "Positive")
                        .map((item: any) => (
                          <li key={item.id}>{item.recommendations[0]}</li>
                        ))}
                    </ul>
                  </div>
                  
                  <div className="border-l-4 border-red-500 pl-4 py-1">
                    <h3 className="font-medium">Do Less</h3>
                    <ul className="list-disc pl-5 text-sm space-y-1 mt-2">
                      {data.items
                        .filter((item: any) => item.impact === "Negative")
                        .map((item: any) => (
                          <li key={item.id}>{item.recommendations[0]}</li>
                        ))}
                    </ul>
                  </div>
                  
                  <div className="border-l-4 border-amber-500 pl-4 py-1">
                    <h3 className="font-medium">Monitor</h3>
                    <ul className="list-disc pl-5 text-sm space-y-1 mt-2">
                      {data.items
                        .filter((item: any) => item.impact !== "Positive" && item.impact !== "Negative")
                        .map((item: any) => (
                          <li key={item.id}>{item.recommendations[0]}</li>
                        ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CategoryAnalysisDetail;
