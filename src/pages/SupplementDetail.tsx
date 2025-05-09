
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Check, AlertTriangle, Info, ArrowRight, X } from "lucide-react";
import BackButton from "@/components/BackButton";
import { useParams, Link } from "react-router-dom";
import ViewScoringMethod from "@/components/ViewScoringMethod";

const SupplementDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  // Mock data for different supplements - in a real app this would come from an API
  const supplements = {
    "vitamin-d": {
      name: "Vitamin D",
      dosage: "5000 IU daily",
      impact: "Negative",
      rating: 35,
      description: "Vitamin D is essential for bone health and immune function, but high doses may be contributing to skin irritation in your case.",
      reasons: [
        "Correlation between days of usage and skin inflammation",
        "May be interacting with other supplements or medications",
        "Some studies suggest high doses can trigger hypersensitivity in certain individuals"
      ],
      alternatives: [
        "Lower dose (1000-2000 IU)",
        "Vitamin D from food sources (fatty fish, egg yolks)",
        "Moderate sun exposure (10-15 minutes daily)"
      ],
      suggestions: [
        "Pause for 2 weeks and track skin changes",
        "If reintroducing, try a lower dose",
        "Consider taking every other day instead of daily"
      ]
    },
    "fish-oil": {
      name: "Fish Oil / Omega-3",
      dosage: "1000mg daily",
      impact: "Negative",
      rating: 30,
      description: "While omega-3 fatty acids are generally beneficial for inflammation, some people experience paradoxical reactions or sensitivity to fish oil supplements.",
      reasons: [
        "Coincides with increased skin redness and breakouts",
        "Possible sensitivity to specific fish oil source",
        "May be oxidized or poor quality, generating free radicals"
      ],
      alternatives: [
        "Plant-based omega-3 (flaxseed, chia, walnuts)",
        "Algae-based omega-3 supplements",
        "Fresh fatty fish twice weekly instead of supplements"
      ],
      suggestions: [
        "Discontinue for 3 weeks to observe changes",
        "If symptoms improve, consider alternative omega-3 sources",
        "Check for higher quality, molecularly distilled options if reintroducing"
      ]
    },
    "biotin": {
      name: "Biotin/B Complex",
      dosage: "5000 mcg daily",
      impact: "Negative",
      rating: 40,
      description: "Biotin (vitamin B7) is often marketed for hair and nail health, but high doses have been associated with skin breakouts in some individuals.",
      reasons: [
        "High biotin doses can interfere with vitamin B5 absorption, which is important for skin health",
        "Temporal relationship between supplementation and acne flare-ups",
        "Consistent pattern across usage periods"
      ],
      alternatives: [
        "Lower dose biotin (500-1000 mcg)",
        "Food sources of B vitamins (eggs, nuts, leafy greens)",
        "B complex with balanced B vitamin ratios"
      ],
      suggestions: [
        "Stop supplementation for 2-3 weeks",
        "Monitor for improvement in problem areas",
        "Consider blood work to check for any B vitamin deficiencies before restarting"
      ]
    }
  };
  
  // Get the supplement data based on the ID parameter
  const supplement = id ? supplements[id as keyof typeof supplements] : null;
  
  // If no matching supplement is found
  if (!supplement) {
    return (
      <div className="bg-slate-50 min-h-screen">
        <div className="max-w-md mx-auto px-4 py-6">
          <header className="flex items-center mb-6">
            <BackButton />
            <h1 className="text-2xl font-bold">Supplement Not Found</h1>
          </header>
          <Card>
            <CardContent className="p-6">
              <p>Sorry, the supplement you're looking for couldn't be found.</p>
              <Link to="/recommendations-detail" className="text-skin-teal flex items-center mt-4">
                Return to Recommendations
              </Link>
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
  
  const getImpactColor = (impact: string) => {
    if (impact === "Positive") return "text-green-600";
    if (impact === "Neutral") return "text-amber-600";
    return "text-red-600";
  };
  
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6">
          <BackButton />
          <h1 className="text-2xl font-bold mt-2">Supplement Analysis</h1>
          <p className="text-muted-foreground">
            {supplement.name} ({supplement.dosage})
          </p>
        </header>
        
        <Card className="mb-6 ios-card">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold mb-2">Current Impact</h2>
                <div className="flex items-center">
                  <span className="text-2xl mr-2">
                    {supplement.impact === "Positive" ? "🟢" : supplement.impact === "Neutral" ? "🟡" : "🔴"}
                  </span>
                  <span className={getImpactColor(supplement.impact)}>
                    {supplement.impact} Effect
                  </span>
                </div>
                <p className="text-sm mt-1 text-muted-foreground">
                  {supplement.description}
                </p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="relative w-14 h-14 flex items-center justify-center">
                  <svg className="w-14 h-14 absolute" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#F3F4F6"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                  
                  <svg className="w-14 h-14 absolute" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke={supplement.impact === "Positive" ? "#4ADE80" : supplement.impact === "Neutral" ? "#FACC15" : "#F87171"}
                      strokeWidth="4"
                      strokeDasharray={`${supplement.rating}, 100`}
                      strokeLinecap="round"
                    />
                  </svg>
                  
                  <div className="text-base font-semibold">
                    {supplement.rating}
                  </div>
                </div>
                <span className="text-xs mt-1 text-muted-foreground">
                  {getRatingLabel(supplement.rating)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-6 ios-card">
          <CardContent className="p-4">
            <div className="flex items-center mb-3">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
              <h2 className="text-lg font-semibold">Why We Recommend Pausing</h2>
            </div>
            
            <ul className="space-y-3">
              {supplement.reasons.map((reason, index) => (
                <li key={index} className="flex">
                  <X className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card className="mb-6 ios-card">
          <CardContent className="p-4">
            <div className="flex items-center mb-3">
              <Info className="h-5 w-5 text-blue-500 mr-2" />
              <h2 className="text-lg font-semibold">Alternative Approaches</h2>
            </div>
            
            <ul className="space-y-3">
              {supplement.alternatives.map((alt, index) => (
                <li key={index} className="flex">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{alt}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card className="mb-6 ios-card">
          <CardContent className="p-4">
            <div className="flex items-center mb-3">
              <ArrowRight className="h-5 w-5 text-skin-teal mr-2" />
              <h2 className="text-lg font-semibold">Suggested Next Steps</h2>
            </div>
            
            <ul className="space-y-3">
              {supplement.suggestions.map((suggestion, index) => (
                <li key={index} className="flex">
                  <div className="h-5 w-5 bg-skin-teal text-white rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <ViewScoringMethod />
      </div>
    </div>
  );
};

export default SupplementDetail;
