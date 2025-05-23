
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import ViewScoringMethod from "@/components/ViewScoringMethod";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import BackButton from "@/components/BackButton";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Calendar, Info, Star, Heart, MessageSquare, Tag, Leaf, BarChart2, Droplet } from "lucide-react";
import { Button } from "@/components/ui/button";
import DisclaimerCard from "@/components/DisclaimerCard";

const AvocadoProductDetail = () => {
  // Add scroll to top functionality
  useScrollToTop();
  
  const [activeTab, setActiveTab] = useState("overview");
  
  // Avocado product data
  const avocado = {
    id: "avocado", 
    name: "Avocado", 
    brand: "Organic Produce",
    rating: 90, 
    impact: "Positive", 
    description: "High in healthy fats that improve skin elasticity",
    benefits: [
      "Rich in vitamin E that helps protect skin from oxidative damage",
      "Contains healthy fats that support skin barrier function",
      "Promotes collagen production for firmer skin"
    ]
  };

  // Get rating color based on score
  const getRatingColor = (rating: number) => {
    if (rating >= 80) return "bg-green-500";
    if (rating >= 60) return "bg-amber-500";
    return "bg-red-500";
  };
  
  // Get rating label based on score
  const getRatingLabel = (rating: number) => {
    if (rating >= 80) return "Great";
    if (rating >= 60) return "Good";
    if (rating >= 40) return "OK";
    if (rating >= 20) return "Fair";
    return "Poor";
  };

  // Avocado-specific nutritional information
  const nutritionalInfo = [
    { name: "Healthy Fats", value: "15g", color: "bg-emerald-100 text-emerald-800" },
    { name: "Fiber", value: "7g", color: "bg-amber-100 text-amber-800" },
    { name: "Vitamin E", value: "10%", color: "bg-blue-100 text-blue-800" },
    { name: "Potassium", value: "14%", color: "bg-purple-100 text-purple-800" },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6 flex items-center">
          <BackButton />
          <div>
            <h1 className="text-2xl font-bold">Avocado</h1>
            <p className="text-muted-foreground">Organic Produce</p>
          </div>
        </header>
        
        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="foryou">For You</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-0">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div>
                    <h2 className="text-xl font-semibold">Positive Effect</h2>
                    <p className="text-muted-foreground">High in healthy fats that improve skin elasticity</p>
                  </div>
                </div>

                <div className="mb-4 flex items-center">
                  <Info className="h-5 w-5 mr-2 text-muted-foreground" />
                  <div>
                    <h3 className="text-base font-medium">Category</h3>
                    <p>Food</p>
                  </div>
                </div>
                
                <div className="mb-4 flex items-center">
                  <Tag className="h-5 w-5 mr-2 text-muted-foreground" />
                  <div>
                    <h3 className="text-base font-medium">Brand</h3>
                    <p>Organic Produce</p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center mb-1">
                    <Star className="h-5 w-5 mr-2 text-muted-foreground" />
                    <h3 className="text-base font-medium">Effect Rating</h3>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-1 mr-4">
                      <Progress 
                        value={90} 
                        className="h-3 bg-gray-100" 
                        indicatorClassName="bg-green-500" 
                      />
                    </div>
                    <div className="text-base font-semibold">90/100</div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Great</p>
                </div>

                <div>
                  <h3 className="text-base font-medium mb-2">Key Benefits</h3>
                  <div className="space-y-2">
                    {avocado.benefits?.map((benefit, index) => (
                      <div key={index} className="flex">
                        <div className="mr-2 text-green-500">✓</div>
                        <p className="text-sm">{benefit}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-6 flex items-center justify-center gap-2"
                  variant="outline"
                  onClick={() => window.location.href = "/chat?about=Avocado"}
                >
                  <MessageSquare className="h-4 w-4" />
                  Ask AI about this product
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Details Tab */}
          <TabsContent value="details" className="mt-0">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Product Details</h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center mb-2">
                      <Leaf className="h-5 w-5 mr-2 text-emerald-500" />
                      <h4 className="font-medium">Nutritional Profile</h4>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {nutritionalInfo.map((nutrient, idx) => (
                        <div key={idx} className="flex items-center">
                          <Badge className={nutrient.color + " mr-2"}>
                            {nutrient.value}
                          </Badge>
                          <span className="text-sm">{nutrient.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-2">
                      <BarChart2 className="h-5 w-5 mr-2 text-blue-500" />
                      <h4 className="font-medium">Skin Impact</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Avocados contain essential fatty acids that help maintain skin elasticity and prevent premature aging.
                      The vitamin E in avocados acts as an antioxidant, protecting skin cells from oxidative damage.
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-2">
                      <Droplet className="h-5 w-5 mr-2 text-cyan-500" />
                      <h4 className="font-medium">Best Consumed</h4>
                    </div>
                    <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                      <li>As a spread on whole grain toast</li>
                      <li>Added to salads</li>
                      <li>In smoothies for added creaminess</li>
                      <li>As guacamole with fresh vegetables</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* For You Tab */}
          <TabsContent value="foryou" className="mt-0">
            <Card>
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-1">Personal Match Rating</h3>
                  <div className="flex items-center">
                    <div className="flex-1 mr-4">
                      <Progress 
                        value={92} 
                        className="h-3 bg-gray-100" 
                        indicatorClassName="bg-green-500" 
                      />
                    </div>
                    <div className="text-base font-semibold">92/100</div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Excellent match</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-1">Recommendation</h3>
                    <p className="text-sm">Based on your skin profile, incorporating avocado regularly could help with your dry skin concerns and improve overall elasticity.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-1">Why This Works For You</h3>
                    <p className="text-sm text-gray-600">The healthy fats in avocados align well with your skin's needs, especially considering your recent skin logs showing increased dryness. The antioxidants can also help address the inflammation patterns we've observed.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-1">Usage Suggestion</h3>
                    <p className="text-sm text-gray-600">Try consuming 1/4 to 1/2 an avocado daily for optimal benefits. You may see improvements in your skin's moisture levels within 2-3 weeks of regular consumption.</p>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-6 flex items-center justify-center gap-2"
                  onClick={() => {}} 
                >
                  <Heart className="h-4 w-4" />
                  Save to My Foods
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* View Scoring Method */}
        <ViewScoringMethod />
        
        {/* Disclaimer */}
        <DisclaimerCard
          disclaimerText="This information is for educational purposes only and is not intended as medical advice. Always consult with a healthcare professional or dietitian for personalized recommendations regarding your dietary needs."
        />
      </div>
    </div>
  );
};

export default AvocadoProductDetail;
