
import React from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, XCircle, Calendar, BadgeInfo, Clock, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import BackButton from "@/components/BackButton";
import ViewScoringMethod from "@/components/ViewScoringMethod";

// Import product data (In a real app, this would come from an API)
import { foodItems, productItems } from "@/data/products";

const ProductDetail = () => {
  const { type, id } = useParams<{ type: string; id: string }>();
  const location = useLocation();
  
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
              <Link to="/insights" className="text-skin-teal flex items-center mt-4">
                Return to Insights
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Determine rating label and color
  const getRatingLabel = (rating: number) => {
    if (rating >= 80) return "Great";
    if (rating >= 60) return "Good";
    if (rating >= 40) return "OK";
    if (rating >= 20) return "Fair";
    return "Poor";
  };
  
  const getProgressColor = (rating: number) => {
    if (rating >= 70) return "bg-green-500";
    if (rating >= 40) return "bg-amber-500";
    return "bg-red-500";
  };
  
  const getTextColor = (rating: number) => {
    if (rating >= 70) return "text-green-600";
    if (rating >= 40) return "text-amber-600";
    return "text-red-600";
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6 flex items-center">
          <BackButton />
          <h1 className="text-2xl font-bold">{product.name}</h1>
        </header>
        
        {/* Overview Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Overview</h2>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div>
                  <h2 className="text-xl font-semibold">{product.impact} Effect</h2>
                  <p className="text-muted-foreground">{product.description}</p>
                </div>
              </div>

              <div className="mb-4 flex items-center">
                <BadgeInfo className="h-5 w-5 mr-2 text-muted-foreground" />
                <div>
                  <h3 className="text-base font-medium">Category</h3>
                  <p>{type === "food" ? "Food" : "Skincare Product"}</p>
                </div>
              </div>
              
              {product.brand && (
                <div className="mb-4 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                  <div>
                    <h3 className="text-base font-medium">Brand</h3>
                    <p>{product.brand}</p>
                  </div>
                </div>
              )}

              {product.rating !== undefined && (
                <div className="mb-6">
                  <div className="flex items-center mb-1">
                    <Activity className="h-5 w-5 mr-2 text-muted-foreground" />
                    <h3 className="text-base font-medium">Effect Rating</h3>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-1 mr-4">
                      <Progress 
                        value={product.rating} 
                        className="h-3 bg-gray-100" 
                        indicatorClassName={getProgressColor(product.rating)} 
                      />
                    </div>
                    <div className="text-base font-semibold">{product.rating}/100</div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{getRatingLabel(product.rating)}</p>
                </div>
              )}

              <div>
                <h3 className="text-base font-medium mb-1">Summary</h3>
                <p className="text-sm">{product.description}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-3">Recommendations</h2>
              {product.impact === "Positive" ? (
                <ul className="list-disc pl-4 space-y-2">
                  <li>Continue using this product in your routine</li>
                  <li>Consider increasing frequency if beneficial</li>
                  <li>Monitor for consistent positive effects</li>
                </ul>
              ) : product.impact === "Negative" ? (
                <ul className="list-disc pl-4 space-y-2">
                  <li>Consider discontinuing use of this product</li>
                  <li>Look for alternatives without triggering components</li>
                  <li>Review ingredients for potential irritants</li>
                </ul>
              ) : (
                <ul className="list-disc pl-4 space-y-2">
                  <li>Continue monitoring effects over longer period</li>
                  <li>Consider adjusting usage frequency</li>
                  <li>Try combining with other beneficial products</li>
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Benefits Section */}
        {product.benefits && product.benefits.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Details</h2>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">Skin Benefits</h3>
                <div className="space-y-3">
                  {product.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <p>{benefit}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Concerns Section */}
        {product.concerns && product.concerns.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Potential Concerns</h2>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {product.concerns.map((concern, index) => (
                    <div key={index} className="flex items-start">
                      <XCircle className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                      <p>{concern}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        {/* Data Analysis Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Science</h2>
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
        
        {/* View Scoring Method (always at bottom) */}
        <ViewScoringMethod />
      </div>
    </div>
  );
};

export default ProductDetail;
