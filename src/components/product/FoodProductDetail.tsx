
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import ViewScoringMethod from "@/components/ViewScoringMethod";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import BackButton from "@/components/BackButton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Calendar, Info, Star, Heart, MessageSquare, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import DisclaimerCard from "@/components/DisclaimerCard";
import { getRatingColor, getRatingLabel, getRatingTextColor } from "@/utils/product-utils";
import ProductBenefitsList from "./ProductBenefitsList";
import ForYouContent from "./ForYouContent";
import { Product } from "@/Products/types";

interface FoodProductDetailProps {
  product: Product;
  nutritionalContent?: React.ReactNode;
  skinImpactContent?: React.ReactNode;
  consumptionTips?: React.ReactNode;
  personalRating?: number;
  recommendationText?: string;
  whyItWorks?: string;
  usageSuggestion?: string;
  disclaimer?: string;
}

const FoodProductDetail: React.FC<FoodProductDetailProps> = ({
  product,
  nutritionalContent,
  skinImpactContent,
  consumptionTips,
  personalRating = 80,
  recommendationText = "This food is generally good for most skin types.",
  whyItWorks = "The nutritional profile of this food contains beneficial compounds that can support skin health.",
  usageSuggestion = "Try incorporating this food into your regular diet for potential skin benefits.",
  disclaimer = "This information is for educational purposes only and is not intended as medical advice. Always consult with a healthcare professional or dietitian for personalized recommendations regarding your dietary needs."
}) => {
  // Add scroll to top functionality
  useScrollToTop();
  
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  
  // Get match quality based on personalized rating
  const getMatchQuality = (rating: number) => {
    if (rating >= 90) return "Excellent match";
    if (rating >= 80) return "Great match";
    if (rating >= 60) return "Good match";
    if (rating >= 40) return "Fair match";
    return "Poor match";
  };

  const handleAskAI = () => {
    navigate(`/chat?about=${encodeURIComponent(product.name)}`);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6 flex items-center">
          <BackButton />
          <div>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-muted-foreground">{product.brand}</p>
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
                    <h2 className="text-xl font-semibold">{product.impact} Effect</h2>
                    <p className="text-muted-foreground">{product.description}</p>
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
                    <p>{product.brand}</p>
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
                        value={product.rating} 
                        className="h-3 bg-gray-100" 
                        indicatorClassName={getRatingColor(product.rating)} 
                      />
                    </div>
                    <div className="text-base font-semibold">{product.rating}/100</div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{getRatingLabel(product.rating)}</p>
                </div>

                <div>
                  <h3 className="text-base font-medium mb-2">Key Benefits</h3>
                  {product.benefits && <ProductBenefitsList benefits={product.benefits} />}
                </div>
                
                {product.concerns && product.concerns.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-base font-medium mb-2">Potential Concerns</h3>
                    <div className="space-y-2">
                      {product.concerns.map((concern, index) => (
                        <div key={index} className="flex">
                          <div className="mr-2 text-amber-500">!</div>
                          <p className="text-sm">{concern}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <Button 
                  className="w-full mt-6 flex items-center justify-center gap-2"
                  variant="outline"
                  onClick={handleAskAI}
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
                  {nutritionalContent && (
                    <div>
                      {nutritionalContent}
                    </div>
                  )}
                  
                  {skinImpactContent && (
                    <div>
                      {skinImpactContent}
                    </div>
                  )}
                  
                  {consumptionTips && (
                    <div>
                      {consumptionTips}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* For You Tab */}
          <TabsContent value="foryou" className="mt-0">
            <ForYouContent
              personalRating={personalRating}
              matchQuality={getMatchQuality(personalRating)}
              recommendation={recommendationText}
              whyItWorks={whyItWorks}
              usageSuggestion={usageSuggestion}
              saveButtonText="Save to My Foods"
            />
          </TabsContent>
        </Tabs>
        
        {/* View Scoring Method */}
        <ViewScoringMethod />
        
        {/* Disclaimer */}
        <DisclaimerCard
          disclaimerText={disclaimer}
        />
      </div>
    </div>
  );
};

export default FoodProductDetail;
