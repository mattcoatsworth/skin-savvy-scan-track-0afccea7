
import React, { useEffect, useState } from "react";
import BackButton from "@/components/BackButton";
import ProductCard from "@/components/ProductCard";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { supabase } from "@/integrations/supabase/client";
import { Loader } from "lucide-react";

// Mock trending product data as fallback
const trendingProductItems = [
  { 
    id: "niacinamide", 
    name: "Niacinamide Serum", 
    brand: "The Ordinary",
    rating: 87, 
    impact: "Positive" as const, 
    description: "Reduces pore appearance and improves texture"
  },
  { 
    id: "ceramide", 
    name: "Ceramide Moisturizer", 
    brand: "CeraVe",
    rating: 89, 
    impact: "Positive" as const, 
    description: "Strengthens skin barrier and improves hydration"
  },
  { 
    id: "retinol", 
    name: "Retinol Treatment", 
    brand: "Paula's Choice",
    rating: 91, 
    impact: "Positive" as const, 
    description: "Promotes cell turnover and reduces fine lines"
  },
  { 
    id: "vitamin-c", 
    name: "Vitamin C Serum", 
    brand: "SkinCeuticals",
    rating: 93, 
    impact: "Positive" as const, 
    description: "Brightens and protects from free radicals"
  },
  { 
    id: "hyaluronic", 
    name: "Hyaluronic Acid", 
    brand: "La Roche-Posay",
    rating: 88, 
    impact: "Positive" as const, 
    description: "Deep hydration and plumping effect"
  }
];

const TrendingProducts = () => {
  // Add scroll to top functionality
  useScrollToTop();
  
  const [products, setProducts] = useState(trendingProductItems);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchPersonalizedProducts = async () => {
      try {
        setLoading(true);
        
        // Check if user is authenticated
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          // Fetch user insights for products
          const { data: insights, error } = await supabase
            .from('user_insights')
            .select('*')
            .eq('user_id', session.user.id as any)
            .eq('insight_type', 'skincare' as any)
            .is('is_active', true)
            .order('confidence_level', { ascending: false })
            .limit(5);
          
          if (error) {
            console.error('Error fetching product insights:', error);
            return;
          }
          
          // If we have personalized insights, use them
          if (insights && insights.length > 0) {
            const personalizedProducts = insights.map(insight => ({
              id: insight?.related_product_id || 'unknown',
              name: insight?.related_product_id || 'Personalized Product',
              brand: 'Recommended for You',
              rating: insight?.confidence_level || 80,
              impact: "Positive" as const,
              description: insight?.insight_text || ''
            }));
            
            // If we don't have enough personalized products, mix with trending
            if (personalizedProducts.length < 5) {
              setProducts([
                ...personalizedProducts,
                ...trendingProductItems.slice(0, 5 - personalizedProducts.length)
              ]);
            } else {
              setProducts(personalizedProducts);
            }
          }
        }
      } catch (err) {
        console.error('Error fetching personalized products:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPersonalizedProducts();
  }, []);
  
  return (
    <div className="pb-24">
      <header className="mb-6 flex items-center">
        <BackButton />
        <h1 className="text-2xl font-bold">Trending Products</h1>
      </header>
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      ) : (
        <div className="space-y-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} type="skincare" />
          ))}
        </div>
      )}
    </div>
  );
};

export default TrendingProducts;
