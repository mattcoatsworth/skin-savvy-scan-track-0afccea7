
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import BackButton from "@/components/BackButton";
import { Calendar, CheckCircle2, ArrowRight, AlertCircle, Droplet, Shield, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

const GentleCleanserPage = () => {
  const benefitScore = 88;
  
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
            <h1 className="text-2xl font-bold">Gentle Cleanser</h1>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Product recommendation</span>
            </div>
          </div>
        </header>

        {/* Overview Section */}
        <Card className="ios-card mb-6">
          <CardContent className="p-6">
            <div className="flex items-start mb-4">
              <div className="text-2xl mr-3">🟢</div>
              <div>
                <h2 className="text-xl font-semibold">Barrier Support</h2>
                <p className="text-muted-foreground">Your current cleanser may be too harsh for your skin</p>
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
                Your skin logs show increased sensitivity, redness, and tightness after cleansing. 
                We've detected that your current foaming cleanser contains multiple potentially 
                irritating sulfates and has a high pH that can disrupt your skin barrier.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Current Cleanser Analysis */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Your Current Cleanser</h2>
          <Card className="ios-card">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <XCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">High pH (8.5-9.0)</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Significantly higher than your skin's natural pH (4.5-5.5), which can disrupt your skin's 
                      acid mantle and compromise barrier function.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <XCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Harsh Surfactants</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Contains sodium lauryl sulfate and sodium laureth sulfate, which strip natural oils 
                      and can exacerbate the dehydration noted in your skin logs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <XCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Fragrances and Essential Oils</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Contains multiple fragrance compounds that correlate with the increased sensitivity 
                      and redness you've been reporting.
                    </p>
                  </div>
                </div>
                
                <p className="text-sm font-medium text-red-500">
                  Your log shows a 78% correlation between using this cleanser and experiencing tightness, 
                  redness, and increased oil production within 24 hours.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Benefits of Gentle Cleansers */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Benefits of Gentle Cleansers</h2>
          <Card className="ios-card">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Preserves Skin Barrier</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Gentle cleansers maintain your skin's protective lipid barrier while still effectively 
                      removing impurities, addressing your barrier damage concerns.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Balanced pH</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      pH-balanced cleansers (4.5-5.5) support your skin's natural acidity, maintaining healthy 
                      microbiome and reducing the redness patterns in your logs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Reduces Rebound Oil Production</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      By not stripping natural oils, gentle cleansers prevent the compensatory overproduction of 
                      sebum that's contributing to your T-zone oiliness.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Calms Sensitivity</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Free from common irritants that can trigger inflammation, helping address the 
                      persistent sensitivity issues you've reported.
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
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-3 flex-shrink-0 mt-0.5">
                    <Droplet className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium">Formulation Type</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      For your specific concerns, look for non-foaming, cream, lotion, or hydrating gel cleansers. 
                      Milky or creamy textures are particularly beneficial for your barrier repair needs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start pb-3 border-b border-gray-100">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-3 flex-shrink-0 mt-0.5">
                    <Shield className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium">Beneficial Ingredients</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Look for cleansers with ceramides, glycerin, hyaluronic acid, or niacinamide to hydrate and 
                      support barrier function while cleansing.
                    </p>
                  </div>
                </div>

                <div className="flex items-start pb-3 border-b border-gray-100">
                  <div className="h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-500 mr-3 flex-shrink-0 mt-0.5">
                    <AlertCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium">Ingredients to Avoid</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Based on your skin's reaction patterns, avoid sodium lauryl sulfate, sodium laureth sulfate, 
                      ammonium lauryl sulfate, fragrance, essential oils, and alcohol denat.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3 flex-shrink-0 mt-0.5">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium">pH Level</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Choose cleansers specifically labeled as pH-balanced (ideally pH 4.5-5.5). Some brands list 
                      the pH on packaging or their websites.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* How to Use */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">How to Use</h2>
          <Card className="ios-card">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start pb-3 border-b border-gray-100">
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3 flex-shrink-0 mt-0.5">
                    <span className="text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Water Temperature</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Use lukewarm water instead of hot water. Your logs show increased redness after hot water cleansing, 
                      which can exacerbate sensitivity.
                    </p>
                  </div>
                </div>

                <div className="flex items-start pb-3 border-b border-gray-100">
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3 flex-shrink-0 mt-0.5">
                    <span className="text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Application Method</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Massage gently with fingertips in circular motions for 30-60 seconds. Avoid using washcloths or 
                      cleansing devices, which can cause additional irritation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start pb-3 border-b border-gray-100">
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3 flex-shrink-0 mt-0.5">
                    <span className="text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Gentle Rinsing</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Rinse thoroughly but gently. For cream cleansers, ensure all product is removed to 
                      prevent residue that could cause congestion.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3 flex-shrink-0 mt-0.5">
                    <span className="text-sm font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Frequency</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Based on your skin type, cleanse morning and evening. If your skin feels particularly 
                      sensitive, consider cleansing with water only in the morning and using the gentle cleanser at night.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Product Recommendations */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Recommended Products</h2>
          <Card className="ios-card">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start pb-3 border-b border-gray-100">
                  <div className="h-10 w-10 bg-slate-100 rounded-md mr-3 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-medium">La Roche-Posay Toleriane Hydrating Gentle Cleanser</h3>
                    <p className="text-xs text-gray-500">Cream Cleanser, pH 5.5</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Contains ceramides and niacinamide to support barrier repair while providing thorough, 
                      non-stripping cleansing. Well-suited for your combination, sensitive skin profile.
                    </p>
                    <Link to="/product/cleanser/la-roche-posay-toleriane" className="text-sm text-blue-500 flex items-center mt-1">
                      View details <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                </div>

                <div className="flex items-start pb-3 border-b border-gray-100">
                  <div className="h-10 w-10 bg-slate-100 rounded-md mr-3 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-medium">CeraVe Hydrating Facial Cleanser</h3>
                    <p className="text-xs text-gray-500">Lotion Cleanser, pH 5.5</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Formulated with three essential ceramides and hyaluronic acid, this provides excellent 
                      barrier support while effectively removing impurities.
                    </p>
                    <Link to="/product/cleanser/cerave-hydrating" className="text-sm text-blue-500 flex items-center mt-1">
                      View details <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="h-10 w-10 bg-slate-100 rounded-md mr-3 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-medium">Vanicream Gentle Facial Cleanser</h3>
                    <p className="text-xs text-gray-500">Gel Cleanser, pH 5.0-6.0</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Ultra-minimal formula free from common irritants, making it ideal for your highly reactive skin. 
                      Provides effective cleansing without compromising barrier function.
                    </p>
                    <Link to="/product/cleanser/vanicream-gentle" className="text-sm text-blue-500 flex items-center mt-1">
                      View details <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Expected Results */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Expected Results</h2>
          <Card className="ios-card">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start pb-3 border-b border-gray-100">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-3 flex-shrink-0 mt-0.5">
                    <span className="text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Immediate (1-3 days)</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Reduced tightness and discomfort after cleansing. Skin should feel comfortable, not stripped.
                    </p>
                  </div>
                </div>

                <div className="flex items-start pb-3 border-b border-gray-100">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-3 flex-shrink-0 mt-0.5">
                    <span className="text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Short-term (1-2 weeks)</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Decreased redness and sensitivity. Skin may feel more hydrated and balanced throughout the day.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-3 flex-shrink-0 mt-0.5">
                    <span className="text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Long-term (2-4 weeks)</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Stabilized oil production with less T-zone oiliness and improved overall skin texture and clarity.
                      Strengthened barrier function with improved moisture retention.
                    </p>
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
                  <p className="text-xs text-gray-500 mb-1">2019 Study</p>
                  <p className="text-sm text-gray-600">
                    Research demonstrates that high-pH cleansers (>7.0) significantly disrupt skin barrier function, 
                    leading to increased transepidermal water loss and prolonged recovery time.
                  </p>
                  <Link to="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6171805/" className="text-sm text-blue-500 flex items-center mt-1">
                    View research <ArrowRight className="h-3 w-3 ml-1" />
                  </Link>
                </div>

                <div>
                  <h3 className="font-medium text-blue-600">International Journal of Dermatology</h3>
                  <p className="text-xs text-gray-500 mb-1">2021 Review</p>
                  <p className="text-sm text-gray-600">
                    Meta-analysis showed that gentle, pH-balanced cleansers improved barrier function markers by 24% 
                    and reduced erythema by 32% compared to surfactant-heavy formulations.
                  </p>
                  <Link to="https://pubmed.ncbi.nlm.nih.gov/33772307/" className="text-sm text-blue-500 flex items-center mt-1">
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

export default GentleCleanserPage;
