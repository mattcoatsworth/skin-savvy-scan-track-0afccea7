
import React from 'react';
import { Card } from '@/components/ui/card';
import { Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const GentleCleanserStyled = () => {
  return (
    <div className="gentle-cleanser-styled">
      {/* Header Section */}
      <div className="header-section mb-6">
        <h1 className="text-2xl font-bold mb-2">Gentle Cleanser</h1>
        <p className="text-muted-foreground">
          A mild, pH-balanced facial cleanser that removes impurities without stripping natural oils.
        </p>
      </div>
      
      {/* Main Benefits Section */}
      <div className="main-benefits mb-6">
        <h2 className="text-lg font-medium mb-3">Main Benefits</h2>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="inline-flex items-center justify-center rounded-full bg-green-100 p-1 mr-2">
              <Check className="h-4 w-4 text-green-600" />
            </span>
            <span>Removes dirt and excess oil without irritation</span>
          </li>
          <li className="flex items-start">
            <span className="inline-flex items-center justify-center rounded-full bg-green-100 p-1 mr-2">
              <Check className="h-4 w-4 text-green-600" />
            </span>
            <span>Maintains skin's natural pH balance (5.5-6.0)</span>
          </li>
          <li className="flex items-start">
            <span className="inline-flex items-center justify-center rounded-full bg-green-100 p-1 mr-2">
              <Check className="h-4 w-4 text-green-600" />
            </span>
            <span>Suitable for sensitive and acne-prone skin</span>
          </li>
        </ul>
      </div>
      
      {/* Why It Matters Section */}
      <div className="why-it-matters mb-6">
        <h2 className="text-lg font-medium mb-3">Why It Matters</h2>
        <p className="text-muted-foreground mb-3">
          Harsh cleansers can disrupt your skin barrier, leading to increased sensitivity,
          dryness, and potential breakouts. Gentle cleansing:
        </p>
        <ul className="space-y-1 text-sm text-muted-foreground mb-3">
          <li>• Preserves natural moisture</li>
          <li>• Supports healthy skin microbiome</li>
          <li>• Reduces inflammation risk</li>
          <li>• Prepares skin to better absorb subsequent products</li>
        </ul>
      </div>
      
      {/* How to implement this section */}
      <div className="implementation mb-6">
        <h2 className="text-lg font-medium mb-3">How to Implement</h2>
        <Card className="mb-4 bg-slate-50 border border-slate-200 shadow-sm">
          <div className="p-4">
            <h3 className="font-medium mb-2">Look for these gentle surfactants:</h3>
            <ul className="text-sm space-y-1">
              <li>• Cocamidopropyl betaine</li>
              <li>• Sodium cocoyl isethionate</li>
              <li>• Sodium lauroyl glutamate</li>
              <li>• Coco glucoside</li>
            </ul>
          </div>
        </Card>
        
        <Card className="mb-4 bg-slate-50 border border-slate-200 shadow-sm">
          <div className="p-4">
            <h3 className="font-medium mb-2">Cleansing technique matters:</h3>
            <ul className="text-sm space-y-1">
              <li>• Use lukewarm (not hot) water</li>
              <li>• Apply cleanser with fingertips gently</li>
              <li>• Rinse thoroughly - residue can cause irritation</li>
              <li>• Pat dry - don't rub with towel</li>
            </ul>
          </div>
        </Card>
      </div>
      
      {/* Personal recommendation section */}
      <div className="personalized-recommendation mb-6">
        <h2 className="text-lg font-medium mb-3">Your Personal Recommendation</h2>
        <Card className="mb-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 shadow-sm">
          <div className="p-4">
            <div className="flex items-center mb-3">
              <Sparkles className="h-5 w-5 text-blue-500 mr-2" />
              <h3 className="font-medium">Based on your skin profile:</h3>
            </div>
            <p className="text-sm mb-3">
              With your combination skin that tends toward sensitivity during seasonal changes,
              we recommend a hydrating gel cleanser with minimal fragrance and sulfate-free formulation.
            </p>
            <p className="text-sm font-medium">
              Consider cleansing once daily (evening) and just rinsing with water in the morning
              to preserve your natural moisture barrier.
            </p>
          </div>
        </Card>
      </div>
      
      {/* Related recommendations section */}
      <div className="related-recommendations mb-6">
        <h2 className="text-lg font-medium mb-3">Related Recommendations</h2>
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-white border shadow-sm">
            <div className="p-3">
              <h3 className="text-sm font-medium mb-1">Hydrating Toner</h3>
              <p className="text-xs text-muted-foreground">For post-cleanse moisture balance</p>
              <Button asChild variant="link" className="text-xs h-auto p-0 mt-1">
                <Link to="/recommendations-detail/hydrating-toner">View Details</Link>
              </Button>
            </div>
          </Card>
          <Card className="bg-white border shadow-sm">
            <div className="p-3">
              <h3 className="text-sm font-medium mb-1">Double Cleansing</h3>
              <p className="text-xs text-muted-foreground">For makeup and sunscreen removal</p>
              <Button asChild variant="link" className="text-xs h-auto p-0 mt-1">
                <Link to="/recommendations-detail/double-cleansing">View Details</Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
