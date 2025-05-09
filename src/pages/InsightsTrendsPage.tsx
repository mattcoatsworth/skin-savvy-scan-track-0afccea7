
import React from "react";
import BackButton from "@/components/BackButton";
import { useLocation, useParams, Link, useNavigate } from "react-router-dom";
import ViewScoringMethod from "@/components/ViewScoringMethod";
import { Card, CardContent } from "@/components/ui/card";
import { Droplet, Sun, CloudSun, Star, Activity, Heart, Bandage, Smile, Wine, Frown, BadgeCheck, Thermometer } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Extended mock data for insights
const insightData = [
  {
    id: "collagen-supplements",
    title: "Collagen supplements",
    description: "Improved skin elasticity after 2 weeks",
    iconName: "badge-check",
    category: "positive",
    content: "Your consistent use of collagen supplements over the past 2 weeks has shown a measurable improvement in your skin's elasticity. This is based on before and after comparisons in your skin logs."
  },
  {
    id: "alcohol-consumption",
    title: "Alcohol consumption",
    description: "Correlates with next-day puffiness 3 times this month",
    iconName: "wine",
    category: "negative",
    content: "We've detected a pattern where days following alcohol consumption show increased facial puffiness. This has occurred 3 times in the past month according to your logs."
  },
  {
    id: "vitamin-c-serum",
    title: "Vitamin C serum",
    description: "Brightening effect noted after regular use",
    iconName: "sun",
    category: "positive",
    content: "Your consistent application of Vitamin C serum appears to be working positively. Your skin logs show improved brightness and tone since you started using this product regularly."
  },
  {
    id: "hydration-effect",
    title: "Hydration Effect",
    description: "Drinking 8+ glasses of water improved skin moisture by 30%",
    iconName: "droplet",
    category: "positive",
    content: "According to your logs, days when you consumed 8 or more glasses of water showed a significant improvement in your skin's moisture levels. Hydration plays a crucial role in maintaining skin elasticity and preventing dryness."
  },
  {
    id: "vitamin-c-brightening",
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

// Define an interface for the detailed insight data to maintain consistent structure
interface DetailedInsight {
  title: string;
  summary: string;
  icon: string;
  category: string;
  detailedContent: string;
  recommendations?: string[];
  relatedFactors?: string[];
  dataPoints?: { date: string; [key: string]: number | string }[];
}

// Extended content for detailed insight pages
const extendedInsightData: Record<string, DetailedInsight> = {
  "collagen-supplements": {
    title: "Collagen supplements",
    summary: "Improved skin elasticity after 2 weeks",
    icon: "badge-check",
    category: "positive",
    detailedContent: "Your skin logs have revealed a significant improvement in skin elasticity after 2 weeks of consistent collagen supplementation. Based on the comparison of your before and after photos, there's approximately a 15% increase in skin firmness and elasticity.\n\nCollagen is the most abundant protein in your body and is vital for skin health:\n\n- It provides structure and firmness to your skin\n- It helps retain moisture and improve hydration\n- It supports skin regeneration and renewal\n- As we age, our natural collagen production decreases, which contributes to skin aging",
    recommendations: [
      "Continue with your current collagen supplement regimen",
      "For optimal absorption, take collagen supplements with vitamin C",
      "Maintain adequate hydration to maximize collagen benefits",
      "Consistency is key - results typically improve over 6-12 weeks of regular use"
    ],
    relatedFactors: ["Diet quality", "Hydration levels", "Sleep quality"],
    dataPoints: [
      { date: "Week 1", elasticity: 62 },
      { date: "Week 2", elasticity: 71 },
      { date: "Week 3", elasticity: 78 }
    ]
  },
  "alcohol-consumption": {
    title: "Alcohol consumption",
    summary: "Correlates with next-day puffiness 3 times this month",
    icon: "wine",
    category: "negative",
    detailedContent: "Analysis of your skin logs has revealed a strong correlation between alcohol consumption and facial puffiness the following day. This pattern has been observed 3 distinct times this month.\n\nAlcohol affects your skin in multiple ways:\n\n- It's dehydrating, which can make skin appear less plump and more prone to fine lines\n- It causes blood vessels to dilate, leading to facial redness and puffiness\n- It disrupts sleep quality, which is essential for skin regeneration\n- It may trigger inflammatory responses in some individuals",
    recommendations: [
      "Consider reducing alcohol consumption, especially before important events",
      "Increase hydration when consuming alcohol (try alternating alcoholic drinks with water)",
      "Try applying a cold compress in the morning after consuming alcohol to reduce puffiness",
      "Monitor specific types of alcoholic beverages to identify if some cause stronger reactions"
    ],
    relatedFactors: ["Hydration levels", "Sleep quality", "Sodium intake"],
    dataPoints: [
      { date: "April 5", puffiness: 72 },
      { date: "April 12", puffiness: 68 },
      { date: "April 19", puffiness: 75 }
    ]
  },
  "vitamin-c-serum": {
    title: "Vitamin C serum",
    summary: "Brightening effect noted after regular use",
    icon: "sun",
    category: "positive",
    detailedContent: "Your consistent application of Vitamin C serum over the past 3 months has produced measurable improvements in your skin brightness and tone. The data shows a 22% increase in skin radiance scores and a 18% improvement in texture smoothness metrics.\n\nVitamin C (ascorbic acid) provides multiple benefits for skin health:\n\n- It's a potent antioxidant that neutralizes free radicals from UV exposure\n- Promotes collagen synthesis, helping maintain skin firmness\n- Inhibits melanin production which helps fade dark spots and hyperpigmentation\n- Enhances skin's natural repair process",
    recommendations: [
      "Continue daily morning application of Vitamin C serum",
      "Pair with sunscreen for enhanced protection and results",
      "Store your vitamin C products properly to prevent oxidation",
      "Consider using products with complementary ingredients like vitamin E and ferulic acid"
    ],
    relatedFactors: ["Sun exposure", "Antioxidant intake", "Skin exfoliation frequency"],
    dataPoints: [
      { date: "January", brightness: 60 },
      { date: "February", brightness: 72 },
      { date: "March", brightness: 82 }
    ]
  },
  "hydration-effect": {
    title: "Hydration Effect",
    summary: "Drinking 8+ glasses of water improved skin moisture by 30%",
    icon: "droplet",
    category: "positive",
    detailedContent: "Your skin logs have revealed a significant correlation between your daily water intake and skin hydration levels. On days when you consumed 8 or more glasses of water, your skin's moisture content increased by approximately 30% compared to days with lower water intake.\n\nHydration is fundamental to skin health for several reasons:\n\n- Water helps maintain skin elasticity and flexibility\n- Proper hydration supports the skin's natural barrier function\n- Well-hydrated skin appears plumper and shows fewer fine lines\n- Hydration helps flush toxins that could otherwise affect skin clarity",
    recommendations: [
      "Continue drinking at least 8 glasses of water daily",
      "Consider using a hydration tracking app to monitor your intake",
      "Increase water consumption on days with high physical activity",
      "Complement internal hydration with topical humectants like hyaluronic acid"
    ],
    relatedFactors: ["Sleep quality", "Humidity levels", "Exercise frequency"],
    dataPoints: [
      { date: "Last month", hydration: 65 },
      { date: "This month", hydration: 82 }
    ]
  },
  "vitamin-c-brightening": {
    title: "Vitamin C Serum",
    summary: "Regular use has helped with brightening and texture",
    icon: "star",
    category: "positive",
    detailedContent: "Your consistent use of Vitamin C serum appears to be contributing to improved skin brightness and texture. Vitamin C is known for its antioxidant properties and ability to promote collagen production.",
    recommendations: [
      "Apply your vitamin C serum in the morning",
      "Store your serum in a dark, cool place to preserve potency",
      "Layer with hyaluronic acid for enhanced hydration",
      "Follow with sunscreen for optimal protection"
    ],
    relatedFactors: ["Sun exposure", "Free radical damage", "Collagen production"],
    dataPoints: [
      { date: "Before use", brightness: 45 },
      { date: "After 4 weeks", brightness: 72 }
    ]
  },
  "sleep-quality": {
    title: "Sleep Quality",
    summary: "Nights with 7+ hours sleep show 40% better skin clarity",
    icon: "activity",
    category: "positive",
    detailedContent: "Our analysis shows a strong correlation between your sleep duration and skin clarity. When you get 7 or more hours of sleep, your skin clarity scores improve by approximately 40% compared to periods of insufficient sleep.\n\nSleep is essential for skin health because:\n\n- During deep sleep, your body increases blood flow to the skin\n- Growth hormone released during sleep accelerates cell repair and regeneration\n- Sleep deprivation increases cortisol, which can trigger inflammation and breakouts\n- Your skin's moisture barrier recovers and rebalances overnight",
    recommendations: [
      "Maintain a consistent sleep schedule, even on weekends",
      "Create a relaxing bedtime routine to improve sleep quality",
      "Aim for 7-8 hours of uninterrupted sleep nightly",
      "Consider using a silk pillowcase to reduce friction on facial skin"
    ],
    relatedFactors: ["Stress levels", "Screen time before bed", "Caffeine consumption"],
    dataPoints: [
      { date: "Poor sleep nights", clarity: 45 },
      { date: "Average sleep nights", clarity: 63 },
      { date: "Good sleep nights", clarity: 85 }
    ]
  },
  "stress-levels": {
    title: "Stress Impact",
    summary: "High stress days correlate with increased breakouts",
    icon: "heart",
    category: "negative",
    detailedContent: "The data from your logs clearly demonstrates that during periods of reported high stress, your skin experiences a significant increase in breakouts. Specifically, days marked with high stress show a 65% higher likelihood of developing new blemishes within 24-48 hours.\n\nStress affects your skin through several mechanisms:\n\n- Increased cortisol production stimulates sebaceous glands to produce more oil\n- Stress compromises the skin barrier function, increasing sensitivity and reactivity\n- Inflammation pathways activated by stress can trigger or worsen skin conditions\n- High stress often correlates with poorer sleep quality, compounding skin issues",
    recommendations: [
      "Incorporate daily stress management techniques like meditation or breathing exercises",
      "During high-stress periods, be extra diligent with your skincare routine",
      "Consider adaptogens or stress-support supplements (consult healthcare provider)",
      "Track stress levels alongside skin conditions to better understand your personal triggers"
    ],
    relatedFactors: ["Sleep quality", "Diet choices during stress", "Hormonal fluctuations"],
    dataPoints: [
      { date: "Low stress days", breakouts: 2 },
      { date: "Medium stress days", breakouts: 4 },
      { date: "High stress days", breakouts: 7 }
    ]
  },
  "seasonal-changes": {
    title: "Seasonal Sensitivity",
    summary: "Your skin shows higher sensitivity during winter months",
    icon: "cloud-sun",
    category: "neutral",
    detailedContent: "Analysis of your skin logs throughout the year reveals a distinct pattern of increased sensitivity during the winter months. From November through February, your sensitivity readings increased by an average of 35% compared to summer months.\n\nSeasonal changes affect your skin in multiple ways:\n\n- Lower humidity in cold weather and heated indoor environments depletes skin moisture\n- Temperature fluctuations (moving between cold outdoors and heated indoors) stress the skin barrier\n- Wind exposure increases transepidermal water loss\n- UV rays remain a concern even in winter, though their pattern and intensity change",
    recommendations: [
      "Switch to a richer moisturizer during winter months",
      "Consider adding a hydrating serum to your routine in colder seasons",
      "Use a humidifier in your home, especially while sleeping",
      "Maintain sun protection year-round, even during winter"
    ],
    relatedFactors: ["Indoor heating", "Hot shower temperature and duration", "Wind exposure"],
    dataPoints: [
      { date: "Summer", sensitivity: 35 },
      { date: "Fall", sensitivity: 48 },
      { date: "Winter", sensitivity: 72 },
      { date: "Spring", sensitivity: 40 }
    ]
  },
  "product-reactions": {
    title: "Product Reaction",
    summary: "Fragrance-free products show fewer irritation incidents",
    icon: "bandage",
    category: "positive",
    detailedContent: "Your skin logs provide compelling evidence that your skin responds better to fragrance-free formulations. When using products without added fragrances, you experienced a 78% reduction in irritation incidents compared to periods when fragranced products were used.\n\nFragrances can affect skin health in several ways:\n\n- Both natural and synthetic fragrances are common skin sensitizers\n- Repeated exposure to fragrances can develop or worsen skin sensitivities over time\n- Fragrance compounds can disrupt the skin barrier function\n- Some fragrance ingredients may cause photosensitivity when exposed to sunlight",
    recommendations: [
      "Prioritize products labeled 'fragrance-free' rather than just 'unscented'",
      "Be aware that 'natural fragrances' and essential oils can still cause reactions",
      "Patch test new products, even if they're fragrance-free",
      "Gradually transition your entire routine to fragrance-free options"
    ],
    relatedFactors: ["Product pH levels", "Ingredient concentration", "Application frequency"],
    dataPoints: [
      { date: "With fragranced products", irritation: 8.5 },
      { date: "With fragrance-free products", irritation: 1.8 }
    ]
  },
  "diet-correlation": {
    title: "Diet Impact",
    summary: "Days with high dairy consumption show increased oil production",
    icon: "smile",
    category: "negative",
    detailedContent: "Your skin logs reveal a notable correlation between dairy consumption and increased sebum production. Specifically, days following high dairy intake showed a 45% increase in facial oil levels compared to your baseline.\n\nDairy can influence skin condition through several pathways:\n\n- Cow's milk contains hormones that may stimulate oil glands\n- Some dairy products have a high glycemic load, which can affect insulin levels\n- Certain individuals may have sensitivities to dairy proteins\n- The fat composition in dairy might influence inflammation pathways in some people",
    recommendations: [
      "Test reducing dairy for 2-3 weeks and track skin changes",
      "Consider plant-based alternatives to see if they improve skin condition",
      "If consuming dairy, opt for low-fat, hormone-free options when possible",
      "Incorporate oil-regulating skincare ingredients on days with dairy consumption"
    ],
    relatedFactors: ["Sugar intake", "Processed food consumption", "Hydration levels"],
    dataPoints: [
      { date: "Low dairy days", oilProduction: 42 },
      { date: "Moderate dairy days", oilProduction: 68 },
      { date: "High dairy days", oilProduction: 87 }
    ]
  }
};

// Helper function to get icon component
const getIconComponent = (iconName?: string) => {
  switch (iconName) {
    case "droplet":
      return <Droplet className="h-6 w-6 text-sky-500 mr-3 shrink-0" />;
    case "sun":
      return <Sun className="h-6 w-6 text-amber-500 mr-3 shrink-0" />;
    case "thermometer":
      return <Thermometer className="h-6 w-6 text-red-500 mr-3 shrink-0" />;
    case "cloud-sun":
      return <CloudSun className="h-6 w-6 text-blue-500 mr-3 shrink-0" />;
    case "star":
      return <Star className="h-6 w-6 text-amber-500 mr-3 shrink-0" />;
    case "badge-check":
      return <BadgeCheck className="h-6 w-6 text-teal-500 mr-3 shrink-0" />;
    case "activity":
      return <Activity className="h-6 w-6 text-blue-500 mr-3 shrink-0" />;
    case "heart":
      return <Heart className="h-6 w-6 text-red-500 mr-3 shrink-0" />;
    case "bandage":
      return <Bandage className="h-6 w-6 text-teal-500 mr-3 shrink-0" />;
    case "smile":
      return <Smile className="h-6 w-6 text-amber-500 mr-3 shrink-0" />;
    case "frown":
      return <Frown className="h-6 w-6 text-red-500 mr-3 shrink-0" />;
    case "wine":
      return <Wine className="h-6 w-6 text-purple-500 mr-3 shrink-0" />;
    default:
      return <Star className="h-6 w-6 text-amber-500 mr-3 shrink-0" />;
  }
};

const InsightsTrendsPage = () => {
  const { insightId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // If insightId is provided, show detailed view for that insight
  if (insightId) {
    // First check the extended data, then fall back to the regular insight data
    const insightDetail = extendedInsightData[insightId as keyof typeof extendedInsightData];
    
    // If insightDetail doesn't exist, try to find a matching insight in the regular data
    if (!insightDetail) {
      const matchingInsight = insightData.find(insight => insight.id === insightId);
      
      // If no matching insight is found, navigate back to insights page
      if (!matchingInsight) {
        navigate('/insights-trends');
        return null;
      }
      
      // If we have a matching insight but no extended data, show a simplified detail view
      return (
        <div className="pb-20">
          <header className="mb-6 flex items-center">
            <BackButton />
            <h1 className="text-2xl font-bold">{matchingInsight.title}</h1>
          </header>
          
          <Card className="ios-card bg-white border shadow-sm mb-6">
            <CardContent className="p-4">
              <div className="flex items-start">
                {getIconComponent(matchingInsight.iconName)}
                <p className="text-sm">{matchingInsight.description}</p>
                {matchingInsight.category && (
                  <Badge 
                    className={`ml-auto ${
                      matchingInsight.category === 'positive' ? 'bg-green-100 text-green-700' : 
                      matchingInsight.category === 'negative' ? 'bg-red-100 text-red-700' : 
                      'bg-gray-100 text-gray-700'
                    } hover:bg-opacity-90`}
                  >
                    {matchingInsight.category.charAt(0).toUpperCase() + matchingInsight.category.slice(1)}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
          
          <section className="mb-6">
            <h2 className="text-lg font-medium mb-3">Analysis</h2>
            <Card className="ios-card bg-white border shadow-sm">
              <CardContent className="p-4">
                <p className="whitespace-pre-line">{matchingInsight.content || "Detailed analysis coming soon..."}</p>
              </CardContent>
            </Card>
          </section>
          
          <ViewScoringMethod />
        </div>
      );
    }
    
    // If extended insight detail exists, show the full detailed view
    return (
      <div className="pb-20">
        <header className="mb-6 flex items-center">
          <BackButton />
          <h1 className="text-2xl font-bold">{insightDetail.title}</h1>
        </header>
        
        <Card className="ios-card bg-white border shadow-sm mb-6">
          <CardContent className="p-4">
            <div className="flex items-start">
              {getIconComponent(insightDetail.icon)}
              <p className="text-sm">{insightDetail.summary}</p>
              {insightDetail.category && (
                <Badge 
                  className={`ml-auto ${
                    insightDetail.category === 'positive' ? 'bg-green-100 text-green-700' : 
                    insightDetail.category === 'negative' ? 'bg-red-100 text-red-700' : 
                    'bg-gray-100 text-gray-700'
                  } hover:bg-opacity-90`}
                >
                  {insightDetail.category.charAt(0).toUpperCase() + insightDetail.category.slice(1)}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
        
        <section className="mb-6">
          <h2 className="text-lg font-medium mb-3">Analysis</h2>
          <Card className="ios-card bg-white border shadow-sm">
            <CardContent className="p-4">
              <p className="whitespace-pre-line">{insightDetail.detailedContent}</p>
            </CardContent>
          </Card>
        </section>
        
        {insightDetail.recommendations && (
          <section className="mb-6">
            <h2 className="text-lg font-medium mb-3">Recommendations</h2>
            <Card className="ios-card bg-white border shadow-sm">
              <CardContent className="p-4">
                <ul className="list-disc pl-5 space-y-2">
                  {insightDetail.recommendations.map((rec, idx) => (
                    <li key={idx}>{rec}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>
        )}
        
        {insightDetail.relatedFactors && (
          <section className="mb-6">
            <h2 className="text-lg font-medium mb-3">Related Factors</h2>
            <Card className="ios-card bg-white border shadow-sm">
              <CardContent className="p-4">
                <ul className="list-disc pl-5 space-y-1">
                  {insightDetail.relatedFactors.map((factor, idx) => (
                    <li key={idx}>{factor}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>
        )}
        
        {/* Add View Scoring Method component at the bottom */}
        <ViewScoringMethod />
      </div>
    );
  }
  
  // Main insights listing view
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
            <Link to={`/insights-trends/${insight.id}`} key={index} className="block">
              <Card className="ios-card bg-white border shadow-sm hover:shadow-md transition-all cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start">
                    {getIconComponent(insight.iconName)}
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
            </Link>
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
