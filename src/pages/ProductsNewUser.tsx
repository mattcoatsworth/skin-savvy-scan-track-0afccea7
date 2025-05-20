
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShoppingBag, Activity, Search, History, ScanLine } from "lucide-react";
import BackButton from "@/components/BackButton";
import BottomTemplate from "@/components/BottomTemplate";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import EmptyState from "@/components/EmptyState";

const ProductsNewUser = () => {
  // Add scroll to top functionality
  useScrollToTop();
  
  return (
    <div>
      <header className="mb-6 flex items-center">
        <BackButton />
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-muted-foreground">Track your product usage</p>
        </div>
      </header>
      
      <main className="space-y-6">
        {/* Empty Product Library */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Your Product Library</h2>
          <Card>
            <CardContent className="p-0">
              <EmptyState
                className="py-10"
                icon={<ShoppingBag className="h-10 w-10" />}
                title="No products added yet"
                description="Add skincare products to track their impact on your skin"
                actionButton={
                  <Button size="sm" asChild>
                    <Link to="/search">
                      <Search className="h-4 w-4 mr-1" />
                      Browse Products
                    </Link>
                  </Button>
                }
              />
            </CardContent>
          </Card>
        </div>
        
        {/* Empty Recent Scans */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Recent Scans</h2>
          <Card>
            <CardContent className="p-0">
              <EmptyState
                className="py-10"
                icon={<ScanLine className="h-10 w-10" />}
                title="No recent scans"
                description="Scan product barcodes to view their information and skin impact"
                actionButton={
                  <Button size="sm" variant="outline" asChild>
                    <Link to="/scan">Scan Product</Link>
                  </Button>
                }
              />
            </CardContent>
          </Card>
        </div>
        
        {/* Empty Product Impact */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Product Impact</h2>
          <Card>
            <CardContent className="p-0">
              <EmptyState
                className="py-10"
                icon={<Activity className="h-10 w-10" />}
                title="No product impact data"
                description="Add products and track your skin to see how they affect your skin"
                actionButton={
                  <Button size="sm" variant="outline" asChild>
                    <Link to="/log-skin-condition">Log Skin Condition</Link>
                  </Button>
                }
              />
            </CardContent>
          </Card>
        </div>
        
        {/* Empty Product History */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Product History</h2>
          <Card>
            <CardContent className="p-0">
              <EmptyState
                className="py-10"
                icon={<History className="h-10 w-10" />}
                title="No product history"
                description="Track your product usage to build your history"
                actionButton={
                  <Button size="sm" variant="outline" asChild>
                    <Link to="/search">Find Products</Link>
                  </Button>
                }
              />
            </CardContent>
          </Card>
        </div>
      </main>
      
      {/* Scan Button */}
      <div className="fixed bottom-24 inset-x-0 flex justify-center z-10">
        <Link 
          to="/scan"
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 
                     text-white font-medium rounded-full shadow-lg 
                     hover:shadow-xl transition-all duration-200 flex items-center"
        >
          <ScanLine className="mr-2 h-5 w-5" /> Scan Product
        </Link>
      </div>
      
      <BottomTemplate pageTitle="Products" />
    </div>
  );
};

export default ProductsNewUser;
