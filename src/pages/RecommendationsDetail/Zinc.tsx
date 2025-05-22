import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import BackButton from "@/components/BackButton";
import { Calendar, CheckCircle2, ArrowRight, AlertCircle, BarChart2, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

const ZincSupplementPage = () => {
  const benefitScore = 72;
  
  const getProgressColor = (rating: number) => {
    if (rating >= 70) return "#4ADE80"; // Green for good ratings
    if (rating >= 40) return "#FACC15"; // Yellow for medium ratings
    return "#F87171"; // Red for poor ratings
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6 flex items-center">
          <BackButton />
          <div>
            <h1 className="text-2xl font-bold">Zinc Supplement</h1>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Mineral supplement recommendation</span>
            </div>
          </div>
        </header>

        {/* Overview Section - Updated Design */}
        <Card className="ios-card mb-6 overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
          <CardContent className="p-6">
            <div className="flex items-start mb-4">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-md mr-4 flex-shrink-0">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Oil Balance Support</h2>
                <p className="text-muted-foreground">May help regulate your oil production</p>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Potential Benefit</span>
                <span className="text-sm font-medium text-emerald-600">{benefitScore}%</span>
              </div>
              <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${benefitScore}%` }}
                ></div>
              </div>
              <div className="w-full flex justify-between mt-1">
                <span className="text-xs text-gray-400">Lower</span>
                <span className="text-xs text-gray-400">Higher</span>
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="text-base font-medium mb-1">Why we recommend this</h3>
              <p className="text-sm">
                Your skin logs show consistent issues with excess oil production and related breakouts.
                Zinc supplements can help regulate sebum production and offer anti-inflammatory benefits
                that may address your specific skin concerns.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Benefits Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Key Benefits for Your Skin</h2>
          <Card className="ios-card">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Regulates Oil Production</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Zinc helps normalize sebum (oil) production in the skin by regulating hormonal influences 
                      on oil glands, directly addressing your primary skin concern.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Anti-Inflammatory Properties</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Helps reduce redness and inflammation associated with breakouts, which your logs 
                      show typically accompanies your oily skin episodes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Supports Wound Healing</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Accelerates the healing of existing breakouts and helps prevent post-inflammatory 
                      hyperpigmentation, which appears in your skin history.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Antibacterial Action</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Has natural antibacterial properties that help fight P. acnes bacteria, which 
                      contribute to the inflammatory breakouts in your T-zone.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">How Zinc Works for Skin Health</h2>
          <Card className="ios-card">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3 flex-shrink-0 mt-0.5">
                    <BarChart2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium">Hormone Regulation</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Zinc helps regulate DHT (dihydrotestosterone), a hormone that stimulates oil production 
                      in skin glands. Your skin pattern suggests potential DHT sensitivity.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-3 flex-shrink-0 mt-0.5">
                    <Zap className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium">Antioxidant Activity</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      As a component of superoxide dismutase (SOD), zinc helps fight free radicals 
                      that can damage skin cells and trigger inflammation in oil-prone skin.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-500 mr-3 flex-shrink-0 mt-0.5">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium">Cellular Turnover</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Supports healthy cell division and turnover, helping to prevent the buildup of dead skin cells 
                      that can clog pores when combined with excess oil.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Dosage Recommendations */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Dosage Recommendations</h2>
          <Card className="ios-card">
            <CardContent className="p-6">
              <div className="space-y-4">
                <p className="text-sm">
                  Based on research and your specific skin pattern, we recommend:
                </p>
                
                <div className="flex items-start pb-3 border-b border-gray-100">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-3 flex-shrink-0 mt-0.5">
                    <span className="text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Starting Dose</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Begin with 15-30mg of zinc daily, taken with food to minimize stomach upset.
                      For your skin concerns, zinc picolinate or zinc gluconate may be most effective.
                    </p>
                  </div>
                </div>

                <div className="flex items-start pb-3 border-b border-gray-100">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-3 flex-shrink-0 mt-0.5">
                    <span className="text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Duration</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Allow 8-12 weeks for noticeable results in oil regulation and acne reduction.
                      Continue to track your skin's response in the app during this period.
                    </p>
                  </div>
                </div>

                <div className="flex items-start pb-3 border-b border-gray-100">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-3 flex-shrink-0 mt-0.5">
                    <span className="text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Optimization</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      After 3 months, evaluate results. If beneficial, continue with a maintenance 
                      dose of 15mg daily. If limited results, consider increasing to 40mg daily (under healthcare supervision).
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-3 flex-shrink-0 mt-0.5">
                    <span className="text-sm font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Timing</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Take zinc with a meal that contains protein to enhance absorption. 
                      Avoid taking with calcium supplements or high-calcium foods, which can interfere with absorption.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Precautions */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Important Precautions</h2>
          <Card className="ios-card">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start pb-3 border-b border-gray-100">
                  <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Long-Term Use</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Long-term high-dose zinc supplementation (over 40mg daily) can lead to copper deficiency. 
                      Consider a copper-containing multivitamin if using zinc long-term.
                    </p>
                  </div>
                </div>

                <div className="flex items-start pb-3 border-b border-gray-100">
                  <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Medication Interactions</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Zinc can interact with certain antibiotics, diuretics, and other medications. 
                      If you take prescription medications, consult with your healthcare provider.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Digestive Comfort</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Taking zinc on an empty stomach can cause nausea in some people. 
                      Always take with food and start with a lower dose if you have a sensitive stomach.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Product Recommendations */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Recommended Forms</h2>
          <Card className="ios-card">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start pb-3 border-b border-gray-100">
                  <div className="h-10 w-10 bg-slate-100 rounded-md mr-3 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-medium">Zinc Picolinate</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Highly bioavailable form that's particularly effective for skin concerns.
                      Look for products with 15-30mg of elemental zinc.
                    </p>
                    <Link to="/supplement/zinc-picolinate" className="text-sm text-blue-500 flex items-center mt-1">
                      View options <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                </div>

                <div className="flex items-start pb-3 border-b border-gray-100">
                  <div className="h-10 w-10 bg-slate-100 rounded-md mr-3 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-medium">Zinc Gluconate</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Well-absorbed and gentle on the stomach, making it a good option for those with 
                      digestive sensitivity.
                    </p>
                    <Link to="/supplement/zinc-gluconate" className="text-sm text-blue-500 flex items-center mt-1">
                      View options <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="h-10 w-10 bg-slate-100 rounded-md mr-3 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-medium">Zinc Citrate</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Another well-absorbed form that may be easier to find and generally well-tolerated.
                    </p>
                    <Link to="/supplement/zinc-citrate" className="text-sm text-blue-500 flex items-center mt-1">
                      View options <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Other Considerations */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Dietary Sources</h2>
          <Card className="ios-card">
            <CardContent className="p-6">
              <p className="text-sm mb-3">
                While supplements can be helpful, increasing your dietary zinc intake is also beneficial:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Oysters (highest natural source)</li>
                <li>Grass-fed beef and lamb</li>
                <li>Pumpkin seeds</li>
                <li>Crab and lobster</li>
                <li>Chickpeas and lentils</li>
                <li>Hemp seeds</li>
                <li>Cashews and almonds</li>
              </ul>
              <p className="text-sm mt-3">
                Note that plant sources contain phytates that can reduce zinc absorption. Soaking or 
                sprouting nuts, seeds, and legumes can improve bioavailability.
              </p>
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
                  <h3 className="font-medium text-blue-600">Dermatology Research and Practice</h3>
                  <p className="text-xs text-gray-500 mb-1">2020 Study</p>
                  <p className="text-sm text-gray-600">
                    Clinical trial found that 30mg zinc supplementation for 12 weeks reduced sebum production 
                    by 32% and inflammatory acne lesions by 49%.
                  </p>
                  <Link to="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4120804/" className="text-sm text-blue-500 flex items-center mt-1">
                    View research <ArrowRight className="h-3 w-3 ml-1" />
                  </Link>
                </div>

                <div>
                  <h3 className="font-medium text-blue-600">Journal of Drugs in Dermatology</h3>
                  <p className="text-xs text-gray-500 mb-1">2018 Review</p>
                  <p className="text-sm text-gray-600">
                    Meta-analysis of 8 studies showed significant reductions in oiliness and acne severity 
                    with zinc supplementation compared to placebo, with results comparable to some antibiotics.
                  </p>
                  <Link to="https://pubmed.ncbi.nlm.nih.gov/30235387/" className="text-sm text-blue-500 flex items-center mt-1">
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

export default ZincSupplementPage;
