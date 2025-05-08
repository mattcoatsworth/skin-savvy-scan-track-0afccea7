
import React from "react";
import AppNavigation from "@/components/AppNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart2, ArrowRight } from "lucide-react";
import SkinHistory from "@/components/SkinHistory";
import InsightsTrends from "@/components/InsightsTrends";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

// Mock data for skin ratings
const skinRatings = [
  { day: "Mon", rating: 85, date: "5/1" },
  { day: "Tue", rating: 70, date: "5/2" },
  { day: "Wed", rating: 60, date: "5/3" },
  { day: "Thu", rating: 45, date: "5/4" },
  { day: "Fri", rating: 75, date: "5/5" },
];

// Mock data for insights
const insightData = [
  {
    title: "Hydration Effect",
    description: "Drinking 8+ glasses of water improved skin moisture by 30%",
    icon: "💧"
  },
  {
    title: "Vitamin C Serum",
    description: "Regular use has helped with brightening and texture",
    icon: "✨"
  },
  {
    title: "Sleep Quality",
    description: "Nights with 7+ hours sleep show 40% better skin clarity",
    icon: "😴"
  }
];

// Mock data for food items
const foodItems = [
  { name: "Avocado", rating: 90, impact: "Positive", description: "High in healthy fats that improve skin elasticity" },
  { name: "Blueberries", rating: 85, impact: "Positive", description: "Antioxidants reduce inflammation" },
  { name: "Dairy", rating: 40, impact: "Negative", description: "Associated with breakouts along chin" },
  { name: "Sugary Drinks", rating: 20, impact: "Negative", description: "Lead to increased redness and inflammation" },
];

// Mock data for skincare products
const productItems = [
  { name: "Hyaluronic Acid Serum", rating: 80, impact: "Positive", description: "Improved hydration levels" },
  { name: "Vitamin C Moisturizer", rating: 75, impact: "Positive", description: "Brighter complexion after 3 weeks" },
  { name: "Charcoal Mask", rating: 65, impact: "Neutral", description: "Temporary pore reduction" },
  { name: "Retinol Cream", rating: 85, impact: "Positive", description: "Reduced fine lines and improved texture" },
];

const Insights = () => {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-center">Insights</h1>
        </header>
        
        <SkinHistory ratings={skinRatings} className="mb-6" />
        
        <InsightsTrends insights={insightData} className="mb-6" />
        
        {/* Food impacts section */}
        <div className="ios-section mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold">Food Impacts</h2>
            <Link to="/food-impacts" className="text-sm text-skin-teal flex items-center">
              View all <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <Card className="ios-card">
            <CardContent className="p-4">
              {foodItems.map((food, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-medium">{food.name}</h3>
                    <span className={`text-sm ${food.impact === 'Positive' ? 'text-green-600' : food.impact === 'Negative' ? 'text-red-600' : 'text-amber-600'}`}>
                      {food.impact} • {food.rating}%
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{food.description}</p>
                  <Progress 
                    value={food.rating} 
                    className="h-2" 
                    style={{
                      backgroundColor: '#E6F8EA',
                      '--tw-bg-opacity': 1,
                    }}
                    color={food.rating >= 60 ? "#4ADE80" : food.rating >= 40 ? "#FACC15" : "#F87171"}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        
        {/* Products impact section */}
        <div className="ios-section mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold">Product Effects</h2>
            <Link to="/product-effects" className="text-sm text-skin-teal flex items-center">
              View all <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <Card className="ios-card">
            <CardContent className="p-4">
              {productItems.map((product, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-medium">{product.name}</h3>
                    <span className={`text-sm ${product.impact === 'Positive' ? 'text-green-600' : product.impact === 'Negative' ? 'text-red-600' : 'text-amber-600'}`}>
                      {product.impact} • {product.rating}%
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
                  <Progress 
                    value={product.rating} 
                    className="h-2" 
                    style={{
                      backgroundColor: '#E6F8EA',
                      '--tw-bg-opacity': 1,
                    }}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
      
      <AppNavigation />
    </div>
  );
};

export default Insights;
