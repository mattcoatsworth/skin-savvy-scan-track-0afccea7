
import React from "react";
import { useParams, Link } from "react-router-dom";
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
import ProductDisclaimer from "@/components/product/ProductDisclaimer";
import ProductForYou from "@/components/product/ProductForYou";
import DisclaimerCard from "@/components/DisclaimerCard";
import TestAIChatBox from "@/components/TestAIChatBox";

const ProductAITestPage = () => {
  // Add scroll to top functionality
  useScrollToTop();
  
  const { type, id } = useParams<{ type: string; id: string }>();
  
  // Find the product from our data
  const products = type === "food" ? foodItems : productItems;
  const product = products.find(p => p.id === id);

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
        
        {/* For You Section - Personalized recommendation */}
        <ProductForYou
          isLoading={isLoading.overview}
          product={product}
          type={type || ""}
          productId={id || ""}
        />
        
        {/* Details Section - AI Generated */}
        <ProductDetails 
          isLoading={isLoading.details}
          detailsSections={detailsSections}
          aiContent={aiContent}
        />
        
        {/* View Scoring Method */}
        <ViewScoringMethod />
        
        {/* Replace ProductDisclaimer with our standalone DisclaimerCard */}
        <DisclaimerCard
          isLoading={isLoading.disclaimer}
          disclaimerText={aiContent.disclaimer?.sections?.["Disclaimer"] || 
            "Individual responses may vary. Consult a healthcare professional before making changes to your routine."}
        />
        
        {/* Add chat box */}
        <TestAIChatBox productTitle={product.name} />
      </div>
    </div>
  );
};

export default ProductAITestPage;
