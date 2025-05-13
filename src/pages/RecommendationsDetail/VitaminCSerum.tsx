
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import BackButton from "@/components/BackButton";
import { Calendar, CheckCircle2, ArrowRight, Clock, Lightbulb, Layers, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

const VitaminCSerumPage = () => {
  const benefitScore = 85;
  
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
            <h1 className="text-2xl font-bold">Vitamin C Serum</h1>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Recommended based on your skin data</span>
            </div>
          </div>
        </header>

        {/* Overview Section */}
        <Card className="ios-card mb-6">
          <CardContent className="p-6">
            <div className="flex items-start mb-4">
              <div className="text-2xl mr-3">🟢</div>
              <div>
                <h2 className="text-xl font-semibold">Highly Recommended</h2>
                <p className="text-muted-foreground">Would help with the redness you've been experiencing</p>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Potential Benefit</span>
                <span className="text-sm font-medium">{benefitScore}%</span>
              </div>
              <Progress value={benefitScore} className="h-3" indicatorClassName={`bg-green-500`} />
            </div>
            
            <div className="mb-4">
              <h3 className="text-base font-medium mb-1">Why we recommend this</h3>
              <p className="text-sm">
                Based on your skin logs showing consistent redness and uneven skin tone, vitamin C 
                serum could significantly improve your skin's appearance. Your logs indicate sensitivity 
                to environmental stressors and prior success with antioxidant products.
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
                    <h3 className="font-medium">Reduces Redness</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Vitamin C has anti-inflammatory properties that can help calm skin redness and 
                      reactivity, which aligns with your recent skin concerns.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Brightens Skin Tone</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Inhibits melanin production to fade hyperpigmentation and even out skin tone, 
                      addressing the uneven coloration you've reported.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Protects Against Environmental Damage</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      As a powerful antioxidant, vitamin C neutralizes free radicals from UV exposure 
                      and pollution, which your data shows affects your skin significantly.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Boosts Collagen Production</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Stimulates collagen synthesis to improve skin texture and firmness over time, 
                      addressing the texture concerns in your logs.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* How to Use Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">How to Use</h2>
          <Card className="ios-card">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start pb-3 border-b border-gray-100">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-3 flex-shrink-0 mt-0.5">
                    <span className="text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Start with Low Concentration</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Begin with a 10-15% vitamin C serum to minimize potential irritation, especially given 
                      your sensitivity history.
                    </p>
                  </div>
                </div>

                <div className="flex items-start pb-3 border-b border-gray-100">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-3 flex-shrink-0 mt-0.5">
                    <span className="text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Apply in the Morning</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Use 3-4 drops on clean, dry skin in the morning, before moisturizer and sunscreen for 
                      optimal photoprotection throughout the day.
                    </p>
                  </div>
                </div>

                <div className="flex items-start pb-3 border-b border-gray-100">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-3 flex-shrink-0 mt-0.5">
                    <span className="text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Patch Test First</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Apply a small amount behind your ear or on your inner arm for 24 hours to check for any 
                      adverse reactions before applying to your face.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-3 flex-shrink-0 mt-0.5">
                    <span className="text-sm font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Consistent Application</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Use daily for best results. Most people see initial improvements in skin brightness 
                      within 2-4 weeks, with significant redness reduction by 8 weeks.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* What to Look For */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">What to Look For</h2>
          <Card className="ios-card">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start pb-3 border-b border-gray-100">
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3 flex-shrink-0 mt-0.5">
                    <Layers className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium">Concentration</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Look for 10-20% L-ascorbic acid (pure form of vitamin C). Based on your sensitivity, 
                      start with lower concentrations.
                    </p>
                  </div>
                </div>

                <div className="flex items-start pb-3 border-b border-gray-100">
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3 flex-shrink-0 mt-0.5">
                    <Lightbulb className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium">Packaging</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Choose serums in dark or opaque bottles with airtight pumps. Vitamin C is unstable and 
                      degrades when exposed to light and air.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3 flex-shrink-0 mt-0.5">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium">Additional Ingredients</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Products with vitamin E and ferulic acid enhance stability and effectiveness. Hyaluronic acid 
                      adds hydration benefits suitable for your skin profile.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Potential Concerns */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Potential Concerns</h2>
          <Card className="ios-card">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start pb-3 border-b border-gray-100">
                  <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Initial Tingling</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      A slight tingling sensation is normal when you first start using vitamin C. If it persists 
                      or becomes painful, discontinue use.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Potential Interactions</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Don't use simultaneously with retinol, AHAs, or BHAs. Based on your current routine, use 
                      vitamin C in the morning and any acids or retinol at night.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Product Recommendations */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Product Recommendations</h2>
          <Card className="ios-card">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start pb-3 border-b border-gray-100">
                  <div className="h-10 w-10 bg-slate-100 rounded-md mr-3 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-medium">SkinCeuticals C E Ferulic</h3>
                    <p className="text-xs text-gray-500">15% L-Ascorbic Acid, Vitamin E, Ferulic Acid</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Gold standard formula, ideal for your skin concerns. Excellent stability and proven results for redness.
                    </p>
                    <Link to="/product/serum/skinceuticals-c-e-ferulic" className="text-sm text-blue-500 flex items-center mt-1">
                      View details <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                </div>

                <div className="flex items-start pb-3 border-b border-gray-100">
                  <div className="h-10 w-10 bg-slate-100 rounded-md mr-3 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-medium">Timeless 20% Vitamin C + E + Ferulic Acid</h3>
                    <p className="text-xs text-gray-500">20% L-Ascorbic Acid, Vitamin E, Ferulic Acid</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Affordable alternative with similar ingredient profile. Good efficacy for redness and tone.
                    </p>
                    <Link to="/product/serum/timeless-vitamin-c" className="text-sm text-blue-500 flex items-center mt-1">
                      View details <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="h-10 w-10 bg-slate-100 rounded-md mr-3 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-medium">The Ordinary Vitamin C Suspension 10%</h3>
                    <p className="text-xs text-gray-500">10% L-Ascorbic Acid</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Budget-friendly option with lower concentration, good starting point for your sensitive skin.
                    </p>
                    <Link to="/product/serum/the-ordinary-vitamin-c" className="text-sm text-blue-500 flex items-center mt-1">
                      View details <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                </div>
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
                  <h3 className="font-medium text-blue-600">Journal of Clinical and Aesthetic Dermatology</h3>
                  <p className="text-xs text-gray-500 mb-1">2017 Study</p>
                  <p className="text-sm text-gray-600">
                    Clinical study demonstrating significant improvement in redness and post-inflammatory hyperpigmentation 
                    with 12 weeks of vitamin C serum use.
                  </p>
                  <Link to="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5605218/" className="text-sm text-blue-500 flex items-center mt-1">
                    View research <ArrowRight className="h-3 w-3 ml-1" />
                  </Link>
                </div>

                <div>
                  <h3 className="font-medium text-blue-600">Dermatologic Surgery</h3>
                  <p className="text-xs text-gray-500 mb-1">2019 Review</p>
                  <p className="text-sm text-gray-600">
                    Meta-analysis confirming vitamin C's efficacy in neutralizing free radicals and protecting 
                    against photoaging, with optimal concentration between 10-20%.
                  </p>
                  <Link to="https://pubmed.ncbi.nlm.nih.gov/31356506/" className="text-sm text-blue-500 flex items-center mt-1">
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

export default VitaminCSerumPage;
