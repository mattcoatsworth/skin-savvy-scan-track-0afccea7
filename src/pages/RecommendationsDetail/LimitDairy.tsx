
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import BackButton from "@/components/BackButton";
import { Calendar, BarChart2, ArrowRight, Milk, Pizza, Coffee, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

const LimitDairyPage = () => {
  const impactScore = 92;
  
  const getProgressColor = (rating: number) => {
    if (rating >= 70) return "#F87171"; // Red for negative impacts
    if (rating >= 40) return "#FACC15"; // Yellow for medium impacts
    return "#4ADE80"; // Green for low impacts (better)
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6 flex items-center">
          <BackButton />
          <div>
            <h1 className="text-2xl font-bold">Limit Dairy Intake</h1>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Based on your data from the last 4 weeks</span>
            </div>
          </div>
        </header>

        {/* Overview Section */}
        <Card className="ios-card mb-6">
          <CardContent className="p-6">
            <div className="flex items-start mb-4">
              <div className="text-2xl mr-3">🔴</div>
              <div>
                <h2 className="text-xl font-semibold">Strong Negative Impact</h2>
                <p className="text-muted-foreground">Your logs show a 92% correlation between dairy consumption and breakouts</p>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Impact Strength</span>
                <span className="text-sm font-medium">{impactScore}%</span>
              </div>
              <Progress value={impactScore} className="h-3" indicatorClassName={`bg-red-500`} />
            </div>
            
            <div className="mb-4">
              <h3 className="text-base font-medium mb-1">What we've found</h3>
              <p className="text-sm">
                Based on your skin logs over the past 4 weeks, we've identified a very strong
                correlation between your dairy consumption and acne breakouts. Symptoms typically
                appear 24-48 hours after consumption, focusing on your chin and jawline areas.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Analysis */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Detailed Analysis</h2>
          <Card className="ios-card">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center text-red-500 mr-3 flex-shrink-0 mt-0.5">
                    <BarChart2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium">Correlation Patterns</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Your skin logs show that 15 of your 17 recorded breakouts in the past month occurred within 
                      24-48 hours after consuming dairy products. This establishes a 92% correlation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-500 mr-3 flex-shrink-0 mt-0.5">
                    <Milk className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium">Primary Triggers</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      The strongest reactions were observed after consuming milk (95% correlation), cheese (88% correlation), 
                      and ice cream (86% correlation). Yogurt showed a lower correlation (68%).
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3 flex-shrink-0 mt-0.5">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium">Timeline Impact</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Your skin typically shows signs of inflammation 24 hours after dairy consumption, 
                      with peak breakouts occurring at the 48-hour mark. Recovery begins after 3-5 days 
                      of dairy avoidance.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Why Dairy Affects Your Skin */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Why Dairy Affects Your Skin</h2>
          <Card className="ios-card">
            <CardContent className="p-6">
              <div className="space-y-4">
                <p className="text-sm">
                  Dairy products can affect skin health in several ways:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>
                    <span className="font-medium">Hormonal impact:</span> Dairy contains natural hormones and growth factors that can stimulate oil production and influence skin cell growth
                  </li>
                  <li>
                    <span className="font-medium">Insulin response:</span> Dairy proteins can trigger insulin and IGF-1 production, both linked to increased acne severity
                  </li>
                  <li>
                    <span className="font-medium">Inflammatory response:</span> Some individuals experience an inflammatory reaction to specific proteins in dairy
                  </li>
                  <li>
                    <span className="font-medium">Sensitivity reactions:</span> Even without a true allergy, many people have sensitivity reactions to dairy that manifest on the skin
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Recommendations</h2>
          <Card className="ios-card">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start pb-3 border-b border-gray-100">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-3 flex-shrink-0 mt-0.5">
                    <span className="text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Elimination Trial</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Try eliminating all dairy products for 3 weeks to observe changes in your skin condition.
                    </p>
                  </div>
                </div>

                <div className="flex items-start pb-3 border-b border-gray-100">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-3 flex-shrink-0 mt-0.5">
                    <span className="text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Plant-Based Alternatives</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Explore non-dairy alternatives like almond milk, oat milk, or coconut yogurt.
                    </p>
                    <Link to="/recommendations-detail/plant-alternatives" className="text-skin-teal text-xs flex items-center mt-1">
                      View suggested alternatives <ChevronRight className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                </div>

                <div className="flex items-start pb-3 border-b border-gray-100">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-3 flex-shrink-0 mt-0.5">
                    <span className="text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Selective Reintroduction</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      After the elimination period, reintroduce one dairy product at a time to pinpoint which specific 
                      items affect you the most.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-3 flex-shrink-0 mt-0.5">
                    <span className="text-sm font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Nutrition Balance</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Ensure adequate calcium and vitamin D intake through alternative sources like leafy greens, 
                      fortified plant milks, and supplements if needed.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Common Dairy Sources */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Common Dairy Sources</h2>
          <Card className="ios-card">
            <CardContent className="p-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mb-2">
                    <Milk className="h-6 w-6 text-slate-600" />
                  </div>
                  <span className="text-xs font-medium text-center">Milk</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mb-2">
                    <Pizza className="h-6 w-6 text-slate-600" />
                  </div>
                  <span className="text-xs font-medium text-center">Cheese</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mb-2">
                    <Coffee className="h-6 w-6 text-slate-600" />
                  </div>
                  <span className="text-xs font-medium text-center">Lattes</span>
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  Remember to check ingredient lists for hidden dairy sources like whey, casein, 
                  lactose, and milk solids in processed foods.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Scientific Research */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Scientific Research</h2>
          <Card className="ios-card">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="pb-3 border-b border-gray-100">
                  <h3 className="font-medium text-blue-600">Journal of the American Academy of Dermatology</h3>
                  <p className="text-xs text-gray-500 mb-1">2018 Study</p>
                  <p className="text-sm text-gray-600">
                    Found that participants consuming dairy had a 44% higher chance of developing acne compared to those with dairy-free diets.
                  </p>
                  <Link to="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7847434/" className="text-sm text-blue-500 flex items-center mt-1">
                    View research <ArrowRight className="h-3 w-3 ml-1" />
                  </Link>
                </div>

                <div>
                  <h3 className="font-medium text-blue-600">Nutrients Journal</h3>
                  <p className="text-xs text-gray-500 mb-1">2020 Review</p>
                  <p className="text-sm text-gray-600">
                    Meta-analysis of 14 studies showed significant association between dairy consumption and acne prevalence, especially with skim milk products.
                  </p>
                  <Link to="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6115795/" className="text-sm text-blue-500 flex items-center mt-1">
                    View research <ArrowRight className="h-3 w-3 ml-1" />
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LimitDairyPage;
