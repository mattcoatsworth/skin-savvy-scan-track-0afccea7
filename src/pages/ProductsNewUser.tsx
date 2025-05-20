
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Search, Package, ShoppingCart } from "lucide-react";
import BackButton from "@/components/BackButton";
import BottomTemplate from "@/components/BottomTemplate";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import ScanButton from "@/components/ScanButton";
import { useScrollToTop } from "@/hooks/useScrollToTop";

const ProductsNewUser = () => {
  // Add scroll to top functionality
  useScrollToTop();
  
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <div className="bg-slate-50 pb-20">
      <header className="mb-6 flex items-center">
        <BackButton />
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-muted-foreground">Track products affecting your skin</p>
        </div>
      </header>
      
      <div className="mb-4 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input 
          placeholder="Search products..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-white"
        />
      </div>
      
      <ScanButton className="mb-4" />
      
      <Tabs defaultValue="used" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="used" className="text-base">My Products</TabsTrigger>
          <TabsTrigger value="scanned" className="text-base">Scanned</TabsTrigger>
          <TabsTrigger value="trending" className="text-base">Trending</TabsTrigger>
        </TabsList>
        
        {/* My Products content */}
        <TabsContent value="used">
          {/* Food impacts section */}
          <div className="ios-section mb-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold">Food Impacts</h2>
              <Link to="/used-foods" className="text-sm text-skin-teal flex items-center">
                View all <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <Card className="mb-4">
              <CardContent className="p-4 flex flex-col items-center justify-center py-6">
                <Package className="h-10 w-10 text-gray-300 mb-2" />
                <p className="text-sm text-center text-muted-foreground">No food products tracked yet</p>
                <p className="text-xs text-center text-muted-foreground mb-4">
                  Start tracking what you eat to see how it affects your skin
                </p>
                <Button size="sm" asChild>
                  <Link to="/log-skin-condition">Track Food</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Products impact section */}
          <div className="ios-section mb-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold">Product Effects</h2>
              <Link to="/used-products" className="text-sm text-skin-teal flex items-center">
                View all <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <Card className="mb-4">
              <CardContent className="p-4 flex flex-col items-center justify-center py-6">
                <ShoppingCart className="h-10 w-10 text-gray-300 mb-2" />
                <p className="text-sm text-center text-muted-foreground">No skincare products tracked yet</p>
                <p className="text-xs text-center text-muted-foreground mb-4">
                  Log your skincare products to analyze their effect on your skin
                </p>
                <Button size="sm" asChild>
                  <Link to="/log-skin-condition">Track Products</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Scanned products content */}
        <TabsContent value="scanned">
          {/* Food impacts section */}
          <div className="ios-section mb-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold">Food Impacts</h2>
              <Link to="/scanned-foods" className="text-sm text-skin-teal flex items-center">
                View all <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <Card className="mb-4">
              <CardContent className="p-4 flex flex-col items-center justify-center py-6">
                <Package className="h-10 w-10 text-gray-300 mb-2" />
                <p className="text-sm text-center text-muted-foreground">No scanned foods yet</p>
                <p className="text-xs text-center text-muted-foreground mb-4">
                  Scan food labels to analyze ingredients
                </p>
                <Button size="sm" className="mt-2" asChild>
                  <Link to="/scan">
                    Scan Product
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Products impact section */}
          <div className="ios-section mb-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold">Product Effects</h2>
              <Link to="/scanned-products" className="text-sm text-skin-teal flex items-center">
                View all <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <Card className="mb-4">
              <CardContent className="p-4 flex flex-col items-center justify-center py-6">
                <ShoppingCart className="h-10 w-10 text-gray-300 mb-2" />
                <p className="text-sm text-center text-muted-foreground">No scanned products yet</p>
                <p className="text-xs text-center text-muted-foreground mb-4">
                  Scan skincare product labels to analyze ingredients
                </p>
                <Button size="sm" className="mt-2" asChild>
                  <Link to="/scan">
                    Scan Product
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Trending products content */}
        <TabsContent value="trending">
          {/* Trending Food impacts section */}
          <div className="ios-section mb-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold">Food Impacts</h2>
              <Link to="/trending-foods" className="text-sm text-skin-teal flex items-center">
                View all <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <Card className="mb-4">
              <CardContent className="p-4 flex flex-col items-center justify-center py-6">
                <Package className="h-10 w-10 text-gray-300 mb-2" />
                <p className="text-sm text-center text-muted-foreground">Trending foods will appear here</p>
                <p className="text-xs text-center text-muted-foreground mb-4">
                  Track your skin condition to see recommendations
                </p>
                <Button size="sm" variant="outline" asChild>
                  <Link to="/log-skin-condition">Start Tracking</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Trending Products impact section */}
          <div className="ios-section mb-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold">Product Effects</h2>
              <Link to="/trending-products" className="text-sm text-skin-teal flex items-center">
                View all <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <Card className="mb-4">
              <CardContent className="p-4 flex flex-col items-center justify-center py-6">
                <ShoppingCart className="h-10 w-10 text-gray-300 mb-2" />
                <p className="text-sm text-center text-muted-foreground">Trending products will appear here</p>
                <p className="text-xs text-center text-muted-foreground mb-4">
                  Track your skin condition to see product recommendations
                </p>
                <Button size="sm" variant="outline" asChild>
                  <Link to="/log-skin-condition">Start Tracking</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      <BottomTemplate pageTitle="Products" />
    </div>
  );
};

export default ProductsNewUser;
