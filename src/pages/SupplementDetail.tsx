
import React from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import BackButton from "@/components/BackButton";
import { AlertTriangle, Check, X, Flask, Calendar, Activity, UserCircle, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";

type SupplementDetailsType = {
  id: string;
  name: string;
  brand: string;
  form: string;
  dosage: string;
  ingredients: string[];
  startDate: string;
  skinIrritationScore: number;
  possibleIssues: string[];
  benefits: string[];
  usage: {
    frequency: string;
    duration: string;
    notes: string;
  };
  scientificEvidence: {
    level: "High" | "Moderate" | "Limited" | "Inconclusive";
    summary: string;
  };
  recommendations: {
    pause: boolean;
    alternatives?: string[];
    resumptionGuidance?: string;
  };
};

const SupplementDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  // Mock data for the supplements
  const supplementsData: Record<string, SupplementDetailsType> = {
    "collagen": {
      id: "collagen",
      name: "Marine Collagen Peptides",
      brand: "VitalSkin",
      form: "Powder",
      dosage: "10g daily",
      ingredients: ["Hydrolyzed Marine Collagen", "Hyaluronic Acid", "Vitamin C", "Biotin", "Zinc"],
      startDate: "2 weeks ago",
      skinIrritationScore: 75,
      possibleIssues: [
        "Contains marine allergens that may trigger reactions in sensitive individuals",
        "Biotin can cause skin breakouts in some people",
        "High dosage may overwhelm skin's natural regulation",
        "Potential interaction with other skincare products"
      ],
      benefits: [
        "Improved skin elasticity in some users",
        "Potential for better hydration when tolerated well",
        "Supports nail and hair health"
      ],
      usage: {
        frequency: "Once daily",
        duration: "14 days so far",
        notes: "Taken in morning coffee"
      },
      scientificEvidence: {
        level: "Moderate",
        summary: "Research shows mixed results with oral collagen supplements. Some studies indicate improvements in skin elasticity and hydration, while others show no significant difference versus placebo."
      },
      recommendations: {
        pause: true,
        alternatives: ["Plant-based collagen boosters", "Targeted topical peptides", "Vitamin C serum"],
        resumptionGuidance: "If symptoms improve after 7-day pause, try reintroducing at half dose every other day."
      }
    }
  };

  const supplement = id ? supplementsData[id] : null;

  if (!supplement) {
    return (
      <div className="p-4">
        <BackButton />
        <p className="text-center mt-8">Supplement not found</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6">
          <BackButton />
          <h1 className="text-2xl font-bold mt-2">{supplement.name}</h1>
          <p className="text-sm text-muted-foreground">Supplement Analysis</p>
        </header>

        {/* Overview Section */}
        <section className="mb-8">
          <Card className="ios-card border-l-4 border-l-amber-500">
            <CardContent className="p-6">
              <div className="flex items-start mb-4">
                <AlertTriangle className="h-6 w-6 text-amber-500 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-xl font-semibold">Possible Irritation Detected</h2>
                  <p className="text-muted-foreground mt-1">
                    We've detected a pattern of skin irritation that correlates with your use of this supplement.
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Irritation Correlation Score:</span>
                  <span className="font-semibold text-amber-600">{supplement.skinIrritationScore}%</span>
                </div>
                <Progress value={supplement.skinIrritationScore} className="h-3" />
                <p className="text-sm text-muted-foreground">
                  A high correlation score indicates a strong temporal relationship between supplement use and skin irritation events.
                </p>
              </div>

              <Button className="w-full bg-skin-teal hover:bg-skin-teal/90">
                Pause This Supplement
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Supplement Details */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Supplement Details</h2>
          <Card className="ios-card">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center">
                <Flask className="h-5 w-5 text-muted-foreground mr-3" />
                <div>
                  <span className="text-sm text-muted-foreground">Brand</span>
                  <p>{supplement.brand}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <PieChart className="h-5 w-5 text-muted-foreground mr-3" />
                <div>
                  <span className="text-sm text-muted-foreground">Form</span>
                  <p>{supplement.form}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Activity className="h-5 w-5 text-muted-foreground mr-3" />
                <div>
                  <span className="text-sm text-muted-foreground">Dosage</span>
                  <p>{supplement.dosage}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-muted-foreground mr-3" />
                <div>
                  <span className="text-sm text-muted-foreground">Started</span>
                  <p>{supplement.startDate}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <UserCircle className="h-5 w-5 text-muted-foreground mr-3" />
                <div>
                  <span className="text-sm text-muted-foreground">Usage Pattern</span>
                  <p>{supplement.usage.frequency} for {supplement.usage.duration}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Potential Issues Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Potential Issues</h2>
          <Card className="ios-card">
            <CardContent className="p-6">
              <ul className="space-y-3">
                {supplement.possibleIssues.map((issue, index) => (
                  <li key={index} className="flex items-start">
                    <X className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{issue}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Possible Benefits Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Possible Benefits</h2>
          <Card className="ios-card">
            <CardContent className="p-6">
              <ul className="space-y-3">
                {supplement.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Scientific Evidence */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Scientific Context</h2>
          <Card className="ios-card">
            <CardContent className="p-6">
              <div className="mb-3">
                <span className="text-sm text-muted-foreground">Evidence Level</span>
                <p className="font-medium">{supplement.scientificEvidence.level}</p>
              </div>
              <p className="text-sm">{supplement.scientificEvidence.summary}</p>
            </CardContent>
          </Card>
        </section>

        {/* Recommendations */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
          <Card className="ios-card">
            <CardContent className="p-6">
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                  <span className="font-medium">Pause This Supplement</span>
                </div>
                <p className="text-sm ml-7">
                  We recommend pausing this supplement for 7-10 days to see if your skin irritation improves.
                </p>
              </div>

              {supplement.recommendations.alternatives && (
                <div className="mb-4">
                  <h3 className="font-medium mb-2">Consider Alternatives:</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    {supplement.recommendations.alternatives.map((alt, idx) => (
                      <li key={idx}>{alt}</li>
                    ))}
                  </ul>
                </div>
              )}

              {supplement.recommendations.resumptionGuidance && (
                <div>
                  <h3 className="font-medium mb-2">If You Want To Try Again:</h3>
                  <p className="text-sm">{supplement.recommendations.resumptionGuidance}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default SupplementDetail;
