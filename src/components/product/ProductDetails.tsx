
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Salad, AlertCircle, Apple, LeafyGreen, Carrot, BarChart2 } from "lucide-react";

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

  // Get a section-appropriate icon
  const getSectionIcon = (title: string) => {
    switch (title.toLowerCase()) {
      case "key benefits":
      case "brief summary":
        return CheckCircle2;
      case "nutrition facts":
        return Salad;
      case "potential concerns":
        return AlertCircle;
      case "vitamins & minerals":
        return LeafyGreen;
      case "health benefits":
        return Apple;
      case "dietary considerations":
        return BarChart2;
      default:
        return Carrot;
    }
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Details</h2>
      </div>
      
      {isLoading ? (
        <Card className="ios-card overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
          <CardContent className="p-6">
            <LoadingIndicator />
          </CardContent>
        </Card>
      ) : (
        detailsSections.length > 0 ? (
          <div className="space-y-4">
            {detailsSections.map((section, idx) => {
              const SectionIcon = getSectionIcon(section.title);
              return (
                <div key={idx} className="ai-section">
                  <div className="flex items-center mb-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-sm mr-3">
                      <SectionIcon className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="text-lg font-medium">{section.title === "Brief Summary" ? "Key Benefits" : section.title}</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {section.items.map((item: any, itemIdx: number) => (
                      <Link to={item.linkTo} key={itemIdx} className="block">
                        <Card className="ios-card mb-4 hover:shadow-md transition-shadow overflow-hidden">
                          <div className="h-0.5 bg-gradient-to-r from-emerald-400/40 to-teal-500/40"></div>
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
                            <div className="h-8 w-8 bg-slate-50 rounded-full flex items-center justify-center flex-shrink-0">
                              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <Card className="ios-card overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
            <CardContent className="p-6">
              <div className="flex items-start mb-4">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-sm mr-3 flex-shrink-0">
                  <Apple className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">AI Generated Details</h3>
                  <div className="text-sm">
                    {aiContent.details?.formattedHtml ? (
                      <div dangerouslySetInnerHTML={{ __html: aiContent.details.formattedHtml }} className="skin-advice-content" />
                    ) : (
                      <p>No details available for this product.</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      )}
    </div>
  );
};

export default ProductDetails;
