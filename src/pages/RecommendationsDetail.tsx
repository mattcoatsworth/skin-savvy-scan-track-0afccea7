
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Check, Info, ArrowRight, Apple, Pill, Moon, Activity } from "lucide-react";
import BackButton from "@/components/BackButton";
import { Link } from "react-router-dom";

const RecommendationsDetail = () => {
  // Mock data for recommendations
  const recommendations = [
    {
      id: 1,
      title: "Reduce dairy consumption",
      category: "food",
      icon: <Apple className="h-5 w-5" />,
      description: "Dairy products show a strong correlation with inflammation in your skin. Consider reducing or eliminating dairy for 2 weeks to observe changes.",
      actionSteps: [
        "Replace milk with plant-based alternatives like oat or almond milk",
        "Limit cheese to once per week",
        "Check food labels for hidden dairy ingredients",
        "Track dairy consumption in your food log"
      ],
      expectedResults: "Reduced inflammation, fewer breakouts, especially around chin and jawline"
    },
    {
      id: 2,
      title: "Continue consistent hydration habits",
      category: "food",
      icon: <Apple className="h-5 w-5" />,
      description: "Your consistent water intake has positively impacted skin hydration levels. Maintain this habit for continued benefits.",
      actionSteps: [
        "Continue drinking 8+ cups of water daily",
        "Consider infusing water with cucumber or lemon for added benefits",
        "Limit dehydrating beverages like alcohol and caffeine",
        "Use a hydration tracking app or water bottle"
      ],
      expectedResults: "Maintained skin hydration, plumpness, and elasticity"
    },
    {
      id: 3,
      title: "Maintain sunscreen application routine",
      category: "products",
      icon: <Pill className="h-5 w-5" />,
      description: "Your consistent sunscreen use is effectively protecting your skin. Continue this essential habit daily.",
      actionSteps: [
        "Apply SPF 30+ every morning, even on cloudy days",
        "Reapply every 2 hours when outdoors",
        "Consider a moisturizer with built-in SPF for convenience",
        "Don't forget often-missed areas like ears and neck"
      ],
      expectedResults: "Reduced signs of photoaging, prevented sunspots and damage"
    },
    {
      id: 4,
      title: "Add vitamin C serum to morning routine",
      category: "products",
      icon: <Pill className="h-5 w-5" />,
      description: "Based on your skin concerns and goals, adding vitamin C could help with brightness and protection.",
      actionSteps: [
        "Select a stable vitamin C formula (look for L-ascorbic acid 10-20%)",
        "Apply in the morning after cleansing, before moisturizer",
        "Store properly away from light and air",
        "Patch test before full application"
      ],
      expectedResults: "Improved skin brightness, reduced hyperpigmentation, enhanced UV protection"
    },
    {
      id: 5,
      title: "Aim for 7-8 hours of sleep consistently",
      category: "sleep",
      icon: <Moon className="h-5 w-5" />,
      description: "Your sleep patterns show room for improvement. Consistent quality sleep is crucial for skin repair and regeneration.",
      actionSteps: [
        "Establish a regular sleep schedule, even on weekends",
        "Create a relaxing bedtime routine",
        "Avoid screens 1 hour before bedtime",
        "Keep bedroom cool and dark"
      ],
      expectedResults: "Reduced under-eye circles, improved skin tone, enhanced overall skin health"
    },
    {
      id: 6,
      title: "Incorporate stress management techniques",
      category: "stress",
      icon: <Activity className="h-5 w-5" />,
      description: "High stress days correlate with skin inflammation. Implementing regular stress management could significantly improve skin condition.",
      actionSteps: [
        "Practice 10 minutes of meditation daily",
        "Try deep breathing exercises during high-stress moments",
        "Consider gentle yoga or stretching before bed",
        "Take short breaks throughout workday"
      ],
      expectedResults: "Reduced inflammation, fewer stress-related breakouts, improved overall skin tone"
    },
    {
      id: 7,
      title: "Consider pausing this supplement to see if irritation decreases",
      category: "supplements",
      icon: <Pill className="h-5 w-5" />,
      description: "We've detected a possible correlation between your collagen supplement and recent skin irritation.",
      actionSteps: [
        "Pause collagen supplementation for 2 weeks",
        "Monitor skin reaction during this period",
        "Document changes in your skin log",
        "Consider alternative supplement formulations"
      ],
      expectedResults: "Potential reduction in skin irritation and sensitivity if supplement is the trigger",
      linkTo: "/supplement/collagen"
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6">
          <BackButton />
          <h1 className="text-2xl font-bold mt-2">Detailed Recommendations</h1>
          <div className="flex items-center text-sm text-muted-foreground mt-1">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Based on your last 30 days of data</span>
          </div>
        </header>

        <Card className="ios-card mb-6">
          <CardContent className="p-4">
            <div className="flex items-start">
              <Info className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-sm">
                These personalized recommendations are based on patterns in your skin data, 
                lifestyle factors, and product usage. Implementing these suggestions could 
                significantly improve your skin health over time.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6 mb-6">
          {recommendations.map((rec) => (
            <Card key={rec.id} className="ios-card">
              <CardContent className="p-4">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mr-3">
                    {rec.icon}
                  </div>
                  <h2 className="text-lg font-medium">{rec.title}</h2>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">
                  {rec.description}
                </p>
                
                <div className="mb-4">
                  <h3 className="text-sm font-medium mb-2">Action Steps:</h3>
                  <ul className="space-y-2">
                    {rec.actionSteps.map((step, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-sm">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-sm font-medium mb-2">Expected Results:</h3>
                  <p className="text-sm text-muted-foreground">{rec.expectedResults}</p>
                </div>
                
                <div className="pt-3 border-t">
                  <Link 
                    to={rec.linkTo || `/category-analysis/${rec.category}`}
                    className="text-skin-teal text-sm font-medium flex items-center justify-end"
                  >
                    {rec.linkTo ? 'Learn more about this supplement' : 'See related category'} <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendationsDetail;
