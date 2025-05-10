
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, XCircle, Calendar, BadgeInfo, Clock, Activity } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import BackButton from "@/components/BackButton";
import ViewScoringMethod from "@/components/ViewScoringMethod";

type RecommendationType = "skincare" | "food" | "supplements" | "makeup" | "lifestyle";

// Sample recommendation data - this would come from an API in a real app
const recommendationsData = {
  "vitamin-c-serum": {
    id: "vitamin-c-serum",
    title: "Try Vitamin C Serum",
    type: "skincare" as RecommendationType,
    rating: 92,
    impact: "Positive" as const,
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
    type: "food" as RecommendationType,
    rating: 89,
    impact: "Positive" as const,
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
    type: "supplements" as RecommendationType,
    rating: 85,
    impact: "Positive" as const,
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
    type: "makeup" as RecommendationType,
    rating: 78,
    impact: "Positive" as const,
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
    type: "lifestyle" as RecommendationType,
    rating: 90,
    impact: "Positive" as const,
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
    type: "skincare" as RecommendationType,
    rating: 87,
    impact: "Positive" as const,
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
    type: "food" as RecommendationType,
    rating: 91,
    impact: "Positive" as const,
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
    type: "supplements" as RecommendationType,
    rating: 83,
    impact: "Positive" as const,
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
    type: "lifestyle" as RecommendationType,
    rating: 84,
    impact: "Positive" as const,
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
    type: "makeup" as RecommendationType,
    rating: 80,
    impact: "Positive" as const,
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
    type: "skincare" as RecommendationType,
    rating: 89,
    impact: "Positive" as const,
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
    type: "food" as RecommendationType,
    rating: 82,
    impact: "Positive" as const,
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
  
  // Find the recommendation data
  const recommendation = id ? recommendationsData[id as keyof typeof recommendationsData] : null;
  
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

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6 flex items-center">
          <BackButton />
          <h1 className="text-2xl font-bold">{recommendation.title}</h1>
        </header>
        
        {/* Overview Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Overview</h2>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">
                  {recommendation.impact === "Positive" ? "🟢" : recommendation.impact === "Neutral" ? "🟡" : "🔴"}
                </span>
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
        {recommendation.type === "skincare" && recommendation.usage && (
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
        
        {recommendation.type === "food" && recommendation.recommendations && (
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

        {recommendation.type === "food" && recommendation.sources && (
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
        
        {recommendation.type === "supplements" && (
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
        
        {recommendation.type === "makeup" && recommendation.recommendations && (
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
        
        {recommendation.type === "lifestyle" && (
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
        
        {/* View Scoring Method (always at bottom) */}
        <ViewScoringMethod />
      </div>
    </div>
  );
};

export default RecommendationsDetail;
