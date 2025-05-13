
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import BackButton from "@/components/BackButton";
import { Calendar, CheckCircle2, ArrowRight, Clock, Lightbulb, Brain } from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

const MeditationPage = () => {
  const benefitScore = 78;
  
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
            <h1 className="text-2xl font-bold">Evening Meditation</h1>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Stress management recommendation</span>
            </div>
          </div>
        </header>

        {/* Overview Section */}
        <Card className="ios-card mb-6">
          <CardContent className="p-6">
            <div className="flex items-start mb-4">
              <div className="text-2xl mr-3">🟢</div>
              <div>
                <h2 className="text-xl font-semibold">Stress Reduction Technique</h2>
                <p className="text-muted-foreground">Could reduce stress-triggered breakouts on your chin</p>
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
                Your skin logs show a 76% correlation between high stress days and breakouts,
                particularly in the chin area. Regular evening meditation could help reduce stress
                hormones like cortisol that trigger inflammation and excess sebum production.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Correlation Analysis */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Stress-Skin Connection</h2>
          <Card className="ios-card">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center text-red-500 mr-3 flex-shrink-0 mt-0.5">
                    <Brain className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium">Your Stress Pattern</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Your logs indicate that stress levels peak between 7-9pm, often after work demands 
                      or social interactions. Chin breakouts typically follow 24-36 hours later.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-500 mr-3 flex-shrink-0 mt-0.5">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium">Timing Connection</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      On days when you reported lower evening stress or relaxing activities before bed, 
                      your skin showed 68% fewer breakouts in the following days.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3 flex-shrink-0 mt-0.5">
                    <Lightbulb className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium">Science Behind It</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Stress increases cortisol production, which can trigger oil glands and inflammation. 
                      Evening meditation can reduce cortisol levels by up to 25% according to research.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Benefits Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Benefits for Your Skin</h2>
          <Card className="ios-card">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Reduces Inflammatory Response</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Evening meditation can lower inflammatory markers that contribute to redness and swelling 
                      in acne lesions, particularly in your chin area.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Balances Hormones</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Regular meditation practice helps regulate cortisol and other stress hormones 
                      that can trigger excess oil production.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Improves Sleep Quality</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Better sleep from evening meditation enhances skin repair and regeneration during 
                      the night, a pattern observed in your skin logs on days with better reported sleep.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Strengthens Skin Barrier</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Reduced stress can improve your skin's barrier function, helping it retain 
                      moisture and better defend against environmental triggers.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommended Practices */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Recommended Practices</h2>
          <Card className="ios-card">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start pb-3 border-b border-gray-100">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-3 flex-shrink-0 mt-0.5">
                    <span className="text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-medium">5-Minute Breathing Meditation</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Start with just 5 minutes of focused breathing before bed. Inhale for 4 counts, 
                      hold for 2, exhale for 6 counts. Ideal for beginners.
                    </p>
                    <Link to="https://www.youtube.com/watch?v=inpok4MKVLM" className="text-sm text-blue-500 flex items-center mt-1">
                      Try guided session <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                </div>

                <div className="flex items-start pb-3 border-b border-gray-100">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-3 flex-shrink-0 mt-0.5">
                    <span className="text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Body Scan Relaxation</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Progressively relax each part of your body from toes to head. This 10-minute 
                      practice is especially effective for your tension patterns.
                    </p>
                    <Link to="https://www.youtube.com/watch?v=zsCVqFr6T1Y" className="text-sm text-blue-500 flex items-center mt-1">
                      Try guided session <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-3 flex-shrink-0 mt-0.5">
                    <span className="text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Loving-Kindness Meditation</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Based on your emotional stress patterns, this practice of directing positive 
                      wishes toward yourself and others may be particularly beneficial.
                    </p>
                    <Link to="https://www.youtube.com/watch?v=sz7cpV7ERsM" className="text-sm text-blue-500 flex items-center mt-1">
                      Try guided session <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Implementation Plan */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Implementation Plan</h2>
          <Card className="ios-card">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start pb-3 border-b border-gray-100">
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3 flex-shrink-0 mt-0.5">
                    <span className="text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Start Small</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Begin with just 5 minutes daily, preferably 30-60 minutes before your typical bedtime 
                      (between 9-10pm based on your patterns).
                    </p>
                  </div>
                </div>

                <div className="flex items-start pb-3 border-b border-gray-100">
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3 flex-shrink-0 mt-0.5">
                    <span className="text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Create a Trigger</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Link meditation to an existing habit, such as right after brushing your teeth or 
                      changing into pajamas, to establish consistency.
                    </p>
                  </div>
                </div>

                <div className="flex items-start pb-3 border-b border-gray-100">
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3 flex-shrink-0 mt-0.5">
                    <span className="text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Track Results</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Log your meditation practice in the app alongside your stress levels and skin condition 
                      to measure correlation effects over time.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3 flex-shrink-0 mt-0.5">
                    <span className="text-sm font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Gradually Increase</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      After 2 weeks, gradually increase to 10-15 minutes daily if you're seeing benefits. 
                      Research shows this duration provides optimal stress reduction.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* App Recommendations */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Recommended Apps</h2>
          <Card className="ios-card">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start pb-3 border-b border-gray-100">
                  <div className="h-10 w-10 bg-slate-100 rounded-md mr-3 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-medium">Calm</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Features evening wind-down meditations specifically designed to reduce cortisol 
                      before sleep. Their "7 Days of Calming Anxiety" program is well-matched to your needs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start pb-3 border-b border-gray-100">
                  <div className="h-10 w-10 bg-slate-100 rounded-md mr-3 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-medium">Headspace</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Offers structured courses for beginners. Their "Wind Down" sessions align 
                      well with your evening stress pattern and skin concerns.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="h-10 w-10 bg-slate-100 rounded-md mr-3 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-medium">Insight Timer</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Free app with thousands of guided meditations. Search for "stress reduction" 
                      and "evening relaxation" for options aligned with your needs.
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
                  <h3 className="font-medium text-blue-600">Journal of Alternative and Complementary Medicine</h3>
                  <p className="text-xs text-gray-500 mb-1">2019 Study</p>
                  <p className="text-sm text-gray-600">
                    Research found that 8 weeks of regular meditation practice reduced inflammatory markers 
                    associated with skin conditions by up to 31% compared to control groups.
                  </p>
                  <Link to="https://pubmed.ncbi.nlm.nih.gov/30865055/" className="text-sm text-blue-500 flex items-center mt-1">
                    View research <ArrowRight className="h-3 w-3 ml-1" />
                  </Link>
                </div>

                <div>
                  <h3 className="font-medium text-blue-600">Psychoneuroendocrinology Journal</h3>
                  <p className="text-xs text-gray-500 mb-1">2021 Review</p>
                  <p className="text-sm text-gray-600">
                    Meta-analysis showed that evening meditation practices were effective in reducing 
                    cortisol levels by 19-28% when practiced consistently for 2+ weeks.
                  </p>
                  <Link to="https://pubmed.ncbi.nlm.nih.gov/32745809/" className="text-sm text-blue-500 flex items-center mt-1">
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

export default MeditationPage;
