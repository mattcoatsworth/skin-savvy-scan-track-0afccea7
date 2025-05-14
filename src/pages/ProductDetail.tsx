
import React from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import ViewScoringMethod from "@/components/ViewScoringMethod";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { useProductContent } from "@/hooks/useProductContent";

// Import product data (In a real app, this would come from an API)
import { foodItems, productItems } from "@/data/products";

// Import components
import ProductHeader from "@/components/product/ProductHeader";
import ProductOverview from "@/components/product/ProductOverview";
import ProductDetails from "@/components/product/ProductDetails";
import BottomTemplate from "@/components/BottomTemplate";

const ProductDetail = () => {
  // Add scroll to top functionality
  useScrollToTop();
  
  const { type, id } = useParams<{ type: string; id: string }>();
  const location = useLocation();
  
  // First try to get product from location state
  const productFromState = location.state?.product;
  
  // If not in state, get from our data
  const products = type === "food" ? foodItems : productItems;
  const product = productFromState || products.find(p => p.id === id);

  // Get product content using the custom hook
  const {
    aiContent,
    isLoading,
    askAiAboutProduct,
    processAIResponse
  } = useProductContent(product, type || "", id || "");

  // Process AI sections
  const detailsSections = processAIResponse("details", aiContent.details?.sections || {});

  if (!product) {
    return (
      <div className="bg-slate-50 min-h-screen pb-20">
        <div className="max-w-md mx-auto px-4 py-6">
          <header className="flex items-center mb-6">
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

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        <ProductHeader productName={product.name} />
        
        {/* Overview Section */}
        <ProductOverview 
          isLoading={isLoading.overview} 
          product={product} 
          type={type || ""} 
          aiContent={aiContent} 
          askAiAboutProduct={askAiAboutProduct}
        />
        
        {/* Details Section - AI Generated */}
        <ProductDetails 
          isLoading={isLoading.details}
          detailsSections={detailsSections}
          aiContent={aiContent}
        />
        
        {/* View Scoring Method */}
        <ViewScoringMethod />
        
        {/* Bottom Template - includes both disclaimer and chat */}
        <BottomTemplate 
          pageTitle={product.name}
          disclaimerText="This information is for educational purposes only and is not intended as medical advice. Always consult with a healthcare professional or dermatologist for personalized recommendations and treatment options regarding skin concerns."
        />
      </div>
    </div>
  );
};

export default ProductDetail;
