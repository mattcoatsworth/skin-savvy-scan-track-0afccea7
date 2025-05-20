
import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import ViewScoringMethod from "@/components/ViewScoringMethod";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { foodItems, productItems } from "@/data/products";
import BackButton from "@/components/BackButton";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Calendar, Info, Star, Heart, MessageSquare, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getRatingColor, getRatingLabel } from "./utils";
import DisclaimerCard from "@/components/DisclaimerCard";

const ProductDetail = () => {
  // Add scroll to top functionality
  useScrollToTop();
  
  const { type, id } = useParams<{ type: string; id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState("overview");
  
  // First try to get product from location state
  const productFromState = location.state?.product;
  
  // If not in state, get from our data
  const products = type === "food" ? foodItems : productItems;
  const product = productFromState || products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="bg-slate-50 min-h-screen pb-20">
        <div className="max-w-md mx-auto px-4 py-6">
          <header className="flex items-center mb-6">
            <BackButton />
            <h1 className="text-2xl font-bold">Product Not Found</h1>
          </header>
          <Card>
            <CardContent className="p-6">
              <p>Sorry, the product you're looking for couldn't be found.</p>
              <Link to="/products" className="text-skin-teal flex items-center mt-4">
                Return to Products
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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
                    <p>{type === "food" ? "Food" : "Skincare Product"}</p>
                  </div>
                </div>
                
                {product.brand && (
                  <div className="mb-4 flex items-center">
                    <Tag className="h-5 w-5 mr-2 text-muted-foreground" />
                    <div>
                      <h3 className="text-base font-medium">Brand</h3>
                      <p>{product.brand}</p>
                    </div>
                  </div>
                )}

                {product.rating !== undefined && (
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
                )}

                <div>
                  <h3 className="text-base font-medium mb-2">Key Benefits</h3>
                  <div className="space-y-2">
                    {product.benefits ? (
                      product.benefits.map((benefit, index) => (
                        <div key={index} className="flex">
                          <div className="mr-2 text-green-500">✓</div>
                          <p className="text-sm">{benefit}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No specific benefits listed.</p>
                    )}
                  </div>
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
                  onClick={() => navigate(`/chat?about=${product.name}`)}
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
                <h3 className="text-lg font-semibold mb-3">Product Details</h3>
                
                {type === "food" ? (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">Nutritional Benefits</h4>
                      <p className="text-sm text-muted-foreground">
                        {product.description}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium">Skin Impact</h4>
                      <div className="flex items-center mt-1">
                        <Badge className={product.impact === "Positive" ? "bg-green-100 text-green-800" : 
                                         product.impact === "Negative" ? "bg-red-100 text-red-800" : 
                                         "bg-gray-100 text-gray-800"}>
                          {product.impact}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">Product Description</h4>
                      <p className="text-sm text-muted-foreground">
                        {product.description}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium">Usage Recommendations</h4>
                      <p className="text-sm text-muted-foreground">
                        Apply as directed by manufacturer. Patch test before full application if you have sensitive skin.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium">Best For</h4>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {product.benefits?.map((benefit, index) => (
                          <Badge key={index} variant="outline">
                            {benefit.split(' ').slice(0, 2).join(' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
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
                        value={75} 
                        className="h-3 bg-gray-100" 
                        indicatorClassName="bg-green-500" 
                      />
                    </div>
                    <div className="text-base font-semibold">75/100</div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Good match</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-1">Recommendation</h3>
                    <p className="text-sm">This product is well-suited for your skin type and concerns. Consider incorporating it into your routine.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-1">Why This Works For You</h3>
                    <p className="text-sm text-gray-600">Based on your skin logs, this product contains ingredients that address your specific concerns and should provide benefits for your skin type.</p>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-6 flex items-center justify-center gap-2"
                  onClick={() => {}} 
                >
                  <Heart className="h-4 w-4" />
                  Save to My Products
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* View Scoring Method */}
        <ViewScoringMethod />
        
        {/* Disclaimer */}
        <DisclaimerCard
          disclaimerText="This information is for educational purposes only and is not intended as medical advice. Always consult with a healthcare professional or dermatologist for personalized recommendations and treatment options regarding skin concerns."
        />
      </div>
    </div>
  );
};

export default ProductDetail;
