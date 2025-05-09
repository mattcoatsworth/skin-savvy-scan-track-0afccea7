
import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import BackButton from "@/components/BackButton";
import { Progress } from "@/components/ui/progress";
import ViewScoringMethod from "@/components/ViewScoringMethod";
import { Calendar, Activity, Clock, BadgeInfo, ArrowRight } from "lucide-react";

type LogType = {
  title: string;
  status: "positive" | "negative" | "neutral";
  description: string;
  date?: string;
  details?: string;
  rating?: number;
  id?: string;
  category?: string;
  duration?: string;
  frequency?: string;
  relatedFactors?: Array<{
    name: string;
    impact: "positive" | "negative" | "neutral";
    description: string;
  }>;
  scientificReferences?: Array<{
    title: string;
    publication?: string;
    year?: string;
    link?: string;
  }>;
  applicationMethod?: string;
  ingredients?: string[];
  beforeAfterNotes?: {
    before?: string;
    after?: string;
  };
  timeline?: Array<{
    day: number;
    observation: string;
  }>;
};

const RecentLogDetail = () => {
  const { logId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [log, setLog] = useState<LogType | null>(null);

  // Sample data - in a real app, this would come from an API or database
  const sampleLogs: LogType[] = [
    { 
      id: "retinol-cream",
      title: "Retinol Cream", 
      status: "positive", 
      description: "No reaction after 3 days",
      date: "May 9, 2025",
      category: "Skincare Product",
      duration: "3 days",
      frequency: "Daily (evening application)",
      details: "Applied a pea-sized amount before bed. Skin feels smoother in the morning with no irritation. After 3 days of consistent use, I've noticed reduced fine lines around my eyes and improved overall skin texture. No dryness or peeling observed.",
      rating: 85,
      applicationMethod: "Applied to cleansed, dry skin. Waited 10 minutes before applying moisturizer.",
      ingredients: ["Retinol", "Hyaluronic Acid", "Niacinamide", "Peptides", "Ceramides"],
      beforeAfterNotes: {
        before: "Fine lines around eyes, uneven texture on forehead, and some dullness on cheeks.",
        after: "Smoother texture, slightly reduced appearance of fine lines, and overall brighter complexion."
      },
      timeline: [
        { day: 1, observation: "Slight tingling sensation but no irritation." },
        { day: 2, observation: "Morning skin felt softer, no adverse reactions." },
        { day: 3, observation: "Noticeable improvement in skin texture and brightness." }
      ],
      relatedFactors: [
        { name: "Moisturizer", impact: "positive", description: "Using moisturizer after retinol reduced potential dryness" },
        { name: "Sleep", impact: "positive", description: "8+ hours of sleep may have enhanced results" }
      ],
      scientificReferences: [
        { 
          title: "Retinoids in the treatment of skin aging", 
          publication: "Clinical Interventions in Aging",
          year: "2022",
          link: "#"
        }
      ]
    },
    { 
      id: "whey-protein", 
      title: "Whey Protein", 
      status: "negative", 
      description: "Possible acne trigger",
      date: "May 8, 2025",
      category: "Dietary Supplement",
      duration: "1 week",
      frequency: "Daily (post-workout)",
      details: "Noticed small breakouts along jawline 24 hours after consuming whey protein shake. This is the third time I've observed this pattern. The breakouts typically subside after 3-4 days of discontinuing use.",
      rating: 30,
      ingredients: ["Whey Protein Isolate", "Natural Flavors", "Stevia", "Soy Lecithin"],
      beforeAfterNotes: {
        before: "Clear skin with only occasional hormonal breakout.",
        after: "Multiple small inflammatory papules along jawline and chin area."
      },
      timeline: [
        { day: 1, observation: "No immediate reaction." },
        { day: 2, observation: "Small breakouts appearing along jawline." },
        { day: 3, observation: "Increased inflammation and additional breakouts." },
        { day: 5, observation: "Breakouts continued to develop." }
      ],
      relatedFactors: [
        { name: "Dairy Sensitivity", impact: "negative", description: "May indicate general dairy sensitivity" },
        { name: "Hormonal Balance", impact: "neutral", description: "Breakout pattern consistent with hormonal acne locations" }
      ],
      scientificReferences: [
        { 
          title: "Dairy Intake and Acne Development", 
          publication: "Journal of Clinical Dermatology",
          year: "2023",
          link: "#"
        }
      ]
    },
    { 
      id: "avocado", 
      title: "Avocado", 
      status: "positive", 
      description: "Skin hydration improved",
      date: "May 7, 2025",
      category: "Food",
      duration: "2 weeks",
      frequency: "3-4 times per week",
      details: "Ate half an avocado with lunch. Noticed skin felt more hydrated by evening. This continues a pattern I've observed where regular avocado consumption correlates with improved skin moisture levels and fewer dry patches.",
      rating: 92,
      ingredients: ["Avocado"],
      beforeAfterNotes: {
        before: "Some dry patches on cheeks and around nose.",
        after: "Increased hydration, smoother texture, and elimination of dry patches."
      },
      timeline: [
        { day: 3, observation: "Skin feeling slightly more hydrated." },
        { day: 7, observation: "Noticeable reduction in dry patches." },
        { day: 14, observation: "Consistent improvement in overall skin hydration." }
      ],
      relatedFactors: [
        { name: "Healthy Fats", impact: "positive", description: "Omega-3 and monounsaturated fats may support skin barrier" },
        { name: "Vitamin E", impact: "positive", description: "Antioxidant properties may protect skin" }
      ],
      scientificReferences: [
        { 
          title: "Dietary Fatty Acids and Skin Health", 
          publication: "Journal of Dermatological Science",
          year: "2021",
          link: "#"
        }
      ]
    },
    { 
      id: "new-foundation",
      title: "New Foundation", 
      status: "neutral", 
      description: "No noticeable change",
      date: "May 6, 2025",
      category: "Makeup Product",
      duration: "5 days",
      frequency: "Daily application",
      details: "Tried new mineral foundation. Coverage is good, no reaction but no improvement either. The foundation applied smoothly and lasted throughout the day. Will continue monitoring for any long-term effects.",
      rating: 65,
      applicationMethod: "Applied with a foundation brush after moisturizer and primer.",
      ingredients: ["Titanium Dioxide", "Zinc Oxide", "Mica", "Iron Oxides"],
      beforeAfterNotes: {
        before: "Normal skin with some redness around nose.",
        after: "Good coverage of redness, but no skin improvement observed."
      },
      timeline: [
        { day: 1, observation: "Good coverage, comfortable wear." },
        { day: 3, observation: "No breakouts or irritation." },
        { day: 5, observation: "Consistent performance, neither improvement nor deterioration in skin condition." }
      ],
      relatedFactors: [
        { name: "Mineral Ingredients", impact: "neutral", description: "Non-comedogenic but no active beneficial ingredients" },
        { name: "Removal Process", impact: "neutral", description: "Double cleansing prevents potential clogging" }
      ]
    }
  ];

  useEffect(() => {
    // Check if we have log data passed through location state
    if (location.state && location.state.log) {
      // Enhance the log data with more details from our sample logs if available
      const enhancedLog = sampleLogs.find(l => l.id === location.state.log.id) || location.state.log;
      setLog(enhancedLog);
    } 
    // Otherwise look for the log by ID
    else if (logId) {
      const foundLog = sampleLogs.find(l => l.id === logId);
      if (foundLog) {
        setLog(foundLog);
      } else {
        // If no log is found, navigate to the logs list
        navigate("/recent-logs");
      }
    }
  }, [location, logId, navigate]);

  // Helper functions for status indicators and ratings
  const getStatusIndicator = (status: LogType['status']) => {
    switch (status) {
      case "positive":
        return "🟢";
      case "negative":
        return "🔴";
      case "neutral":
        return "🟡";
    }
  };

  const getStatusText = (status: LogType['status']) => {
    switch (status) {
      case "positive":
        return "Positive Effect";
      case "negative":
        return "Negative Effect";
      case "neutral":
        return "Neutral Effect";
    }
  };

  const getProgressColor = (rating: number) => {
    if (rating >= 70) return "bg-green-500";
    if (rating >= 40) return "bg-amber-500";
    return "bg-red-500";
  };

  const getRatingLabel = (rating: number) => {
    if (rating >= 80) return "Great";
    if (rating >= 60) return "Good";
    if (rating >= 40) return "OK";
    if (rating >= 20) return "Fair";
    return "Poor";
  };

  if (!log) {
    return (
      <div className="flex justify-center items-center h-48">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6 flex items-center">
          <BackButton />
          <h1 className="text-2xl font-bold">{log.title}</h1>
        </header>
        
        {/* Overview Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Overview</h2>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">{getStatusIndicator(log.status)}</span>
                <div>
                  <h2 className="text-xl font-semibold">{getStatusText(log.status)}</h2>
                  <p className="text-muted-foreground">{log.description}</p>
                </div>
              </div>

              {log.date && (
                <div className="mb-4 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                  <div>
                    <h3 className="text-base font-medium">Log Date</h3>
                    <p>{log.date}</p>
                  </div>
                </div>
              )}
              
              {log.category && (
                <div className="mb-4 flex items-center">
                  <BadgeInfo className="h-5 w-5 mr-2 text-muted-foreground" />
                  <div>
                    <h3 className="text-base font-medium">Category</h3>
                    <p>{log.category}</p>
                  </div>
                </div>
              )}

              {log.duration && (
                <div className="mb-4 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
                  <div>
                    <h3 className="text-base font-medium">Duration</h3>
                    <p>{log.duration}</p>
                  </div>
                </div>
              )}

              {log.rating !== undefined && (
                <div className="mb-6">
                  <div className="flex items-center mb-1">
                    <Activity className="h-5 w-5 mr-2 text-muted-foreground" />
                    <h3 className="text-base font-medium">Effect Rating</h3>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-1 mr-4">
                      <Progress 
                        value={log.rating} 
                        className="h-3 bg-gray-100" 
                        indicatorClassName={getProgressColor(log.rating)} 
                      />
                    </div>
                    <div className="text-base font-semibold">{log.rating}/100</div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{getRatingLabel(log.rating)}</p>
                </div>
              )}

              {log.details && (
                <div>
                  <h3 className="text-base font-medium mb-1">Summary</h3>
                  <p className="text-sm">{log.details}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-3">Recommendations</h2>
              {log.status === "positive" ? (
                <ul className="list-disc pl-4 space-y-2">
                  <li>Continue using this {log.category?.toLowerCase() || "product/ingredient"} in your routine</li>
                  <li>Consider increasing frequency if beneficial</li>
                  <li>Monitor for consistent positive effects</li>
                  {log.frequency && <li>Current frequency: {log.frequency} (maintain this pattern)</li>}
                </ul>
              ) : log.status === "negative" ? (
                <ul className="list-disc pl-4 space-y-2">
                  <li>Consider discontinuing use of this {log.category?.toLowerCase() || "product/ingredient"}</li>
                  <li>Look for alternatives without triggering components</li>
                  <li>Review ingredients for potential irritants</li>
                  {log.ingredients && <li>Consider avoiding these specific ingredients: {log.ingredients.slice(0,2).join(", ")}</li>}
                </ul>
              ) : (
                <ul className="list-disc pl-4 space-y-2">
                  <li>Continue monitoring effects over longer period</li>
                  <li>Consider adjusting usage frequency</li>
                  <li>Try combining with other beneficial products</li>
                  {log.applicationMethod && <li>You may need to adjust application method: "{log.applicationMethod}"</li>}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Details Section */}
        {(log.ingredients || log.applicationMethod || log.beforeAfterNotes || (log.timeline && log.timeline.length > 0)) && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Details</h2>
            <div className="space-y-4">
              {log.ingredients && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-3">Ingredients</h3>
                    <div className="flex flex-wrap gap-2">
                      {log.ingredients.map((ingredient, index) => (
                        <span 
                          key={index} 
                          className="text-sm bg-slate-100 text-slate-800 px-3 py-1 rounded-full"
                        >
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {log.applicationMethod && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-3">Application Method</h3>
                    <p>{log.applicationMethod}</p>
                  </CardContent>
                </Card>
              )}
              
              {log.beforeAfterNotes && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-3">Before & After</h3>
                    {log.beforeAfterNotes.before && (
                      <div className="mb-3">
                        <h4 className="font-medium text-gray-700">Before:</h4>
                        <p className="text-sm">{log.beforeAfterNotes.before}</p>
                      </div>
                    )}
                    {log.beforeAfterNotes.after && (
                      <div>
                        <h4 className="font-medium text-gray-700">After:</h4>
                        <p className="text-sm">{log.beforeAfterNotes.after}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
              
              {log.timeline && log.timeline.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-3">Timeline</h3>
                    <div className="space-y-3">
                      {log.timeline.map((entry, index) => (
                        <div key={index} className="flex items-start">
                          <div className="bg-slate-100 rounded-full h-7 w-7 flex items-center justify-center mr-3 mt-0.5">
                            <span className="text-sm font-medium">{entry.day}</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Day {entry.day}</p>
                            <p className="text-sm text-gray-600">{entry.observation}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
        
        {/* Science Section */}
        {(log.relatedFactors || log.scientificReferences) && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Science</h2>
            <div className="space-y-4">
              {log.relatedFactors && log.relatedFactors.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-3">Related Factors</h3>
                    <div className="space-y-3">
                      {log.relatedFactors.map((factor, index) => (
                        <div key={index} className="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                          <div className="flex items-center">
                            <span className="mr-2">
                              {factor.impact === "positive" && "🟢"}
                              {factor.impact === "negative" && "🔴"}
                              {factor.impact === "neutral" && "🟡"}
                            </span>
                            <h4 className="font-medium">{factor.name}</h4>
                          </div>
                          <p className="text-sm text-gray-600 ml-6">{factor.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {log.scientificReferences && log.scientificReferences.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-3">Scientific References</h3>
                    <div className="space-y-3">
                      {log.scientificReferences.map((reference, index) => (
                        <div key={index} className="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                          <h4 className="font-medium text-blue-600">{reference.title}</h4>
                          <p className="text-sm text-gray-600">
                            {reference.publication}
                            {reference.year && ` (${reference.year})`}
                          </p>
                          {reference.link && (
                            <a href={reference.link} className="text-sm text-blue-500 flex items-center mt-1">
                              Read more <ArrowRight className="h-3 w-3 ml-1" />
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">Data Analysis</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    This assessment is based on your personal experience and may not represent universal results. 
                    The analysis takes into account multiple factors including:
                  </p>
                  <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                    <li>Your skin type and sensitivity</li>
                    <li>Application method and frequency</li>
                    <li>Environmental factors during testing period</li>
                    <li>Combined effects with other products/factors</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
        
        {/* View Scoring Method (always at bottom) */}
        {log.rating !== undefined && <ViewScoringMethod />}
      </div>
    </div>
  );
};

export default RecentLogDetail;
