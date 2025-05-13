import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import BackButton from "@/components/BackButton";
import { ArrowRight, Check, Info } from "lucide-react";
import { Link } from "react-router-dom";
import useScrollToTop from "@/hooks/useScrollToTop";

const GentleCleanserPage = () => {
  useScrollToTop();
  
  // Sample product recommendations
  const recommendedProducts = [
    {
      id: "clnsr1",
      name: "Hydrating Gentle Cleanser",
      brand: "CeraVe",
      price: "$14.99",
      rating: 4.7,
      description: "Fragrance-free, non-foaming cleanser with ceramides and hyaluronic acid",
      strength: "Extremely gentle, ideal for sensitive or dry skin"
    },
    {
      id: "clnsr2",
      name: "Toleriane Hydrating Gentle Face Wash",
      brand: "La Roche-Posay",
      price: "$16.99",
      rating: 4.6,
      description: "Milky cream cleanser with prebiotic thermal water",
      strength: "Soothes and maintains skin's natural barrier"
    },
    {
      id: "clnsr3",
      name: "Gentle Soy Face Cleanser",
      brand: "Fresh",
      price: "$38.00",
      rating: 4.5,
      description: "Amino acid-rich soy proteins help maintain elasticity",
      strength: "Balances and removes makeup without stripping"
    }
  ];
  
  // Benefits list
  const benefits = [
    "Reduces irritation and redness",
    "Preserves natural oils in your skin",
    "Maintains proper pH balance (5.5)",
    "Prevents moisture loss during cleansing",
    "Compatible with sensitive and acne-prone skin"
  ];

  // Signs you need a gentler cleanser
  const signs = [
    "Tightness after washing",
    "Increased redness or sensitivity",
    "Skin feels 'squeaky clean'",
    "Worsened dryness or flaking",
    "Stinging when applying other products"
  ];
  
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6 flex items-center">
          <BackButton />
          <div>
            <h1 className="text-2xl font-bold">Gentle Cleansers</h1>
            <p className="text-skin-teal text-sm">Product Recommendation</p>
          </div>
        </header>
        
        {/* Key Insights */}
        <Card className="ios-card mb-6">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Why This Matters For Your Skin</h2>
            <p className="text-gray-600 mb-4">
              Based on your skin data, your current cleanser may be causing irritation and compromising your skin barrier.
              Your skin shows a pattern of increased sensitivity and redness after using foaming cleansers.
            </p>
            
            <div className="flex items-start space-x-3 mb-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Info className="h-4 w-4 text-blue-500" />
              </div>
              <p className="text-sm text-gray-600">
                Your skin barrier shows signs of disruption on days after using your current foaming cleanser. 
                This may be contributing to your reported mid-week skin issues.
              </p>
            </div>
            
            <div className="border-t border-slate-100 pt-4 mt-4">
              <h3 className="font-medium mb-2">Benefits of Gentle Cleansers</h3>
              <ul className="space-y-2">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-2 flex-shrink-0">
                      <Check className="h-3 w-3 text-green-500" />
                    </div>
                    <span className="text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
        
        {/* Signs You Need to Switch */}
        <Card className="ios-card mb-6">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-3">Signs Your Cleanser Is Too Harsh</h2>
            <p className="text-sm text-gray-600 mb-4">
              Your skin logs suggest you're experiencing 3 out of 5 of these signs:
            </p>
            
            <div className="space-y-3">
              {signs.map((sign, index) => (
                <div 
                  key={index} 
                  className={`flex items-center p-3 rounded-md ${
                    index < 3 ? "bg-amber-50" : "bg-slate-50 border border-slate-100"
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 flex-shrink-0 ${
                    index < 3 ? "bg-amber-100" : "bg-slate-100"
                  }`}>
                    <Check className={`h-3 w-3 ${
                      index < 3 ? "text-amber-500" : "text-slate-400"
                    }`} />
                  </div>
                  <span className="text-sm">{sign}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Recommended Products */}
        <h2 className="text-lg font-semibold mb-3">Recommended Gentle Cleansers</h2>
        <p className="text-sm text-gray-600 mb-4">
          Based on your skin profile, these gentle cleansers may work well for you:
        </p>
        
        <div className="space-y-4 mb-8">
          {recommendedProducts.map((product) => (
            <Link 
              key={product.id}
              to={`/product/skincare/${product.id}`}
              className="block transition-transform hover:scale-[1.01] active:scale-[0.99]"
            >
              <Card className="ios-card hover:shadow-md transition-all border border-transparent hover:border-slate-200">
                <CardContent className="p-4">
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">{product.brand}</p>
                      </div>
                      <span className="text-sm font-medium">{product.price}</span>
                    </div>
                    
                    <div className="mt-3">
                      <p className="text-sm text-gray-600">{product.description}</p>
                      <div className="mt-2 flex justify-between items-center">
                        <span className="text-xs text-skin-teal">{product.strength}</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                          {product.rating}/5 rating
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        
        {/* Tips for Use */}
        <Card className="ios-card mb-6">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">How to Get Best Results</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Water Temperature</h3>
                <p className="text-sm text-gray-600">
                  Use lukewarm water (never hot) to avoid stripping natural oils.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Application Method</h3>
                <p className="text-sm text-gray-600">
                  Apply with fingertips using gentle circular motions. Avoid washcloths or scrubbing.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Frequency</h3>
                <p className="text-sm text-gray-600">
                  For your skin type, consider cleansing once daily (evening) and just rinsing with water in the morning.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Next Steps */}
        <Card className="ios-card mb-6">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-3">Track Your Progress</h2>
            <p className="text-sm text-gray-600 mb-4">
              After switching to a gentler cleanser, track these metrics in your skin log:
            </p>
            
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
              <li>Morning redness levels</li>
              <li>Skin comfort after cleansing</li>
              <li>Moisture retention throughout the day</li>
              <li>Sensitivity to other products</li>
              <li>Overall barrier health</li>
            </ul>
            
            <Link 
              to="/log-skin-condition" 
              className="mt-4 flex items-center text-skin-teal text-sm font-medium"
            >
              Log your skin condition <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </CardContent>
        </Card>
        
        {/* Add to My Skin Goals button */}
        <button className="skin-goals-button mt-4 mb-2">
          Add to My Skin Goals
        </button>
      </div>
    </div>
  );
};

export default GentleCleanserPage;
