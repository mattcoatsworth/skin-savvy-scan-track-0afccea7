
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

interface ProductDetailsProps {
  isLoading: boolean;
  detailsSections: any[];
  aiContent: any;
}

const ProductDetails = ({ isLoading, detailsSections, aiContent }: ProductDetailsProps) => {
  const LoadingIndicator = () => (
    <div className="flex items-center justify-center py-4">
      <div className="flex space-x-2">
        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '600ms' }}></div>
      </div>
    </div>
  );

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Details</h2>
      </div>
      
      {isLoading ? (
        <Card>
          <CardContent className="p-6">
            <LoadingIndicator />
          </CardContent>
        </Card>
      ) : (
        detailsSections.length > 0 ? (
          <div className="space-y-4">
            {detailsSections.map((section, idx) => (
              <div key={idx} className="ai-section">
                <h3 className="ai-section-title">{section.title === "Brief Summary" ? "Key Benefits" : section.title}</h3>
                
                <div className="space-y-3">
                  {section.items.map((item: any, itemIdx: number) => (
                    <Link to={item.linkTo} key={itemIdx} className="block">
                      <Card className="ios-card mb-4 hover:shadow-md transition-shadow">
                        <CardContent className="p-4 flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-base">
                              {section.title === "Brief Summary" 
                                ? `${item.productName || ''} Benefit`
                                : item.text.split(":")[0] || `Point ${itemIdx + 1}`}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {item.text.includes(":") 
                                ? item.text.split(":").slice(1).join(":").trim()
                                : item.text}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-3">AI Generated Details</h3>
              <div className="text-sm">
                {aiContent.details?.formattedHtml ? (
                  <div dangerouslySetInnerHTML={{ __html: aiContent.details.formattedHtml }} className="skin-advice-content" />
                ) : (
                  <p>No details available for this product.</p>
                )}
              </div>
            </CardContent>
          </Card>
        )
      )}
    </div>
  );
};

export default ProductDetails;
