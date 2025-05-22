
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { 
  CheckCircle2, 
  Salad, 
  AlertCircle, 
  Apple, 
  LeafyGreen, 
  Carrot,
  BarChart2, 
  Heart,
  Leaf,
  Zap,
  Droplet,
  Shield,
  Utensils,
  Heart as HeartIcon
} from "lucide-react";

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
        return Heart;
      case "nutrition facts":
        return Utensils;
      case "potential concerns":
      case "contributing factors":
        return AlertCircle;
      case "vitamins & minerals":
        return LeafyGreen;
      case "health benefits":
        return Zap;
      case "dietary considerations":
        return BarChart2;
      case "skin benefits":
        return Leaf;
      case "heart health":
        return HeartIcon;
      case "digestive health":
        return Shield;
      case "hydration":
        return Droplet;
      default:
        return Carrot;
    }
  };

  // Get a section-appropriate gradient color
  const getSectionGradient = (index: number, title: string) => {
    // Check for "Contributing Factors" or "Potential Concerns" to use yellow instead of red
    if (title.toLowerCase() === "contributing factors" || title.toLowerCase() === "potential concerns") {
      return "from-amber-400 to-yellow-500"; // Yellow gradient instead of red
    }
    
    const gradients = [
      "from-emerald-400 to-teal-500",      // Green/teal
      "from-blue-400 to-indigo-500",       // Blue/indigo
      "from-amber-400 to-orange-500",      // Amber/orange
      "from-pink-400 to-rose-500",         // Pink/rose
      "from-violet-400 to-purple-500",     // Violet/purple
      "from-cyan-400 to-sky-500",          // Cyan/sky
      "from-lime-400 to-green-500",        // Lime/green
      "from-fuchsia-400 to-pink-500",      // Fuchsia/pink
      "from-yellow-400 to-amber-500",      // Yellow/amber
      "from-amber-400 to-yellow-500",      // Amber/yellow (replacing red)
    ];

    return gradients[index % gradients.length];
  };

  // Get a section-appropriate translucent gradient color
  const getSectionLightGradient = (index: number, title: string) => {
    // Check for "Contributing Factors" or "Potential Concerns" to use yellow instead of red
    if (title.toLowerCase() === "contributing factors" || title.toLowerCase() === "potential concerns") {
      return "from-amber-400/40 to-yellow-500/40"; // Yellow translucent gradient instead of red
    }
    
    const gradients = [
      "from-emerald-400/40 to-teal-500/40",
      "from-blue-400/40 to-indigo-500/40",
      "from-amber-400/40 to-orange-500/40",
      "from-pink-400/40 to-rose-500/40",
      "from-violet-400/40 to-purple-500/40",
      "from-cyan-400/40 to-sky-500/40",
      "from-lime-400/40 to-green-500/40",
      "from-fuchsia-400/40 to-pink-500/40",
      "from-yellow-400/40 to-amber-500/40",
      "from-amber-400/40 to-yellow-500/40", // Amber/yellow translucent (replacing red)
    ];

    return gradients[index % gradients.length];
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
              const sectionGradient = getSectionGradient(idx, section.title);
              const lightGradient = getSectionLightGradient(idx, section.title);
              
              return (
                <div key={idx} className="ai-section">
                  <div className="flex items-center mb-3">
                    <div className={`h-8 w-8 rounded-full bg-gradient-to-br ${sectionGradient} flex items-center justify-center shadow-sm mr-3`}>
                      <SectionIcon className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="text-lg font-medium">{section.title === "Brief Summary" ? "Key Benefits" : section.title}</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {section.items.map((item: any, itemIdx: number) => (
                      <Link to={item.linkTo} key={itemIdx} className="block">
                        <Card className="ios-card mb-4 hover:shadow-md transition-shadow overflow-hidden">
                          <div className={`h-0.5 bg-gradient-to-r ${lightGradient}`}></div>
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
                            <div className={`h-8 w-8 bg-slate-50 rounded-full flex items-center justify-center flex-shrink-0`}>
                              <CheckCircle2 className={`h-4 w-4 text-${sectionGradient.split('-')[1].split(' ')[0]}`} />
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
