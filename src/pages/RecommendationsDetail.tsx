import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, XCircle, Calendar, BadgeInfo, Clock, Activity } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import BackButton from "@/components/BackButton";
import ViewScoringMethod from "@/components/ViewScoringMethod";
import useScrollToTop from "@/hooks/useScrollToTop";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useSkinAdvice } from "@/hooks/useSkinAdvice";
import { Badge } from "@/components/ui/badge";

type RecommendationType = "skincare" | "food" | "supplements" | "makeup" | "lifestyle";

// Define interfaces for different recommendation types
interface BaseRecommendation {
  id: string;
  title: string;
  type: RecommendationType;
  rating: number;
  impact: "Positive" | "Neutral" | "Negative";
  description: string;
  benefits: string[];
  scienceInfo: string;
}

interface SkincareRecommendation extends BaseRecommendation {
  type: "skincare";
  usage: string[];
}

interface FoodRecommendation extends BaseRecommendation {
  type: "food";
  sources?: string[];
  recommendations?: string[];
  alternatives?: string[];
}

interface SupplementRecommendation extends BaseRecommendation {
  type: "supplements";
  dosage: string;
  precautions: string[];
}

interface MakeupRecommendation extends BaseRecommendation {
  type: "makeup";
  recommendations: string[];
}

interface LifestyleRecommendation extends BaseRecommendation {
  type: "lifestyle";
  techniques?: string[];
  routine?: string[];
}

type Recommendation = 
  | SkincareRecommendation 
  | FoodRecommendation 
  | SupplementRecommendation 
  | MakeupRecommendation 
  | LifestyleRecommendation;

// Type guards for checking recommendation types
const isSkincare = (recommendation: Recommendation): recommendation is SkincareRecommendation => 
  recommendation.type === 'skincare';

const isFood = (recommendation: Recommendation): recommendation is FoodRecommendation => 
  recommendation.type === 'food';

const isSupplement = (recommendation: Recommendation): recommendation is SupplementRecommendation => 
  recommendation.type === 'supplements';

const isMakeup = (recommendation: Recommendation): recommendation is MakeupRecommendation => 
  recommendation.type === 'makeup';

const isLifestyle = (recommendation: Recommendation): recommendation is LifestyleRecommendation => 
  recommendation.type === 'lifestyle';

