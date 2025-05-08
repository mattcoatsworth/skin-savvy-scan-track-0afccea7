
import React from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import AppNavigation from "@/components/AppNavigation";

// Import product data (In a real app, this would come from an API)
import { foodItems, productItems } from "@/data/products";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";

const ProductDetail = () => {
  const { type, id } = useParams<{ type: string; id: string }>();
  
  // Get the correct product based on type
  const products = type === "food" ? foodItems : productItems;
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return (
      <div className="bg-slate-50 min-h-screen">
        <div className="max-w-md mx-auto px-4 py-6">
          <header className="flex items-center mb-6">
            <Link to="/insights" className="mr-2">
              <ArrowRight className="h-5 w-5 transform rotate-180" />
            </Link>
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
          <AppNavigation />
        </div>
      </div>
    );
  }

  // Determine rating label and color
  const getRatingLabel = (rating: number) => {
    if (rating >= 70) return "Good";
    if (rating >= 40) return "Neutral";
    return "Poor";
  };
  
  const getRatingColor = (rating: number) => {
    if (rating >= 70) return "#4ADE80"; // Good - Green
    if (rating >= 40) return "#FACC15"; // OK - Yellow
    return "#F87171"; // Poor - Red
  };
  
  const getBackgroundColor = (rating: number) => {
    if (rating >= 70) return "#E6F8EA"; // Light green
    if (rating >= 40) return "#FEF7CD"; // Light yellow
    return "#FFDEE2"; // Light red
  };
  
  const getTextColor = (rating: number) => {
    if (rating >= 70) return "text-green-600";
    if (rating >= 40) return "text-amber-600";
    return "text-red-600";
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="flex items-center mb-6">
          <Link to="/insights" className="mr-2">
            <ArrowRight className="h-5 w-5 transform rotate-180" />
          </Link>
          <h1 className="text-2xl font-bold">{product.name}</h1>
        </header>

        {/* Product Overview Card */}
        <Card className="mb-6 ios-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-muted-foreground">{product.brand}</p>
              </div>

              <div className="relative h-20 w-20">
                <svg viewBox="0 0 36 36" className="h-20 w-20">
                  {/* Light colored background circle */}
                  <path
                    className="stroke-current"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    strokeWidth="4"
                    strokeLinecap="round"
                    stroke={getBackgroundColor(product.rating)}
                  />
                  {/* Foreground progress circle */}
                  <path
                    className="stroke-current"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={`${product.rating}, 100`}
                    stroke={getRatingColor(product.rating)}
                  />
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="font-semibold text-xl">{product.rating}</div>
                  <div className={`text-sm ${getTextColor(product.rating)}`}>
                    {getRatingLabel(product.rating)}
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <Badge 
                variant={product.impact === "Positive" ? "default" : product.impact === "Neutral" ? "secondary" : "destructive"}
                className="mb-2"
              >
                {product.impact} Impact
              </Badge>
              <p>{product.description}</p>
            </div>
          </CardContent>
        </Card>

        {/* Benefits Section */}
        {product.benefits && product.benefits.length > 0 && (
          <Card className="mb-6 ios-card">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Skin Benefits</h2>
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
        )}

        {/* Concerns Section */}
        {product.concerns && product.concerns.length > 0 && (
          <Card className="mb-6 ios-card">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Potential Concerns</h2>
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
        )}
        
        {/* Recommended Actions */}
        <Card className="mb-6 ios-card">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Recommended Actions</h2>
            {product.rating >= 70 ? (
              <p>Continue using this product as it has shown positive effects on your skin.</p>
            ) : product.rating >= 40 ? (
              <p>Monitor usage of this product to see if your skin responds well over time.</p>
            ) : (
              <p>Consider reducing or eliminating this product as it may be having negative effects on your skin.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <AppNavigation />
    </div>
  );
};

export default ProductDetail;
