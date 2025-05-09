
import React from "react";
import BackButton from "@/components/BackButton";
import InsightsTrends from "@/components/InsightsTrends";
import ViewScoringMethod from "@/components/ViewScoringMethod";
import { Card, CardContent } from "@/components/ui/card";
import { Droplet, Sun, CloudSun, Star, Activity, Heart, Bandage, Smile } from "lucide-react";

// Extended mock data for insights
const insightData = [
  {
    id: "hydration-effect",
    title: "Hydration Effect",
    description: "Drinking 8+ glasses of water improved skin moisture by 30%",
    iconName: "droplet",
    category: "positive",
    content: "According to your logs, days when you consumed 8 or more glasses of water showed a significant improvement in your skin's moisture levels. Hydration plays a crucial role in maintaining skin elasticity and preventing dryness."
  },
  {
    id: "vitamin-c-serum",
    title: "Vitamin C Serum",
    description: "Regular use has helped with brightening and texture",
    iconName: "star",
    category: "positive",
    content: "Your consistent use of Vitamin C serum appears to be contributing to improved skin brightness and texture. Vitamin C is known for its antioxidant properties and ability to promote collagen production."
  },
  {
    id: "sleep-quality",
    title: "Sleep Quality",
    description: "Nights with 7+ hours sleep show 40% better skin clarity",
    iconName: "activity",
    category: "positive",
    content: "Our analysis shows a strong correlation between your sleep duration and skin clarity. When you get 7 or more hours of sleep, your skin appears noticeably clearer the next day. Sleep is when your skin cells regenerate."
  },
  {
    id: "stress-levels",
    title: "Stress Impact",
    description: "High stress days correlate with increased breakouts",
    iconName: "heart",
    category: "negative",
    content: "We've noticed that your skin tends to break out more during periods of reported high stress. Stress can trigger hormonal responses that increase oil production and inflammation in the skin."
  },
  {
    id: "seasonal-changes",
    title: "Seasonal Sensitivity",
    description: "Your skin shows higher sensitivity during winter months",
    iconName: "cloud-sun",
    category: "neutral",
    content: "Based on your logs, your skin experiences increased sensitivity during colder months. This is likely due to lower humidity levels and harsher weather conditions that compromise the skin barrier."
  },
  {
    id: "product-reactions",
    title: "Product Reaction",
    description: "Fragrance-free products show fewer irritation incidents",
    iconName: "bandage",
    category: "positive",
    content: "Your skin logs indicate fewer irritation incidents when using fragrance-free products compared to products with added fragrances. This suggests your skin may be sensitive to certain fragrance compounds."
  },
  {
    id: "diet-correlation",
    title: "Diet Impact",
    description: "Days with high dairy consumption show increased oil production",
    iconName: "smile",
    category: "negative",
    content: "We've detected a pattern between your dairy consumption and increased oil production in your skin. Some research suggests dairy can influence hormone levels that affect sebum production."
  }
];

const InsightsTrendsPage = () => {
  return (
    <div className="pb-20">
      <header className="mb-6 flex items-center">
        <BackButton />
        <h1 className="text-2xl font-bold">Insights & Trends</h1>
      </header>
      
      <section className="mb-8">
        <h2 className="text-lg font-medium mb-3">Your Skin Insights</h2>
        <p className="text-muted-foreground mb-4">
          Based on your logs and patterns we've detected, here are personalized insights about your skin health factors.
        </p>
        
        <div className="space-y-4">
          {insightData.map((insight, index) => (
            <Card key={index} className="ios-card bg-white border shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start">
                  {(() => {
                    switch (insight.iconName) {
                      case "droplet": return <Droplet className="h-6 w-6 text-sky-500 mr-3 shrink-0" />;
                      case "star": return <Star className="h-6 w-6 text-amber-500 mr-3 shrink-0" />;
                      case "activity": return <Activity className="h-6 w-6 text-blue-500 mr-3 shrink-0" />;
                      case "heart": return <Heart className="h-6 w-6 text-red-500 mr-3 shrink-0" />;
                      case "cloud-sun": return <CloudSun className="h-6 w-6 text-blue-500 mr-3 shrink-0" />;
                      case "bandage": return <Bandage className="h-6 w-6 text-teal-500 mr-3 shrink-0" />;
                      case "smile": return <Smile className="h-6 w-6 text-amber-500 mr-3 shrink-0" />;
                      default: return <Star className="h-6 w-6 text-amber-500 mr-3 shrink-0" />;
                    }
                  })()}
                  <div>
                    <h3 className="font-medium">{insight.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
                    
                    {insight.content && (
                      <p className="mt-2 text-sm">{insight.content}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      
      <section className="mb-8">
        <h2 className="text-lg font-medium mb-3">Trend Analysis</h2>
        <Card className="ios-card bg-white border shadow-sm">
          <CardContent className="p-4">
            <p className="text-center text-muted-foreground py-8">
              Trend charts will appear here as more data is collected from your logs.
              Continue logging your skin condition daily for personalized trends.
            </p>
          </CardContent>
        </Card>
      </section>
      
      {/* Add View Scoring Method component at the bottom */}
      <ViewScoringMethod />
    </div>
  );
};

export default InsightsTrendsPage;