// Sample recommendation data - this would come from an API in a real app
const recommendationsData: Record<string, Recommendation> = {
  "vitamin-c-serum": {
    id: "vitamin-c-serum",
    title: "Try Vitamin C Serum",
    type: "skincare",
    rating: 92,
    impact: "Positive",
    description: "A potent antioxidant that brightens skin tone, reduces hyperpigmentation, and protects against environmental damage.",
    benefits: [
      "Brightens overall skin tone and reduces dark spots",
      "Protects against free radical damage from UV and pollution",
      "Helps boost collagen production for firmer skin",
      "Can reduce inflammation and redness"
    ],
    usage: [
      "Apply 3-4 drops to clean, dry skin in the morning",
      "Follow with moisturizer and sunscreen",
      "Store in cool, dark place to prevent oxidation",
      "Start with lower concentration (5-10%) if you have sensitive skin"
    ],
    scienceInfo: "Vitamin C (L-ascorbic acid) has been extensively studied for its skin benefits. It works by neutralizing free radicals and inhibiting melanin production. It also serves as a cofactor for enzymes involved in collagen synthesis."
  },
  "increase-omega-3": {
    id: "increase-omega-3",
    title: "Increase Omega-3 Intake",
    type: "food",
    rating: 89,
    impact: "Positive",
    description: "Essential fatty acids that help maintain skin's lipid barrier, reduce inflammation, and support overall skin health.",
    benefits: [
      "Strengthens skin's moisture barrier",
      "Reduces inflammatory skin conditions like acne and eczema",
      "Helps regulate oil production",
      "Supports cell membrane health for better nutrient absorption"
    ],
    sources: [
      "Fatty fish (salmon, mackerel, sardines)",
      "Flaxseeds and flaxseed oil",
      "Walnuts",
      "Chia seeds",
      "Hemp seeds"
    ],
    scienceInfo: "Omega-3 fatty acids, particularly EPA and DHA, have anti-inflammatory properties and help maintain cell membrane integrity. Studies show they can reduce UV-induced inflammation and photoaging of skin."
  },
  "add-zinc": {
    id: "add-zinc",
    title: "Add Zinc Supplements",
    type: "supplements",
    rating: 85,
    impact: "Positive",
    description: "An essential mineral that supports skin healing, reduces inflammation, and helps regulate oil production.",
    benefits: [
      "Accelerates wound healing and tissue repair",
      "Helps control oil production to reduce acne",
      "Provides anti-inflammatory properties",
      "Supports immune function in the skin"
    ],
    dosage: "15-30mg daily, preferably with food. Zinc picolinate or zinc glycinate forms are better absorbed.",
    precautions: [
      "High doses may interfere with copper absorption",
      "Can cause nausea if taken on empty stomach",
      "Consult healthcare provider before starting any supplement"
    ],
    scienceInfo: "Zinc is a cofactor for over 300 enzymes and plays essential roles in DNA repair, cell division, and protein synthesis. Topical and oral zinc have demonstrated effectiveness in treating inflammatory skin conditions."
  },
  "switch-foundation": {
    id: "switch-foundation",
    title: "Switch Foundation Type",
    type: "makeup",
    rating: 78,
    impact: "Positive",
    description: "Changing to a non-comedogenic, skin-friendly foundation can significantly improve skin clarity and reduce breakouts.",
    benefits: [
      "Reduces pore clogging and subsequent breakouts",
      "May contain beneficial ingredients that improve skin over time",
      "Better breathability for skin",
      "Can provide more natural coverage"
    ],
    recommendations: [
      "Look for 'non-comedogenic' on labels",
      "Consider mineral-based foundations",
      "Avoid foundations with heavy silicones and oils if acne-prone",
      "Water-based formulas tend to be lighter on skin"
    ],
    scienceInfo: "Non-comedogenic products are formulated to not block pores. Ingredients like dimethicone, heavy oils, and certain waxes can trap bacteria and sebum, potentially leading to breakouts in sensitive individuals."
  },
  "stress-management": {
    id: "stress-management",
    title: "Stress Management Techniques",
    type: "lifestyle",
    rating: 90,
    impact: "Positive",
    description: "Chronic stress triggers hormonal changes that can negatively impact skin. Effective stress management can improve skin clarity, tone, and overall health.",
    benefits: [
      "Reduces cortisol levels that trigger inflammation and breakouts",
      "Improves sleep quality which enhances skin repair",
      "Decreases stress-related habits that harm skin (face touching, etc.)",
      "Supports overall skin barrier function"
    ],
    techniques: [
      "Daily meditation or mindfulness practice (5-15 minutes)",
      "Regular physical activity (30+ minutes daily)",
      "Adequate sleep (7-9 hours nightly)",
      "Breathing exercises during high-stress moments",
      "Setting healthy boundaries"
    ],
    scienceInfo: "Stress triggers cortisol release, which can increase sebum production and inflammation. Studies show direct correlations between psychological stress and worsening of various skin conditions including acne, eczema, and psoriasis."
  },
  "night-exfoliant": {
    id: "night-exfoliant",
    title: "Gentle Night Exfoliant",
    type: "skincare",
    rating: 87,
    impact: "Positive",
    description: "A gentle exfoliating product used at night can remove dead skin cells, improve texture, and enhance the absorption of other skincare products.",
    benefits: [
      "Removes build-up of dead skin cells",
      "Smooths skin texture and tone",
      "Helps prevent clogged pores",
      "Enhances effectiveness of other skincare products"
    ],
    usage: [
      "Apply to clean, dry skin 2-3 times weekly",
      "Avoid using with retinol on the same night",
      "Follow with hydrating serum and moisturizer",
      "Always use sunscreen the following day"
    ],
    scienceInfo: "Chemical exfoliants like AHAs (glycolic, lactic acid) and BHAs (salicylic acid) work by breaking down the bonds between dead skin cells. AHAs work on the skin's surface, while BHAs penetrate into pores, making them ideal for different skin concerns."
  },
  "antioxidant-foods": {
    id: "antioxidant-foods",
    title: "Add Antioxidant Foods",
    type: "food",
    rating: 91,
    impact: "Positive",
    description: "Foods rich in antioxidants help fight free radical damage and reduce inflammation, supporting overall skin health and appearance.",
    benefits: [
      "Protects against environmental damage",
      "Reduces signs of premature aging",
      "Supports skin's natural repair processes",
      "Helps maintain skin elasticity and firmness"
    ],
    recommendations: [
      "Berries (blueberries, strawberries, blackberries)",
      "Dark leafy greens (kale, spinach)",
      "Colorful vegetables (bell peppers, tomatoes)",
      "Green tea",
      "Dark chocolate (70%+ cacao)"
    ],
    scienceInfo: "Antioxidants like vitamins C, E, and polyphenols neutralize free radicals, which are unstable molecules that damage cells and accelerate aging. Research shows dietary antioxidants can improve skin's photoprotection from within."
  },
  "evening-primrose": {
    id: "evening-primrose",
    title: "Try Evening Primrose Oil",
    type: "supplements",
    rating: 83,
    impact: "Positive",
    description: "A supplement rich in gamma-linolenic acid (GLA) that helps balance hormones and improve skin hydration and elasticity.",
    benefits: [
      "Helps maintain skin hydration",
      "May reduce hormone-related breakouts",
      "Supports skin barrier function",
      "Can improve skin elasticity and firmness"
    ],
    dosage: "500-1000mg daily, preferably with food. Results typically seen after 2-3 months of consistent use.",
    precautions: [
      "May interact with blood-thinning medications",
      "Should be discontinued 2 weeks before surgery",
      "Consult healthcare provider if pregnant or nursing",
      "Store in cool, dark place to prevent oxidation"
    ],
    scienceInfo: "Evening primrose oil contains gamma-linolenic acid (GLA), an omega-6 fatty acid that helps the body produce prostaglandins, which regulate inflammation and hormone balance. Studies suggest benefits for inflammatory skin conditions and hormone-related skin issues."
  },
  "morning-hydration": {
    id: "morning-hydration",
    title: "Morning Hydration Routine",
    type: "lifestyle",
    rating: 84,
    impact: "Positive",
    description: "Starting your day with proper hydration helps flush toxins, improve circulation, and maintain skin moisture levels throughout the day.",
    benefits: [
      "Supports cellular renewal and detoxification",
      "Improves blood circulation to the skin",
      "Helps maintain skin's moisture balance",
      "Enhances overall appearance and glow"
    ],
    routine: [
      "Drink 16oz of water upon waking (before coffee)",
      "Add lemon for vitamin C and digestive benefits",
      "Consume water-rich fruits with breakfast",
      "Continue hydrating throughout the day (aim for 2-3 liters total)"
    ],
    scienceInfo: "Proper hydration is essential for maintaining skin's moisture barrier. Studies show that increasing water intake can improve skin hydration levels, particularly in individuals who were previously dehydrated, and may enhance skin thickness and density."
  },
  "oil-free-concealer": {
    id: "oil-free-concealer",
    title: "Oil-Free Concealer",
    type: "makeup",
    rating: 80,
    impact: "Positive",
    description: "Non-comedogenic concealer formulated without oils to cover imperfections without clogging pores or causing breakouts.",
    benefits: [
      "Provides coverage without causing breakouts",
      "Less likely to slide or crease throughout the day",
      "Often contains beneficial ingredients like salicylic acid",
      "Suitable for oily and acne-prone skin types"
    ],
    recommendations: [
      "Look for labels like 'oil-free' and 'non-comedogenic'",
      "Consider mineral-based options",
      "Test for oxidation (if it turns orange on your skin)",
      "Remove thoroughly at the end of the day"
    ],
    scienceInfo: "Oil-free formulas use silicones or water-based ingredients instead of oils to create smooth, blendable products. This reduces the risk of pore congestion while maintaining coverage effectiveness."
  },
  "ceramide-moisturizer": {
    id: "ceramide-moisturizer",
    title: "Add Ceramide Moisturizer",
    type: "skincare",
    rating: 89,
    impact: "Positive",
    description: "Moisturizers containing ceramides help restore and maintain the skin's natural barrier, improving hydration, reducing sensitivity, and protecting against environmental stressors.",
    benefits: [
      "Strengthens the skin's protective barrier",
      "Locks in moisture and prevents water loss",
      "Reduces sensitivity and irritation",
      "Protects against environmental damage"
    ],
    usage: [
      "Apply to slightly damp skin morning and night",
      "Use after serums but before oils or sunscreen",
      "Can be layered for extra hydration in dry conditions",
      "Suitable for all skin types, especially dry or sensitive"
    ],
    scienceInfo: "Ceramides are lipid molecules that make up about 50% of the skin's outer layer. They form the 'mortar' between skin cells, creating a water-impermeable barrier. Studies show that topical application of ceramides can improve barrier function in compromised skin."
  },
  "limit-dairy": {
    id: "limit-dairy",
    title: "Limit Dairy Consumption",
    type: "food",
    rating: 82,
    impact: "Positive",
    description: "Reducing dairy intake may help improve skin clarity for those sensitive to dairy hormones or proteins, potentially decreasing inflammation and breakouts.",
    benefits: [
      "May reduce hormonal acne, particularly around the chin and jawline",
      "Can decrease inflammation for some individuals",
      "Often leads to reduced skin congestion",
      "May improve digestion, which can reflect in skin health"
    ],
    alternatives: [
      "Plant-based milks (oat, almond, coconut)",
      "Dairy-free yogurts fortified with probiotics",
      "Nutritional yeast for B-vitamins (often in cheese)",
      "Calcium-rich foods like leafy greens and fortified foods"
    ],
    scienceInfo: "Some studies suggest a connection between dairy consumption and acne, potentially due to the hormones present in milk or the insulin response to dairy. However, this connection varies greatly between individuals and may depend on genetic factors and the type of dairy consumed."
  }
};

