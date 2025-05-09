
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Check, Info, ArrowRight, AlertTriangle, Clock, BarChart } from "lucide-react";
import BackButton from "@/components/BackButton";
import { Link, useParams } from "react-router-dom";

const SupplementDetail = () => {
  const { id } = useParams();
  
  // Mock supplement data - in a real app, this would come from an API
  const supplementData = {
    collagen: {
      name: "Collagen Supplement",
      brand: "Vital Proteins",
      timePeriod: "2 weeks",
      concernLevel: "Moderate",
      description: "Collagen supplements are generally considered safe for most people but can cause digestive issues in some individuals. We're seeing a potential correlation between your recent skin irritation and your use of this supplement.",
      evidence: [
        "Skin irritation started 3 days after beginning this supplement",
        "Similar patterns observed in 15% of users with sensitive skin",
        "Your skin logs show increased redness during supplementation period",
        "The specific formulation contains marine-derived collagen which has higher allergenicity"
      ],
      mechanism: "Collagen supplements can sometimes cause allergic reactions, especially if derived from marine sources. They may also influence the body's immune response in sensitive individuals, potentially triggering skin reactivity.",
      alternatives: [
        "Plant-based collagen boosters (containing vitamin C, zinc, and silica)",
        "Focus on collagen-boosting foods like bone broth and chicken skin",
        "Consider hyaluronic acid supplements as an alternative for skin health"
      ],
      nextSteps: [
        "Pause the supplement for 2 weeks",
        "Document any changes in skin condition without the supplement",
        "If irritation subsides, consider trying a different formulation",
        "Consider a patch test if reintroducing the supplement"
      ]
    },
    biotin: {
      name: "Biotin Supplement",
      brand: "Nature's Bounty",
      timePeriod: "1 month",
      concernLevel: "Mild",
      description: "Biotin (vitamin B7) supplements are commonly taken for hair and nail health. However, high doses can sometimes affect skin condition in sensitive individuals.",
      evidence: [
        "Mild increase in breakouts correlating with biotin usage pattern",
        "Research shows biotin can affect vitamin B5 absorption, which may impact skin health",
        "Your skin logs indicate a 20% increase in oil production since starting this supplement",
        "Similar reactions reported in approximately 8% of users"
      ],
      mechanism: "High-dose biotin can compete with pantothenic acid (vitamin B5) for absorption in the intestine. Vitamin B5 is crucial for skin barrier function, and reduced levels might lead to increased sebum production and skin irritation.",
      alternatives: [
        "Lower-dose biotin supplement (1,000 mcg instead of 5,000+ mcg)",
        "B-complex vitamin that contains balanced amounts of all B vitamins",
        "Focus on biotin-rich foods like eggs, salmon, and avocados"
      ],
      nextSteps: [
        "Suspend biotin supplementation for 3 weeks",
        "Monitor changes in skin oil production and breakout frequency",
        "If skin improves, consider a lower dose or food-based approach",
        "Consult with a dermatologist if symptoms persist"
      ]
    },
    vitamin_a: {
      name: "Vitamin A Supplement",
      brand: "Now Foods",
      timePeriod: "3 weeks",
      concernLevel: "High",
      description: "Vitamin A (retinol) supplements are potent and may cause skin dryness, irritation, and sensitivity, especially at higher doses or when combined with topical retinoids.",
      evidence: [
        "Significant increase in skin dryness and flaking since starting supplement",
        "Your skin logs show a 40% decrease in hydration metrics",
        "You're also using a topical retinol product, creating potential compound effects",
        "Clinical studies show vitamin A can thin the skin's outer layer when used excessively"
      ],
      mechanism: "Vitamin A accelerates cell turnover, which can disrupt the skin's barrier function if excessive. When taken orally alongside topical applications, the cumulative effect can lead to irritation, dryness, and increased sensitivity to environmental factors.",
      alternatives: [
        "Beta-carotene (provitamin A) from food sources which converts to vitamin A as needed",
        "Focus on carotenoid-rich foods like carrots, sweet potatoes, and spinach",
        "Consider astaxanthin or lutein supplements for antioxidant benefits without irritation"
      ],
      nextSteps: [
        "Immediately discontinue vitamin A supplementation",
        "Increase hydration and use a barrier-repairing moisturizer",
        "If using topical retinoids, reduce frequency or pause temporarily",
        "Allow 4 weeks for skin barrier to recover before reassessment"
      ]
    },
    zinc: {
      name: "Zinc Supplement",
      brand: "Thorne Research",
      timePeriod: "6 weeks",
      concernLevel: "Mild to Moderate",
      description: "Zinc supplements can benefit skin health at appropriate doses but may cause digestive issues and mineral imbalances with prolonged high-dose use.",
      evidence: [
        "Recent blood work shows elevated zinc levels relative to copper",
        "You're experiencing mild digestive discomfort after taking supplement",
        "Skin appears paler than baseline, possibly indicating mineral imbalance",
        "Currently taking 50mg daily, which exceeds the recommended daily allowance"
      ],
      mechanism: "High-dose zinc supplementation can interfere with copper absorption, leading to imbalances that affect skin coloration and health. Additionally, zinc can irritate the digestive tract when taken on an empty stomach or in forms with low bioavailability.",
      alternatives: [
        "Lower-dose zinc (15-30mg) with increased bioavailability (zinc picolinate)",
        "Zinc-rich foods like oysters, beef, pumpkin seeds, and lentils",
        "Copper-containing foods to maintain mineral balance"
      ],
      nextSteps: [
        "Reduce supplementation to every other day for 2 weeks",
        "Then pause completely for 2 additional weeks to assess changes",
        "Take with food if continuing supplementation in the future",
        "Consider testing for mineral levels if continuing long-term"
      ]
    }
  };

  // Default to collagen if ID is not found
  const supplementId = (id && supplementData[id as keyof typeof supplementData]) 
    ? id as keyof typeof supplementData 
    : 'collagen';
  
  const supplement = supplementData[supplementId];

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6">
          <BackButton />
          <div className="flex items-center justify-between mt-2">
            <h1 className="text-2xl font-bold">Supplement Analysis</h1>
            <div className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-medium">
              {supplement.concernLevel} Concern
            </div>
          </div>
          <div className="flex items-center text-sm text-muted-foreground mt-1">
            <Clock className="h-4 w-4 mr-1" />
            <span>Based on {supplement.timePeriod} of usage</span>
          </div>
        </header>

        <Card className="ios-card mb-6 border-l-4 border-l-orange-400">
          <CardContent className="p-4">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <h2 className="font-medium mb-2">{supplement.name}</h2>
                <p className="text-sm">
                  {supplement.description}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6 mb-6">
          <Card className="ios-card">
            <CardContent className="p-4">
              <h2 className="text-lg font-medium mb-3">Evidence of Correlation</h2>
              <ul className="space-y-2">
                {supplement.evidence.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <BarChart className="h-4 w-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="ios-card">
            <CardContent className="p-4">
              <h2 className="text-lg font-medium mb-3">How This May Affect Your Skin</h2>
              <p className="text-sm">{supplement.mechanism}</p>
            </CardContent>
          </Card>

          <Card className="ios-card">
            <CardContent className="p-4">
              <h2 className="text-lg font-medium mb-3">Alternatives to Consider</h2>
              <ul className="space-y-2">
                {supplement.alternatives.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="ios-card">
            <CardContent className="p-4">
              <h2 className="text-lg font-medium mb-3">Recommended Next Steps</h2>
              <ul className="space-y-2">
                {supplement.nextSteps.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <ArrowRight className="h-4 w-4 text-skin-teal mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SupplementDetail;
