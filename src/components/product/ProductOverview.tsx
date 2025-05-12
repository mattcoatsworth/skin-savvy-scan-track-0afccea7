
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BadgeInfo, Calendar, Activity, MessageSquare } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface ProductOverviewProps {
  isLoading: boolean;
  product: any;
  type: string;
  aiContent: any;
  askAiAboutProduct: () => void;
}

const ProductOverview = ({ isLoading, product, type, aiContent, askAiAboutProduct }: ProductOverviewProps) => {
  const LoadingIndicator = () => (
    <div className="flex items-center justify-center py-4">
      <div className="flex space-x-2">
        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '600ms' }}></div>
      </div>
    </div>
  );

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

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Overview</h2>
      </div>
      <Card>
        <CardContent className="p-6">
          {isLoading ? (
            <LoadingIndicator />
          ) : (
            <div>
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
                <h3 className="text-base font-medium mb-1">AI Generated Summary</h3>
                <div className="text-sm bg-transparent py-1">
                  {aiContent.overview?.sections["Brief Summary"] && (
                    <p>
                      {typeof aiContent.overview.sections["Brief Summary"] === 'string' 
                        ? aiContent.overview.sections["Brief Summary"]
                        : "Summary of benefits and effects"}
                    </p>
                  )}
                </div>
              </div>
              
              <Button 
                onClick={askAiAboutProduct}
                className="w-full mt-4 flex items-center justify-center gap-2"
                variant="outline"
              >
                <MessageSquare className="h-4 w-4" />
                Ask AI about this product
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductOverview;