const RecommendationsDetail = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  
  // Apply the scroll to top hook
  useScrollToTop();
  
  // Find the recommendation data
  const recommendation = id ? recommendationsData[id as keyof typeof recommendationsData] : null;

  // States for AI-generated content
  const [aiOverview, setAiOverview] = useState<string>("");
  const [aiBenefits, setAiBenefits] = useState<string>("");
  const [aiImplementation, setAiImplementation] = useState<string>("");
  const [aiScience, setAiScience] = useState<string>("");
  const [isLoading, setIsLoading] = useState({
    overview: false,
    benefits: false,
    implementation: false,
    science: false
  });
  
  // Initialize the skin advice hook for different content types
  const { getAdvice, getTextContent } = useSkinAdvice({ adviceType: "recommendation" });

  useEffect(() => {
    // Get AI content for each section when recommendation changes
    const fetchAIContent = async () => {
      if (!recommendation) return;
      
      try {
        // Generate Overview content
        setIsLoading(prev => ({ ...prev, overview: true }));
        const overviewPrompt = `Write a detailed overview about ${recommendation.title} as a recommendation for skin health. 
                                Include information about its impact (${recommendation.impact}), what it does, and why it's recommended. 
                                Write this as if it's for a skincare app recommendation detail page. Keep it under 150 words.`;
        
        const overview = await getAdvice(overviewPrompt, { 
          recommendationType: recommendation.type,
          recommendationTitle: recommendation.title,
          recommendationImpact: recommendation.impact
        });
        setAiOverview(getTextContent(overview));
        setIsLoading(prev => ({ ...prev, overview: false }));
        
        // Generate Benefits content
        setIsLoading(prev => ({ ...prev, benefits: true }));
        const benefitsPrompt = `Create a detailed list of benefits for "${recommendation.title}" as a ${recommendation.type} recommendation.
                              Format your response with clear bullet points.
                              Include at least 5 potential benefits based on scientific research.
                              Make it specific to skin health.`;
        
        const benefits = await getAdvice(benefitsPrompt, {
          recommendationType: recommendation.type,
          recommendationTitle: recommendation.title
        });
        setAiBenefits(getTextContent(benefits));
        setIsLoading(prev => ({ ...prev, benefits: false }));
        
        // Generate Implementation content
        setIsLoading(prev => ({ ...prev, implementation: true }));
        const implementationPrompt = `Provide detailed practical implementation advice for "${recommendation.title}" as a ${recommendation.type} recommendation.
                                    Include specific steps, frequency, and practical tips for incorporating this into a skincare routine.
                                    Format as bullet points or numbered steps where appropriate.`;
        
        const implementation = await getAdvice(implementationPrompt, {
          recommendationType: recommendation.type,
          recommendationTitle: recommendation.title
        });
        setAiImplementation(getTextContent(implementation));
        setIsLoading(prev => ({ ...prev, implementation: false }));
        
        // Generate Science content
        setIsLoading(prev => ({ ...prev, science: true }));
        const sciencePrompt = `Provide scientific information about "${recommendation.title}" as it relates to skin health. 
                              Include information about key mechanisms of action, and reference relevant scientific findings.
                              Keep it factual and educational but accessible to non-experts.
                              End with appropriate disclaimers about individual variation and consulting healthcare providers.`;
        
        const science = await getAdvice(sciencePrompt, {
          recommendationType: recommendation.type,
          recommendationTitle: recommendation.title
        });
        setAiScience(getTextContent(science));
        setIsLoading(prev => ({ ...prev, science: false }));
        
      } catch (error) {
        console.error("Error generating AI content:", error);
      }
    };
    
    fetchAIContent();
  }, [recommendation]);
  
  const [personalizedLoading, setPersonalizedLoading] = useState(true);
  const [personalizedData, setPersonalizedData] = useState<{
    matchScore: number;
    personalRating: number;
    personalizedText: string;
    implementationTips: string[];
    skinTypeMatch: string;
    alternatives: string[] | null;
  } | null>(null);
  
  useEffect(() => {
    // Load personalized data based on user logs (simulated)
    const loadPersonalizedData = async () => {
      if (!recommendation) return;
      
      setPersonalizedLoading(true);
      
      try {
        // In a real implementation, this would fetch and analyze user data
        // For now, we'll simulate this with a timeout and mock data
        setTimeout(() => {
          // This is where we'd analyze user logs for patterns related to this recommendation
          // For now, using mock data that would be dynamically generated in a real implementation
          setPersonalizedData({
            matchScore: Math.floor(Math.random() * (100 - 70) + 70), // Random score between 70-100
            personalRating: Math.min(recommendation.rating + Math.floor(Math.random() * 15), 100), // Personalized rating based on user's skin type
            personalizedText: `Based on your skin log patterns, this ${recommendation.title} appears to be particularly beneficial for your skin type. Your skin logs show improved results when using similar ${recommendation.type} recommendations.`,
            implementationTips: [
              `Consider implementing this ${recommendation.type} recommendation in your ${recommendation.impact === "Positive" ? "morning" : "evening"} routine for best results.`,
              "Start with a lower frequency to test your skin's response",
              "Log your skin's reaction after each use for better tracking",
              "Combine with hydration for enhanced results"
            ],
            skinTypeMatch: "High match for combination skin with occasional dryness",
            alternatives: recommendation.type === "food" ? [
              "Flaxseeds if omega-3 is the goal",
              "Chia seeds as an alternative source",
              "Hemp hearts for plant-based option"
            ] : recommendation.type === "skincare" ? [
              "Try a gentler formulation if sensitivity occurs",
              "Consider fragrance-free options for sensitive skin",
              "Patch test before full application"
            ] : null
          });
          setPersonalizedLoading(false);
        }, 1500);
        
      } catch (error) {
        console.error("Error loading personalized data:", error);
        setPersonalizedLoading(false);
      }
    };
    
    loadPersonalizedData();
  }, [recommendation]);
  
  if (!recommendation) {
    return (
      <div className="bg-slate-50 min-h-screen pb-20">
        <div className="max-w-md mx-auto px-4 py-6">
          <header className="flex items-center mb-6">
            <BackButton />
            <h1 className="text-2xl font-bold">Recommendation Not Found</h1>
          </header>
          <Card>
            <CardContent className="p-6">
              <p>Sorry, the recommendation you're looking for couldn't be found.</p>
              <button 
                onClick={() => navigate(-1)} 
                className="text-blue-600 flex items-center mt-4"
              >
                Return to Previous Page
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Loading indicator component
  const LoadingIndicator = () => (
    <div className="flex items-center justify-center py-4">
      <div className="flex space-x-2">
        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '600ms' }}></div>
      </div>
    </div>
  );

  // Determine rating label and color
  const getRatingLabel = (rating: number) => {
    if (rating >= 80) return "Great";
    if (rating >= 60) return "Good";
    if (rating >= 40) return "OK";
    if (rating >= 20) return "Fair";
    return "Poor";
  };
  
  const getProgressColor = (rating: number) => {
    if (rating >= 70) return "bg-green-500";
    if (rating >= 40) return "bg-amber-500";
    return "bg-red-500";
  };

  // Check if we're in testai mode
  const isTestAiMode = location.pathname.includes('/testai');
  
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6 flex items-center">
          <BackButton />
          <h1 className="text-2xl font-bold">{recommendation?.title || "Recommendation"}</h1>
        </header>
        
        <Tabs defaultValue="current" className="mb-6">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="current">Current</TabsTrigger>
            <TabsTrigger value="foryou">For You</TabsTrigger>
            <TabsTrigger value="ai">AI</TabsTrigger>
          </TabsList>
          
          <TabsContent value="current" className="mt-4">
            {/* Overview Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Overview</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div>
                      <h2 className="text-xl font-semibold">{recommendation.impact} Effect</h2>
                      <p className="text-muted-foreground">{recommendation.description}</p>
                    </div>
                  </div>

                  <div className="mb-4 flex items-center">
                    <BadgeInfo className="h-5 w-5 mr-2 text-muted-foreground" />
                    <div>
                      <h3 className="text-base font-medium">Category</h3>
                      <p>{recommendation.type.charAt(0).toUpperCase() + recommendation.type.slice(1)}</p>
                    </div>
                  </div>

                  {recommendation.rating !== undefined && (
                    <div className="mb-6">
                      <div className="flex items-center mb-1">
                        <Activity className="h-5 w-5 mr-2 text-muted-foreground" />
                        <h3 className="text-base font-medium">Recommendation Rating</h3>
                      </div>
                      <div className="flex items-center">
                        <div className="flex-1 mr-4">
                          <Progress 
                            value={recommendation.rating} 
                            className="h-3 bg-gray-100" 
                            indicatorClassName={getProgressColor(recommendation.rating)} 
                          />
                        </div>
                        <div className="text-base font-semibold">{recommendation.rating}/100</div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{getRatingLabel(recommendation.rating)}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            {/* Benefits Section */}
            {recommendation.benefits && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Benefits</h2>
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      {recommendation.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                          <p>{benefit}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {/* Specific sections based on recommendation type */}
            {isSkincare(recommendation) && recommendation.usage && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">How to Use</h2>
                <Card>
                  <CardContent className="p-6">
                    <ol className="list-decimal pl-5 space-y-2">
                      {recommendation.usage.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {isFood(recommendation) && recommendation.recommendations && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Recommended Sources</h2>
                <Card>
                  <CardContent className="p-6">
                    <ul className="list-disc pl-5 space-y-2">
                      {recommendation.recommendations.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            )}

            {isFood(recommendation) && recommendation.sources && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Food Sources</h2>
                <Card>
                  <CardContent className="p-6">
                    <ul className="list-disc pl-5 space-y-2">
                      {recommendation.sources.map((source, index) => (
                        <li key={index}>{source}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {isFood(recommendation) && recommendation.alternatives && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Alternatives</h2>
                <Card>
                  <CardContent className="p-6">
                    <ul className="list-disc pl-5 space-y-2">
                      {recommendation.alternatives.map((alternative, index) => (
                        <li key={index}>{alternative}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {isSupplement(recommendation) && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Supplement Information</h2>
                <Card>
                  <CardContent className="p-6">
                    {recommendation.dosage && (
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">Recommended Dosage</h3>
                        <p>{recommendation.dosage}</p>
                      </div>
                    )}
                    
                    {recommendation.precautions && (
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Precautions</h3>
                        <ul className="list-disc pl-5 space-y-2">
                          {recommendation.precautions.map((precaution, index) => (
                            <li key={index}>{precaution}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
            
            {isMakeup(recommendation) && recommendation.recommendations && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Product Tips</h2>
                <Card>
                  <CardContent className="p-6">
                    <ul className="list-disc pl-5 space-y-2">
                      {recommendation.recommendations.map((tip, index) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {isLifestyle(recommendation) && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Implementation</h2>
                <Card>
                  <CardContent className="p-6">
                    {recommendation.techniques && (
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Recommended Techniques</h3>
                        <ul className="list-disc pl-5 space-y-2">
                          {recommendation.techniques.map((technique, index) => (
                            <li key={index}>{technique}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {recommendation.routine && (
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Daily Routine</h3>
                        <ol className="list-decimal pl-5 space-y-2">
                          {recommendation.routine.map((step, index) => (
                            <li key={index}>{step}</li>
                          ))}
                        </ol>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
            
            {/* Science Section - common to all recommendations */}
            {recommendation.scienceInfo && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">The Science</h2>
                <Card>
                  <CardContent className="p-6">
                    <p className="text-sm text-gray-600">{recommendation.scienceInfo}</p>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="foryou" className="mt-4">
            {personalizedLoading ? (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Personalizing Your Recommendation</h2>
                  <p className="text-sm mb-4">
                    We're analyzing your skin logs and patterns to generate personalized insights...
                  </p>
                  <LoadingIndicator />
                </CardContent>
              </Card>
            ) : personalizedData ? (
              <>
                {/* Personalized Overview Section */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Personalized Overview</h2>
                  <Card className="bg-gradient-to-br from-slate-50 to-blue-50">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div>
                          <h2 className="text-xl font-semibold">
                            <Badge className="mr-2">{personalizedData.matchScore}% Match</Badge> 
                            For Your Skin Type
                          </h2>
                          <p className="text-muted-foreground">{personalizedData.skinTypeMatch}</p>
                        </div>
                      </div>

                      {personalizedData.personalRating !== undefined && (
                        <div>
                          <h3 className="text-base font-medium mb-1">Personalized Rating</h3>
                          <div className="flex items-center">
                            <div className="flex-1 mr-4">
                              <Progress 
                                value={personalizedData.personalRating} 
                                className="h-3 bg-gray-100" 
                                indicatorClassName={getProgressColor(personalizedData.personalRating)} 
                              />
                            </div>
                            <div className="text-base font-semibold">{personalizedData.personalRating}/100</div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {getRatingLabel(personalizedData.personalRating)} for your skin type
                          </p>
                        </div>
                      )}

                      <div className="mb-4">
                        <h3 className="text-base font-medium mb-1">Personalized Analysis</h3>
                        <p className="text-sm">{personalizedData.personalizedText}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Implementation Tips */}
                  <Card className="mt-4">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-3">Personalized Implementation Tips</h3>
                      <div className="space-y-3">
                        {personalizedData.implementationTips.map((tip, index) => (
                          <div key={index} className="flex items-start">
                            <div className="bg-slate-100 rounded-full h-7 w-7 flex items-center justify-center mr-3 flex-shrink-0">
                              {index + 1}
                            </div>
                            <p className="text-sm">{tip}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Personalized Alternatives if available */}
                  {personalizedData.alternatives && (
                    <Card className="mt-4">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold mb-3">Personalized Alternatives</h3>
                        <p className="text-sm text-gray-600 mb-3">
                          Based on your skin profile, these alternatives might also work well for you:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-sm">
                          {personalizedData.alternatives.map((alt, index) => (
                            <li key={index}>{alt}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}
                </div>
                
                {/* Usage Pattern */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Your Usage Patterns</h2>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-3">How This Fits Your Routine</h3>
                      
                      <div className="space-y-4">
                        <div className="border-b border-gray-100 pb-3">
                          <div className="flex items-center">
                            <span className="mr-2">🟢</span>
                            <h4 className="font-medium">Morning Routine</h4>
                          </div>
                          <p className="text-sm text-gray-600 ml-6">
                            Fits well with your current morning products
                          </p>
                        </div>
                        
                        <div className="border-b border-gray-100 pb-3">
                          <div className="flex items-center">
                            <span className="mr-2">🟡</span>
                            <h4 className="font-medium">Product Interactions</h4>
                          </div>
                          <p className="text-sm text-gray-600 ml-6">
                            May enhance effects of your vitamin C serum
                          </p>
                        </div>
                        
                        <div className="pb-3">
                          <div className="flex items-center">
                            <span className="mr-2">🔵</span>
                            <h4 className="font-medium">Usage Frequency</h4>
                          </div>
                          <p className="text-sm text-gray-600 ml-6">
                            Recommended 2-3 times weekly based on your skin sensitivity
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            ) : (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Not Enough Data</h2>
                  <p>
                    We don't have enough skin logs to generate personalized insights yet. 
                    Continue logging your daily skin condition to see personalized recommendations.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="ai" className="mt-4">
            <div>
              <Badge variant="outline" className="mb-4">AI Generated Content</Badge>
              
              {/* AI Overview Section */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Overview</h2>
                <Card>
                  <CardContent className="p-6">
                    {isLoading.overview ? (
                      <LoadingIndicator />
                    ) : (
                      <div>
                        <div className="mb-4">
                          <h3 className="text-lg font-semibold">{recommendation.impact} Effect</h3>
                          <div className="text-sm border-l-2 border-slate-200 pl-4 py-1 mt-2">
                            {aiOverview && <p>{aiOverview}</p>}
                          </div>
                        </div>

                        <div className="mb-4">
                          <h3 className="text-base font-medium">Category</h3>
                          <p>{recommendation.type.charAt(0).toUpperCase() + recommendation.type.slice(1)}</p>
                        </div>

                        {recommendation.rating !== undefined && (
                          <div>
                            <h3 className="text-base font-medium mb-1">Recommendation Rating</h3>
                            <div className="flex items-center">
                              <div className="flex-1 mr-4">
                                <Progress 
                                  value={recommendation.rating} 
                                  className="h-3 bg-gray-100" 
                                  indicatorClassName={getProgressColor(recommendation.rating)} 
                                />
                              </div>
                              <div className="text-base font-semibold">{recommendation.rating}/100</div>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{getRatingLabel(recommendation.rating)}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              {/* AI Benefits Section */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Benefits</h2>
                <Card>
                  <CardContent className="p-6">
                    {isLoading.benefits ? (
                      <LoadingIndicator />
                    ) : (
                      <div className="text-sm">
                        {aiBenefits && (
                          <div dangerouslySetInnerHTML={{ __html: aiBenefits.replace(/\n/g, '<br/>') }} />
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              {/* AI Implementation Section */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Implementation</h2>
                <Card>
                  <CardContent className="p-6">
                    {isLoading.implementation ? (
                      <LoadingIndicator />
                    ) : (
                      <div className="text-sm">
                        {aiImplementation && (
                          <div dangerouslySetInnerHTML={{ __html: aiImplementation.replace(/\n/g, '<br/>') }} />
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              {/* AI Science Section */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">The Science</h2>
                <Card>
                  <CardContent className="p-6">
                    {isLoading.science ? (
                      <LoadingIndicator />
                    ) : (
                      <div className="text-sm">
                        {aiScience && (
                          <div dangerouslySetInnerHTML={{ __html: aiScience.replace(/\n/g, '<br/>') }} />
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* View Scoring Method (always at bottom) */}
        <ViewScoringMethod />
        
        {/* Add disclaimer and chat box for testai routes */}
        {isTestAiMode && (
          <>
            <DisclaimerCard />
            <TestAIChatBox productTitle={recommendation?.title} />
          </>
        )}
      </div>
    </div>
  );
};

export default RecommendationsDetail;
